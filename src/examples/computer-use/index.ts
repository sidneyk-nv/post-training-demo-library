import type { Example } from '../types'
import cardImage from './card.png'
import hCompanyLogo from './logos/h-company.svg'

export const computerUse: Example = {
  id: 'computer-use',
  title: 'Computer Use',
  description: 'Complete software tasks autonomously.',
  cardImage,
  cardImageBackground: '#0c0c11',
  partnerLogos: [{ src: hCompanyLogo, width: 27.6, height: 16, alt: 'H Company' }],
}
