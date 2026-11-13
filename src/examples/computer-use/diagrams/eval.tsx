import { Arrow, Box, GREEN, Label, Line, RED, WHITE } from '../../../diagrams/primitives'

/**
 * H Company, steps 1 and 4: score the model on a computer-use evaluation, before
 * and after post-training. Canvas: 900 x 290 px (set in `index.ts`).
 * White, with the accent on the model and its score (red before, green after).
 * Shows the OSWorld score (21.0% → 76.3%) large, and the other four benchmarks small.
 * The metric behind the score is still to be confirmed.
 */

/** A computer screen with a window open: a computer-use task. */
function Screen({ x, y }: { x: number; y: number }) {
  return (
    <>
      <Box x={x} y={y} w={156} h={120} />
      <Line from={[x + 1, y + 18]} to={[x + 155, y + 18]} strokeWidth={1.5} opacity={0.3} />
      <circle cx={x + 11} cy={y + 9} r={2.5} fill="currentColor" opacity={0.5} />
      <circle cx={x + 20} cy={y + 9} r={2.5} fill="currentColor" opacity={0.5} />
      <circle cx={x + 29} cy={y + 9} r={2.5} fill="currentColor" opacity={0.5} />
      <Box x={x + 14} y={y + 32} w={56} h={34} radius={4} strokeWidth={1.6} opacity={0.6} />
      <Line from={[x + 84, y + 38]} to={[x + 140, y + 38]} strokeWidth={1.8} opacity={0.3} />
      <Line from={[x + 84, y + 52]} to={[x + 128, y + 52]} strokeWidth={1.8} opacity={0.3} />
      <Line from={[x + 14, y + 84]} to={[x + 142, y + 84]} strokeWidth={1.8} opacity={0.3} />
      <Line from={[x + 14, y + 98]} to={[x + 108, y + 98]} strokeWidth={1.8} opacity={0.3} />
      {/* mouse pointer */}
      <polygon
        points={`${x + 98},${y + 62} ${x + 98},${y + 84} ${x + 104},${y + 79} ${x + 109},${y + 90} ${x + 113},${y + 88} ${x + 108},${y + 77} ${x + 116},${y + 77}`}
        fill="currentColor"
        opacity={0.9}
      />
    </>
  )
}

/** The other benchmarks: name, base score, post-trained score, gain. */
const others = [
  ['OSWorld 2.0', '0.2%', '7.9%', '+7.7'],
  ['AutomationBench', '19.4%', '35.6%', '+16.2'],
  ['PinchBench', '84.7%', '88.6%', '+3.9'],
  ['ALE', '0.6%', '8.5%', '+7.9'],
]

function HEval({ accent, name, status, before }: { accent: string; name: string[]; status: string; before: boolean }) {
  return (
    <g color={WHITE} transform="translate(71 20)">
      {/* evaluation dataset (computer-use tasks) → model → score */}
      <Label x={98} y={38} anchor="middle">evaluation dataset:</Label>
      <Label x={98} y={56} anchor="middle">computer-use tasks</Label>
      <Screen x={20} y={68} />
      <Arrow points={[[180, 128], [250, 128]]} />

      <Box x={254} y={83} w={142} h={90} radius={13.5} strokeWidth={3.4} color={accent} />
      {name.map((line, i) => (
        <Label key={line} x={325} y={name.length === 1 ? 124 : 114 + i * 22} size={17.8} anchor="middle" color={accent}>
          {line}
        </Label>
      ))}
      <Label x={325} y={name.length === 1 ? 148 : 158} italic opacity={0.7} anchor="middle" color={accent}>{status}</Label>

      <Arrow points={[[400, 128], [490, 128]]} />

      {/* the score block, centred (vertically) on the arrow pointing to it */}
      <g transform="translate(0 -49)">
      {/* the headline score: OSWorld */}
      <Label x={615} y={85} size={13.5} opacity={0.7} anchor="middle">OSWorld (GUI tasks)</Label>
      <Label x={615} y={144} size={52} opacity={1} anchor="middle" color={accent}>{before ? '21.0%' : '76.3%'}</Label>
      {!before && <Label x={615} y={173} size={13.5} opacity={0.7} anchor="middle">up from 21.0%</Label>}

      {/* the other benchmarks, small */}
      <Line from={[490, 193]} to={[740, 193]} strokeWidth={1.5} opacity={0.2} />
      {others.map(([name, base, after, gain], i) => (
        <g key={name}>
          <Label x={490} y={216 + i * 20} size={12.5} opacity={0.7}>{name}</Label>
          <Label x={before ? 740 : 690} y={216 + i * 20} size={12.5} opacity={1} anchor="end" color={accent}>
            {before ? base : after}
          </Label>
          {!before && (
            <Label x={740} y={216 + i * 20} size={12} opacity={0.7} anchor="end">{gain}</Label>
          )}
        </g>
      ))}
      </g>
    </g>
  )
}

export function HEvalBefore() {
  return <HEval accent={RED} name={['Nemotron 3', 'Nano Omni']} status="base model" before />
}

export function HEvalAfter() {
  return <HEval accent={GREEN} name={['Holotron4', 'Nano']} status="post-trained" before={false} />
}
