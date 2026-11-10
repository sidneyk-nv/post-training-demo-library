import type { Example } from '../types'
import cardImage from './card.png'
import harveyMark from './logos/harvey-mark.svg'
import harveyLogotype from './logos/harvey-logotype.svg'

export const legalServices: Example = {
  id: 'legal-services',
  title: 'Legal Services',
  description: 'Find the most relevant documents for your case.',
  cardImage,
  partnerLogos: [
    { src: harveyMark, width: 16, height: 16, alt: '' },
    { src: harveyLogotype, width: 46.6, height: 14, alt: 'Harvey' },
  ],
}
