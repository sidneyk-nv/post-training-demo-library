import type { Example } from '../types'
import cardImage from './card.png'
import harveyMark from './logos/harvey-mark.svg'
import harveyLogotype from './logos/harvey-logotype.svg'
import { popovers } from './popovers'
import { HarveyEvalBefore } from './diagrams/eval-before'
import { HarveyCft } from './diagrams/cft'
import { HarveyEvalAfter } from './diagrams/eval-after'

// references:
// https://github.com/NVIDIA-NeMo/Nemotron/blob/main/docs/nemotron/embed/text.md

export const legalServices: Example = {
  id: 'legal-services',
  title: 'Legal Services',
  description: 'Find the most relevant documents for your case.',
  tags: ['Content'],
  cardImage,
  partnerLogos: [
    { src: harveyMark, width: 16, height: 16, alt: '' },
    { src: harveyLogotype, width: 46.6, height: 14, alt: 'Harvey' },
  ],
  hasPage: true,
  pageLogos: [
    { src: harveyMark, width: 44, height: 44, alt: '' },
    { src: harveyLogotype, width: 140, height: 42, alt: 'Harvey' },
  ],
  // An embedding model is post-trained in one contrastive step, not SFT then RL.
  steps: [
    { id: 'eval', title: 'Eval', fullTitle: 'Evaluation' },
    { id: 'cft', title: 'CFT', fullTitle: 'Contrastive Fine-Tuning' },
    { id: 'eval-2', title: 'Eval', fullTitle: 'Evaluation' },
  ],
  popovers,
  diagrams: {
    eval: { Component: HarveyEvalBefore, width: 900, height: 300, scale: 0.85 },
    cft: { Component: HarveyCft, width: 900, height: 330, scale: 0.85 },
    'eval-2': { Component: HarveyEvalAfter, width: 900, height: 300, scale: 0.85 },
  },
}
