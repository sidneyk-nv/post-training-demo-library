import { Text } from '@nvidia/foundations-react-core'
import partner1 from './cta/partner-1.png'
import partner2 from './cta/partner-2.png'
import partner3 from './cta/partner-3.png'
import partner4 from './cta/partner-4.png'
import partner5 from './cta/partner-5.png'

/**
 * Call to action: get started with post-training, either through NVIDIA's
 * libraries or with a partner.
 */

/** Partners, on the left. 
 * Replace sample logos with real SVG logo files in `src/pages/cta/`*/
const partners: { name: string; logo: string; href?: string }[] = [
  { name: 'Partner 1', logo: partner1 },
  { name: 'Partner 2', logo: partner2 },
  { name: 'Partner 3', logo: partner3 },
  { name: 'Partner 4', logo: partner4 },
  { name: 'Partner 5', logo: partner5 },
]

/**
 * Resources, on the right. Write the sentence in `text`, then put the part
 * that should be a green link in `link` (it must appear in `text`).
 */
const resources: { text: string; link: string; href: string }[] = [
  {
    text: 'Get started post-training Nemotron models with Nemotron Training Recipes',
    link: 'Nemotron Training Recipes',
    href: 'https://docs.nvidia.com/nemotron/nightly/index.html',
  },
  {
    text: 'Fine-tune Hugging Face models at scale with NeMo Automodel',
    link: 'NeMo Automodel',
    href: 'https://docs.nvidia.com/nemo/automodel/nightly',
  },
  {
    text: 'Run reinforcement learning on your own tasks with NeMo RL',
    link: 'NeMo RL',
    href: 'https://docs.nvidia.com/nemo/rl/0.7.0/index.html',
  },
  {
    text: 'Build and scale RL training environments with NeMo Gym',
    link: 'NeMo Gym',
    href: 'https://docs.nvidia.com/nemo/gym/about/',
  },
]

export function CtaPage() {
  return (
    <div className="flex flex-1 px-12 pt-8 pb-12">
      <div className="grid w-full grid-cols-1 md:grid-cols-[1fr_auto_1fr]">
        {/* Partner ecosystem */}
        <section aria-labelledby="cta-partners" className="flex flex-col items-center justify-center gap-12 p-12">
          <Heading id="cta-partners">Get started with our partner ecosystem</Heading>
          <div className="flex h-48 items-center justify-center">
            <ul className="m-0 flex max-w-2xl list-none flex-wrap items-center justify-center gap-x-14 gap-y-10 p-0">
              {partners.map((partner) => (
                <li key={partner.name}>
                  <PartnerLogo partner={partner} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="hidden self-stretch border-l border-base md:block" aria-hidden />

        {/* NVIDIA libraries */}
        <section aria-labelledby="cta-libraries" className="flex flex-col items-center justify-center gap-12 p-12">
          <Heading id="cta-libraries">Get hands-on with NVIDIA post-training libraries</Heading>
          <div className="flex h-48 items-center justify-center">
            <ul className="m-0 flex w-fit list-disc flex-col gap-5 pl-6 text-left text-secondary marker:text-[#76B900]">
              {resources.map((resource) => (
                <li key={resource.href}>
                  <Text kind="body/regular/lg">
                    <ResourceText resource={resource} />
                  </Text>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

/** Section heading. Two lines tall so both halves line up whichever one wraps. */
function Heading({ id, children }: { id: string; children: string }) {
  return (
    <Text kind="title/lg" asChild className="m-0 flex min-h-[4.5rem] max-w-sm items-center text-center text-balance">
      <h2 id={id}>{children}</h2>
    </Text>
  )
}

function PartnerLogo({ partner }: { partner: (typeof partners)[number] }) {
  const img = <img src={partner.logo} alt={partner.name} className="h-10 w-auto opacity-80" />
  return partner.href ? <a href={partner.href}>{img}</a> : img
}

/** The resource's sentence, with its `link` part as a green link. */
function ResourceText({ resource }: { resource: (typeof resources)[number] }) {
  const start = resource.text.indexOf(resource.link)
  if (start === -1) return <>{resource.text}</>
  return (
    <>
      {resource.text.slice(0, start)}
      <a
        href={resource.href}
        target="_blank"
        rel="noreferrer"
        className="text-[#76B900] underline-offset-4 hover:underline"
      >
        {resource.link}
      </a>
      {resource.text.slice(start + resource.link.length)}
    </>
  )
}
