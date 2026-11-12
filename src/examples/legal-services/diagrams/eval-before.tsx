import { Box, Label, RED, WHITE } from '../../../diagrams/primitives'
import { EmbeddingSpace, Inputs } from './retrieval'

/**
 * Harvey, step 1: score the base Nemotron Embed 3.5 on case law retrieval over
 * US Caselaw (Delaware subset). Canvas: 900 x 300 px (set in `index.ts`).
 * White, with the accent (red) on the model and its score.
 * Skeleton: the eval set, metric and score are still to be confirmed.
 */

export function HarveyEvalBefore() {
  const accent = RED
  // Centre of the score readout.
  const cx = 780

  return (
    <g color={WHITE} transform="translate(16 -25)">
      <Inputs />
      <Box x={206} y={105} w={142} h={90} radius={13.5} strokeWidth={3.4} color={accent} />
      <Label x={277} y={136} size={17.8} anchor="middle" color={accent}>Nemotron</Label>
      <Label x={277} y={158} size={17.8} anchor="middle" color={accent}>Embed 3.5</Label>
      <Label x={277} y={179} italic opacity={0.7} anchor="middle" color={accent}>base model</Label>
      <EmbeddingSpace accent={accent} />

      {/* the resulting score */}
      <Label x={cx} y={107} size={13.5} opacity={0.7} anchor="middle">[METRIC: TBD]</Label>
      <Label x={cx} y={166} size={52} opacity={1} anchor="middle" color={accent}>[TBD]</Label>
    </g>
  )
}
