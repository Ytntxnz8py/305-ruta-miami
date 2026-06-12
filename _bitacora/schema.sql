-- ============================================================================
-- 305 RUTA MIAMI — Esquema de base de datos (Supabase / PostgreSQL)
-- ============================================================================
-- Estado: referencia REPRODUCIBLE al cierre de Fase 4 (12 junio 2026).
-- Este archivo recrea TODO el esquema sobre una base de datos vacia, en orden:
--   1) Tablas   2) Funciones   3) Disparadores   4) Reglas RLS + Grants   5) Datos semilla
-- Ejecutar de arriba a abajo en el SQL Editor de Supabase.
-- Comentarios en espanol. Convencion: etiquetas y nombres internos sin acentos.
--
-- CHANGELOG (los deltas historicos viven en _bitacora/fase*.sql; aqui consolidados):
--   12 jun 2026 (F4): columnas negocios.zona y negocios.atiende_es · grants modelo
--     minimo seguro (anon+authenticated solo leen negocios/categorias/planes) ·
--     siembra de 3 charters curados (solo en fase4-charters.sql, NO aqui: son datos
--     vivos de produccion, no esquema).
--   jun 2026 (F2): categorias renta-botes y jetski (ocultas) · reorden del conjunto
--     (pesca primero, cluster nautico arriba).
-- ============================================================================


-- ============================================================================
-- 1) TABLAS  (en orden de dependencias de claves foraneas)
-- ============================================================================

-- CLIENTES -- personas que pagan y entran al portal. Extiende a auth.users.
create table public.clientes (
  id          uuid primary key references auth.users (id) on delete cascade,
  nombre      text,
  email       text,
  telefono    text,
  rol         text not null default 'cliente' check (rol in ('cliente', 'admin')),
  creado_en   timestamptz not null default now()
);

-- PLANES -- niveles ofrecidos (conjunto fijo de 3). El precio de lista vive aqui.
create table public.planes (
  id            text primary key check (id in ('basico', 'profesional', 'elite')),
  nombre        text not null,
  precio        numeric not null,
  descripcion   text,
  beneficios    text[],
  activo        boolean not null default true
);

-- CATEGORIAS -- categorias de negocios (conjunto que puede crecer; por eso tabla, no check).
create table public.categorias (
  id          text primary key,
  nombre_es   text not null,
  nombre_en   text not null,
  orden       integer not null,
  activo      boolean not null default true
);

-- NEGOCIOS -- el negocio de cada cliente; lo que se muestra en el directorio.
create table public.negocios (
  id                    uuid primary key default gen_random_uuid(),
  cliente_id            uuid not null references public.clientes (id) on delete cascade,
  categoria_id          text not null references public.categorias (id) on delete restrict,
  nombre                text not null,
  descripcion_es        text,
  descripcion_en        text,
  descripcion_larga_es  text,
  descripcion_larga_en  text,
  telefono              text,
  whatsapp              text,
  web                   text,
  direccion             text,
  zona                  text,                             -- F4: zona/marina legible (ej. "Biscayne Bay")
  lat                   numeric,
  lng                   numeric,
  horarios              text,
  precio_desde          text,
  atiende_es            boolean not null default false,   -- F4: atiende en espanol (badge en el hub)
  destacado             boolean not null default false,
  activo                boolean not null default false,  -- nace OCULTO; se publica al pagar
  creado_en             timestamptz not null default now(),
  actualizado_en        timestamptz not null default now()
);

-- SUSCRIPCIONES -- que plan tiene cada negocio, cuanto paga, cuando renueva.
create table public.suscripciones (
  id                      uuid primary key default gen_random_uuid(),
  cliente_id              uuid not null references public.clientes (id) on delete cascade,
  negocio_id              uuid not null references public.negocios (id) on delete cascade,
  plan_id                 text not null references public.planes (id) on delete restrict,
  estado                  text not null default 'pendiente'
                            check (estado in ('activa', 'pausada', 'vencida', 'cancelada', 'pendiente')),
  precio_congelado        numeric not null,   -- precio real bloqueado para este cliente (fundador)
  fecha_inicio            date,
  fecha_renovacion        date,
  stripe_subscription_id  text,
  creado_en               timestamptz not null default now()
);

-- PAGOS -- historial de cobros (una suscripcion -> muchos pagos).
create table public.pagos (
  id                 uuid primary key default gen_random_uuid(),
  suscripcion_id     uuid not null references public.suscripciones (id) on delete cascade,
  monto              numeric not null,
  fecha              timestamptz not null default now(),
  metodo             text not null check (metodo in ('stripe', 'zelle', 'venmo', 'transferencia')),
  estado             text not null default 'pendiente' check (estado in ('pagado', 'pendiente', 'fallido')),
  stripe_payment_id  text
);

-- ARCHIVOS -- fotos/documentos del negocio (el archivo vive en Storage; aqui, sus datos).
create table public.archivos (
  id           uuid primary key default gen_random_uuid(),
  negocio_id   uuid not null references public.negocios (id) on delete cascade,
  url          text not null,
  tipo         text not null check (tipo in ('foto', 'documento')),
  nombre       text,
  orden        integer not null default 0,
  aprobado     boolean not null default false,  -- moderacion: oculto hasta aprobar
  subido_en    timestamptz not null default now()
);


-- ============================================================================
-- 2) FUNCIONES
-- ============================================================================

-- es_admin() -- el usuario conectado es admin? security definer evita recursion RLS.
create or replace function public.es_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.clientes where id = auth.uid() and rol = 'admin'
  );
$$;

-- es_dueno_negocio(nid) -- el negocio con ese id pertenece al usuario conectado?
create or replace function public.es_dueno_negocio(nid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.negocios where id = nid and cliente_id = auth.uid()
  );
$$;

-- set_actualizado_en() -- pone 'actualizado_en' = now() en cada UPDATE (reutilizable).
create or replace function public.set_actualizado_en()
returns trigger
language plpgsql
as $$
begin
  new.actualizado_en = now();
  return new;
end;
$$;

-- proteger_campos_negocio() -- un NO-admin no puede cambiar campos de control del negocio.
create or replace function public.proteger_campos_negocio()
returns trigger
language plpgsql
as $$
begin
  if not public.es_admin() then
    new.activo       := old.activo;
    new.destacado    := old.destacado;
    new.cliente_id   := old.cliente_id;
    new.categoria_id := old.categoria_id;
  end if;
  return new;
end;
$$;

-- proteger_aprobado_archivo() -- un NO-admin no puede cambiar 'aprobado' (moderacion).
create or replace function public.proteger_aprobado_archivo()
returns trigger
language plpgsql
as $$
begin
  if not public.es_admin() then
    new.aprobado := old.aprobado;
  end if;
  return new;
end;
$$;

-- handle_new_user() -- al registrarse un usuario en auth.users, crea su ficha en 'clientes'.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.clientes (id, nombre, email)
  values (new.id, new.raw_user_meta_data->>'nombre', new.email);
  return new;
end;
$$;


-- ============================================================================
-- 3) DISPARADORES (triggers)
-- ============================================================================

create trigger trg_negocios_actualizado
  before update on public.negocios
  for each row execute function public.set_actualizado_en();

create trigger trg_negocios_proteger
  before update on public.negocios
  for each row execute function public.proteger_campos_negocio();

create trigger trg_archivos_proteger
  before update on public.archivos
  for each row execute function public.proteger_aprobado_archivo();

-- Alta automatica: al crear un usuario en auth.users, crea su ficha en 'clientes'.
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ============================================================================
-- 4) SEGURIDAD A NIVEL DE FILA (RLS)
--    'enable row level security' por tabla hace el script reproducible aunque
--    el proyecto no tenga activado el RLS automatico.
-- ============================================================================

-- --- CLIENTES ---
alter table public.clientes enable row level security;

create policy "clientes_leer_propia_o_admin"
  on public.clientes for select
  using ( auth.uid() = id or public.es_admin() );

create policy "clientes_actualizar_propia_o_admin"
  on public.clientes for update
  using ( auth.uid() = id or public.es_admin() )
  with check ( public.es_admin() or (auth.uid() = id and rol = 'cliente') );

-- (INSERT lo hace el disparador de alta al registrarse; DELETE va por cascade desde auth.users)

-- --- PLANES ---
alter table public.planes enable row level security;

create policy "planes_leer_todos"
  on public.planes for select
  using ( true );

create policy "planes_admin_gestiona"
  on public.planes for all
  using ( public.es_admin() )
  with check ( public.es_admin() );

-- --- CATEGORIAS ---
alter table public.categorias enable row level security;

create policy "categorias_leer_todas"
  on public.categorias for select
  using ( true );

create policy "categorias_admin_gestiona"
  on public.categorias for all
  using ( public.es_admin() )
  with check ( public.es_admin() );

-- --- NEGOCIOS ---
alter table public.negocios enable row level security;

create policy "negocios_leer"
  on public.negocios for select
  using ( activo = true or auth.uid() = cliente_id or public.es_admin() );

create policy "negocios_crear_admin"
  on public.negocios for insert
  with check ( public.es_admin() );

create policy "negocios_actualizar_dueno_o_admin"
  on public.negocios for update
  using ( auth.uid() = cliente_id or public.es_admin() )
  with check ( auth.uid() = cliente_id or public.es_admin() );

create policy "negocios_borrar_admin"
  on public.negocios for delete
  using ( public.es_admin() );

-- --- SUSCRIPCIONES ---
alter table public.suscripciones enable row level security;

create policy "suscripciones_leer_propias_o_admin"
  on public.suscripciones for select
  using ( auth.uid() = cliente_id or public.es_admin() );

create policy "suscripciones_admin_gestiona"
  on public.suscripciones for all
  using ( public.es_admin() )
  with check ( public.es_admin() );

-- --- PAGOS ---
alter table public.pagos enable row level security;

create policy "pagos_leer_propios_o_admin"
  on public.pagos for select
  using (
    public.es_admin()
    or exists (
      select 1 from public.suscripciones s
      where s.id = pagos.suscripcion_id and s.cliente_id = auth.uid()
    )
  );

create policy "pagos_admin_gestiona"
  on public.pagos for all
  using ( public.es_admin() )
  with check ( public.es_admin() );

-- --- ARCHIVOS ---
alter table public.archivos enable row level security;

create policy "archivos_leer"
  on public.archivos for select
  using (
    public.es_admin()
    or public.es_dueno_negocio(negocio_id)
    or (
      aprobado = true
      and exists (
        select 1 from public.negocios n
        where n.id = archivos.negocio_id and n.activo = true
      )
    )
  );

create policy "archivos_crear"
  on public.archivos for insert
  with check ( public.es_admin() or public.es_dueno_negocio(negocio_id) );

create policy "archivos_actualizar"
  on public.archivos for update
  using ( public.es_admin() or public.es_dueno_negocio(negocio_id) )
  with check ( public.es_admin() or public.es_dueno_negocio(negocio_id) );

create policy "archivos_borrar"
  on public.archivos for delete
  using ( public.es_admin() or public.es_dueno_negocio(negocio_id) );


-- --- GRANTS — modelo minimo seguro (F4) ---
-- Una politica RLS NO basta por si sola: sin GRANT SELECT el rol recibe
-- 42501 "permission denied for table". Lectura abierta SOLO a las 3 tablas
-- de cara al publico; la RLS sigue filtrando filas (negocios -> activo=true).
-- clientes / suscripciones / pagos / archivos quedan SIN grant a proposito
-- (doble candado: ni grant ni RLS para anon). 'archivos' recibira su grant
-- cuando el frontend muestre galerias (F7 / Lote C).

grant usage  on schema public        to anon, authenticated;
grant select on public.negocios      to anon, authenticated;
grant select on public.categorias    to anon, authenticated;
grant select on public.planes        to anon, authenticated;


-- ============================================================================
-- 5) DATOS SEMILLA (reales)
-- ============================================================================

-- PLANES
insert into public.planes (id, nombre, precio, descripcion, beneficios, activo) values
('basico', 'Basico', 99,
 'Tu negocio en el directorio bilingue, con ficha y pagina propia.',
 array[
   'Ficha bilingue (espanol/ingles) en el directorio y pagina de detalle propia',
   '2 a 3 fotos y descripcion corta de tu negocio',
   'Datos practicos: horarios, precio, telefono y enlace a tu web',
   'Botones a Google Maps y a tu sitio web',
   'Reporte mensual simple de visitas'
 ], true),
('profesional', 'Profesional', 149,
 'Mas visibilidad: galeria, WhatsApp, destacado y tu Perfil de Google optimizado.',
 array[
   'Todo lo del plan Basico',
   'Galeria de 4 fotos y descripcion larga en espanol e ingles',
   'Boton de WhatsApp directo',
   'Insignia "Destacado" y posicion preferente en el listado',
   'Configuracion y optimizacion inicial de tu Perfil de Google Business (una vez)',
   'Sello "Recomendado por 305 Ruta Miami" y codigo QR a tu ficha',
   'Reporte mensual detallado de visitas'
 ], true),
('elite', 'Elite', 249,
 'Maxima exposicion: top de tu categoria, portada, articulo en el blog y soporte prioritario.',
 array[
   'Todo lo del plan Profesional',
   'Posicion fija en lo mas alto de tu categoria y presencia destacada en la portada',
   'Insignia exclusiva "Referente"',
   'Un articulo sobre tu negocio en el blog (una vez)',
   'Seccion extendida "Nuestra historia" en tu pagina (una vez)',
   'Soporte prioritario por WhatsApp y correo'
 ], true)
on conflict (id) do nothing;

-- CATEGORIAS — cluster nautico arriba (F2). renta-botes y jetski nacen ocultas
-- (activo=false): se venden a anunciantes ya, pero no se muestran al visitante
-- hasta tener contenido.
insert into public.categorias (id, nombre_es, nombre_en, orden, activo) values
('pesca',              'Pesca',                'Fishing',            1, true),
('renta-botes',        'Renta de Botes',       'Boat Rentals',       2, false),
('jetski',             'Jet Ski',              'Jet Ski',            3, false),
('playa',              'Playa',                'Beach',              4, true),
('buceo',              'Buceo',                'Diving',             5, true),
('exploracion',        'Exploracion',          'Exploration',        6, true),
('bares-restaurantes', 'Bares y Restaurantes', 'Bars & Restaurants', 7, true)
on conflict (id) do nothing;

-- ============================================================================
-- Fin del esquema. CIMIENTO COMPLETO Y VERIFICADO (base de datos + auth).
--
-- Bootstrap del primer admin (paso MANUAL, no se ejecuta solo):
--   1) Authentication > Users > Add user (marca "Auto Confirm User").
--   2) update public.clientes set rol = 'admin' where email = 'TU_CORREO';
-- ============================================================================
