import { Box, GREEN, Label, WHITE } from '../../../diagrams/primitives'
import { AppealAndRubric, EvalData, HarnessNote, PassScores } from './grading'

/**
 * R1, step 3: score the post-trained model on the same appeals for claim
 * denials, graded with the 24-rule rubric. Canvas: 900 x 250 px (set in
 * `index.ts`). White, with the accent (green) on the model and its scores.
 */

export function R1EvalAfter() {
  const accent = GREEN

  return (
    <g color={WHITE}>
      <EvalData />
      <Box x={186} y={80} w={142} h={90} radius={13.5} strokeWidth={3.4} color={accent} />
      <Label x={257} y={120} size={17.8} anchor="middle" color={accent}>R1-super</Label>
      <Label x={257} y={144} italic opacity={0.7} anchor="middle" color={accent}>iteration 2</Label>
      <HarnessNote />
      <AppealAndRubric />
      <PassScores accent={accent} values={['31.3%', '71.9%']} />
    </g>
  )
}
