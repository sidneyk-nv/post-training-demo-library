import { Box, Label, RED, WHITE } from '../../../diagrams/primitives'
import { Judges, PatientAndTools, ScoreTable, ValidationCases } from './grading'

/**
 * Patient Interaction, step 1: run the base Nemotron 3.5 Lightning on the
 * held-out patient cases and score each conversation with the two LLM judges.
 * Canvas: 1010 x 250 px (set in `index.ts`).
 * White, with the accent (red) on the model and its overall score.
 */
export function PatientEvalBefore() {
  const accent = RED
  return (
    <g color={WHITE}>
      <ValidationCases />
      <Box x={186} y={80} w={142} h={90} radius={13.5} strokeWidth={3.4} color={accent} />
      <Label x={257} y={111} size={17.8} anchor="middle" color={accent}>Nemotron 3.5</Label>
      <Label x={257} y={133} size={17.8} anchor="middle" color={accent}>Lightning</Label>
      <Label x={257} y={154} italic opacity={0.7} anchor="middle" color={accent}>base model</Label>
      <PatientAndTools />
      <Judges />
      <ScoreTable accent={accent} />
    </g>
  )
}
