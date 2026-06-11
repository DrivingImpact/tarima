# Instagram launch kit — @tarimafreestyle

Account creation needs a phone, so that part is manual:
app → sign up with email → handle `tarimafreestyle` → if taken, fallbacks in
order: `tarima.freestyle`, `tarimaapp`, `entrenaentarima`.
Set category **App page**, switch to a professional (creator) account for insights.

## Profile

- **Name** (searchable, separate from handle): `Tarima · Freestyle y Rimas`
- **Bio** (dialect-neutral, 150 chars max):

```
Entrenar freestyle con beats de verdad 🎤
Palabras al ritmo, barra a barra
Sin cuentas · sin anuncios
⬇️ Gratis en Android y web
```

- **Link**: https://tarima-tau.vercel.app
- **Profile photo**: `public/icon-1024.png` (already 1:1, reads well small)

## Launch grid — 9 posts, `post-01.png` … `post-09.png`

Post in REVERSE order (09 first, 01 last) so the grid reads top-left = launch
announcement when someone visits the profile. All captions avoid tú/vos forms.

| # | Image | Caption |
|---|---|---|
| 09 | CTA "Subir a la tarima" | El escenario está listo. Tarima ya se puede descargar gratis: link en bio. 🎤 #freestyle #rap #freestylerap |
| 08 | Cuatro niveles | De rimas simples a vocabulario extremo. Cada sesión sube el listón un poco más. ¿Hasta qué nivel se puede llegar? |
| 07 | Sin cuentas/anuncios/datos | Sin cuentas. Sin anuncios. Sin recopilar datos personales. Todo el progreso queda guardado en el dispositivo. Así de simple. |
| 06 | Diccionario de rimas | ¿Bloqueo con una palabra? Buscar y ver toda su familia de rimas, consonantes y asonantes. El diccionario que faltaba para entrenar. |
| 05 | "Calle" al ritmo | La palabra cae justo en el beat. El pentagrama animado marca cada barra para que el flow nunca se pierda. |
| 04 | Esquemas de rima | Pareada, cruzada, abrazada, monorrima. Cuatro esquemas para entrenar estructuras distintas. ¿Cuál es la favorita? |
| 03 | Cómo funciona 01-02-03 | Elegir un beat. Elegir dificultad y esquema. Empezar a rapear. Tres pasos y la sesión está en marcha. |
| 02 | Qué es Tarima | Tarima es entrenamiento de freestyle que cabe en el bolsillo: beats reales que marcan el compás y palabras que aparecen al ritmo. |
| 01 | TARIMA ya disponible | Donde nace el freestyle. Ya disponible, gratis, en Android y web. Link en bio. 🔥 #freestyle #rapenespañol #improvisación #fyp |

Hashtag pool (rotate 3-5 per post, not all at once): #freestyle #freestylerap
#rapenespañol #improvisación #batallasdegallos #rimas #hiphopespañol #mc
#beats #boombap

## After launch

- Stories: screen recording of a session (beat + palabra cambiando) is the
  single highest-value content; pin it as highlight "Cómo funciona".
- Reels > static posts for reach: the app IS audiovisual, record real sessions.
- The source HTML for these posts is `grid.html`; edit + re-render with
  Playwright for future posts so the grid stays on-brand.
