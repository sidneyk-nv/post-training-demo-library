import type { Example } from '../types'
import cardImage from './card.png'
import r1Logo from './logos/r1.svg'

export const healthcare: Example = {
  id: 'healthcare',
  title: 'Healthcare',
  description: 'Draft appeals for medical claim denials.',
  cardImage,
  cardImageBackground: '#10181c',
  partnerLogos: [{ src: r1Logo, width: 30, height: 21.42, alt: 'R1' }],
}
