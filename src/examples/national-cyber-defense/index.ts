import type { Example } from '../types'
import cardImage from './card.png'
import dreamMark from './logos/dream-mark.svg'
import dreamLogotype from './logos/dream-logotype.svg'

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
}
