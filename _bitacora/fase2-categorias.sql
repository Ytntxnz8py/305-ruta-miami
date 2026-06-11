-- ============================================================================
-- 305 RUTA MIAMI — Fase 2: cluster nautico arriba + categorias nuevas ocultas
-- ============================================================================
-- Ejecutar en el SQL Editor de Supabase. IDEMPOTENTE: se puede correr varias veces.
-- Estado final esperado (de arriba a abajo):
--   1 pesca · 2 renta-botes (oculta) · 3 jetski (oculta) ·
--   4 playa · 5 buceo · 6 exploracion · 7 bares-restaurantes
-- renta-botes y jetski nacen activo=false: se venden a anunciantes ya, pero no
-- se muestran como categoria de destino al visitante hasta tener contenido.
-- ============================================================================

-- 1) Categorias nuevas del cluster nautico (ocultas hasta tener contenido).
insert into public.categorias (id, nombre_es, nombre_en, orden, activo) values
  ('renta-botes', 'Renta de Botes', 'Boat Rentals', 2, false),
  ('jetski',      'Jet Ski',        'Jet Ski',      3, false)
on conflict (id) do nothing;

-- 2) Reordenar el conjunto completo (updates idempotentes: fijan el orden final).
update public.categorias set orden = 1 where id = 'pesca';
update public.categorias set orden = 2 where id = 'renta-botes';
update public.categorias set orden = 3 where id = 'jetski';
update public.categorias set orden = 4 where id = 'playa';
update public.categorias set orden = 5 where id = 'buceo';
update public.categorias set orden = 6 where id = 'exploracion';
update public.categorias set orden = 7 where id = 'bares-restaurantes';

-- Verificacion:
-- select id, nombre_es, nombre_en, orden, activo from public.categorias order by orden;
