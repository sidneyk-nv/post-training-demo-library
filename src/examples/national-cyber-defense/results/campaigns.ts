import { COUNTRIES } from './worldMap'

/**
 * Illustrative threat-intelligence (CTI) data for the Results map, from the
 * "Threat Intelligence Map" in the GTC demo (gtc-post-training-demo-ui,
 * src/app/components/dream/CtiMap.tsx). It is sample data, not a real
 * incident: the same threat-report feed analysed before and after training.
 *
 * - The base model surfaces 2 campaigns and one country each.
 * - The trained model links 4 campaigns to 3 groups, their full target set
 *   (9 countries) and the critical infrastructure they hit.
 * - Attackers are shown as anonymous threat actors over open water, never as
 *   countries; dotted lines are relationships inferred from reports, not
 *   physical attack paths.
 * - Targets are small, geopolitically low-profile countries so no pairing reads
 *   as a real incident.
 */

export type Severity = 'Critical' | 'High' | 'Medium'
export type Infra = { country: string; sectors: string[] }
export type Campaign = {
  name: string
  group: string
  severity: Severity
  /** All countries the campaign targets (ISO numeric ids). */
  targets: string[]
  /** The targets the base model finds. */
  before: string[]
  infra: Infra[]
}

// `before`: how many of a campaign's targets the base model finds.
// `sites`: the sectors hit in each targeted country, in target order.
const PLAN = [
  { name: 'Campaign 01', group: 'Group A', severity: 'Critical', before: 1, sites: [['Energy grid', 'Telecom'], ['Energy grid', 'Oil & gas', 'Rail']] },
  { name: 'Campaign 02', group: 'Group B', severity: 'High', before: 1, sites: [['Telecom', 'Energy grid', 'Banking'], ['Energy grid']] },
  { name: 'Campaign 03', group: 'Group C', severity: 'Critical', before: 0, sites: [['Ports', 'Energy grid'], ['Energy grid', 'Ports'], ['Telecom']] },
  { name: 'Campaign 04', group: 'Group B', severity: 'Medium', before: 0, sites: [['Oil & gas'], ['Oil & gas', 'Ports']] },
] as const

// Portugal, Iceland, Ghana, Kenya, Uruguay, Nepal, Laos, Papua New Guinea, Fiji (ISO numeric).
const TARGETS = ['620', '352', '288', '404', '858', '524', '418', '598', '242']

let next = 0
export const CAMPAIGNS: Campaign[] = PLAN.map(({ sites, before, ...c }) => {
  const infra = sites.map((sectors) => ({ country: TARGETS[next++], sectors: [...sectors] }))
  const targets = infra.map((f) => f.country)
  return { ...c, targets, before: targets.slice(0, before), infra }
})

/** Where each anonymous attacker sits on the map (over open water). */
export const ACTORS: Record<string, [number, number]> = {
  'Group A': [870, 260],
  'Group B': [850, 350],
  'Group C': [670, 410],
}

/** Crop of the 1000 x 520 world map: Central America to Tonga, Iceland to Uruguay. */
export const VIEW = { x: 240, y: 60, w: 720, h: 420 }

/** Each country's label point on the map. */
export const CENTROID: Record<string, [number, number]> = Object.fromEntries(COUNTRIES.map((c) => [c.id, c.c]))

/** What a model links from the reports. */
export type Linked = { campaigns: number; countries: number; infra: number }

export const FULL: Linked = {
  campaigns: CAMPAIGNS.length,
  countries: new Set(CAMPAIGNS.flatMap((c) => c.targets)).size,
  infra: CAMPAIGNS.flatMap((c) => c.infra.flatMap((f) => f.sectors)).length,
}

const beforeFound = CAMPAIGNS.filter((c) => c.before.length)
export const BEFORE_FINAL: Linked = {
  campaigns: beforeFound.length,
  countries: new Set(beforeFound.flatMap((c) => c.before)).size,
  infra: 0,
}

/** Share of the full campaign picture (every campaign, targeted country and infrastructure site). */
export const share = (l: Linked) => (l.campaigns + l.countries + l.infra) / (FULL.campaigns + FULL.countries + FULL.infra)
