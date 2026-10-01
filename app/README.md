# La Luma website (Angular)

One-page site for La Luma, Sorsogon City. Implements the Claude Design handoff in `../project/La Luma.dc.html`.

```bash
npm install
npm start        # dev server on http://localhost:4200
npm run build    # production build in dist/la-luma/browser
```

- `src/app/site.config.ts`: parallax strength, image-switcher autoplay and interval, main phone number
- `src/app/parallax.directive.ts`: `[appParallax]="speed"`, one shared rAF scroll loop; turned off for `prefers-reduced-motion`
- `src/app/site-header/`: fixed nav that turns solid after scrolling, with a MENU panel below 860px
- `src/app/image-switcher/`: "Inside La Luma" slides with arrows, thumbnails and autoplay that pauses on hover
- `src/app/app.html`: hero, intro, services, asin tibuok, hours band, visit/footer
- `public/images/`: photos from the design bundle
