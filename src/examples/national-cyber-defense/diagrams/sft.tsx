import { Arrow, BLUE, Box, Dataset, Label, Line, WHITE } from '../../../diagrams/primitives'

/**
 * Dream, SFT: Dream generates synthetic multi-turn cybersecurity
 * conversations grounded in expert-curated source documents. The model reads
 * a conversation and learns to produce its assistant turns (the targets).
 * (The training mix also includes Olmo 3 Dolci general instruction data; see
 * the popovers.) Canvas: 940 x 330 px (set in
 * `index.ts`). White, with the accent (blue) on the model.
 */
export function DreamSft() {
  return (
    <g color={WHITE}>
      {/* conversation → Nemotron */}
      <Label x={75} y={36} anchor="middle">training</Label>
      <Label x={75} y={52} anchor="middle">conversation</Label>
      <Box x={14} y={59.5} w={122} h={61} />
      <Line from={[29, 80]} to={[120.5, 80]} opacity={0.3} />
      <Line from={[29, 97]} to={[95, 97]} opacity={0.3} />
      <Arrow points={[[140, 90], [200.5, 90]]} />

      <Box color={BLUE} x={204} y={40} w={142} h={100} radius={13.5} strokeWidth={3.4} />
      <Label color={BLUE} x={275} y={80} size={17.8} anchor="middle">Nemotron 3.5</Label>
      <Label color={BLUE} x={275} y={102} size={17.8} anchor="middle">Super VL</Label>
      <Label color={BLUE} x={275} y={124} italic opacity={0.7} anchor="middle">after mid-training</Label>

      {/* Nemotron → its response */}
      <Arrow points={[[349.5, 90], [444.5, 90]]} />
      <Label x={529} y={50} anchor="middle">model's response</Label>
      <Box x={448} y={59.5} w={162.5} h={61} dashed />
      <Line from={[463, 80]} to={[595.5, 80]} opacity={0.3} />
      <Line from={[463, 97]} to={[560, 97]} opacity={0.3} />

      {/* response vs. target = loss */}
      <Arrow points={[[529, 127], [529, 193]]} both strokeWidth={2.5} headLength={12} headWidth={13.5} />
      <Label x={546} y={165} size={14.4}>gap = loss</Label>

      <Box x={448} y={200} w={162.5} h={61} filled />
      <Line from={[463, 220.5]} to={[595.5, 220.5]} opacity={0.35} />
      <Line from={[463, 237.5]} to={[573.5, 237.5]} opacity={0.35} />
      <Label x={529} y={281} anchor="middle">target response</Label>
      <Label x={529} y={298} italic opacity={0.7} anchor="middle">the conversation's assistant turns</Label>

      {/* where the targets come from: synthetic conversations, grounded in expert-curated documents */}
      <Arrow points={[[652, 230.5], [614, 230.5]]} />
      <Box x={656} y={196} w={118} h={69} />
      <Box x={666} y={206} w={64} h={20} radius={6} strokeWidth={1.8} opacity={0.7} />
      <Box x={700} y={235} w={64} h={20} radius={6} strokeWidth={1.8} opacity={0.7} />
      <Label x={715} y={281} anchor="middle">synthetic multi-turn</Label>
      <Label x={715} y={298} anchor="middle">cyber conversations</Label>

      <Arrow points={[[812, 230.5], [778, 230.5]]} />
      <Label x={795} y={220} size={12.5} opacity={0.7} anchor="middle">generate</Label>
      <Dataset x={830} y={206} w={64} h={50} layers={2} gap={7} radius={7} rows={2} checkboxes={false} />
      <Label x={868} y={281} anchor="middle">expert-curated</Label>
      <Label x={868} y={298} anchor="middle">source documents</Label>

      {/* the loss flows back to Nemotron */}
      <Arrow points={[[444.5, 230.5], [275, 230.5], [275, 143.5]]} headLength={13.5} headWidth={13.5} />
      <Label x={312} y={220} italic>update weights</Label>
      <Label x={307} y={256} italic opacity={0.7}>to shrink the gap</Label>
    </g>
  )
}
