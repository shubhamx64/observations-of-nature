# Observations of Nature — guide for coding agents

This is an artist's portfolio, maintained by its owner through natural-language requests to Codex or Claude. Make the requested change, explain it simply, and keep the code small enough for another agent to understand years from now.

## Architecture and commands

- Astro 7, static HTML, TypeScript where it helps, plain CSS. No UI framework, database, authentication, CMS, or backend.
- Node 24 LTS is recommended (Astro requires at least 22.22). `npm ci` installs the exact lockfile.
- `npm run dev` starts the local site at http://127.0.0.1:4321.
- `npm run build` runs Astro's type/content checks and creates `dist/`.
- `npm run preview` serves the production output. Never edit `dist/` directly.
- Set `SITE_URL` to the real public origin before a hosted build. Without it, pages deliberately carry `noindex`, robots disallows indexing, and the sitemap is empty. No fake domain is used.
- This computer also has Node 24 bundled with Codex. If the system's Node is too old, see README for the exact local command. Do not silently change the system runtime.
- Deployment is portable: any static host can build with `npm ci` and `npm run build` and publish `dist/`. No provider SDK or adapter is required. `BASE_PATH` optionally supplies a subpath, such as `/observations-of-nature`; it defaults to `/`.
- `.github/workflows/deploy.yml` builds and deploys pushes to `main` through GitHub Pages. It reads the site origin and subpath from `actions/configure-pages`, so it works with project URLs and custom domains without hardcoded usernames. Enable Settings → Pages → GitHub Actions on the chosen repository before its first run.
- The public repository is `https://github.com/shubhamx64/observations-of-nature`, and the website is `https://shubhamx64.github.io/observations-of-nature/`. The user authorized this initial publication on 17 October 2026. Pushes to `main` automatically publish, so preview and build future changes before pushing, and publish when the user's request authorizes it. Do not create a new account.

## Files that matter

| Path | Purpose |
| --- | --- |
| `src/content/site.json` | Site title, artist name, homepage words, public email and Instagram |
| `src/content/pages/about.md` | About text; ordinary Markdown |
| `src/content/artwork/*.md` | One record per painting; filename becomes its permanent URL |
| `src/assets/artwork/` | Unmodified source photographs, with readable filenames |
| `src/content.config.ts` | Artwork schema and defaults |
| `src/lib/artwork.ts` | Collection sorting, draft exclusion, URL and alt helpers |
| `src/components/ArtworkImage.astro` | Shared responsive image pipeline |
| `src/components/ArtworkFrame.astro` | Reversible, per-painting display crop; never edits the photo |
| `src/lib/url.ts` | `sitePath()` for links that work at the domain root or a repository subpath |
| `src/pages/` | Home, Gallery, artwork, About, Contact, 404, sitemap and robots |
| `src/styles/global.css` | Small design system and responsive layouts |
| `examples/` | Explicit sample metadata and aspect-ratio fixtures, never published |

## Adding a painting

1. Copy the supplied photograph into `src/assets/artwork/` with a readable unique filename. Preserve its bytes. Keep the incoming original too.
2. Create `src/content/artwork/a-stable-slug.md`. Copy `examples/artwork.md.example` or an existing record. At minimum provide `title` and an `image` path relative to the Markdown file.
3. Write useful `alt` text describing what is actually visible. Do not guess the medium, date, dimensions, provenance, artist's intent, price, or availability.
4. Set `displayOrder` if a particular position was requested. Smaller numbers appear first. Ties sort by filename. Set `featured: true` for the homepage; the first featured work is the hero and the next three form Selected works. If no work is featured, the first four are shown.
5. Run `npm run build`, then inspect the gallery and new artwork page at narrow and wide widths.

The gallery, category filters, artwork URLs, previous/next links and sitemap update automatically. Never add a painting directly to a page template. `draft: true` hides a record everywhere. The About page uses `blue-flowers` as an illustration with a safe fallback; this is the only intentional editorial image choice outside the featured sequence.

## Editing metadata

Edit the relevant Markdown frontmatter. Optional fields: `alt`, `crop`, `year`, `medium`, `dimensions`, `description`, `category`, `additionalImages`, `available`, `price`, `featured`, `displayOrder`, `provisionalTitle`, `draft`. Markdown below the frontmatter is optional longer text. Missing metadata is omitted from the page; do not fill empty fields with invented values.

- Rename the title without renaming the file, preserving existing URLs.
- Feature/unfeature with `featured: true` / `false` and adjust `displayOrder` if needed.
- Mark sold with `available: false`; this displays Sold and suppresses the price. Missing `available` means unknown, not sold.
- Use a complete price string including currency, e.g. `price: "USD 250"`. Display requires `available: true`.
- Additional photographs use `additionalImages: [{ image: "../../assets/artwork/detail.jpg", alt: "..." }]`.
- Replace a descriptive placeholder title with the artist's title and set `provisionalTitle: false`.

All 16 initial images are real supplied photographs. Their filenames in the workspace are recorded in comments in each artwork file. All initial titles are provisional visual descriptions. Dates in incoming photo filenames are NOT evidence of when a painting was made. No medium, dimensions, price or availability has been asserted.

## About and Contact

Edit `src/content/pages/about.md` for the biography. The artist's own biography is still a clearly marked placeholder. Edit `src/content/site.json` for the public email, Instagram, artist name and homepage copy. Empty contact fields produce an honest pending state; never invent contact details or add a nonfunctional form. An email automatically enables the contact link and painting-specific mailto enquiries. `artistName` also supplies the copyright and structured-data creator when known.

## Image rules — preserve these invariants

- Never modify existing source artwork images unless explicitly requested.
- Never add or change a crop without explicit permission. On 17 October 2026, the user requested modest cropping. Seven artwork records now have approved `crop: { x, y, width, height }` rectangles in original-image pixels; leave these in place unless asked to change them. Removing the field restores the complete photograph. There are no cropped asset copies to maintain.
- `ArtworkFrame.astro` applies the approved rectangle consistently on Home, Gallery, About, detail pages and the enlarged viewer. The separate “Open full photograph” link deliberately shows the complete image. Social preview images also retain the whole photograph.
- Preserve pixel proportions and the selected rectangle's aspect ratio. No generic fixed-ratio crops, `object-fit: cover`, colour correction, saturation, filters, AI retouching, or decorative overlays over paintings. Avoid cutting petals, leaves, stems or signatures. The angled single blue flower still includes surrounding fabric because a rectangular trim would cut the painted stem; do not silently retouch it.
- Astro produces responsive WebP/JPEG derivatives at quality 90 without changing source files. Dimensions are capped at source width; do not upscale. Detail pages provide a full-dimension JPEG at quality 95, loaded into a native accessible dialog on demand. It is a viewing derivative, not a promise of original download bytes.
- Hero/above-fold images load eagerly; the rest lazily. Always include intrinsic width/height and meaningful alt text or the existing title fallback.
- Keep the reusable image component as the single image policy. Do not add an image SaaS.

## Design and quality

The paintings supply the colour. Preserve warm ivory, restrained botanical green, system serif/sans typography, fine rules, whitespace and quiet interactions. No template sections, gradients, unnecessary boxes, animations, or extra dependencies. The small scripts only enhance gallery filters and the image dialog; content and links must work without JavaScript.

Use `sitePath('/gallery/')` (or `artworkUrl()`) for internal links. Never hardcode a root-relative page or favicon URL in templates. Astro handles imported image and CSS URLs. Test a build with `SITE_URL=https://example.github.io` and `BASE_PATH=/portfolio` when changing routing; check sitemap/canonical URLs as well as navigation. The Pages workflow supplies these values automatically. A subpath `robots.txt` cannot control an entire github.io origin, so preserve per-page robots metadata for unconfigured previews.

Keep semantic headings, visible focus, keyboard-operable links/buttons, native dialog Escape/focus handling, the skip link, useful alt text and reduced-motion support. Keep the gallery's DOM order consistent with visual order; do not replace it with CSS columns.

Prefer deleting complexity to introducing abstractions. Do not add backend infrastructure or commerce without a concrete new requirement. Future checkout links can sit beside `available` and `price` without changing this portfolio's content model.

Run `npm run build` before considering a change complete. For visual or interaction changes, check desktop and mobile, image proportions, filters, keyboard navigation and the full-image dialog. Sample PNG rectangles (with SVG sources) in `examples/aspect-ratios/` exist only to test portrait/landscape/square rendering; never present them as the artist's work. The photo pipeline accepts raster photographs such as JPEG, PNG and WebP; do not use SVG as an artwork photograph. Avoid tests that merely mirror implementation. Keep the README understandable to a non-programmer.
