import { Box, GREEN, Label, WHITE } from '../../../diagrams/primitives'
import { Judges, PatientAndTools, ScoreTable, ValidationCases } from './grading'

/**
 * Patient Interaction, step 3: run the GRPO-trained model (step 75) on the
 * same held-out patient cases, with the same judges, to compare with the base
 * model. Canvas: 1010 x 250 px (set in `index.ts`).
 * White, with the accent (green) on the model and the improvements.
 */
export function PatientEvalAfter() {
  const accent = GREEN
  return (
    <g color={WHITE}>
      <ValidationCases />
      <Box x={186} y={80} w={142} h={90} radius={13.5} strokeWidth={3.4} color={accent} />
      <Label x={257} y={111} size={17.8} anchor="middle" color={accent}>Nemotron 3.5</Label>
      <Label x={257} y={133} size={17.8} anchor="middle" color={accent}>Lightning</Label>
      <Label x={257} y={154} italic opacity={0.7} anchor="middle" color={accent}>after GRPO</Label>
      <PatientAndTools />
      <Judges />
      <ScoreTable accent={accent} after />
    </g>
  )
}
