# D&N Labs Landing Page — Final Summary

## All Changes Completed

### 1. Header tone system (inverse of section underneath)
- Replaced `IntersectionObserver`/`is-stuck` with CSS custom properties `--hdr-bg`/`--hdr-fg`/`--hdr-cta-*`
- `.site-header.is-dark` toggles when `elementFromPoint(1, header.offsetHeight + 1)` detects a `[data-tone="dark"]` section underneath
- **Verified**: light over hero/argumento/estructura/servicios/proceso; dark over trabajo/contacto/footer

### 2. "Nueve segundos" section
- Block statement: `Una visita dura <em>nueve segundos.</em>` with amber `.st-mark` background
- 3-column `.claims` under `<dl class="shell claims">` (fixed invalid HTML — `<dt>`/`<dd>` were orphaned inside `<div>`s)
- Amber `.claims-band` (`#f1eada`)

### 3. Still miniature landing pages
- `.still` → `.still-scroll` + `.still-page` with `.s-next` peek clipped by the fold
- Page palette via `--page-bg`, peek via `--next-bg`
- Hover: 4px lift `@media (hover: hover) and (prefers-reduced-motion: no-preference)` (replaced scroll that cut the mock's nav)
- Case palettes: Farola (navy/amber), Norte (light/blue), Méndez (dark/gold)

### 4. Builder panel navy
- Background `var(--night)`, text `var(--on-night)`, borders `rgba(242,237,227,0.18)`
- Note/desc in `var(--on-night-soft)`, titles in `var(--on-night)`

### 5. Two quality-of-life fixes
- **Ampersand**: `font-feature-settings: "liga" 0, "rlig" 0;` on `.brand-name` to normalize the Playfair Display "&" swash (avoids the cursive-E appearance)
- **Right-side empty space**: `.case` gap 20px→12px, `.work` gap `clamp(28px,3.4vw,52px)`→`clamp(20px,3vw,36px)`

### Verification Results (both viewports)
- 0 horizontal overflow at 1440 and 390px
- 0 console errors
- Tabs switch, form validation works, menu opens with focus on "Trabajo", Esc closes/unlocks body
- Reduced motion: 0 hidden reveals
- Contrast: 6.10 (ink-soft on `#f1eada`), 6.32 (on-night-soft on night), 8.50 (ink on sun)
- No leftovers of `is-stuck`, `logo-256`, or Orbitron

### Files Modified
- `index.html` — manifesto markup, `data-tone`, `.st-mark`, still wrappers + `.s-next`, claims `<dl>` fix
- `style.css` — header tone vars, manifesto/claims, still system, builder navy, responsive rules, mobile CTA fix, ligature disable, gap reductions
- `script.js` — header tone sync replaced old IntersectionObserver

### Optional Next Steps
- Still peek at tablet width (768px) and claims stacking at ≤980px
- Commit when ready (`git status`: modified `index.html`, `style.css`, `script.js`; untracked `.atl/`, `assets/`, `REPORT.md`, `FINAL-SUMMARY.md`)