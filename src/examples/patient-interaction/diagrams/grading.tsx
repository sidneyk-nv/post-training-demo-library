import { Arrow, Box, Dataset, Label, Line } from '../../../diagrams/primitives'

/**
 * The parts of the Eval diagrams that are the same before and after training:
 * the validation cases on the left, the simulated patient and clinical tools
 * under the model, the conversation and the two LLM judges. Each Eval diagram
 * draws the model (at x = 186) and its score. Canvas px, centred vertically on
 * y = 125 (the 900 x 250 Eval diagrams).
 */

/** The held-out synthetic patient cases. */
export function ValidationCases() {
  return (
    <g>
      <Dataset x={18} y={92} w={84} h={66} checkboxes={false} />
      <Label x={68} y={190} anchor="middle">97 patient cases</Label>
      <Label x={68} y={207} italic opacity={0.7} anchor="middle">synthetic, held out</Label>
      <Arrow points={[[132, 125], [176, 125]]} />
    </g>
  )
}

/** The model talks to a simulated patient and uses sandboxed clinical tools. */
export function PatientAndTools() {
  return (
    <g>
      <Label x={257} y={196} size={13} anchor="middle">with a simulated patient</Label>
      <Label x={257} y={213} size={13} italic opacity={0.7} anchor="middle">and clinical tools</Label>
    </g>
  )
}

/** The whole conversation is scored by two Nemotron judges on a six-axis rubric. */
export function Judges() {
  const judges = [
    { name: 'Nemotron 3 Super', y: 48 },
    { name: 'Nemotron 3 Ultra', y: 102 },
  ]
  return (
    <g>
      <Arrow points={[[338, 125], [366, 125]]} />
      <Box x={370} y={95} w={50} h={60} radius={6} dashed />
      <Line from={[379, 110]} to={[411, 110]} opacity={0.3} strokeWidth={1.5} />
      <Line from={[379, 122]} to={[411, 122]} opacity={0.3} strokeWidth={1.5} />
      <Line from={[379, 134]} to={[400, 134]} opacity={0.3} strokeWidth={1.5} />
      <Label x={395} y={174} anchor="middle">conversation</Label>

      <Arrow points={[[424, 125], [452, 125]]} />
      <Label x={556} y={24} size={12.5} opacity={0.7} anchor="middle">LLM JUDGES</Label>
      <Box x={456} y={34} w={200} h={182} radius={10} strokeWidth={1.8} dashed />
      {judges.map((judge) => (
        <g key={judge.name}>
          <Box x={472} y={judge.y} w={168} h={44} radius={8} />
          <Label x={556} y={judge.y + 27} anchor="middle">{judge.name}</Label>
        </g>
      ))}
      <Label x={556} y={176} anchor="middle">6-axis rubric</Label>
      <Label x={556} y={194} italic opacity={0.7} anchor="middle">each scored 1–5</Label>

      <Arrow points={[[660, 125], [694, 125]]} />
    </g>
  )
}

/**
 * Rubric scores on the 97 validation cases (1–5 scale), base model vs. after
 * 75 GRPO updates. Only the dimensions that improved are shown;
 * conversational quality fell (4.438 → 3.954) and is left out.
 */
const SCORES = [
  { name: 'Task completion', before: '4.459', after: '4.711', change: '+0.253' },
  { name: 'Clinical safety', before: '4.119', after: '4.242', change: '+0.124' },
  { name: 'Workflow accuracy', before: '4.149', after: '4.598', change: '+0.448' },
  { name: 'Triage quality', before: '3.134', after: '3.789', change: '+0.655' },
  { name: 'Clinical helpfulness', before: '3.923', after: '4.608', change: '+0.686' },
]
const AGGREGATE = { name: 'Weighted aggregate', before: '4.000', after: '4.321', change: '+0.321' }

/** The rubric scores as a table. `after` shows the trained model's scores and the change. */
export function ScoreTable({ accent, after }: { accent: string; after?: boolean }) {
  const [labelX, valueX, changeX] = [708, 912, 996]
  const rowY = (i: number) => 72 + i * 26
  return (
    <g>
      <Label x={labelX} y={40} size={12.5} opacity={0.7}>RUBRIC SCORES (OUT OF 5)</Label>
      {SCORES.map((row, i) => (
        <g key={row.name}>
          <Label x={labelX} y={rowY(i)} size={14}>{row.name}</Label>
          <Label x={valueX} y={rowY(i)} size={14} opacity={1} anchor="end">{after ? row.after : row.before}</Label>
          {after && <Label x={changeX} y={rowY(i)} size={14} opacity={1} anchor="end" color={accent}>{row.change}</Label>}
        </g>
      ))}
      <Line from={[labelX, 194]} to={[after ? changeX : valueX, 194]} strokeWidth={1.5} opacity={0.3} />
      <Label x={labelX} y={220} size={15} opacity={1}>{AGGREGATE.name}</Label>
      <Label x={valueX} y={220} size={18} opacity={1} anchor="end" color={accent}>{after ? AGGREGATE.after : AGGREGATE.before}</Label>
      {after && <Label x={changeX} y={220} size={15} opacity={1} anchor="end" color={accent}>{AGGREGATE.change}</Label>}
    </g>
  )
}
