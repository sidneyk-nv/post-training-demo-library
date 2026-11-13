import { Arrow, Box, Dataset, GREEN, Label, Line, WHITE } from '../../../diagrams/primitives'

/**
 * Dream, final step: the post-trained Nemotron 3.5 Super VL. Two results, each
 * labelled with the stage it measures:
 * - 15 cybersecurity benchmarks, 65.4 → 74.1 (after mid-training + SFT, "MiST");
 * - validation on held-out analyst questions, 0.70 → 0.75 (during RL),
 *   with shorter, more economical answers.
 * Canvas: 1010 x 250 px (set in `index.ts`).
 * White, with the accent (green) on the model and the improvements.
 */
export function DreamEvalAfter() {
  const accent = GREEN
  const readouts = [
    { cx: 520, title: 'CYBERSECURITY BENCHMARKS', value: '74.1', from: 'up from 65.4', when: 'after mid-training + SFT' },
    { cx: 800, title: 'HELD-OUT ANALYST QUESTIONS', value: '0.75', from: 'up from 0.70', when: 'during RL' },
  ]
  return (
    <g color={WHITE}>
      <Dataset x={18} y={92} w={84} h={66} checkboxes={false} />
      <Label x={68} y={190} anchor="middle">benchmarks +</Label>
      <Label x={68} y={207} anchor="middle">held-out questions</Label>
      <Arrow points={[[132, 125], [176, 125]]} />

      <Box x={186} y={80} w={142} h={90} radius={13.5} strokeWidth={3.4} color={accent} />
      <Label x={257} y={111} size={17.8} anchor="middle" color={accent}>Nemotron 3.5</Label>
      <Label x={257} y={133} size={17.8} anchor="middle" color={accent}>Super VL</Label>
      <Label x={257} y={154} italic opacity={0.7} anchor="middle" color={accent}>post-trained</Label>
      <Arrow points={[[338, 125], [380, 125]]} />

      {readouts.map((r) => (
        <g key={r.title}>
          <Label x={r.cx} y={40} size={12.5} opacity={0.7} anchor="middle">{r.title}</Label>
          <Label x={r.cx} y={96} size={52} opacity={1} anchor="middle" color={accent}>{r.value}</Label>
          <Label x={r.cx} y={122} size={13.5} opacity={0.9} anchor="middle">{r.from}</Label>
          <Label x={r.cx} y={140} size={13.5} italic opacity={0.7} anchor="middle">{r.when}</Label>
        </g>
      ))}
      <Line from={[660, 30]} to={[660, 145]} strokeWidth={1.5} opacity={0.3} />

      {/* RL also made the answers more economical */}
      <Line from={[400, 168]} to={[990, 168]} strokeWidth={1.5} opacity={0.3} />
      <Label x={695} y={194} size={12.5} opacity={0.7} anchor="middle">AFTER RL, ANSWERS ARE MORE ECONOMICAL</Label>
      <Label x={695} y={222} size={15} opacity={1} anchor="middle">
        22% shorter · 34% fewer tool calls · cut-off answers 4.8% → 1.0%
      </Label>
    </g>
  )
}
