import type { Hotspot } from '../types'
import type { StageId } from '../../diagrams'

/**
 * Hover popovers for the Financial Research (Samaya) diagrams.
 *
 * Kept to short talking points: demo staff explain the details out loud.
 * Sources: Samaya's blog post "RL post-trained agentic model" and the public
 * FrontierFinance dataset. Don't add figures that aren't in those sources.
 */
/** The model being trained. The description is the same wherever it appears. */
const nemotron = 'Nemotron 3.5 Lightning (30B MoE, 3B active)'

const trainingQuestion = {
  title: 'Training question',
  body: 'Expert-written finance questions',
  popoverWidth: 300,
}

const sftQuestion = {
  title: 'Training question',
  body: '1,157 expert-written finance questions',
  popoverWidth: 300,
}

const judge = {
  title: 'LLM judge',
  body: 'Scores each answer against the rubric',
  popoverWidth: 280,
}

const rubric = {
  title: 'Rubric',
  body: 'Written by financial experts',
  popoverWidth: 340,
  side: 'bottom' as const,
  align: 'start' as const,
}

const benchmark = (prefix: string): Hotspot => ({
  id: `${prefix}-questions`,
  x: 18,
  y: 74,
  width: 102,
  height: 84,
  title: 'FrontierFinance benchmark',
  body: '• Samaya\'s open finance benchmark \n • 220 questions, covering the entire investor workflow\n',
  popoverWidth: 300,
  side: 'bottom',
})

const rubricHotspot = (prefix: string): Hotspot => ({ id: `${prefix}-rubric`, x: 398, y: 95, width: 40, height: 60, ...rubric })

const judges = (prefix: string): Hotspot[] =>
  [46, 103, 160].map((y, i) => ({
    id: `${prefix}-judge-${'abc'[i]}`,
    x: 470,
    y,
    width: 124,
    height: 44,
    ...judge,
  }))

const majorityVote = (prefix: string): Hotspot => ({
  id: `${prefix}-majority-vote`,
  x: 396,
  y: 222,
  width: 200,
  height: 20,
  title: 'Majority vote',
  body: 'Three independent judge models; a majority vote decides each rubric item',
  popoverWidth: 320,
  side: 'top',
})

const score = (prefix: string, x: number, y: number, width: number, height: number): Hotspot => ({
  id: `${prefix}-score`,
  x,
  y,
  width,
  height,
  title: 'FrontierFinance score',
  body: 'Share of rubric items an answer satisfies, averaged across questions',
  popoverWidth: 320,
  side: 'bottom',
})

export const popovers: Partial<Record<StageId, Hotspot[]>> = {
  eval: [
    benchmark('eval'),
    {
      id: 'eval-base-model',
      x: 186,
      y: 80,
      width: 142,
      height: 90,
      title: 'Base model',
      body: nemotron,
      popoverWidth: 340,
    },
    rubricHotspot('eval'),
    ...judges('eval'),
    majorityVote('eval'),
    score('eval', 690, 60, 172, 130),
  ],
  sft: [
    { id: 'sft-prompt', x: 14, y: 59.5, width: 122, height: 61, ...sftQuestion, side: 'bottom' },
    {
      id: 'sft-model',
      x: 204,
      y: 45,
      width: 142,
      height: 90,
      title: 'Model',
      body: nemotron,
      popoverWidth: 340,
    },
    {
      id: 'sft-ideal-response',
      x: 448,
      y: 200,
      width: 162.5,
      height: 61,
      title: 'Ideal response',
      body: 'Best of 8 answers from teacher model Kimi K3',
      popoverWidth: 370,
    },
    {
      id: 'sft-answers',
      x: 694,
      y: 192,
      width: 86,
      height: 64,
      title: '8 answers',
      body: '• One answer per research strategy\n• The best-graded answer is kept',
      popoverWidth: 320,
      side: 'top',
    },
    {
      id: 'sft-teacher',
      x: 830,
      y: 200,
      width: 96,
      height: 61,
      title: 'Teacher model',
      body: 'Kimi K3 answers each question under 8 research strategies',
      popoverWidth: 320,
      side: 'top',
      align: 'end',
    },
  ],
  rl: [
    { id: 'rl-prompt', x: 13.5, y: 119, width: 98.5, height: 57.5, ...trainingQuestion },
    {
      id: 'rl-tools',
      x: 152.5,
      y: 22,
      width: 142.5,
      height: 46,
      title: 'Research tools',
      body: "37 tools in Samaya's finance harness",
      popoverWidth: 320,
    },
    {
      id: 'rl-model',
      x: 152.5,
      y: 95,
      width: 142.5,
      height: 105,
      title: 'Policy model',
      body: nemotron,
      popoverWidth: 340,
    },
    {
      id: 'rl-verifier',
      x: 566.5,
      y: 29,
      width: 118.5,
      height: 237.5,
      title: 'Grader',
      body: "• Scores each attempt against the question's rubric\n• Reward: share of essential rubric items met",
      popoverWidth: 340,
      side: 'left',
      align: 'start',
    },
  ],
  'eval-2': [
    benchmark('eval2'),
    {
      id: 'eval2-post-trained-model',
      x: 186,
      y: 80,
      width: 142,
      height: 90,
      title: 'Samaya Sterling',
      body: `${nemotron} after 2 SFT + 2 GRPO stages`,
      popoverWidth: 340,
    },
    rubricHotspot('eval2'),
    ...judges('eval2'),
    majorityVote('eval2'),
    score('eval2', 670, 60, 212, 142),
  ],
}
