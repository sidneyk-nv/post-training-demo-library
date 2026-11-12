import { Arrow, Badge, Box, Label, Line, ORANGE, WHITE } from './primitives'

/**
 * Step 3, RL: the model samples several attempts, a verifier / environment scores each
 * one, and the scores are used to update the weights toward better attempts.
 * Canvas: 848 x 330 px (set in `diagrams/index.ts`).
 * Accent color: orange
 */
export function RlDiagram() {
  // The three attempts are stacked rows, 93 px apart: same layout, different y.
  const rows = [54.5, 147.5, 241]
  const scores = ['0.2', '0.9', '0.5']

  return (
    <g color={WHITE}>
      {/* prompt → model */}
      <Label x={39} y={110}>prompt</Label>
      <Box x={13.5} y={119} w={98.5} h={57.5} />
      <Line from={[27, 139]} to={[98.5, 139]} opacity={0.3} />
      <Line from={[27, 156]} to={[78, 156]} opacity={0.3} />
      <Arrow points={[[115.5, 147.5], [149.5, 147.5]]} />

      <Box color={ORANGE} x={152.5} y={95} w={142.5} h={105} radius={13.5} strokeWidth={3.4} />
      <Label color={ORANGE} x={198.5} y={142} size={17.8}>Model</Label>
      <Label color={ORANGE} x={168} y={166} italic opacity={0.7}>samples attempts</Label>

      {/* model → several attempts */}
      <Label x={386} y={18.5}>several attempts</Label>
      {rows.map((y, i) => (
        <g key={y}>
          <Arrow points={[[298.5, 147.5], [373, y]]} smooth strokeWidth={2.5} headLength={13.5} headWidth={12} />
          <Box x={376.5} y={y - 25.5} w={125.5} h={51} dashed />
          <Line from={[390, y - 7]} to={[488.5, y - 7]} strokeWidth={1.9} opacity={0.3} />
          <Line from={[390, y + 6.5]} to={[i === 0 ? 451 : i === 1 ? 461.5 : 444.5, y + 6.5]} strokeWidth={1.9} opacity={0.3} />
          <Arrow points={[[505.5, y], [563, y]]} strokeWidth={2.5} headLength={13.5} headWidth={12} />
          {/* reward score */}
          <Line from={[688.5, y]} to={[736, y]} strokeWidth={2} opacity={0.4} />
          <Badge color={ORANGE} cx={765} cy={y} filled={i === 1}>{scores[i]}</Badge>
        </g>
      ))}

      {/* verifier / environment */}
      <Box color={ORANGE} x={566.5} y={29} w={118.5} h={237.5} radius={13.5} strokeWidth={3.4} />
      <Label color={ORANGE} x={598} y={142} size={17}>verifier</Label>
      <Label color={ORANGE} x={582} y={166} opacity={0.7}>/ environment</Label>
      <Label x={741.5} y={18.5}>reward</Label>

      {/* rewards flow back to the model */}
      <Arrow
        points={[[626, 270], [626, 295], [224, 295], [224, 203.5]]}
        headLength={13.5}
        headWidth={13.5}
      />
      <Label x={270} y={317} size={14.4} italic>update weights toward higher-reward attempts</Label>
    </g>
  )
}
