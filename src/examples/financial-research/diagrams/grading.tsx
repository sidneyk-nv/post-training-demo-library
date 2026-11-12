import { Arrow, Box, Dataset, Label, Line } from '../../../diagrams/primitives'

/**
 * The parts of the Eval diagrams that are the same before and after training:
 * the FrontierFinance questions on the left, the arrow into the model
 * (drawn by each diagram, at x = 186) and the LLM judges with their rubric.
 * Canvas px, centred vertically on y = 125 (the 900 x 250 Eval diagrams).
 */
export function Questions() {
  return (
    <g>
      <Dataset x={18} y={92} w={84} h={66} checkboxes={false} />
      <Label x={69} y={186} anchor="middle">FrontierFinance</Label>
      <Label x={69} y={203} italic opacity={0.7} anchor="middle">benchmark questions</Label>
      <Arrow points={[[132, 125], [176, 125]]} />
    </g>
  )
}

/**
 * The model's answer is judged against the question's rubric by three LLM
 * judges, and the rubric items are decided by majority vote
 * (FrontierFinance's grading).
 */
export function Jury() {
  const judges = [
    { name: 'Judge A', y: 46 },
    { name: 'Judge B', y: 103 },
    { name: 'Judge C', y: 160 },
  ]
  return (
    <g>
      <Arrow points={[[338, 125], [376, 125]]} />

      <Label x={496} y={24} size={12.5} opacity={0.7} anchor="middle">LLM JUDGES</Label>
      <Box x={386} y={34} w={220} h={182} radius={10} strokeWidth={1.8} dashed />

      {/* the rubric goes to every judge */}
      <Box x={398} y={95} w={40} h={60} radius={6} strokeWidth={2} />
      {[109, 120, 131, 142].map((y, i) => (
        <Line key={y} from={[406, y]} to={[i === 3 ? 420 : 430, y]} strokeWidth={1.5} opacity={0.4} />
      ))}
      <Label x={418} y={174} anchor="middle">rubric</Label>
      {judges.map((judge) => (
        <g key={judge.name}>
          <Arrow points={[[442, 125], [466, judge.y + 22]]} smooth strokeWidth={1.8} headLength={8} headWidth={8} />
          <Box x={470} y={judge.y} w={124} h={44} radius={8} />
          <Label x={532} y={judge.y + 27} anchor="middle">{judge.name}</Label>
        </g>
      ))}
      <Label x={496} y={236} italic opacity={0.7} anchor="middle">rubric items decided by majority vote</Label>

      <Arrow points={[[616, 125], [652, 125]]} />
    </g>
  )
}
