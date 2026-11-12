import type { Example } from '../types'
import cardImage from './card.png'
import samayaMark from './logos/samaya-mark.svg'
import samayaLogotype from './logos/samaya-logotype.svg'
import { popovers } from './popovers'
import { SamayaEvalBefore } from './diagrams/eval-before'
import { SamayaSft } from './diagrams/sft'
import { SamayaRl } from './diagrams/rl'
import { SamayaEvalAfter } from './diagrams/eval-after'

// references: 
// https://samaya.ai/blog/frontier-finance
// https://samaya.ai/blog/rl-post-trained-agentic-model

export const financialResearch: Example = {
  id: 'financial-research',
  title: 'Financial Research',
  description: 'Turn rigorous financial research into analyst reports.',
  cardImage,
  partnerLogos: [
    { src: samayaMark, width: 16, height: 16, alt: '' },
    { src: samayaLogotype, width: 56, height: 16, alt: 'Samaya' },
  ],
  hasPage: true,
  pageLogos: [
    { src: samayaMark, width: 44, height: 44, alt: '' },
    { src: samayaLogotype, width: 155.1, height: 44, alt: 'Samaya' },
  ],
  popovers,
  diagrams: {
    eval: { Component: SamayaEvalBefore, width: 900, height: 250 },
    sft: { Component: SamayaSft, width: 940, height: 330 },
    rl: { Component: SamayaRl, width: 880, height: 330 },
    'eval-2': { Component: SamayaEvalAfter, width: 900, height: 250 },
  },
}
