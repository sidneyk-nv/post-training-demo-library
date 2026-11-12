import { Box, GREEN, Label, WHITE } from '../../../diagrams/primitives'
import { EmbeddingSpace, Inputs } from './retrieval'

/**
 * Harvey, step 3: score the post-trained Nemotron Embed 3.5 on the same case
 * law retrieval task, to compare with the base model's score.
 * Canvas: 900 x 300 px (set in `index.ts`).
 * White, with the accent (green) on the model and its score.
 * Skeleton: the eval set, metric and scores are still to be confirmed.
 */
export function HarveyEvalAfter() {
  const accent = GREEN
  // Centre of the score readout.
  const cx = 780

  return (
    <g color={WHITE} transform="translate(16 -25)">
      <Inputs />
      <Box x={206} y={105} w={142} h={90} radius={13.5} strokeWidth={3.4} color={accent} />
      <Label x={277} y={136} size={17.8} anchor="middle" color={accent}>Nemotron</Label>
      <Label x={277} y={158} size={17.8} anchor="middle" color={accent}>Embed 3.5</Label>
      <Label x={277} y={179} italic opacity={0.7} anchor="middle" color={accent}>post-trained</Label>
      <EmbeddingSpace accent={accent} />

      {/* the resulting score, compared with before training */}
      <Label x={cx} y={107} size={13.5} opacity={0.7} anchor="middle">[METRIC: TBD]</Label>
      <Label x={cx} y={166} size={52} opacity={1} anchor="middle" color={accent}>[TBD]</Label>
      <Label x={cx} y={195} size={13.5} opacity={0.7} anchor="middle">up from [TBD]</Label>
    </g>
  )
}
