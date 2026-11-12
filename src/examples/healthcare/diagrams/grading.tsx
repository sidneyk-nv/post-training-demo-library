import { Arrow, Box, Dataset, Label, Line } from '../../../diagrams/primitives'

/**
 * The parts of the R1 Eval diagrams that are the same before and after
 * training: the synthetic denials on the left, the appeal the model writes,
 * the rubric it is checked against and the scores. Each Eval diagram draws the
 * model itself (at x = 186). Canvas px, centred vertically on y = 125 (900 x 250).
 */

/** The synthetic denials the model is evaluated on. */
export function EvalData() {
  return (
    <g>
      <Dataset x={18} y={92} w={84} h={66} checkboxes={false} />
      <Label x={68} y={190} italic opacity={0.7} anchor="middle">Synthetic denials</Label>
      <Label x={68} y={203} italic opacity={0.7} anchor="middle">(proprietary dataset)</Label>
      <Arrow points={[[132, 125], [176, 125]]} />
    </g>
  )
}

const RUBRIC_CATEGORIES = ['Format', 'Answer the denial', 'Evidence', 'Exhibits', 'Advocacy boundaries']

/** The appeal the model writes, and the rubric it is checked against. */
export function AppealAndRubric() {
  return (
    <g>
      <Arrow points={[[338, 125], [366, 125]]} />
      <Box x={370} y={95} w={50} h={60} radius={6} dashed />
      <Line from={[379, 110]} to={[411, 110]} opacity={0.3} strokeWidth={1.5} />
      <Line from={[379, 122]} to={[411, 122]} opacity={0.3} strokeWidth={1.5} />
      <Line from={[379, 134]} to={[400, 134]} opacity={0.3} strokeWidth={1.5} />
      <Label x={395} y={174} anchor="middle">appeal</Label>

      <Arrow points={[[424, 125], [452, 125]]} />
      <Box x={456} y={30} w={200} h={190} radius={10} strokeWidth={1.8} dashed />
      <Label x={556} y={54} size={12.5} opacity={0.7} anchor="middle">DETAILED RUBRIC</Label>
      {RUBRIC_CATEGORIES.map((name, i) => (
        <Label key={name} x={476} y={92 + i * 26}>{name}</Label>
      ))}

      <Arrow points={[[660, 125], [694, 125]]} />
    </g>
  )
}

/** The harness the model runs in. */
export function HarnessNote() {
  return (
    <g>
      <Label x={257} y={196} size={13} anchor="middle">run in the R1 harness</Label>
      <Label x={257} y={213} size={13} italic opacity={0.7} anchor="middle">tools, skills, shared knowledge</Label>
    </g>
  )
}

/** Success rate on the first pass and on four passes. Pass '[TBD]' for values not confirmed. */
export function PassScores({ accent, values }: { accent: string; values: string[] }) {
  return (
    <g>
      <Label x={790} y={54} size={12.5} opacity={0.7} anchor="middle">RESULTING SCORES</Label>
      {['Success rate, first pass', 'Success rate, four passes'].map((name, i) => (
        <g key={name}>
          <Label x={790} y={96 + i * 76} size={13.5} anchor="middle">{name}</Label>
          <Label x={790} y={132 + i * 76} size={34} opacity={1} anchor="middle" color={accent}>{values[i]}</Label>
        </g>
      ))}
    </g>
  )
}
