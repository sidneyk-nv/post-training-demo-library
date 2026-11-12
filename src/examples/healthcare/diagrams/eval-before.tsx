import { Box, Label, RED, WHITE } from '../../../diagrams/primitives'
import { AppealAndRubric, EvalData, HarnessNote, PassScores } from './grading'

/**
 * R1, step 1: score the base Nemotron 3.5 Super VL on appeals for claim
 * denials, graded with the 24-rule rubric. Canvas: 900 x 250 px (set in
 * `index.ts`). White, with the accent (red) on the model and its scores.
 */

export function R1EvalBefore() {
  const accent = RED

  return (
    <g color={WHITE}>
      <EvalData />
      <Box x={186} y={80} w={142} h={90} radius={13.5} strokeWidth={3.4} color={accent} />
      <Label x={257} y={111} size={17.8} anchor="middle" color={accent}>Nemotron 3.5</Label>
      <Label x={257} y={133} size={17.8} anchor="middle" color={accent}>Super VL</Label>
      <Label x={257} y={154} italic opacity={0.7} anchor="middle" color={accent}>base model</Label>
      <HarnessNote />
      <AppealAndRubric />
      <PassScores accent={accent} values={['12.5%', '28.1%']} />
    </g>
  )
}
