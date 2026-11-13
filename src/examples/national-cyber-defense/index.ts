import type { Example } from '../types'
import cardImage from './card.png'
import dreamMark from './logos/dream-mark.svg'
import dreamLogotype from './logos/dream-logotype.svg'
import { popovers } from './popovers'
import { DreamEvalBefore } from './diagrams/eval-before'
import { DreamMidTraining } from './diagrams/mid-training'
import { DreamSft } from './diagrams/sft'
import { DreamRl } from './diagrams/rl'
import { DreamEvalAfter } from './diagrams/eval-after'
import { ThreatMap } from './results/ThreatMap'

// Source: Dream's "Technical FAQ – Dream Nemotron Post-training" (GTC_Dream_Nemotron_Technical_FAQ.pdf).

export const nationalCyberDefense: Example = {
  id: 'national-cyber-defense',
  title: 'National Cyber-Defense',
  description: 'Analyze threats and diagnose vulnerabilities.',
  cardImage,
  cardImageBackground: '#151b2f',
  partnerLogos: [
    { src: dreamMark, width: 13.9, height: 18, alt: '' },
    { src: dreamLogotype, width: 59.4, height: 12, alt: 'Dream' },
  ],
  hasPage: true,
  pageLogos: [
    { src: dreamMark, width: 27.8, height: 36, alt: '' },
    { src: dreamLogotype, width: 178.2, height: 36, alt: 'Dream' },
  ],
  // MiST (mid-training, then SFT), followed by RL.
  steps: [
    { id: 'eval', title: 'Eval', fullTitle: 'Evaluation' },
    { id: 'mid-training', title: 'Mid-Training', fullTitle: 'Mid-Training' },
    { id: 'sft', title: 'SFT', fullTitle: 'Supervised Fine-Tuning' },
    { id: 'rl', title: 'RL', fullTitle: 'Reinforcement Learning (GRPO)' },
    { id: 'eval-2', title: 'Eval', fullTitle: 'Evaluation' },
  ],
  popovers,
  diagrams: {
    eval: { Component: DreamEvalBefore, width: 900, height: 250 },
    'mid-training': { Component: DreamMidTraining, width: 960, height: 300 },
    sft: { Component: DreamSft, width: 940, height: 330 },
    rl: { Component: DreamRl, width: 900, height: 330 },
    'eval-2': { Component: DreamEvalAfter, width: 1010, height: 250 },
  },
  // Illustrative threat-intelligence map, before and after post-training.
  results: ThreatMap,
}
