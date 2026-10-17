# Observations of Nature

A quiet home for your paintings. All 16 supplied photographs are included. The site can be updated by talking to Codex or Claude; there is no dashboard to learn or subscription to maintain.

## Open the website locally

Open this folder in your coding agent and say: **“Start my website and show me the preview.”**

For someone using a terminal, install Node 24 LTS, open this folder, then run:

```sh
npm ci
npm run dev
```

Visit **http://127.0.0.1:4321**. Changes appear automatically. Press Ctrl+C in the terminal to stop it.

The existing Windows system Node is older. Codex has a compatible Node 24 already, so on this computer you can start the site without changing any installed software:

```powershell
cd C:\Users\shubh\Downloads\MA_Art
$env:Path = 'C:\Users\shubh\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;' + $env:Path
& 'C:\Users\shubh\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' '.\node_modules\astro\bin\astro.mjs' dev --host 127.0.0.1
```

## Things you can ask your agent

- “Add this painting to my gallery. It is called Monsoon, painted in 2026, acrylic on canvas, 24 × 36 inches.”
- “Change my About page to say: …”
- “Make this painting featured on the homepage.”
- “Mark this painting as sold.”
- “Move Blue flowers before Golden daisies.”
- “Show me the changes on my phone-sized screen before we publish.”

Give the agent the new photo and any details you know. It needs to add one image and one small artwork file. The gallery and individual page update automatically. The original photographs are kept intact; the site makes smaller copies for visitors to load quickly. You can also ask “Trim the extra background around this painting” or “Undo the crop”: framing is saved in the artwork's small content file, so it is easy to reverse.

## What to personalise next

1. Give the paintings their real titles. The current titles describe what is visible and are marked as provisional.
2. Add your artist name and a short biography in your own words.
3. Choose a public contact email (and optionally Instagram).
4. Add dates, materials, sizes and availability when you know them.

No dates, prices, painting materials or biography have been guessed. Photo dates have not been used as painting dates. Seven photographs have tighter display framing at your request. The photo files remain untouched, and “Open full photograph” shows the complete view. The single blue flower is photographed at an angle; some fabric remains visible so that its painted stem is not cut away.

## Where things live

| What you want to change | File or folder |
| --- | --- |
| Name, homepage words, email and Instagram | `src/content/site.json` |
| About text | `src/content/pages/about.md` |
| Painting titles and other details | `src/content/artwork/` |
| Artwork photographs | `src/assets/artwork/` |
| Instructions for your agent | `AGENTS.md` (also linked from `CLAUDE.md`) |

The real paintings are in the gallery. Clearly labeled sample files in `examples/` are for testing only and never appear on the website.

## Save, check, and publish updates

The project uses Git so changes can be reviewed and saved in history.

- **Website:** [Observations of Nature](https://shubhamx64.github.io/observations-of-nature/)
- **Public source:** [shubhamx64/observations-of-nature](https://github.com/shubhamx64/observations-of-nature)
- **Publishing status:** [GitHub Actions](https://github.com/shubhamx64/observations-of-nature/actions/workflows/deploy.yml)

Before approving a change, ask the agent to run **`npm run build`** and show you the result. This checks the content and creates the finished website in `dist/`. **`npm run preview`** shows that finished build locally.

You can say: **“Make this change, show me the preview, and publish it to my website.”** Once you approve the result, the agent commits and pushes it to `main`. GitHub then checks, builds, and publishes the update automatically. The Actions link above shows whether publishing succeeded. Local edits alone do not change the public website.

### Hosting details

The included workflow `.github/workflows/deploy.yml` publishes pushes to `main`. GitHub Pages uses **GitHub Actions** as its publishing source. The workflow reads the correct address and repository subfolder automatically; no manual URL edits are needed for each update.

The same site can also be hosted on Cloudflare Pages, Netlify, Vercel, or another static host. Use Node 24, the build command `npm run build`, and output folder `dist`. Set the host's `SITE_URL` environment variable to the public origin before building; this activates canonical links, search indexing, the sitemap, and artwork structured data. Set `BASE_PATH` if the site lives in a subfolder (otherwise use `/`).

You can use another account or a custom domain later without rewriting page links. A new GitHub repository needs **Settings → Pages → GitHub Actions** enabled before running the workflow.

There is no deploy key or token to store in this project. GitHub Actions uses its built-in token for deployment. On another computer, sign in with `gh auth login` using an account with permission to update this repository. Never paste a token into a content file or chat.

The initial publication was authorized with provisional painting titles and pending artist/contact details; these can be updated when ready. There is no shopping cart, payment service, tracking, or backend. Those can be considered separately if you later want to sell work online.
