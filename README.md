# Post-Training Demo Library

A library of demos showing how NVIDIA partners post-train open models for their own domains, from financial research to legal services, healthcare and beyond.

Start with the "Introduction" page, which introduces a representative four-step post-training workflow:

1. **Evaluate:** measure the base model on a domain-specific taskset or benchmark.
2. **SFT** (Supervised Fine-Tuning): teach the model from example answers.
3. **RL** (Reinforcement Learning): improve it by rewarding better attempts.
4. **Evaluate:** measure the post-trained model against the same data to see improvement.

Navigate to the "Examples" page to view specific partner use-cases and their specific training workflows. 

Finally, navigate to the "CTA" page to get started with post-training, either through NVIDIA's libraries or with our partner ecosystem.

## Run the Demo

You'll need [Node.js](https://nodejs.org/) 20 or later installed.

Run the following two commands, in order:

```bash
npm install
npm run dev
```

Then open the URL that Vite prints (usually http://localhost:5173).

Everything installs from the public npm registry. The first `npm run dev` also downloads Kaizen UI's stylesheets from NVIDIA's public CDN (Content Delivery Network), so you need an internet connection the first time.

### Styles

The UI uses NVIDIA's Kaizen design system through its public package, [`@nvidia/foundations-react-core`](https://www.npmjs.com/package/@nvidia/foundations-react-core). That package ships without styles, so `scripts/fetch-kui-styles.mjs` downloads the matching stylesheets from `https://webassets.nvidia.com/kaizen-ui-foundations/<version>/`. It saves them to `src/generated/kui-styles.css`, which isn't committed to git. The script runs automatically before `npm run dev` and `npm run build`. It downloads again only when the Kaizen version changes, and it falls back to the saved copy if you're offline.

> [!NOTE]
> This project uses Kaizen's `base.css`, which includes the NVIDIA Sans font and NVIDIA's icons. Kaizen's documentation says `base.css` is only for NVIDIA-licensed projects. Projects outside that should switch the script to `base-external.css`, which uses web-safe fonts.

## What's in the app

| Page | URL | Contents |
| --- | --- | --- |
| Examples | `/` | Clickable examples, containing details about partner post-training use cases. Each contains a diagram of the partner's post-training workflow, and a before-after comparison of their model. |
| Examples sub-page | `/examples/<id>` | One sub-page of Examples per use case: the pipeline for one partner, with hover popovers and the partner's logo. |
| Introduction | `/introduction` | A representative post-training pipeline. |
| CTA | `/cta` | Call to action: How to get started with post-training. |

## Contributing a new use case

Everything for a use case lives in its own folder under `src/examples/`. To add an additional partner use-case, create a new folder according to the following specifications:

### Where the files go

```
src/
  examples/
    index.ts                ← list of all use cases (add yours here)
    types.ts                ← every field a use case can set, with comments
    financial-research/     ← descriptively named folder containing all use-case details 
      index.ts              ← title, description, logos, page settings
      popovers.ts           ← text and positions of the hover popovers
      card.png              ← image to appear on the card in the Examples page
      logos/                ← partner logo (SVG preferred)
    <your-use-case>/
      ...same structure
  diagrams/                 ← shared Eval / SFT / RL / Eval diagrams
  components/               ← app code: top bar, step flow, diagrams and popovers
  pages/                    ← app code: the main pages (Examples, Introduction, CTA) and use-case template page
```

Only change files in `src/examples/`.

### Steps

1. **Create the folder.** Create `src/examples/<your-id>/`. Use a short, lowercase, hyphenated ID such as `drug-discovery`; it becomes the page URL.
2. **Add your assets.** Replace `card.png` (shown 220px tall; about 2400px wide works well) and the files in `logos/`.
3. **Fill in `index.ts`.** Set the `id`, `title`, one-sentence `description` and `partnerLogos`, including each logo's display size in px. `src/examples/types.ts` documents every field.
4. **Register it.** Import it in `src/examples/index.ts` and add it to the `examples` list. The list order is the order on the Examples page and in the Examples menu.

Your use case now has a card and an entry in the Examples menu. To give it a detail page:

5. **Turn on the page.** Set `hasPage: true`. Its page will be at `/examples/<your-id>`.
6. **Add page branding** (optional). Set `pageLogos` to show the partner's logo at the top left of the page.
7. **Add popovers** (optional). Copy `financial-research/popovers.ts` as a starting point and import it in your `index.ts`. Each popover sets:
   - its position over the diagram, in diagram pixels (the shared diagrams are 848px wide);
   - a title and body text;
   - a width;
   - optionally, which side of the diagram part it opens on.
8. **Use your own diagram** (optional). If a step needs a partner-specific diagram, write it as a React component and set `diagrams`. Steps you don't override use the shared diagrams. See `src/diagrams/sft.tsx` for an example built from the helpers in `src/diagrams/primitives.tsx` (`Box`, `Arrow`, `Line`, `Label`, `Badge`, `Dataset`).
   ```ts
   import { MyDiagram } from './my-diagram'
   // ...
   diagrams: { sft: { Component: MyDiagram, width: 848, height: 314 } },
   ```

9. **Use different steps** (optional). If a use case doesn't follow Eval, SFT, RL, Eval (for example, an embedding model with a single contrastive fine-tuning step), set `steps` to the list of steps to show, and give any step that has no shared diagram its own entry in `diagrams`. See `src/examples/legal-services/` for an example.

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
- The diagrams are React components that draw SVG, so they're edited in code and their text uses the NVIDIA Sans font.
- Moving between pipeline steps uses the browser's View Transitions API to expand a collapsed step into the open card. Browsers without it switch instantly.
