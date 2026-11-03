## D&N Labs Landing Page — Second Aesthetic Round

### Completed Changes

1. **Header tone system** — replaced the old `IntersectionObserver`/`is-stuck` with the inverse-tone system:
   - CSS custom properties `--hdr-bg`/`--hdr-fg`/`--hdr-cta-*` on `.site-header`
   - `.site-header.is-dark` toggles to sun/amber values when the section underneath is dark
   - JS probes `document.elementFromPoint(1, header.offsetHeight + 1)` + `closest("[data-tone]")`, throttled with `requestAnimationFrame`
   - **Verified**: light over hero/argumento/estructura/servicios/proceso; dark over trabajo/contacto/footer

2. **"Nueve segundos" section** — replaced small split heading with a block-level statement:
   - `<h2>Una visita dura <em>nueve segundos.</em></em>` with amber `.st-mark` background around the `<em>`
   - Amber `.claims-band` (`#f1eada`) with 3-column `.claims` (carga, acción, mide)
   - Claims wrapped in `<dl class="shell claims">` (fixed invalid HTML — `<dt>`/`<dd>` were orphaned inside `<div>`s)

3. **Stills restructured** — `.still` → `.still-scroll` + `.still-page` with `.s-next` peek clipped by the fold:
   - Each still has page palette via `--page-bg` and peek via `--next-bg`
   - Farola: title + 2 price rows + foot line; Norte: hours row; Méndez: services row
   - Hover scroll rejected (cut the mock's nav); replaced with 4px lift: `@media (hover: hover) and (prefers-reduced-motion: no-preference) { .case:hover .still { transform: translateY(-4px); } }`

4. **Builder panel navy** — switched from amber to navy (`--night`) with:
   - Paper/`--on-night-soft` text
   - Borders `rgba(242,237,227,0.18)`
   - Note/desc in `--on-night-soft`, titles in `--on-night`

### Defects Found & Fixed

- **Invalid HTML**: claims used `<dt>`/`<dd>` inside plain `<div>`s instead of a `<dl>` → wrapped in `<dl class="shell claims">`
- **Mobile CTA padding**: `.nav-cta` lost its padding in the nav → restored `padding: 13px 26px` with `!important` override so it keeps its space when the mobile menu is open

### Verification Results

- 0 horizontal overflow at 1440 and 390px
- 0 console errors
- Tabs switch content; form validation works
- Menu opens with focus on "Trabajo"; Esc closes/unlocks body
- Reduced motion leaves 0 hidden reveals
- Contrast ≥ 6.10 (ink-soft on `#f1eada`), 6.32 (on-night-soft on night), 8.50 (ink on sun)
- No leftovers of `is-stuck`, `logo-256`, or Orbitron

### Files Modified

- `index.html` — manifesto markup (`data-tone`, `.st-mark`, still wrappers + `.s-next`), claims `<dl>` fix
- `style.css` — header tone vars, manifesto/claims, still system, builder navy, responsive rules, mobile CTA fix
- `script.js` — header tone sync replaced old IntersectionObserver

### Next Steps (optional)

- Still peek at tablet width (768px) and whether the 3 claims should stay stacked at ≤980px