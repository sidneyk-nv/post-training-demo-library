/**
 * Downloads Kaizen UI's stylesheets from NVIDIA's public web-assets CDN.
 *
 * `@nvidia/foundations-react-core` ships unstyled; its README asks apps to load
 * the matching CSS from the CDN. This script saves it to
 * `src/generated/kui-styles.css` (git-ignored), pinned to the installed
 * package version. Runs automatically before `npm run dev` and `npm run build`.
 *
 * We use `base.css`, which includes the NVIDIA Sans font and NVIDIA icons.
 * Kaizen's README says `base.css` is only for NVIDIA-licensed projects;
 * `base-external.css` is the alternative with web-safe fonts.
 */
import { mkdir, readFile, writeFile, access } from 'node:fs/promises'

const OUT_DIR = 'src/generated'
const OUT_FILE = `${OUT_DIR}/kui-styles.css`
const FILES = ['base.css', 'components.css']

const { version } = JSON.parse(
  await readFile('./node_modules/@nvidia/foundations-react-core/package.json', 'utf8'),
)
const cdn = `https://webassets.nvidia.com/kaizen-ui-foundations/${version}`
const header = `/* Kaizen UI ${version} styles, downloaded from ${cdn} by scripts/fetch-kui-styles.mjs. Do not edit. */`

// Skip the download if the saved file already matches the installed version.
try {
  if ((await readFile(OUT_FILE, 'utf8')).startsWith(header)) process.exit(0)
} catch {
  // Not downloaded yet.
}

try {
  const parts = await Promise.all(
    FILES.map(async (file) => {
      const res = await fetch(`${cdn}/${file}`)
      if (!res.ok) throw new Error(`${file}: HTTP ${res.status}`)
      return `/* --- ${file} --- */\n${await res.text()}`
    }),
  )
  await mkdir(OUT_DIR, { recursive: true })
  await writeFile(OUT_FILE, `${header}\n${parts.join('\n\n')}`)
  console.log(`Saved Kaizen UI ${version} styles to ${OUT_FILE}`)
} catch (error) {
  const haveOldCopy = await access(OUT_FILE).then(() => true, () => false)
  if (haveOldCopy) {
    console.warn(`Couldn't update Kaizen UI styles (${error.message}); using the saved copy.`)
  } else {
    console.error(`Couldn't download Kaizen UI styles from ${cdn} (${error.message}).`)
    console.error('An internet connection is needed the first time you run the app.')
    process.exit(1)
  }
}
