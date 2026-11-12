import { Link } from 'react-router-dom'
import { Text } from '@nvidia/foundations-react-core'
import { exampleHref, examples, type Example } from '../examples'

export function ExamplesPage() {
  return (
    <div className="flex flex-1 flex-col p-8">
      {/* The rows share the screen height, so the cards fit without scrolling (they scroll only when the screen is very short). */}
      <ul className="m-0 grid flex-1 list-none auto-rows-fr grid-cols-1 gap-6 p-0 md:grid-cols-2 xl:grid-cols-3">
        {examples.map((example) => (
          <li key={example.id} className="flex">
            <ExampleCard example={example} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function ExampleCard({ example }: { example: Example }) {
  const href = exampleHref(example)
  const body = (
    <>
      <div
        className="relative min-h-[80px] w-full flex-1 overflow-hidden"
        style={{ backgroundColor: example.cardImageBackground }}
      >
        <img
          src={example.cardImage}
          alt=""
          className={`absolute inset-0 size-full ${example.cardImageBackground ? 'object-contain' : 'object-cover'}`}
        />
      </div>
      <div className="flex w-full flex-col gap-2 p-6">
        <div className="flex h-[18px] items-center gap-2">
          {example.partnerLogos.map((logo) => (
            <img key={logo.src} src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} />
          ))}
        </div>
        <Text kind="title/sm" asChild>
          <h2 className="m-0">{example.title}</h2>
        </Text>
        <Text kind="body/regular/md" className="block text-secondary">
          {example.description}
        </Text>
      </div>
    </>
  )

  const cardClass =
    'flex w-full flex-col overflow-hidden rounded-lg border border-base bg-surface-raised text-primary no-underline'

  return href ? (
    <Link to={href} className={`${cardClass} transition-colors hover:border-interaction-selected`}>
      {body}
    </Link>
  ) : (
    <div className={cardClass}>{body}</div>
  )
}
