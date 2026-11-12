import type { ReactNode } from 'react'

/**
 * Building blocks for diagrams written as code. A diagram is a React
 * component that draws on a fixed-size canvas (its `width` x `height`, in px);
 * every position below is in canvas pixels with (0, 0) at the top left.
 */

/**
 * Colour scheme: each diagram is mostly white plus one accent colour.
 * Wrap the diagram in `<g color={WHITE}>` (everything inherits it), then pass
 * `color={ACCENT}` to the few elements that should stand out (see `sft.tsx`).
 */
export const WHITE = '#FFFFFF'
export const GREEN = '#76B900'
export const BLUE = '#4DA6FF'
export const ORANGE = '#EF9100'
export const RED = '#FF8181'

/** `color` overrides the diagram's colour for one element; `opacity` dims it. */
type Common = { opacity?: number; color?: string }

/** A rounded rectangle. `dashed` for "not yet produced"; `filled` to highlight it. */
export function Box({
  x,
  y,
  w,
  h,
  radius = 8.5,
  strokeWidth = 2.5,
  dashed,
  filled,
  opacity,
  color = 'currentColor',
}: Common & {
  x: number
  y: number
  w: number
  h: number
  radius?: number
  strokeWidth?: number
  dashed?: boolean
  filled?: boolean
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={radius}
      fill={filled ? color : 'none'}
      fillOpacity={filled ? 0.14 : undefined}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeDasharray={dashed ? '6.8 5.1' : undefined}
      opacity={opacity}
    />
  )
}

/** A straight line, e.g. the grey "text lines" inside a document box. */
export function Line({
  from,
  to,
  strokeWidth = 2,
  opacity = 1,
  color = 'currentColor',
}: Common & { from: [number, number]; to: [number, number]; strokeWidth?: number }) {
  return (
    <line
      x1={from[0]}
      y1={from[1]}
      x2={to[0]}
      y2={to[1]}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      opacity={opacity}
    />
  )
}

type Point = [number, number]

/**
 * An arrow through `points` (two for a straight arrow, more for an elbow).
 * The head sits on the last point, pointing along the last segment.
 * Set `both` for a double-headed arrow, `smooth` for a curve.
 */
export function Arrow({
  points,
  strokeWidth = 3,
  headLength = 17,
  headWidth = 12,
  both,
  smooth,
  color = 'currentColor',
}: {
  color?: string
  points: Point[]
  strokeWidth?: number
  headLength?: number
  headWidth?: number
  both?: boolean
  /** With two points, draw a gentle S-curve instead of a straight line. */
  smooth?: boolean
}) {
  // Shorten the line at each head so its round end tucks inside the triangle.
  const path = points.map((p) => [...p] as Point)
  const heads: ReactNode[] = []
  const addHead = (tipIndex: number, prevIndex: number) => {
    const [tx, ty] = points[tipIndex]
    const [px, py] = points[prevIndex]
    const len = Math.hypot(tx - px, ty - py)
    const [dx, dy] = [(tx - px) / len, (ty - py) / len]
    const base: Point = [tx - dx * headLength, ty - dy * headLength]
    path[tipIndex] = base
    const [nx, ny] = [-dy * (headWidth / 2), dx * (headWidth / 2)]
    heads.push(
      <polygon
        key={tipIndex}
        points={`${base[0] + nx},${base[1] + ny} ${tx},${ty} ${base[0] - nx},${base[1] - ny}`}
        fill={color}
      />,
    )
  }
  addHead(points.length - 1, points.length - 2)
  if (both) addHead(0, 1)

  const line =
    smooth && path.length === 2 ? (
      <path d={`M${path[0]} C${(path[0][0] + path[1][0]) / 2},${path[0][1]} ${(path[0][0] + path[1][0]) / 2},${path[1][1]} ${path[1]}`} />
    ) : (
      <polyline points={path.map((p) => p.join(',')).join(' ')} />
    )

  return (
    <>
      <g
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {line}
      </g>
      {heads}
    </>
  )
}

/** Text with its baseline at (x, y). Use a lower `opacity` (about 0.7) for secondary text. */
export function Label({
  x,
  y,
  size = 13.5,
  opacity = 0.9,
  italic,
  anchor,
  color = 'currentColor',
  children,
}: Common & {
  x: number
  y: number
  size?: number
  italic?: boolean
  /** Which end of the text sits at `x`. Default: start (left-aligned). */
  anchor?: 'start' | 'middle' | 'end'
  children: ReactNode
}) {
  return (
    <text
      x={x}
      y={y}
      fill={color}
      fillOpacity={opacity}
      fontFamily="NVIDIA Sans"
      fontSize={size}
      textAnchor={anchor}
      fontStyle={italic ? 'italic' : undefined}
    >
      {children}
    </text>
  )
}

/** A circle with a centred value, e.g. a reward score. `filled` highlights it. */
export function Badge({
  cx,
  cy,
  r = 23.75,
  filled,
  opacity = 0.85,
  color = 'currentColor',
  children,
}: Common & { cx: number; cy: number; r?: number; filled?: boolean; children: ReactNode }) {
  return (
    <>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={filled ? color : 'none'}
        fillOpacity={filled ? 0.18 : undefined}
        stroke={color}
        strokeWidth={filled ? 3.4 : 2.2}
        opacity={filled ? undefined : opacity}
      />
      <text
        x={cx}
        y={cy + 6}
        textAnchor="middle"
        fill={color}
        fillOpacity={filled ? undefined : opacity}
        fontFamily="NVIDIA Sans"
        fontSize={17}
      >
        {children}
      </text>
    </>
  )
}

/**
 * A dataset icon: a stack of task cards, the front one showing a list of
 * items (a checkbox and a line each). (x, y, w, h) is the front card; the
 * cards behind it peek out above and to the right.
 */
export function Dataset({
  x,
  y,
  w,
  h,
  rows = 3,
  layers = 2,
  gap = 9,
  radius = 8,
  color = 'currentColor',
}: {
  x: number
  y: number
  w: number
  h: number
  rows?: number
  /** Cards stacked behind the front one. */
  layers?: number
  /** How far each card behind is shifted up and to the right. */
  gap?: number
  radius?: number
  color?: string
}) {
  const r = radius
  // Draw the cards behind first, back to front. Only the part of each that
  // isn't covered by the card in front of it is drawn (its top and right edges).
  const back = Array.from({ length: layers }, (_, i) => layers - i).map((n) => {
    const o = n * gap
    const d = `M${x + o},${y} V${y - o + r} A${r},${r} 0 0 1 ${x + o + r},${y - o} H${x + w + o - r} A${r},${r} 0 0 1 ${x + w + o},${y - o + r} V${y + h - o - r} A${r},${r} 0 0 1 ${x + w + o - r},${y + h - o} H${x + w}`
    return <path key={n} d={d} fill="none" stroke={color} strokeWidth={2.2} opacity={0.95 - n * 0.2} strokeLinecap="round" />
  })

  const pad = 14
  const rowGap = (h - 2 * pad) / (rows - 1)
  const items = Array.from({ length: rows }, (_, i) => {
    const cy = y + pad + i * rowGap
    const end = i === rows - 1 ? x + w * 0.6 : x + w - pad
    return (
      <g key={i}>
        <rect x={x + pad} y={cy - 4.5} width={9} height={9} rx={2} fill="none" stroke={color} strokeWidth={2} />
        <line x1={x + pad + 19} y1={cy} x2={end} y2={cy} stroke={color} strokeWidth={2} strokeLinecap="round" opacity={0.5} />
      </g>
    )
  })

  return (
    <>
      {back}
      <rect x={x} y={y} width={w} height={h} rx={r} fill="none" stroke={color} strokeWidth={2.5} />
      {items}
    </>
  )
}
