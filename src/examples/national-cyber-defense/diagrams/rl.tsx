import { Arrow, Box, Label, Line, ORANGE, WHITE } from '../../../diagrams/primitives'

/**
 * Dream, RL (GRPO): the model runs inside Dream's unchanged production agent,
 * answering analyst questions about a simulated customer network with its
 * real tools. Each question is answered 8 times; every answer is scored (by
 * code for verifiable questions, otherwise by an LLM judge plus a group judge)
 * and the scores become weight updates to a window of middle decoder layers.
 * No per-answer reward values are shown: the FAQ gives only one real example.
 * Canvas: 900 x 330 px (set in `index.ts`). White, with the accent (orange) on
 * the model, scorer and reward.
 */
export function DreamRl() {
  const rows = [54.5, 147.5, 241]
  return (
    <g color={WHITE}>
      {/* analyst question → model */}
      <Label x={62.75} y={102} anchor="middle">analyst</Label>
      <Label x={62.75} y={116} anchor="middle">question</Label>
      <Box x={13.5} y={124} w={98.5} h={52} />
      <Line from={[27, 142]} to={[98.5, 142]} opacity={0.3} />
      <Line from={[27, 158]} to={[78, 158]} opacity={0.3} />
      <Arrow points={[[115.5, 150], [149.5, 150]]} />

      {/* the agent's real tools, and the simulated network they query */}
      <Box x={152.5} y={22} w={67} h={50} />
      <Label x={186} y={43} size={12.5} anchor="middle">tools +</Label>
      <Label x={186} y={60} size={12.5} anchor="middle">skills</Label>
      <Arrow points={[[186, 76], [186, 91.5]]} both strokeWidth={2} headLength={7} headWidth={8} />
      <Box x={228} y={22} w={67} h={50} />
      <Label x={261.5} y={43} size={12.5} anchor="middle">simulated</Label>
      <Label x={261.5} y={60} size={12.5} anchor="middle">network</Label>
      <Arrow points={[[261.5, 76], [261.5, 91.5]]} both strokeWidth={2} headLength={7} headWidth={8} />

      <Box color={ORANGE} x={152.5} y={95} w={142.5} h={110} radius={13.5} strokeWidth={3.4} />
      <Label color={ORANGE} x={223.75} y={137} size={16} anchor="middle">Nemotron 3.5</Label>
      <Label color={ORANGE} x={223.75} y={158} size={16} anchor="middle">Super VL</Label>
      <Label color={ORANGE} x={223.75} y={182} italic opacity={0.7} anchor="middle">in Dream's agent</Label>

      {/* model → eight answers per question (three shown) */}
      <Label x={376.5} y={18.5}>8 answers per question</Label>
      {rows.map((y, i) => (
        <g key={y}>
          <Arrow points={[[298.5, 150], [373, y]]} smooth strokeWidth={2.5} headLength={13.5} headWidth={12} />
          <Box x={376.5} y={y - 25.5} w={125.5} h={51} dashed />
          <Line from={[390, y - 7]} to={[488.5, y - 7]} strokeWidth={1.9} opacity={0.3} />
          <Line from={[390, y + 6.5]} to={[[451, 461.5, 444.5][i], y + 6.5]} strokeWidth={1.9} opacity={0.3} />
          <Arrow points={[[505.5, y], [563, y]]} strokeWidth={2.5} headLength={13.5} headWidth={12} />
        </g>
      ))}

      {/* every answer is scored */}
      <Box color={ORANGE} x={566.5} y={29} w={118.5} h={237.5} radius={13.5} strokeWidth={3.4} />
      <Label color={ORANGE} x={625.75} y={118} size={17} anchor="middle">Scorer</Label>
      <Label color={ORANGE} x={625.75} y={146} size={13} opacity={0.85} anchor="middle">code check</Label>
      <Label color={ORANGE} x={625.75} y={164} size={13} opacity={0.85} anchor="middle">or LLM judge</Label>
      <Label color={ORANGE} x={625.75} y={182} size={13} opacity={0.85} anchor="middle">+ group judge</Label>

      {/* score → reward */}
      <Arrow points={[[689, 147.5], [729, 147.5]]} />
      <Box color={ORANGE} x={733} y={112} w={150} h={72} radius={10} />
      <Label color={ORANGE} x={808} y={142} size={16} anchor="middle">reward</Label>
      <Label color={ORANGE} x={808} y={164} size={13} italic opacity={0.8} anchor="middle">e.g. pass = 1.0</Label>

      {/* the rewards flow back to the model */}
      <Arrow points={[[808, 188], [808, 298], [224, 298], [224, 208.5]]} headLength={13.5} headWidth={13.5} />
      <Label x={250} y={320} size={14.4} italic opacity={0.7}>update weights: a window of middle decoder layers</Label>
    </g>
  )
}
