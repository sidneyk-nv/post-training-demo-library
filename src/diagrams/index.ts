import { createElement, type ComponentType } from 'react'
import { EvalBeforeDiagram } from './eval_before'
import { EvalAfterDiagram } from './eval_after'
import { SftDiagram } from './sft'
import { RlDiagram } from './rl'

/** Every step a flow can show. The shared flow is eval, sft, rl, eval-2; `cft` is only for use cases that define it. */
export const stageIds = ['eval', 'sft', 'rl', 'cft', 'eval-2'] as const
export type StageId = (typeof stageIds)[number]

/** A stage's diagram. Use cases can swap in their own (see `Example.diagrams`). */
export type StageDiagram = {
  /** Natural size of the diagram in px, used to place hover areas as percentages. */
  width: number
  height: number
  /** The diagram, written as a React component (see `primitives.tsx` for the building blocks). */
  Component: ComponentType
}

export type Stage = StageDiagram & {
  id: StageId
  /** Short name, shown under the small card. */
  title: string
  /** Full name, shown under the open card. */
  fullTitle: string
}

// The after diagram draws the post-trained model (grey base model colours vs. green).
const PostTrainedEvalDiagram = () => createElement(EvalAfterDiagram, { postTrained: true })

export const stages: Stage[] = [
  { id: 'eval', title: 'Eval', fullTitle: 'Evaluation', Component: EvalBeforeDiagram, width: 848, height: 231 },
  { id: 'sft', title: 'SFT', fullTitle: 'Supervised Fine-Tuning', Component: SftDiagram, width: 848, height: 314 },
  { id: 'rl', title: 'RL', fullTitle: 'Reinforcement Learning', Component: RlDiagram, width: 848, height: 330 },
  { id: 'eval-2', title: 'Eval', fullTitle: 'Evaluation', Component: PostTrainedEvalDiagram, width: 848, height: 231 },
]

export function isStageId(value: string | null): value is StageId {
  return stageIds.some((id) => id === value)
}
