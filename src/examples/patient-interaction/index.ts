import type { Example } from '../types'
import cardImage from './card.png'
// NVIDIA eye + wordmark (white wordmark, for the dark theme), from the GTC Healthcare demo's logo asset.
import nvidiaLogo from './logos/nvidia-logo-horizontal.png'
import { popovers } from './popovers'
import { PatientEvalBefore } from './diagrams/eval-before'
import { PatientRl } from './diagrams/rl'
import { PatientEvalAfter } from './diagrams/eval-after'
import { RefillComparison } from './results/RefillComparison'

// Source: "Nemotron Healthcare Post Training FAQ" (NVIDIA's GRPO run, completed 20 September 2026).

export const patientInteraction: Example = {
  id: 'patient-interaction',
  title: 'Patient Interaction',
  description: 'Help patients with refills, symptoms and appointments.',
  tags: ['Human-AI Interaction', 'Bias'],
  // NeMo Gym / NeMo RL architecture from the GTC Healthcare demo, letterboxed on its own background.
  cardImage,
  cardImageBackground: '#080a09',
  partnerLogos: [{ src: nvidiaLogo, width: 84, height: 16, alt: 'NVIDIA' }],
  hasPage: true,
  pageLogos: [{ src: nvidiaLogo, width: 189, height: 36, alt: 'NVIDIA' }],
  // GRPO only: this run had no SFT stage.
  steps: [
    { id: 'eval', title: 'Eval', fullTitle: 'Evaluation' },
    { id: 'rl', title: 'RL', fullTitle: 'Reinforcement Learning (GRPO)' },
    { id: 'eval-2', title: 'Eval', fullTitle: 'Evaluation' },
  ],
  popovers,
  diagrams: {
    eval: { Component: PatientEvalBefore, width: 1010, height: 250 },
    rl: { Component: PatientRl, width: 900, height: 330 },
    'eval-2': { Component: PatientEvalAfter, width: 1010, height: 250 },
  },
  // The recorded prescription refill conversation, before and after GRPO.
  results: RefillComparison,
}
