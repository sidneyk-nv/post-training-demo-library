import type { Example } from '../types'
import cardImage from './card.png'
import r1Logo from './logos/r1.svg'
import { popovers } from './popovers'
import { R1EvalBefore } from './diagrams/eval-before'
import { R1Sft } from './diagrams/sft'
import { R1EvalAfter } from './diagrams/eval-after'
import { AppealComparison } from './results/AppealComparison'

export const healthcare: Example = {
  id: 'healthcare',
  title: 'Healthcare',
  description: 'Draft appeals for medical claim denials.',
  tags: ['Human-AI Interaction', 'Content'],
  cardImage,
  cardImageBackground: '#10181c',
  partnerLogos: [{ src: r1Logo, width: 30, height: 21.42, alt: 'R1' }],
  hasPage: true,
  pageLogos: [{ src: r1Logo, width: 60, height: 42.84, alt: 'R1' }],
  // R1 has done LoRA SFT; RL is planned but not done, so it isn't a step yet.
  steps: [
    { id: 'eval', title: 'Eval', fullTitle: 'Evaluation' },
    { id: 'sft', title: 'SFT', fullTitle: 'Supervised Fine-Tuning (LoRA)' },
    { id: 'eval-2', title: 'Eval', fullTitle: 'Evaluation' },
  ],
  popovers,
  diagrams: {
    eval: { Component: R1EvalBefore, width: 900, height: 250 },
    sft: { Component: R1Sft, width: 960, height: 310 },
    'eval-2': { Component: R1EvalAfter, width: 900, height: 250 },
  },
  // Recorded appeal excerpts before and after post-training (R1's appeal-room replay).
  results: AppealComparison,
}
