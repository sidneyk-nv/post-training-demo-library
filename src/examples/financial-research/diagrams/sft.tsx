import { Arrow, BLUE, Box, Dataset, Label, Line, WHITE } from '../../../diagrams/primitives'

/**
 * Samaya, SFT: a teacher model (Kimi K3) answers each expert-written question
 * under eight research strategies and the best-graded answer is kept as the
 * ideal response. Nemotron 3.5 Lightning learns from the gap between its own
 * attempt and that response. Canvas: 940 x 330 px (set in `index.ts`).
 * White, with the accent (blue) on the two models.
 */
export function SamayaSft() {
  return (
    <g color={WHITE}>
      {/* training question → Nemotron */}
      <Label x={75} y={36} anchor="middle">expert-written</Label>
      <Label x={75} y={52} anchor="middle">training question</Label>
      <Box x={14} y={59.5} w={122} h={61} />
      <Line from={[29, 80]} to={[120.5, 80]} opacity={0.3} />
      <Line from={[29, 97]} to={[95, 97]} opacity={0.3} />
      <Arrow points={[[140, 90], [200.5, 90]]} />

      <Box color={BLUE} x={204} y={45} w={142} h={90} radius={13.5} strokeWidth={3.4} />
      <Label color={BLUE} x={275} y={84} size={17.8} anchor="middle">Nemotron 3.5</Label>
      <Label color={BLUE} x={275} y={106} size={17.8} anchor="middle">Lightning</Label>

      {/* Nemotron → its attempt */}
      <Arrow points={[[349.5, 90], [444.5, 90]]} />
      <Label x={529} y={50} anchor="middle">model's attempt</Label>
      <Box x={448} y={59.5} w={162.5} h={61} dashed />
      <Line from={[463, 80]} to={[595.5, 80]} opacity={0.3} />
      <Line from={[463, 97]} to={[560, 97]} opacity={0.3} />

      {/* attempt vs. ideal response = loss */}
      <Arrow points={[[529, 127], [529, 193]]} both strokeWidth={2.5} headLength={12} headWidth={13.5} />
      <Label x={546} y={165} size={14.4}>gap = loss</Label>

      <Box x={448} y={200} w={162.5} h={61} filled />
      <Line from={[463, 220.5]} to={[595.5, 220.5]} opacity={0.35} />
      <Line from={[463, 237.5]} to={[573.5, 237.5]} opacity={0.35} />
      <Label x={463} y={281}>ideal response (best of 8)</Label>

      {/* the teacher's eight answers; the best-graded one becomes the ideal response */}
      <Arrow points={[[690, 230.5], [614, 230.5]]} />
      <Label x={652} y={220} size={12.5} opacity={0.7} anchor="middle">best graded</Label>
      <Dataset x={694} y={206} w={72} h={50} layers={2} gap={7} radius={7} rows={2} checkboxes={false} />
      <Label x={737} y={281} anchor="middle">8 answers</Label>
      <Label x={737} y={298} italic opacity={0.7} anchor="middle">one per research strategy</Label>

      <Arrow points={[[826, 230.5], [786, 230.5]]} />
      <Box color={BLUE} x={830} y={200} w={96} h={61} radius={10} />
      <Label color={BLUE} x={878} y={226} size={15} anchor="middle">Teacher</Label>
      <Label color={BLUE} x={878} y={245} size={15} anchor="middle">Kimi K3</Label>

      {/* the loss flows back to Nemotron */}
      <Arrow points={[[444.5, 230.5], [275, 230.5], [275, 138.5]]} headLength={13.5} headWidth={13.5} />
      <Label x={312} y={220} italic>update weights</Label>
      <Label x={307} y={256} italic opacity={0.7}>to shrink the gap</Label>
    </g>
  )
}
