import { Box, Label, RED, WHITE } from '../../../diagrams/primitives'
import { Jury, Questions } from './grading'

/**
 * Samaya, step 1: run the base model (Nemotron 3.5 Lightning) on the
 * FrontierFinance questions, grade its answers against each question's rubric
 * and score it. Canvas: 900 x 250 px (set in `index.ts`).
 * White, with the accent (red: below the frontier) on the model and its score.
 */
export function SamayaEvalBefore() {
  const accent = RED
  // Centre of the score readout.
  const cx = 776

  return (
    <g color={WHITE}>
      <Questions />
      <Box x={186} y={80} w={142} h={90} radius={13.5} strokeWidth={3.4} color={accent} />
      <Label x={257} y={119} size={17.8} anchor="middle" color={accent}>Nemotron 3.5</Label>
      <Label x={257} y={141} size={17.8} anchor="middle" color={accent}>Lightning</Label>
      <Jury />

      {/* the resulting score: one number, with the frontier for comparison */}
      <Label x={cx} y={82} size={13.5} opacity={0.7} anchor="middle">FRONTIERFINANCE SCORE</Label>
      <Label x={cx} y={141} size={60} opacity={1} anchor="middle" color={accent}>42.5%</Label>
      <Label x={cx} y={176} size={13.5} opacity={0.7} anchor="middle">best frontier model: 55.9%</Label>
    </g>
  )
}
