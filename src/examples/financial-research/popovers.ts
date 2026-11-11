import type { Hotspot } from '../types'
import type { StageId } from '../../diagrams'

/**
 * Hover popovers for the Financial Research (Samaya) diagrams.
 *
 * Kept to short talking points: demo staff explain the details out loud.
 * Sources: Samaya's blog post "RL post-trained agentic model" and the public
 * FrontierFinance dataset. Don't add figures that aren't in those sources.
 */
const trainingQuestion = {
  title: 'Training question',
  body: '• 1,819 expert-written finance questions\n• Benchmark questions held out from training',
  popoverWidth: 340,
}

const judge = {
  title: 'LLM judge',
  body: '• Scores each answer against the rubric',
  popoverWidth: 280,
}

const rubric = {
  title: 'Rubric',
  body: '• Written by financial experts\n• Example: BP segment metrics over 6 years\n• 76 items, 74 must-have',
  popoverWidth: 340,
  side: 'right' as const,
  align: 'center' as const,
}

const judges = (prefix: string): Hotspot[] =>
  [29, 97, 165].map((y, i) => ({
    id: `${prefix}-judge-${'abc'[i]}`,
    x: 281,
    y,
    width: 119,
    height: 48,
    ...judge,
  }))

export const popovers: Partial<Record<StageId, Hotspot[]>> = {
  eval: [
    {
      id: 'eval-base-model',
      x: 10,
      y: 86,
      width: 116,
      height: 70,
      title: 'Base model',
      body: '• Nemotron 3.5 Lightning (30B MoE, 3B active)\n• FrontierFinance score: 42.5%',
      popoverWidth: 340,
    },
    { id: 'eval-rubric', x: 191, y: 86, width: 61, height: 90, ...rubric },
    ...judges('eval'),
  ],
  sft: [
    { id: 'sft-prompt', x: 14, y: 20, width: 122, height: 85, ...trainingQuestion, side: 'bottom' },
    {
      id: 'sft-model',
      x: 190,
      y: 24,
      width: 170,
      height: 102,
      title: 'Model',
      body: '• Nemotron 3.5 Lightning',
      popoverWidth: 260,
    },
    {
      id: 'sft-ideal-response',
      x: 440,
      y: 182,
      width: 178,
      height: 98,
      title: 'Ideal response',
      body: '• Best of 8 answers from teacher model Kimi K3\n• 1,157 training questions',
      popoverWidth: 370,
    },
  ],
  rl: [
    { id: 'rl-prompt', x: 14, y: 97, width: 98, height: 80, ...trainingQuestion },
    {
      id: 'rl-model',
      x: 153,
      y: 95,
      width: 142,
      height: 105,
      title: 'Policy model',
      body: '• Nemotron 3.5 Lightning after SFT\n• Researches with dozens of finance tools',
      popoverWidth: 340,
    },
    {
      id: 'rl-verifier',
      x: 566,
      y: 29,
      width: 119,
      height: 237,
      title: 'Verifier',
      body: '• LLM grades each attempt against the rubric\n• 8 attempts per question\n• Above-average attempts are reinforced',
      popoverWidth: 340,
      side: 'left',
      align: 'start',
    },
  ],
  'eval-2': [
    {
      id: 'eval2-post-trained-model',
      x: 10,
      y: 86,
      width: 116,
      height: 70,
      title: 'Samaya Sterling',
      body: '• Nemotron 3.5 Lightning after 2 SFT + 2 GRPO stages\n• FrontierFinance score: 58.9%, up from 42.5%',
      popoverWidth: 340,
    },
    { id: 'eval2-rubric', x: 191, y: 86, width: 61, height: 90, ...rubric },
    ...judges('eval2'),
  ],
}
