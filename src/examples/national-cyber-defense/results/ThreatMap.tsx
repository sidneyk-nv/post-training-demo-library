import { useEffect, useState } from 'react'
import { Badge, SegmentedControl, Text } from '@nvidia/foundations-react-core'
import { COUNTRIES } from './worldMap'
import { ACTORS, BEFORE_FINAL, CAMPAIGNS, CENTROID, VIEW, type Severity } from './campaigns'
import { METRICS, RUN } from './validation'
import './threat-map.css'

/**
 * Results tab for National Cyber-Defense: an illustrative threat-intelligence
 * map. The same threat-report feed is read by the base model and by the
 * post-trained model; each stage scans the reports, then reveals what that
 * model links: campaigns, the countries they target and, after training, the
 * critical infrastructure they hit. Adapted from the GTC demo's "Threat
 * Intelligence Map" (see `campaigns.ts`), restyled with Kaizen. The map is
 * illustrative; the measured results under it come from Dream's "Dreamer
 * Continuous Post-Training" page (see `validation.ts`).
 */

// Each stage scans for SCAN_TICKS, reveals one campaign every 2 ticks, then holds.
const TICK_MS = 500
const SCAN_TICKS = 5
const foundAt = (index: number) => SCAN_TICKS + index * 2

/** Offsets that spread a country's 1-3 infrastructure markers around its centre. */
const SPREAD: [number, number][] = [[0, 0], [10, -6], [-9, 7]]

const SEVERITY_COLOR: Record<Severity, 'red' | 'yellow' | 'gray'> = { Critical: 'red', High: 'yellow', Medium: 'gray' }

function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)'
  const [reduce, setReduce] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => setReduce(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])
  return reduce
}

export function ThreatMap() {
  const reduce = usePrefersReducedMotion()
  const [after, setAfter] = useState(false)
  const [tick, setTick] = useState(0)

  // What the current model surfaces, and how far the scan has got.
  const pool = after ? CAMPAIGNS : CAMPAIGNS.filter((c) => c.before.length)
  const end = foundAt(pool.length - 1) + 2
  const t = reduce ? end : tick
  const scanning = t < SCAN_TICKS
  useEffect(() => {
    if (reduce || tick >= end) return
    const id = window.setTimeout(() => setTick((value) => Math.min(value + 1, end)), TICK_MS)
    return () => window.clearTimeout(id)
  }, [reduce, tick, end])

  const found = pool
    .filter((_, i) => t >= foundAt(i))
    .map((c) => ({ ...c, hits: after ? c.targets : c.before }))
  const targeted = new Set(found.flatMap((c) => c.hits))
  const groups = [...new Set(found.map((c) => c.group))]
  const infra = after
    ? found.flatMap((c) => c.infra.flatMap((f) => f.sectors.map((sector, k) => ({ country: f.country, sector, k }))))
    : []
  // Re-mount animated pieces when the stage changes, so they animate in again.
  const phase = after ? 'after' : 'before'

  return (
    // On large screens, fill the height the Architecture view uses (the viewport minus the app bar,
    // logo row and page padding) so the page doesn't scroll; the map scales down to fit.
    <div className="flex flex-col gap-4 lg:h-[calc(100dvh-11.25rem)] lg:min-h-[560px]">
      <SegmentedControl
        className="self-start"
        size="large"
        value={phase}
        onValueChange={(value) => {
          setAfter(value === 'after')
          setTick(0)
        }}
        items={[
          { value: 'before', children: 'Before Post-Training' },
          { value: 'after', children: 'After Post-Training' },
        ]}
      />

      <div className="threat-map grid min-h-0 flex-1 overflow-hidden rounded-lg border border-base bg-surface-raised lg:grid-cols-[minmax(0,1fr)_300px] lg:grid-rows-[minmax(0,1fr)]">
        <div className="flex min-h-0 min-w-0 flex-col">
          <div className="relative aspect-[720/420] bg-black lg:aspect-auto lg:min-h-0 lg:flex-1">
            <svg
              viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
              className="absolute inset-0 block h-full w-full"
              role="img"
              aria-label={`Illustrative threat-intelligence map. Before training the model links ${BEFORE_FINAL.campaigns} campaigns; after training it links ${CAMPAIGNS.length} campaigns across ${new Set(CAMPAIGNS.flatMap((c) => c.targets)).size} countries. Dotted lines are relationships inferred from reports.`}
            >
              <defs>
                <linearGradient id="tm-sweep" x1="0" x2="1">
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset=".9" stopColor="#ffffff" stopOpacity=".1" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity=".35" />
                </linearGradient>
                <linearGradient id="tm-actor-cloak" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#d9d9d9" stopOpacity=".55" />
                  <stop offset=".48" stopColor="#5c5c5c" stopOpacity=".9" />
                  <stop offset="1" stopColor="#1a1a1a" />
                </linearGradient>
                <linearGradient id="tm-actor-hood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#8c8c8c" stopOpacity=".9" />
                  <stop offset=".55" stopColor="#2e2e2e" />
                  <stop offset="1" stopColor="#0d0d0d" />
                </linearGradient>
              </defs>

              {COUNTRIES.map((c) => (
                <path key={c.id} d={c.d} className={`tm-country ${targeted.has(c.id) ? 'hit' : ''}`} />
              ))}

              {found.map((c) =>
                c.hits.map((id) => {
                  const [ax, ay] = ACTORS[c.group]
                  const [cx, cy] = CENTROID[id]
                  return <line key={`${phase}-${c.name}-${id}`} x1={ax} y1={ay} x2={cx} y2={cy} className="tm-link" />
                }),
              )}

              {groups.map((group) => {
                const [x, y] = ACTORS[group]
                const letter = group.slice(-1)
                return (
                  <g key={`${phase}-${group}`} transform={`translate(${x} ${y})`} role="img" aria-label={`Attacker ${letter}`}>
                    <g className="tm-actor">
                      <g transform="scale(.54)">
                        <circle r="31" className="tm-actor-halo" />
                        <path d="M-28 23C-25 9-18 3-11 0C-14-9-11-22 0-30C11-22 14-9 11 0C18 3 25 9 28 23Z" className="tm-actor-body" />
                        <path d="M-17 0C-18-14-11-29 0-34C11-29 18-14 17 0C13 9 7 14 0 17C-7 14-13 9-17 0Z" className="tm-actor-hood" />
                        <path d="M-11-2C-11-13-7-22 0-26C7-22 11-13 11-2C8 5 4 8 0 10C-4 8-8 5-11-2Z" className="tm-actor-face" />
                        <path d="M-5-2H-1M1-2H5" className="tm-actor-eyes" />
                        <path d="M-22 9H22V26H-22ZM-27 28H27L23 32H-23Z" className="tm-actor-laptop" />
                        <path d="M-8 15L-4 18L-8 21M-1 21H8" className="tm-actor-code" />
                      </g>
                      <text y="25" className="tm-actor-label">ATTACKER {letter}</text>
                    </g>
                  </g>
                )
              })}

              {infra.map(({ country, k }) => {
                const [cx, cy] = CENTROID[country]
                const [x, y] = [cx + SPREAD[k][0], cy + SPREAD[k][1]]
                return (
                  <g key={`infra-${country}-${k}`}>
                    <circle cx={x} cy={y} r="4" className="tm-beacon-ring" />
                    <path d={`M${x} ${y - 4.5}L${x + 4.5} ${y}L${x} ${y + 4.5}L${x - 4.5} ${y}Z`} className="tm-beacon" />
                  </g>
                )
              })}

              {scanning && !reduce && (
                <rect key={`sweep-${phase}`} x={VIEW.x - 90} y={VIEW.y} width="90" height={VIEW.h} fill="url(#tm-sweep)" className="tm-sweep" />
              )}
            </svg>

            {/* Always visible: this is sample data, not a real incident. */}
            <Text kind="title/md" className="pointer-events-none absolute top-4 right-5 block text-right leading-tight text-feedback-danger">
              Illustrative
              <br />
              example data
            </Text>
            <div className="absolute top-3 left-3 flex flex-wrap gap-4 rounded-md border border-base bg-black/80 px-3 py-1.5">
              <Text kind="body/regular/sm" className="flex items-center gap-2 text-secondary">
                <i className="tm-key-target" aria-hidden />
                Targeted country
              </Text>
              <Text kind="body/regular/sm" className="flex items-center gap-2 text-secondary">
                <i className="tm-key-infra" aria-hidden />
                Critical infrastructure affected
              </Text>
            </div>
          </div>

          {/* Measured results (not illustrative): one RL run of Dream's Posture agent. */}
          <div className="flex shrink-0 flex-col gap-3 border-t border-base p-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Badge color={after ? 'green' : 'red'} kind="solid">
                {after ? 'After Post-Training · end of run' : 'Before Post-Training · start of run'}
              </Badge>
              <Text kind="label/bold/md">{RUN.model}</Text>
              <Text kind="body/regular/sm" className="text-secondary">
                {RUN.scope}
              </Text>
            </div>
            <dl className="m-0 grid gap-3 sm:grid-cols-3">
              {METRICS.map((m) => (
                <div key={m.label} className="flex flex-col gap-0.5 rounded-md border border-base bg-surface-sunken px-3 py-2">
                  <Text kind="label/bold/md" asChild>
                    <dt>{m.label}</dt>
                  </Text>
                  <dd className="m-0 flex flex-col gap-1">
                    <Text kind="title/md" className={`block tabular-nums ${scanning ? 'text-secondary' : after ? 'text-feedback-success' : ''}`}>
                      {scanning ? '…' : !after ? m.start : m.change ?? `${m.start} → ${m.end}`}
                    </Text>
                    <Text kind="body/regular/sm" className="block text-secondary">
                      {after && m.extra && !scanning ? `${m.extra} · ` : ''}
                      {m.detail}
                    </Text>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-col gap-1">
              <Text
                kind="body/bold/lg"
                role="status"
                className={`block ${scanning ? 'text-secondary' : after ? 'text-feedback-success' : ''}`}
              >
                {scanning ? 'Analyzing threat reports…' : after ? RUN.headline : 'Start of the post-training run'}
              </Text>
              <Text kind="body/regular/xs" className="block text-secondary">
                {RUN.note} The map above is illustrative example data.
              </Text>
            </div>
          </div>
        </div>

        <aside className="flex min-h-0 flex-col gap-3 overflow-y-auto border-t border-base p-4 lg:border-t-0 lg:border-l" aria-label="Detected campaigns">
          <Text kind="title/sm" asChild>
            <h3 className="m-0">Detected campaigns</h3>
          </Text>
          {found.map((c) => (
            <article key={`${phase}-${c.name}`} className="turn-in flex flex-col gap-1.5 rounded-md border border-base bg-surface-sunken p-3">
              <div className="flex items-center justify-between gap-2">
                <Text kind="label/bold/md">
                  {c.name} <span className="font-normal text-secondary">· {c.group}</span>
                </Text>
                <Badge color={SEVERITY_COLOR[c.severity]} size="small">
                  {c.severity}
                </Badge>
              </div>
              <Text kind="body/regular/sm" className="text-secondary">
                {c.hits.length} {c.hits.length === 1 ? 'country' : 'countries'}
                {after && ` · ${c.infra.flatMap((f) => f.sectors).length} infrastructure sites`}
              </Text>
              {after && (
                <Text kind="body/regular/sm" className="tm-infra-text">
                  {[...new Set(c.infra.flatMap((f) => f.sectors))].join(', ')}
                </Text>
              )}
            </article>
          ))}
          {!found.length && (
            <Text kind="body/regular/sm" className="text-secondary">
              Waiting for analysis…
            </Text>
          )}
        </aside>
      </div>
    </div>
  )
}
