import { useState } from 'react'
import { PopoverContent, PopoverRoot, PopoverTrigger, Text } from '@nvidia/foundations-react-core'
import type { Stage } from '../diagrams'
import type { Hotspot } from '../examples'

/**
 * A stage diagram (an SVG drawn in code) with optional hover areas that
 * open popovers. Hover areas are placed as percentages so they stay aligned
 * when the diagram scales down.
 */
export function Diagram({ stage, hotspots = [] }: { stage: Stage; hotspots?: Hotspot[] }) {
  return (
    <div className="relative w-full" style={{ maxWidth: stage.width }}>
      {/* Drawn on a canvas of the stage's width x height; the SVG scales to fit. */}
      <div className="diagram-svg" aria-hidden>
        <svg width={stage.width} height={stage.height} viewBox={`0 0 ${stage.width} ${stage.height}`} fill="none">
          <stage.Component />
        </svg>
      </div>
      {hotspots.map((h) => (
        <HoverPopover key={h.id} hotspot={h} stage={stage} />
      ))}
    </div>
  )
}

function HoverPopover({ hotspot: h, stage }: { hotspot: Hotspot; stage: Stage }) {
  const [open, setOpen] = useState(false)
  const pct = (value: number, total: number) => `${(value / total) * 100}%`

  return (
    <PopoverRoot open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={`${h.title}: show details`}
        className="absolute cursor-help rounded-md border-0 bg-transparent p-0 transition-colors hover:bg-white/8 focus-visible:bg-white/8"
        style={{
          left: pct(h.x, stage.width),
          top: pct(h.y, stage.height),
          width: pct(h.width, stage.width),
          height: pct(h.height, stage.height),
        }}
        onPointerEnter={() => setOpen(true)}
        onPointerLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      />
      <PopoverContent side={h.side ?? 'top'} align={h.align ?? 'start'} style={{ width: h.popoverWidth }}>
        <div className="flex flex-col gap-2">
          <Text kind="label/bold/lg" className="block">
            {h.title}
          </Text>
          <Text kind="body/regular/md" className="block whitespace-pre-line">
            {h.body}
          </Text>
        </div>
      </PopoverContent>
    </PopoverRoot>
  )
}
