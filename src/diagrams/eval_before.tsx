import { WHITE, Label, Dataset, Box, Arrow, RED } from './primitives'

/** Example scores and categories, with example target scores. */
const categories = ['safety', 'task completion', 'multi-step reasoning', 'aligned behavior']
const scores = [26, 38, 31, 22]
const target = 75

/**
 * Step 1, evaluation: run the model on a domain-specific taskset (or a benchmark),
 * score its answers, and compare the scores by category with a target.
 * Canvas: 848 x 231 px (set in `diagrams/index.ts`).
 * Accent color: red
 */
export function EvalBeforeDiagram() {
  // Accent color: red for the base model's low scores.
  const accent = RED
  const values = scores

  // Score bars
  const barX = 622
  const barW = 170
  const rowY = [50, 95, 140, 185]
  const targetX = barX + (barW * target) / 100

  return (
    <g color={WHITE}>
      {/* the model, whose answers are run against the tasks */}
      <Box x={10} y={76} w={142} h={90} radius={13.5} strokeWidth={3.4} color={accent} />
      <Label x={81} y={115} size={17.8} anchor="middle" color={accent}>Base</Label>
      <Label x={81} y={137} size={17.8} anchor="middle" color={accent}>Model</Label>
      <Arrow points={[[162, 121], [212, 121]]} />

      {/* the benchmark (domain-specific tasks) the model's answers are checked against */}
      <Dataset x={222} y={88} w={150} h={66} />
      <Label x={306} y={182} size={13.5} anchor="middle">Evaluation benchmark</Label>
      <Label x={306} y={199} size={13.5} italic opacity={0.7} anchor="middle">domain-specific tasks</Label>

      {/* tasks → resulting scores */}
      <Arrow points={[[400, 121], [450, 121]]} />

      {/* the resulting scores, by category */}
      <Label x={barX} y={18} size={13.5} opacity={0.7}>RESULTING SCORES BY CATEGORY</Label>
      {categories.map((name, i) => {
        const y = rowY[i]
        const v = values[i]
        const barColor = accent
        return (
          <g key={name}>
            <Label x={barX - 14} y={y + 4.5} size={13.5} anchor="end">{name}</Label>
            <rect x={barX} y={y - 11} width={barW} height={22} rx={4} fill="currentColor" fillOpacity={0.12} />
            <rect x={barX} y={y - 11} width={(barW * v) / 100} height={22} rx={4} fill={barColor} fillOpacity={0.85} />
            <Label x={barX + barW + 12} y={y + 4.5} size={13.5} opacity={1} color={barColor}>{v}%</Label>
          </g>
        )
      })}
      <line x1={targetX} y1={28} x2={targetX} y2={206} stroke="currentColor" strokeOpacity={0.7} strokeWidth={1.5} strokeDasharray="4 4" />
      <Label x={targetX} y={222} size={13} opacity={0.7} anchor="middle">target</Label>
    </g>
  )
}
