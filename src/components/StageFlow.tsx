import { Fragment, type MouseEvent } from 'react'
import { flushSync } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { Text } from '@kui/foundations-react'
import { ArrowRight, Collapse, Expand } from '@nvidia/react-gui-icons/icons'
import type { Stage, StageId } from '../diagrams'
import type { Hotspot } from '../examples'
import { Diagram } from './Diagram'

/**
 * Eval → SFT → RL → Eval (pt. 2). One stage is open and shows its diagram;
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

  return (
    <div className="flex min-h-[520px] flex-1 items-stretch gap-4">
      {stages.map((stage, i) => (
        <Fragment key={stage.id}>
          {i > 0 && (
            <span
              className="flex size-6 shrink-0 items-center justify-center self-center text-secondary"
              style={{ viewTransitionName: `stage-arrow-${i}` }}
              aria-hidden
            >
              <ArrowRight variant="fill" />
            </span>
          )}
          {stage.id === activeStage ? (
            <section
              aria-label={`${stage.title} stage`}
              className="flex min-w-0 flex-1 flex-col gap-4 rounded-lg border border-interaction-selected bg-surface-raised p-6 shadow-md"
              style={{ viewTransitionName: `stage-${stage.id}` }}
            >
              <header className="flex items-center justify-between">
                <Text kind="label/bold/lg" asChild>
                  <h2>{stage.title}</h2>
                </Text>
                <span className="text-secondary" aria-hidden>
                  <Expand />
                </span>
              </header>
              <div className="flex min-h-0 flex-1 items-center justify-center rounded-lg border border-base bg-surface-sunken p-4">
                <Diagram stage={stage} hotspots={hotspots?.[stage.id]} />
              </div>
            </section>
          ) : (
            <Link
              to={`?stage=${stage.id}`}
              onClick={(e) => openStage(e, `?stage=${stage.id}`)}
              aria-label={`Open ${stage.title} stage`}
              style={{ viewTransitionName: `stage-${stage.id}` }}
              className="flex min-w-20 shrink-0 items-center self-center justify-between gap-2 rounded-lg border border-base bg-surface-raised p-2 text-primary no-underline shadow-md hover:bg-interaction-hover"
            >
              <Text kind="label/bold/md">{stage.title}</Text>
              <span className="text-secondary" aria-hidden>
                <Collapse />
              </span>
            </Link>
          )}
        </Fragment>
      ))}
    </div>
  )
}
