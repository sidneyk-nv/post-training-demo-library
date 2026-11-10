import evalSvg from './eval.svg?raw'
import sftSvg from './sft.svg?raw'
import rlSvg from './rl.svg?raw'
import eval2Svg from './eval-2.svg?raw'

export type StageId = 'eval' | 'sft' | 'rl' | 'eval-2'

/** A stage's diagram. Use cases can swap in their own (see `Example.diagrams`). */
export type StageDiagram = { svg: string; width: number; height: number }

export type Stage = {
  id: StageId
  title: string
  /** Inline SVG markup exported from Figma (text kept live so it uses NVIDIA Sans). */
  svg: string
  /** Natural size of the diagram in Figma, used to place hover areas as percentages. */
  width: number
  height: number
}

export const stages: Stage[] = [
  { id: 'eval', title: 'Eval', svg: evalSvg, width: 848, height: 230.18 },
  { id: 'sft', title: 'SFT', svg: sftSvg, width: 848, height: 313.76 },
  { id: 'rl', title: 'RL', svg: rlSvg, width: 848, height: 329.02 },
  { id: 'eval-2', title: 'Eval (pt. 2)', svg: eval2Svg, width: 848, height: 230.18 },
]

export function isStageId(value: string | null): value is StageId {
  return stages.some((s) => s.id === value)
}
