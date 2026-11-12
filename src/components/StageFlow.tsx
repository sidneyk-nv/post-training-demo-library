import { Fragment, type MouseEvent } from 'react'
import { flushSync } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { Text } from '@nvidia/foundations-react-core'
import { ArrowRight, Collapse, Expand } from '@nvidia/react-gui-icons/icons'
import type { Stage, StageId } from '../diagrams'
import type { Hotspot } from '../examples'
import { Diagram } from './Diagram'

/**
 * Eval → SFT → RL → Eval. One stage is open and shows its diagram;
 * the others are collapsed and link to `?stage=<id>`.
 */
export function StageFlow({
  stages,
  activeStage,
  hotspots,
}: {
  stages: Stage[]
  activeStage: StageId
  hotspots?: Partial<Record<StageId, Hotspot[]>>
}) {
  const navigate = useNavigate()

  // Morph the small card into the large one (Figma: Smart Animate, ease-out, 350ms).
  // flushSync makes React render the new layout inside the transition callback.
  // Browsers without View Transitions fall back to the normal link.
  const openStage = (e: MouseEvent<HTMLAnchorElement>, to: string) => {
    if (!document.startViewTransition || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    // Tell the CSS which card grows and which shrinks so each cross-fades at the right moment.
    const root = document.documentElement
    root.dataset.vtFrom = activeStage
    root.dataset.vtTo = to.replace('?stage=', '')
    const transition = document.startViewTransition(() => flushSync(() => navigate(to)))
    transition.finished.finally(() => {
      delete root.dataset.vtFrom
      delete root.dataset.vtTo
    })
  }

  // The open stage shows its full title under the card; collapsed stages are
  // compact pills with the short title and an expand icon.
  const title = (stage: Stage, { full = false } = {}) => (
    <Text
      kind={full ? 'title/lg' : 'title/md'}
      asChild
      className="m-0 block text-center"
      style={{ viewTransitionName: `stage-title-${stage.id}` }}
    >
      <h2>{full ? stage.fullTitle : stage.title}</h2>
    </Text>
  )

  return (
    <div className="flex min-h-[520px] flex-1 items-stretch gap-4">
      {stages.map((stage, i) => (
        <Fragment key={stage.id}>
          {i > 0 && (
            <div className="flex shrink-0 flex-col items-center justify-center gap-3" aria-hidden>
              <span
                className="flex size-6 items-center justify-center text-secondary"
                style={{ viewTransitionName: `stage-arrow-${i}` }}
              >
                <ArrowRight variant="fill" />
              </span>
            </div>
          )}
          {stage.id === activeStage ? (
            <section aria-label={`${stage.fullTitle} stage`} className="flex min-w-0 flex-1 flex-col gap-3">
              <div
                className="flex min-h-0 flex-1 flex-col rounded-lg border border-interaction-selected bg-surface-raised p-6 shadow-md"
                style={{ viewTransitionName: `stage-${stage.id}` }}
              >
                <div className="flex justify-end text-secondary" aria-hidden>
                  <Expand />
                </div>
                <div className="mt-2 flex min-h-0 flex-1 items-center justify-center rounded-lg border border-base bg-surface-sunken p-4">
                  <Diagram stage={stage} hotspots={hotspots?.[stage.id]} />
                </div>
              </div>
              {title(stage, { full: true })}
            </section>
          ) : (
            <div className="flex shrink-0 flex-col items-center justify-center gap-3">
              <Link
                to={`?stage=${stage.id}`}
                onClick={(e) => openStage(e, `?stage=${stage.id}`)}
                aria-label={`Open ${stage.title} stage`}
                style={{ viewTransitionName: `stage-${stage.id}` }}
                className="flex h-12 items-center gap-2 rounded-lg border border-base bg-surface-raised px-4 text-secondary no-underline shadow-md hover:bg-interaction-hover"
              >
                <Collapse />
                {title(stage)}
              </Link>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  )
}
