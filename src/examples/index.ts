/**
 * All demo use cases, in the order they appear on the Examples page and in
 * the Examples menu. To add one, create `src/examples/<id>/` (copy an existing
 * folder) and add it to this list. See the README for details.
 */
import type { Example } from './types'
import { financialResearch } from './financial-research'
import { legalServices } from './legal-services'
import { healthcare } from './healthcare'
import { customerService } from './customer-service'
import { nationalCyberDefense } from './national-cyber-defense'
import { computerUse } from './computer-use'

export type { Example, Hotspot, Logo } from './types'

export const examples: Example[] = [
  financialResearch,
  legalServices,
  healthcare,
  customerService,
  nationalCyberDefense,
  computerUse,
]

export function getExample(id: string | undefined): Example | undefined {
  return examples.find((example) => example.id === id)
}

/** The detail-page URL, or undefined if the use case has no page yet. */
export function exampleHref(example: Example): string | undefined {
  return example.hasPage ? `/examples/${example.id}` : undefined
}
