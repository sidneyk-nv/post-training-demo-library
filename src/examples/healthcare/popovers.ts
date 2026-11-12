import type { Hotspot } from '../types'
import type { StageId } from '../../diagrams'

/**
 * Hover popovers for the Healthcare (R1) diagrams.
 * Sources: R1's article "Long-context medical reasoning to reduce denials"
 * (initial study: 16 synthetic evaluation cases) and R1's architecture figure.
 * Unconfirmed: GPU count and training time. Online RL is planned but not
 * done yet, so it isn't shown.
 */
const nemotron = 'Nemotron 3.5 Super VL (120B-A12B, open weights)'

const evalHotspots = (prefix: string, model: Hotspot): Hotspot[] => [
  {
    id: `${prefix}-cases`,
    x: 18,
    y: 92,
    width: 84,
    height: 66,
    title: 'Proprietary dataset',
    body: '16 synthetic denial cases, separate from the training cases. Each has a denial, 25 to 52 supporting documents and instructions for the appeal packet',
    popoverWidth: 340,
    side: 'bottom',
  },
  model,
  {
    id: `${prefix}-harness`,
    x: 186,
    y: 188,
    width: 142,
    height: 34,
    title: 'R1 harness',
    body: 'Tools for reading and citing evidence, skills that guide the work, and a wiki of shared appeal knowledge',
    popoverWidth: 340,
    side: 'bottom',
  },
  {
    id: `${prefix}-rubric`,
    x: 456,
    y: 30,
    width: 200,
    height: 190,
    title: 'Rubric',
    body: "24 rules across 5 categories. A fixed GLM 5.3 evaluator checks the appeal against the case's sources; one unsupported claim fails it",
    popoverWidth: 340,
    side: 'bottom',
  },
  {
    id: `${prefix}-score`,
    x: 700,
    y: 40,
    width: 190,
    height: 170,
    title: 'Success rate',
    body: '• Pass@1: share of single attempts that pass\n• Pass@4: chance that at least one of four attempts passes',
    popoverWidth: 340,
    side: 'bottom',
    align: 'end',
  },
]

export const popovers: Partial<Record<StageId, Hotspot[]>> = {
  eval: evalHotspots('eval', {
    id: 'eval-model',
    x: 186,
    y: 80,
    width: 142,
    height: 90,
    title: 'Base model',
    body: nemotron,
    popoverWidth: 340,
  }),
  sft: [
    {
      id: 'sft-rooms',
      x: 14,
      y: 59.5,
      width: 122,
      height: 61,
      title: 'Training room',
      body: 'An environment that recreates an appeal task: a synthetic denial case with supporting documents and output contract',
      popoverWidth: 340,
      side: 'bottom',
    },
    { id: 'sft-model', x: 204, y: 45, width: 142, height: 90, title: 'Model', body: nemotron, popoverWidth: 340 },
    {
      id: 'sft-ideal',
      x: 448,
      y: 200,
      width: 162.5,
      height: 61,
      title: 'Ideal response',
      body: "• Synthetic responses that have passed evaluation",
      popoverWidth: 360,
    },
    {
      id: 'sft-glm',
      x: 680,
      y: 200,
      width: 108,
      height: 61,
      title: 'Judge and teacher',
      body: 'GLM 5.3 marks each attempt pass or fail, and corrects the ones that fail',
      popoverWidth: 320,
      side: 'top',
    },
    {
      id: 'sft-generator',
      x: 836,
      y: 200,
      width: 104,
      height: 61,
      title: 'Model',
      body: `${nemotron}`,
      popoverWidth: 340,
      side: 'top',
      align: 'end',
    },
    {
      id: 'sft-train',
      x: 300,
      y: 208,
      width: 150,
      height: 64,
      title: 'LoRA SFT',
      body: "• The gap between the model's attempt and the ideal response updates the weights\n• LoRA (rank 16) updates only a subset of model weights",
      popoverWidth: 340,
      side: 'bottom',
    },
  ],
  'eval-2': evalHotspots('eval2', {
    id: 'eval2-model',
    x: 186,
    y: 80,
    width: 142,
    height: 90,
    title: 'R1-super',
    body: `${nemotron} after three training rounds`,
    popoverWidth: 340,
  }),
}
