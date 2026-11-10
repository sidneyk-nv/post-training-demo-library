# Post-Training Demo Library

A library of demos showing how NVIDIA partners post-train open models for their own domains, from financial research to legal services, healthcare and beyond.

Each demo walks through parts of the post-training pipeline including:

1. **Eval:** measure the base model on the partner's task.
2. **SFT** (supervised fine-tuning): teach the model from example answers.
3. **RL** (reinforcement learning): improve it by rewarding better attempts.
4. **Eval (pt. 2):** measure the post-trained model again.

Each step is shown as an interactive diagram. Hovering over a part of a diagram shows a real example from the partner's work, such as a training question, a grading rubric or the model that was used.

## Getting started

You need [Node.js](https://nodejs.org/) 20 or later.

```bash
npm install
npm run dev
```

Then open the URL that Vite prints (usually http://localhost:5173).

Everything installs from the public npm registry. The first `npm run dev` or `npm run build` also downloads Kaizen UI's stylesheets from NVIDIA's public CDN (see [Styles](#styles)), so you need an internet connection the first time.

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the dev server with hot reload |
| `npm run build` | Type-checks and builds the static site into `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint |

### Styles

The UI uses NVIDIA's Kaizen design system through its public package, [`@nvidia/foundations-react-core`](https://www.npmjs.com/package/@nvidia/foundations-react-core). That package ships without styles, so `scripts/fetch-kui-styles.mjs` downloads the matching stylesheets from `https://webassets.nvidia.com/kaizen-ui-foundations/<version>/`. It saves them to `src/generated/kui-styles.css`, which isn't committed to git. The script runs automatically before `npm run dev` and `npm run build`. It downloads again only when the Kaizen version changes, and it falls back to the saved copy if you're offline.

To upgrade Kaizen, update `@nvidia/foundations-react-core` and `@nvidia/foundations-tailwind-plugin` to the same version. The next `npm run dev` fetches the matching styles.

> [!NOTE]
> This project uses Kaizen's `base.css`, which includes the NVIDIA Sans font and NVIDIA's icons. Kaizen's documentation says `base.css` is only for NVIDIA-licensed projects. Projects outside that should switch the script to `base-external.css`, which uses web-safe fonts.

## What's in the app

| Page | URL | Contents |
| --- | --- | --- |
| Examples | `/` | One card per demo. Cards for demos with a detail page are clickable. |
| Introduction | `/introduction` | The general post-training pipeline, without partner-specific details. |
| Demo detail | `/examples/<id>` | The pipeline for one partner, with hover popovers and the partner's logo. Live so far: `/examples/financial-research` (Samaya). |
| CTA | `/cta` | Placeholder; not designed yet. |

On the Introduction and demo pages, add `?stage=eval`, `sft`, `rl` or `eval-2` to the URL to open a specific step. The **Results** tab is a placeholder for now.

## Contributing a new use case

Everything for a use case lives in its own folder under `src/examples/`. The pages and components never refer to a specific use case; they read whatever the folders provide. So adding a demo means adding a folder, not editing app code.

### Where the files go

```
src/
  examples/
    index.ts                ← list of all use cases (add yours here)
    types.ts                ← every field a use case can set, with comments
    financial-research/     ← a complete example to copy
      index.ts              ← title, description, logos, page settings
      popovers.ts           ← text and positions of the hover popovers
      card.png              ← image on the Examples grid
      logos/                ← partner logos (SVG preferred)
    <your-use-case>/
      ...same structure
  diagrams/                 ← shared Eval / SFT / RL / Eval (pt. 2) diagrams
  components/               ← app code: top bar, step flow, diagrams and popovers
  pages/                    ← app code: Examples grid, pipeline page, placeholder
```

You should only need to change files in `src/examples/`.

### Steps

1. **Create the folder.** Copy `src/examples/healthcare/` (a card-only use case) or `src/examples/financial-research/` (a full demo page) to `src/examples/<your-id>/`. Use a short, lowercase, hyphenated ID such as `drug-discovery`; it becomes the page URL.
2. **Add your assets.** Replace `card.png` (shown 220px tall; about 2400px wide works well) and the files in `logos/`.
3. **Fill in `index.ts`.** Set the `id`, `title`, one-sentence `description` and `partnerLogos`, including each logo's display size in px. `src/examples/types.ts` documents every field.
4. **Register it.** Import it in `src/examples/index.ts` and add it to the `examples` list. The list order is the order on the Examples page and in the Examples menu.

Your use case now has a card and an entry in the Examples menu. To give it a detail page:

5. **Turn on the page.** Set `hasPage: true`. Its page will be at `/examples/<your-id>`.
6. **Add page branding** (optional). Set `pageLogos` to show the partner's logo at the bottom of the page.
7. **Add popovers** (optional). Copy `financial-research/popovers.ts` as a starting point and import it in your `index.ts`. Each popover sets:
   - its position over the diagram, in diagram pixels (the shared diagrams are 848px wide);
   - a title and body text;
   - a width;
   - optionally, which side of the diagram part it opens on.
8. **Use your own diagram** (optional). If a step needs a partner-specific diagram, add the SVG to your folder and set `diagrams`. Steps you don't override use the shared diagrams.
   ```ts
   import sftSvg from './sft.svg?raw'
   // ...
   diagrams: { sft: { svg: sftSvg, width: 848, height: 314 } },
   ```

Then run `npm run dev` and check your card, the Examples menu, your page and each popover.

### Before opening a pull request

```bash
npm run lint
npm run build
```

Both should pass with no errors.

## Tech stack

- [React](https://react.dev/) 19, [TypeScript](https://www.typescriptlang.org/) and [Vite](https://vite.dev/).
- [React Router](https://reactrouter.com/) for pages.
- NVIDIA Kaizen UI ([`@nvidia/foundations-react-core`](https://www.npmjs.com/package/@nvidia/foundations-react-core)) for components such as the top bar, tabs, menu and popovers, with its stylesheets from NVIDIA's CDN.
- [Tailwind CSS](https://tailwindcss.com/) v4 with Kaizen's Tailwind plugin ([`@nvidia/foundations-tailwind-plugin`](https://www.npmjs.com/package/@nvidia/foundations-tailwind-plugin)) for styling.
- `@nvidia/react-gui-icons` for icons.
- The diagrams are SVGs exported from the project's Figma designs, with text kept as live text so it renders in the NVIDIA Sans font.
- Moving between pipeline steps uses the browser's View Transitions API to zoom between the small and large cards. Browsers without it switch instantly.
