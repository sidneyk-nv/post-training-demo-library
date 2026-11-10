import type { Example } from '../types'
import cardImage from './card.png'
import samayaMark from './logos/samaya-mark.svg'
import samayaLogotype from './logos/samaya-logotype.svg'
import { popovers } from './popovers'

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
    { src: samayaMark, width: 28, height: 28, alt: '' },
    { src: samayaLogotype, width: 98.7, height: 28, alt: 'Samaya' },
  ],
  popovers,
}
