import { Arrow, Box, BLUE, Label, Line, WHITE } from './primitives'

/**
 * SFT: the model answers a prompt, the answer is compared with the ideal
 * response, and the gap (the loss) is used to update the model's weights.
 * White, with the accent (blue) on the model.
 * Canvas: 848 x 314 px (set in `diagrams/index.ts`).
 */
export function SftDiagram() {
  return (
    <g color={WHITE}>
      {/* prompt → model */}
      <Label x={51} y={35}>prompt</Label>
      <Box x={13.5} y={44} w={122} h={61} />
      <Line from={[29, 64.5]} to={[120.5, 64.5]} opacity={0.3} />
      <Line from={[29, 81.5]} to={[95, 81.5]} opacity={0.3} />
      <Arrow points={[[139, 74.5], [200.5, 74.5]]} />

      <Box color={BLUE} x={204} y={29.5} w={142} h={90} radius={13.5} strokeWidth={3.4} />
      <Label color={BLUE} x={275} y={68.5} size={17.8} anchor="middle">Base</Label>
      <Label color={BLUE} x={275} y={90.5} size={17.8} anchor="middle">Model</Label>

      {/* model → its attempt */}
      <Arrow points={[[349.5, 74.5], [444.5, 74.5]]} />
      <Label x={477} y={35}>model's attempt</Label>
      <Box x={448} y={44} w={162.5} h={61} dashed />
      <Line from={[463, 64.5]} to={[595.5, 64.5]} opacity={0.3} />
      <Line from={[463, 81.5]} to={[560, 81.5]} opacity={0.3} />

      {/* attempt vs. ideal response = loss */}
      <Arrow points={[[529, 107], [529, 188]]} both strokeWidth={2.5} headLength={12} headWidth={13.5} />
      <Label x={546} y={152.5} size={14.4}>gap = loss</Label>

      <Box x={448} y={190} w={162.5} h={61} filled />
      <Line from={[463, 210.5]} to={[595.5, 210.5]} opacity={0.35} />
      <Line from={[463, 227.5]} to={[573.5, 227.5]} opacity={0.35} />
      <Label x={463} y={271}>ideal response (label)</Label>

      {/* the loss flows back to the model */}
      <Arrow points={[[444.5, 220.5], [275, 220.5], [275, 122.5]]} headLength={13.5} headWidth={13.5} />
      <Label x={312} y={210} italic>update weights</Label>
      <Label x={307} y={245.5} italic opacity={0.7}>to shrink the gap</Label>

      {/* divider and caption */}
      <Line from={[651, 51]} to={[651, 247.5]} strokeWidth={1.7} opacity={0.2} />
      <Label x={671.5} y={132} size={15.3}>repeat over</Label>
      <Label x={671.5} y={155.5} size={15.3}>thousands of</Label>
      <Label x={671.5} y={179.5} size={15.3}>labeled pairs</Label>
    </g>
  )
}
