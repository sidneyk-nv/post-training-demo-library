import { Arrow, BLUE, Box, Label, Line, WHITE } from '../../../diagrams/primitives'

/**
 * H Company, SFT: the model gets a training task (the steps taken so far, and
 * "what's the next step?") and an image of the screen, and predicts the agent's
 * next step. That prediction is compared with the real next step from a
 * successful trajectory, and the gap (the loss) updates the weights.
 * Canvas: 900 x 335 px (set in `index.ts`). Shifted right 29px to centre it.
 * Accent color: blue
 */

const thin = { strokeWidth: 2, headLength: 9, headWidth: 8 }

export function HSft() {
  return (
    <g color={WHITE} transform="translate(29 0)">
      {/* input 1: the training task, the steps so far and "what's next?" */}
      <Label x={111} y={28} anchor="middle">training task</Label>
      <Box x={16} y={36} w={190} h={130} />
      <Label x={32} y={74} size={15}>1.</Label>
      <Line from={[56, 70]} to={[184, 70]} opacity={0.4} />
      <Label x={32} y={104} size={15}>2.</Label>
      <Line from={[56, 100]} to={[160, 100]} opacity={0.4} />
      <Label x={32} y={134} size={15}>3. ?</Label>

      {/* input 2: an image of the screen */}
      <Box x={16} y={190} w={190} h={96} />
      <Line from={[17, 206]} to={[205, 206]} strokeWidth={1.5} opacity={0.3} />
      <circle cx={27} cy={198} r={2.5} fill="currentColor" opacity={0.5} />
      <circle cx={36} cy={198} r={2.5} fill="currentColor" opacity={0.5} />
      <circle cx={45} cy={198} r={2.5} fill="currentColor" opacity={0.5} />
      <Box x={30} y={218} w={52} h={34} radius={4} strokeWidth={1.8} opacity={0.6} />
      <Line from={[100, 224]} to={[180, 224]} strokeWidth={1.8} opacity={0.3} />
      <Line from={[100, 238]} to={[164, 238]} strokeWidth={1.8} opacity={0.3} />
      <Line from={[30, 270]} to={[150, 270]} strokeWidth={1.8} opacity={0.3} />
      <polygon points="108,244 108,264 113,259 118,270 122,268 117,257 124,257" fill="currentColor" opacity={0.9} />
      <Label x={111} y={308} anchor="middle">image of screen</Label>

      <Arrow points={[[210, 101], [258, 120]]} smooth {...thin} />
      <Arrow points={[[210, 238], [258, 120]]} smooth {...thin} />

      <Box color={BLUE} x={262} y={75} w={130} h={90} radius={13.5} strokeWidth={3.4} />
      <Label color={BLUE} x={327} y={115} size={17.8} anchor="middle">Nemotron 3</Label>
      <Label color={BLUE} x={327} y={137} size={17.8} anchor="middle">Nano Omni</Label>

      {/* model → its next step */}
      <Arrow points={[[396, 120], [446, 120]]} />
      <Label x={531} y={80} anchor="middle">model's next step</Label>
      <Box x={450} y={90} w={162.5} h={61} dashed />
      <Line from={[465, 110]} to={[597, 110]} opacity={0.3} />
      <Line from={[465, 127]} to={[562, 127]} opacity={0.3} />

      {/* next step vs. target next step = loss */}
      <Arrow points={[[531, 155], [531, 224]]} both strokeWidth={2.5} headLength={12} headWidth={13.5} />
      <Label x={548} y={194} size={14.4}>gap = loss</Label>

      <Box x={450} y={228} w={162.5} h={61} filled />
      <Line from={[465, 248]} to={[597, 248]} opacity={0.35} />
      <Line from={[465, 265]} to={[575, 265]} opacity={0.35} />
      <Label x={465} y={309}>ideal next step</Label>

      {/* the loss flows back to the model */}
      <Arrow points={[[446, 258.5], [327, 258.5], [327, 169]]} headLength={13.5} headWidth={13.5} />
      <Label x={340} y={248} size={12.5} italic>update weights</Label>
      <Label x={340} y={283} size={12.5} italic opacity={0.7}>to shrink the gap</Label>

      {/* divider and caption */}
      <Line from={[651, 80]} to={[651, 270]} strokeWidth={1.7} opacity={0.2} />
      <Label x={671} y={130} size={14.5}>every step of a</Label>
      <Label x={671} y={152} size={14.5}>successful trajectory</Label>
      <Label x={671} y={174} size={14.5}>is one sample</Label>
      <Label x={671} y={196} size={14.5} opacity={0.7}>(~109B tokens of data)</Label>
    </g>
  )
}
