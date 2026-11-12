import { Arrow, Box, Label, Line, ORANGE, WHITE } from '../../../diagrams/primitives'

/**
 * Samaya, RL (online GRPO): the model researches each question with its
 * finance tools, eight attempts per question; a grader scores every attempt
 * against the question's rubric, and the weights move toward the
 * higher-scoring attempts. Canvas: 880 x 330 px (set in `index.ts`).
 * White, with the accent (orange) on the model, grader and rewards.
 */
export function SamayaRl() {
  // The three attempts are stacked rows, 93 px apart: same layout, different y.
  const rows = [54.5, 147.5, 241]
  // How much of the rubric each attempt satisfied (bar length only, no numbers).
  const rewards = [0.25, 0.9, 0.55]

  return (
    <g color={WHITE}>
      {/* training question → model */}
      <Label x={62.75} y={110} anchor="middle">training question</Label>
      <Box x={13.5} y={119} w={98.5} h={57.5} />
      <Line from={[27, 139]} to={[98.5, 139]} opacity={0.3} />
      <Line from={[27, 156]} to={[78, 156]} opacity={0.3} />
      <Arrow points={[[115.5, 147.5], [149.5, 147.5]]} />

      {/* the model, with its research tools */}
      <Box x={152.5} y={22} w={142.5} h={46} />
      <Label x={223.75} y={50} anchor="middle">37 research tools</Label>
      <Arrow points={[[223.75, 72], [223.75, 91.5]]} both strokeWidth={2} headLength={8} headWidth={9} />

      <Box color={ORANGE} x={152.5} y={95} w={142.5} h={105} radius={13.5} strokeWidth={3.4} />
      <Label color={ORANGE} x={223.75} y={137} size={16} anchor="middle">Nemotron 3.5</Label>
      <Label color={ORANGE} x={223.75} y={158} size={16} anchor="middle">Lightning</Label>
      <Label color={ORANGE} x={223.75} y={180} italic opacity={0.7} anchor="middle">after SFT</Label>

      {/* model → eight attempts per question (three shown) */}
      <Label x={386} y={18.5}>8 attempts per question</Label>
      {rows.map((y, i) => (
        <g key={y}>
          <Arrow points={[[298.5, 147.5], [373, y]]} smooth strokeWidth={2.5} headLength={13.5} headWidth={12} />
          <Box x={376.5} y={y - 25.5} w={125.5} h={51} dashed />
          <Line from={[390, y - 7]} to={[488.5, y - 7]} strokeWidth={1.9} opacity={0.3} />
          <Line from={[390, y + 6.5]} to={[i === 0 ? 451 : i === 1 ? 461.5 : 444.5, y + 6.5]} strokeWidth={1.9} opacity={0.3} />
          <Arrow points={[[505.5, y], [563, y]]} strokeWidth={2.5} headLength={13.5} headWidth={12} />
          {/* reward for the attempt */}
          <Line from={[688.5, y]} to={[736, y]} strokeWidth={2} opacity={0.4} />
          <rect x={740} y={y - 7} width={110} height={14} rx={4} fill="currentColor" fillOpacity={0.12} />
          <rect x={740} y={y - 7} width={110 * rewards[i]} height={14} rx={4} fill={ORANGE} fillOpacity={i === 1 ? 1 : 0.6} />
        </g>
      ))}

      {/* the grader scores each attempt against the rubric */}
      <Box color={ORANGE} x={566.5} y={29} w={118.5} h={237.5} radius={13.5} strokeWidth={3.4} />
      <Label color={ORANGE} x={625.75} y={140} size={17} anchor="middle">Rubric</Label>
      <Label color={ORANGE} x={625.75} y={161} size={17} anchor="middle">grader</Label>
      <Label x={740} y={18.5}>reward</Label>
      <Label x={795} y={285} size={13.5} italic opacity={0.7} anchor="middle">share of essential</Label>
      <Label x={795} y={302} size={13.5} italic opacity={0.7} anchor="middle">rubric items met</Label>

      {/* the rewards flow back to the model */}
      <Arrow points={[[626, 270], [626, 295], [224, 295], [224, 203.5]]} headLength={13.5} headWidth={13.5} />
      <Label x={270} y={317} size={14.4} italic opacity={0.7}>update weights toward higher-reward attempts</Label>
    </g>
  )
}
