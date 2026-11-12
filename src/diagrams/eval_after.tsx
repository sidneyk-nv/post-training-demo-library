import { WHITE, GREEN, Label, Dataset, Box, Arrow, RED } from './primitives'

/** Illustrative scores (% correct) per category, and the level we're aiming for. */
const categories = ['instruction following', 'domain-specific tasks', 'multi-step reasoning', 'aligned behavior']
const scores = {
  base: [26, 38, 31, 22],
  postTrained: [82, 77, 79, 88],
}
const target = 75

/**
 * Step 4, evaluation: re-run the model on the same domain-specific taskset (or benchmark)
 * to measure whether post-training has improved its performance..
 * Canvas: 848 x 231 px (set in `diagrams/index.ts`).
 */
export function EvalAfterDiagram({ postTrained }: { postTrained?: boolean }) {
  // Mostly white; the model and the score bars take the accent:
  // red for the base model's low scores, green once post-trained.
  const accent = postTrained ? GREEN : RED
  const values = postTrained ? scores.postTrained : scores.base

  // Score bars: a track from barX to barX + barW, filled up to the score.
  const barX = 610
  const barW = 190
  const rowY = [50, 95, 140, 185]
  const targetX = barX + (barW * target) / 100

  return (
    <g color={WHITE}>
      {/* model → responses */}
      <Box x={10} y={88} w={112} h={66} color={accent} />
      {postTrained ? (
        <>
          <Label x={66} y={117} size={13.5} anchor="middle" color={accent}>Post-trained</Label>
          <Label x={66} y={135} size={13.5} anchor="middle" color={accent}>Model</Label>
        </>
      ) : (
        <>
          <Label x={66} y={117} size={13.5} anchor="middle" color={accent}>Base</Label>
          <Label x={66} y={135} size={13.5} anchor="middle" color={accent}>Model</Label>
        </>
      )}
      <Arrow points={[[126, 121], [200, 121]]} strokeWidth={2.2} headLength={12} headWidth={10} />
      <Label x={163} y={107} size={12.5} anchor="middle">responses</Label>

      {/* the taskset or benchmark the responses are scored on */}
      <Dataset x={202} y={88} w={150} h={66} />
      <Label x={291} y={182} size={13.5} anchor="middle">domain-specific taskset</Label>
      <Label x={291} y={199} size={12.5} italic opacity={0.7} anchor="middle">or public benchmark</Label>

      {/* taskset → scores */}
      <Arrow points={[[380, 121], [440, 121]]} strokeWidth={2.2} headLength={12} headWidth={10} />
      <Label x={410} y={107} size={12.5} anchor="middle">score</Label>

      {/* scores by category */}
      <Label x={barX} y={18} size={12.5} opacity={0.7}>SCORES BY CATEGORY (% CORRECT)</Label>
      {categories.map((name, i) => {
        const y = rowY[i]
        const v = values[i]
        const barColor = accent
        return (
          <g key={name}>
            <Label x={barX - 14} y={y + 4.5} size={12.5} anchor="end">{name}</Label>
            <rect x={barX} y={y - 11} width={barW} height={22} rx={4} fill="currentColor" fillOpacity={0.07} />
            <rect x={barX} y={y - 11} width={(barW * v) / 100} height={22} rx={4} fill={barColor} fillOpacity={0.55} />
            <Label x={barX + barW + 12} y={y + 4.5} size={12.5} opacity={1} color={barColor}>{v}%</Label>
          </g>
        )
      })}
      <line x1={targetX} y1={28} x2={targetX} y2={206} stroke="currentColor" strokeOpacity={0.5} strokeWidth={1.2} strokeDasharray="3.6 3.6" />
      <Label x={targetX} y={222} size={12} opacity={0.7} anchor="middle">target</Label>
    </g>
  )
}
