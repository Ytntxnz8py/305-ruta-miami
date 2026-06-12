-- ============================================================================
-- 305 RUTA MIAMI — Fase 4: columnas zona/atiende_es + siembra de charters curados
-- ============================================================================
-- Ejecutar A MANO en el SQL Editor de Supabase, de arriba a abajo.
-- IDEMPOTENTE: se puede correr varias veces sin duplicar ni romper nada.
-- Comentarios en espanol. Convencion del proyecto: nombres internos sin acentos;
-- los DATOS publicos (descripciones) si llevan acentos, tal como se muestran al visitante.
--
-- Decisiones de la auditoria (Fase 4, paso 1) que este script materializa:
--   - zona            -> columna nueva en negocios
--   - especialidad    -> se reutiliza descripcion_es/_en (no hay columna nueva)
--   - atiende_es      -> columna boolean nueva, default false
--   - exposicion de columnas a anon -> aceptada conscientemente (vista publica difiere a F7)
--   - dueno de los seeds -> cliente "casa" = el usuario admin ya existente
-- ============================================================================


-- ============================================================================
-- 1) ALTER TABLE — anadir columnas nuevas a public.negocios
-- ============================================================================
-- 'if not exists' hace el ALTER re-ejecutable sin error si la columna ya existe.

alter table public.negocios
  add column if not exists zona text;

alter table public.negocios
  add column if not exists atiende_es boolean not null default false;


-- ============================================================================
-- 2) CLIENTE "CASA" — la fila en public.clientes del usuario admin
-- ============================================================================
-- negocios.cliente_id es NOT NULL con FK a clientes(id), y clientes(id) es a su vez
-- FK a auth.users(id). Por tanto un negocio NO puede existir sin un cliente dueno
-- que ya tenga usuario en Authentication. Usamos el admin como dueno de los seeds.
--
-- Nota: normalmente esta fila YA existe (el disparador on_auth_user_created la crea
-- al registrarse el usuario, y el bootstrap la marca rol='admin'). El INSERT de abajo
-- es solo una RED DE SEGURIDAD por si no existiera: ON CONFLICT DO NOTHING preserva
-- la fila real (y su rol='admin') si ya esta.
--
-- PASO 2.1 — descubrir el uuid del admin. Ejecuta esta consulta y copia el id:
--   select id, email from auth.users order by created_at;
--
-- PASO 2.2 — sustituye <UUID_ADMIN> por ese uuid y ejecuta el INSERT.
-- Solo 'id' es obligatorio (nombre/email son nullable; rol y creado_en tienen default).
-- Fijamos rol='admin' por claridad; si la fila ya existe, DO NOTHING no la toca.

insert into public.clientes (id, nombre, rol)
values ('<UUID_ADMIN>', 'Casa 305 Ruta Miami', 'admin')
on conflict (id) do nothing;


-- ============================================================================
-- 3) SIEMBRA — 3 charters curados (categoria_id='pesca', activo=true)
-- ============================================================================
-- Solo datos publicos VERIFICADOS. telefono/whatsapp/direccion/lat/lng se dejan NULL
-- (se omiten en el INSERT): no los tenemos confirmados, y "datos reales o nada".
-- Patron 'insert ... select ... where not exists (por nombre)': re-ejecutable sin
-- duplicar (nombre no tiene constraint unique, por eso guard en vez de ON CONFLICT).
-- Recuerda sustituir <UUID_ADMIN> tambien aqui (3 veces).

-- a) Double Threat Charters
insert into public.negocios
  (cliente_id, categoria_id, nombre, zona, descripcion_es, descripcion_en, web, atiende_es, activo, destacado)
select
  '<UUID_ADMIN>', 'pesca', 'Double Threat Charters', 'Miami Beach Marina',
  'Offshore y deep sea: pez vela, mahi, atún y pez espada en el Gulf Stream.',
  'Offshore and deep sea: sailfish, mahi, tuna and swordfish on the Gulf Stream.',
  'https://www.fishmiamicharters.com', false, true, false
where not exists (
  select 1 from public.negocios where nombre = 'Double Threat Charters'
);

-- b) Big Scale Fishing
--    atiende_es=true -> senal publica verificable: sitio web completo en espanol.
insert into public.negocios
  (cliente_id, categoria_id, nombre, zona, descripcion_es, descripcion_en, web, atiende_es, activo, destacado)
select
  '<UUID_ADMIN>', 'pesca', 'Big Scale Fishing', 'Biscayne Bay',
  'Pesca de bahía y flats con capitán local. Ideal para principiantes y familias.',
  'Bay and flats fishing with a local captain. Great for beginners and families.',
  'https://bigscalefishingmiami.com', true, true, false
where not exists (
  select 1 from public.negocios where nombre = 'Big Scale Fishing'
);

-- c) Rising Tide Charters
insert into public.negocios
  (cliente_id, categoria_id, nombre, zona, descripcion_es, descripcion_en, web, atiende_es, activo, destacado)
select
  '<UUID_ADMIN>', 'pesca', 'Rising Tide Charters', 'Government Cut y puentes de Downtown',
  'Especialistas en tarpon y róbalo nocturno en puentes e inlets.',
  'Specialists in night tarpon and snook around bridges and inlets.',
  'https://risingtidecharters.com', false, true, false
where not exists (
  select 1 from public.negocios where nombre = 'Rising Tide Charters'
);


-- ============================================================================
-- 4) VERIFICACION — solo lectura (no modifica nada)
-- ============================================================================
-- 4.1 — Comprobar en SQL que las 3 filas quedaron activas y bien clasificadas:
--   select nombre, zona, atiende_es, activo, categoria_id from negocios;
--
-- 4.2 — Prueba REST equivalente (lo que vera el frontend con el rol anon).
--       Pegar en el navegador anteponiendo la URL del proyecto y la apikey, o probar
--       desde la consola del navegador con fetch. Debe devolver SOLO estas 3 filas:
--   GET /rest/v1/negocios?categoria_id=eq.pesca&activo=eq.true&select=nombre,zona,descripcion_es,descripcion_en,web,atiende_es
--
-- Fin de Fase 4, paso 2.
-- ============================================================================
