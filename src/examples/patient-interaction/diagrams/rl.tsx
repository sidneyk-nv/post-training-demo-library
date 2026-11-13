import { Arrow, Box, Label, Line, ORANGE, WHITE } from '../../../diagrams/primitives'

/**
 * Patient Interaction, RL (GRPO): the model has four complete conversations
 * per patient case, talking to a simulated patient and using sandboxed
 * clinical tools. Two Nemotron judges score each conversation on a six-axis
 * rubric; each reward is compared with the other three in its group, and the
 * weights move toward the above-average conversations.
 * The rewards and group comparisons are the real values from one training
 * case (adult-train-0174, update 1 of the run). Canvas: 900 x 330 px (set in
 * `index.ts`). White, with the accent (orange) on the model, judges and the
 * above-average conversations.
 */
export function PatientRl() {
  // The four conversations are stacked rows, 65 px apart: same layout, different y.
  const rows = [55, 120, 185, 250]
  const rewards = ['0.94', '0.81', '0.905', '0.8425']
  const vsGroup = ['+1.81', '−1.74', '+0.60', '−0.63']

  return (
    <g color={WHITE}>
      {/* patient case → model */}
      <Label x={62.75} y={110} anchor="middle">patient case</Label>
      <Box x={13.5} y={119} w={98.5} h={57.5} />
      <Line from={[27, 139]} to={[98.5, 139]} opacity={0.3} />
      <Line from={[27, 156]} to={[78, 156]} opacity={0.3} />
      <Arrow points={[[115.5, 147.5], [149.5, 147.5]]} />

      {/* the simulated patient and the clinical tools the model talks to */}
      <Box x={152.5} y={22} w={67} h={50} />
      <Label x={186} y={43} size={12.5} anchor="middle">simulated</Label>
      <Label x={186} y={60} size={12.5} anchor="middle">patient</Label>
      <Arrow points={[[186, 76], [186, 91.5]]} both strokeWidth={2} headLength={7} headWidth={8} />
      <Box x={228} y={22} w={67} h={50} />
      <Label x={261.5} y={43} size={12.5} anchor="middle">clinical</Label>
      <Label x={261.5} y={60} size={12.5} anchor="middle">tools</Label>
      <Arrow points={[[261.5, 76], [261.5, 91.5]]} both strokeWidth={2} headLength={7} headWidth={8} />

      <Box color={ORANGE} x={152.5} y={95} w={142.5} h={105} radius={13.5} strokeWidth={3.4} />
      <Label color={ORANGE} x={223.75} y={137} size={16} anchor="middle">Nemotron 3.5</Label>
      <Label color={ORANGE} x={223.75} y={158} size={16} anchor="middle">Lightning</Label>
      <Label color={ORANGE} x={223.75} y={180} italic opacity={0.7} anchor="middle">policy</Label>

      {/* model → four conversations per case */}
      <Label x={376.5} y={20}>4 conversations per case</Label>
      {rows.map((y, i) => {
        const above = vsGroup[i].startsWith('+')
        return (
          <g key={y}>
            <Arrow points={[[298.5, 147.5], [373, y]]} smooth strokeWidth={2.5} headLength={13.5} headWidth={12} />
            <Box x={376.5} y={y - 21} w={125.5} h={42} dashed />
            <Line from={[390, y - 6]} to={[488.5, y - 6]} strokeWidth={1.9} opacity={0.3} />
            <Line from={[390, y + 7]} to={[[451, 461.5, 444.5, 470][i], y + 7]} strokeWidth={1.9} opacity={0.3} />
            <Arrow points={[[505.5, y], [563, y]]} strokeWidth={2.5} headLength={13.5} headWidth={12} />
            {/* reward, and how it compares with the other three */}
            <Line from={[688.5, y]} to={[708, y]} strokeWidth={2} opacity={0.4} />
            <Label x={716} y={y + 6} size={16} opacity={1}>{rewards[i]}</Label>
            <Label x={836} y={y + 6} size={16} anchor="middle" opacity={above ? 1 : 0.6} color={above ? ORANGE : undefined}>
              {vsGroup[i]}
            </Label>
          </g>
        )
      })}

      {/* the judges score each conversation */}
      <Box color={ORANGE} x={566.5} y={29} w={118.5} h={247} radius={13.5} strokeWidth={3.4} />
      <Label color={ORANGE} x={625.75} y={136} size={17} anchor="middle">LLM judges</Label>
      <Label color={ORANGE} x={625.75} y={158} size={13.5} opacity={0.8} anchor="middle">2 judges</Label>
      <Label color={ORANGE} x={625.75} y={176} size={13.5} opacity={0.8} anchor="middle">6 rubric axes</Label>
      <Label x={716} y={20}>reward</Label>
      <Label x={836} y={20} anchor="middle">vs. group</Label>
      <Label x={790} y={300} size={13} italic opacity={0.7} anchor="middle">real values from one</Label>
      <Label x={790} y={316} size={13} italic opacity={0.7} anchor="middle">training case</Label>

      {/* the comparison flows back to the model */}
      <Arrow points={[[626, 280], [626, 298], [224, 298], [224, 203.5]]} headLength={13.5} headWidth={13.5} />
      <Label x={250} y={320} size={14.4} italic opacity={0.7}>update weights toward above-average conversations</Label>
    </g>
  )
}
