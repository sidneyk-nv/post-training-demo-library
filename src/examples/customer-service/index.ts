import type { Example } from '../types'
import cardImage from './card.png'
import finLogo from './logos/fin.svg'

export const customerService: Example = {
  id: 'customer-service',
  title: 'Customer Service',
  // Placeholder copy, as in the Figma design.
  description: '<insert_description>',
  cardImage,
  partnerLogos: [{ src: finLogo, width: 42.2, height: 16, alt: 'Fin' }],
}
