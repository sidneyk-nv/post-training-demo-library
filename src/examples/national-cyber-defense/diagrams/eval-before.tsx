import { Arrow, Box, Dataset, Label, RED, WHITE } from '../../../diagrams/primitives'

/**
 * Dream, step 1: score the base Nemotron 3.5 Super VL on 15 held-out
 * cybersecurity benchmarks (mean of three runs). Canvas: 900 x 250 px (set in
 * `index.ts`). White, with the accent (red) on the model and its score.
 */
export function DreamEvalBefore() {
  const accent = RED
  const cx = 740
  return (
    <g color={WHITE}>
      <Dataset x={18} y={92} w={84} h={66} checkboxes={false} />
      <Label x={68} y={190} anchor="middle">15 cybersecurity</Label>
      <Label x={68} y={207} anchor="middle">benchmarks</Label>
      <Arrow points={[[132, 125], [176, 125]]} />

      <Box x={186} y={80} w={142} h={90} radius={13.5} strokeWidth={3.4} color={accent} />
      <Label x={257} y={111} size={17.8} anchor="middle" color={accent}>Nemotron 3.5</Label>
      <Label x={257} y={133} size={17.8} anchor="middle" color={accent}>Super VL</Label>
      <Label x={257} y={154} italic opacity={0.7} anchor="middle" color={accent}>base model</Label>

      <Arrow points={[[338, 125], [590, 125]]} />
      <Label x={464} y={112} italic opacity={0.7} anchor="middle">averaged over 3 runs</Label>

      <Label x={cx} y={82} size={12.5} opacity={0.7} anchor="middle">MEAN CYBERSECURITY SCORE</Label>
      <Label x={cx} y={141} size={60} opacity={1} anchor="middle" color={accent}>65.4</Label>
      <Label x={cx} y={170} size={13.5} opacity={0.7} anchor="middle">across 15 benchmarks</Label>
    </g>
  )
}
