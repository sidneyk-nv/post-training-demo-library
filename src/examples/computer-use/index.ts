import type { Example } from '../types'
import cardImage from './card.png'
import hCompanyLogo from './logos/h-company.svg'
import { popovers } from './popovers'
import { HEvalBefore, HEvalAfter } from './diagrams/eval'
import { HSft } from './diagrams/sft'
import { HRl } from './diagrams/rl'

export const computerUse: Example = {
  id: 'computer-use',
  title: 'Computer Use',
  description: 'Complete software tasks autonomously.',
  cardImage,
  cardImageBackground: '#0c0c11',
  partnerLogos: [{ src: hCompanyLogo, width: 27.6, height: 16, alt: 'H Company' }],
  hasPage: true,
  pageLogos: [{ src: hCompanyLogo, width: 62.1, height: 36, alt: 'H Company' }],
  // Eval, SFT, then a GRPO variant of RL, then eval again.
  // TODO: Confirm eval details
  steps: [
    { id: 'eval', title: 'Eval', fullTitle: 'Evaluation' },
    { id: 'sft', title: 'SFT', fullTitle: 'Supervised Fine-Tuning' },
    { id: 'rl', title: 'RL', fullTitle: 'Reinforcement Learning (GRPO)' },
    { id: 'eval-2', title: 'Eval', fullTitle: 'Evaluation' },
  ],
  popovers,
  diagrams: {
    eval: { Component: HEvalBefore, width: 900, height: 290 },
    sft: { Component: HSft, width: 900, height: 335 },
    rl: { Component: HRl, width: 900, height: 315 },
    'eval-2': { Component: HEvalAfter, width: 900, height: 290 },
  },
}
