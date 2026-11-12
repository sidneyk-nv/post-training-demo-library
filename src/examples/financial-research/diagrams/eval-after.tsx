import { Box, GREEN, Label, WHITE } from '../../../diagrams/primitives'
import { Jury, Questions } from './grading'

/**
 * Samaya, step 4: score the post-trained model (Samaya Sterling) on the same
 * FrontierFinance questions, with the same judges, to compare with the base
 * model's score. Canvas: 900 x 250 px (set in `index.ts`).
 * White, with the accent (green: past the frontier) on the model and its score.
 */
export function SamayaEvalAfter() {
  const accent = GREEN
  // Centre of the score readout.
  const cx = 776

  return (
    <g color={WHITE}>
      <Questions />
      <Box x={186} y={80} w={142} h={90} radius={13.5} strokeWidth={3.4} color={accent} />
      <Label x={257} y={111} size={17.8} anchor="middle" color={accent}>Samaya</Label>
      <Label x={257} y={133} size={17.8} anchor="middle" color={accent}>Sterling</Label>
      <Label x={257} y={154} italic opacity={0.7} anchor="middle" color={accent}>post-trained</Label>
      <Jury />

      {/* the resulting score: one number, compared with before training and the frontier */}
      <Label x={cx} y={82} size={13.5} opacity={0.7} anchor="middle">FRONTIERFINANCE SCORE</Label>
      <Label x={cx} y={141} size={60} opacity={1} anchor="middle" color={accent}>58.9%</Label>
      <Label x={cx} y={170} size={13.5} opacity={0.7} anchor="middle">up from 42.5% before post-training</Label>
      <Label x={cx} y={190} size={13.5} opacity={0.7} anchor="middle">best frontier model: 55.9%</Label>
    </g>
  )
}
