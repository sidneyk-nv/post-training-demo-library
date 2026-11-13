import { Arrow, Box, Dataset, Label, ORANGE, WHITE } from '../../../diagrams/primitives'

/**
 * H Company, RL (a GRPO variant): the SFT model makes eight rollouts (full runs)
 * of a coding task in a sandbox; a verifier (deterministic checks plus an LLM
 * judge) gives each a reward, and the weights are updated toward rollouts that
 * beat the group's average.
 * The training tasks come from H's Agentic Task Factory.
 * Canvas: 900 x 315 px (set in `index.ts`). Shifted right 20px to centre it.
 * Accent color: orange
 */

const thin = { strokeWidth: 2, headLength: 9, headWidth: 8 }

export function HRl() {
  return (
    <g color={WHITE} transform="translate(20 0)">
      {/* the training task and its sandbox → model */}
      <Box x={16} y={14} w={176} h={44} />
      <Label x={104} y={41} size={13.5} anchor="middle">Agentic Task Factory</Label>
      <Arrow points={[[104, 62], [104, 101]]} {...thin} />
      <Box x={16} y={105} w={176} h={100} />
      <Label x={104} y={140} size={14.5} anchor="middle">task description</Label>
      <Label x={104} y={162} size={14.5} anchor="middle">+ environment</Label>
      <Label x={104} y={184} size={12} opacity={0.6} anchor="middle">file + shell tools</Label>
      <Label x={104} y={226} anchor="middle">training task</Label>
      <Arrow points={[[196, 155], [222, 155]]} />

      <Box color={ORANGE} x={226} y={110} w={130} h={90} radius={13.5} strokeWidth={3.4} />
      <Label color={ORANGE} x={291} y={147} size={17.8} anchor="middle">Nemotron 3</Label>
      <Label color={ORANGE} x={291} y={169} size={17.8} anchor="middle">Nano Omni</Label>
      <Label color={ORANGE} x={291} y={190} italic opacity={0.7} anchor="middle">after SFT</Label>

      {/* model → 8 rollouts → verifier → rewards */}
      <Arrow points={[[360, 155], [406, 155]]} />
      <Dataset x={410} y={124} w={110} h={62} rows={2} layers={3} checkboxes={false} />
      <Label x={465} y={224} anchor="middle">8 rollouts</Label>
      <Label x={465} y={241} size={12.5} italic opacity={0.7} anchor="middle">full runs of the same task</Label>
      <Arrow points={[[556, 155], [586, 155]]} />

      <Box color={ORANGE} x={590} y={115} w={116} h={80} radius={13.5} strokeWidth={3.4} />
      <Label color={ORANGE} x={648} y={151} size={17} anchor="middle">verifier</Label>
      <Label color={ORANGE} x={648} y={172} opacity={0.7} anchor="middle">checks + judge</Label>
      <Arrow points={[[710, 155], [742, 155]]} />
      <Label x={750} y={152} size={15}>reward</Label>
      <Label x={750} y={170} size={12.5} italic opacity={0.7}>for each rollout</Label>

      {/* rewards flow back to the model */}
      <Arrow points={[[780, 182], [780, 282], [291, 282], [291, 204]]} headLength={13.5} headWidth={13.5} />
      <Label x={330} y={304} italic>update weights toward above-average rollouts</Label>
    </g>
  )
}
