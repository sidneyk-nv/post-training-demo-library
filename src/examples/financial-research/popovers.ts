import type { Hotspot } from '../types'
import type { StageId } from '../../diagrams'

/**
 * Hover popovers for the Financial Research (Samaya) diagrams.
 *
 * Sources: Samaya's blog post "RL post-trained agentic model" and the public
 * FrontierFinance dataset. Don't add figures that aren't in those sources.
 */
const trainingQuestion = {
  title: 'Training question',
  body:
    'One of 1,819 expert-written finance questions from Samaya’s internal dataset. FrontierFinance, the evaluation benchmark, is held out from training.\n\n' +
    'Training questions are similar in style to this public FrontierFinance question: “What are the interest coverage ratios for AT&T and Verizon for each quarter from 2019–2023? How have their debt service capabilities changed?”',
  popoverWidth: 400,
}

const judge = {
  title: 'LLM judge',
  body: 'Checks the model’s answer against each rubric item and marks whether it is satisfied. The score is the share of rubric items the answer meets.',
  popoverWidth: 340,
}

const rubric = {
  title: 'Example rubric',
  body:
    'Question: “Provide a breakdown of BP’s upstream, downstream, and integrated gas and renewables segments’ operating metrics over the past 6 years.”\n\n' +
    '76 rubric items (74 must-have), for example:\n' +
    '• Must-have: “Provides information for BP p.l.c. (BP) stating that the Upstream Production for the year 2024 was 2.4 mmboe/d (Million barrels of oil equivalent per day)”\n' +
    '• Optional: “Presents BP p.l.c. (BP) operating metrics from 2019 to 2024 in a structured or tabular format.”\n\n' +
    'Rubric categories: Factual Data Extraction, Qualitative & Contextual Information, Forward-Looking Information, Analysis & Interpretation, Comparative Analysis, Format & Presentation, Source & Methodology, Inquiry & Question Generation.',
  popoverWidth: 440,
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
      body: 'NVIDIA Nemotron 3.5 Lightning: an open-source 30B mixture-of-experts model with 3B parameters active at a time, run with reasoning on.\n\nFrontierFinance score before post-training: 42.5%.',
      popoverWidth: 360,
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
      body: 'Samaya used Nemotron 3.5 Lightning.',
      popoverWidth: 320,
    },
    {
      id: 'sft-ideal-response',
      x: 440,
      y: 182,
      width: 178,
      height: 98,
      title: 'Ideal response (teacher answer)',
      body:
        'Kimi K3, the teacher model, answered each question using eight different research strategies. The best-graded answer per question became the training example.\n\n' +
        'Questions in the bottom quarter by length or tool calls were dropped, leaving 1,157 of 1,819 questions.\n\n' +
        'An earlier SFT stage used 968 synthetic questions without rubrics: Kimi K3 answered each twice, and an LLM judge picked the better answer.',
      popoverWidth: 400,
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
      body: 'Nemotron 3.5 Lightning after the two SFT stages, fine-tuned with LoRA on Tinker (Thinking Machines Lab’s training API).\n\nIt researches with dozens of finance-specific tools until its research budget runs out; then a separate report writer produces the answer.',
      popoverWidth: 380,
    },
    {
      id: 'rl-verifier',
      x: 566,
      y: 29,
      width: 119,
      height: 237,
      title: 'Verifier: rubric grader',
      body: 'An LLM grader scores each attempt against the question’s rubric items. The reward is the share of rubric items satisfied (the offline GRPO stage counted only must-have items).\n\nThe model makes 8 attempts per question. Attempts that beat the group’s average reward are reinforced; the rest are discouraged.',
      popoverWidth: 400,
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
      title: 'Post-trained model: Samaya Sterling',
      body: 'Nemotron 3.5 Lightning after LoRA fine-tuning in four stages:\n1. SFT on synthetic research traces\n2. SFT on the best of eight teacher strategies\n3. Offline GRPO on the teacher answers\n4. Online GRPO on the model’s own attempts\n\nFrontierFinance score: 58.9% (60.6% in high-effort mode), up from 42.5% for the base model.',
      popoverWidth: 380,
    },
    { id: 'eval2-rubric', x: 191, y: 86, width: 61, height: 90, ...rubric },
    ...judges('eval2'),
  ],
}
