import beforeVideo from './nemotron-before.mp4'
import afterVideo from './holotron-after.mp4'

/**
 * Results tab for Computer Use: the "Validate your travel expense" task,
 * before and after post-training. Everything here is from H Company's demo
 * (the GTC post-training demo UI, `ComputerUseDemo`): the recorded runs, the
 * checklist and the run stats.
 */

export type Check = { text: string; passed: boolean; note?: string }

export type Run = {
  heading: string
  /** Small tag next to the heading. */
  tag: string
  /** The recorded screen capture of the run. */
  video: string
  outcome: string
  checks: Check[]
  steps: number
  minutes: number
  tokens: string
}

export const expense = {
  subtitle: 'Example: Using travel expense software. Use Dolibarr to find the invoice, validate it, and record the collected payment.',
  before: {
    heading: 'Nemotron 3 Nano Omni',
    tag: 'Base model',
    video: beforeVideo,
    outcome: 'Invoice never validated',
    checks: [
      { text: 'Found the Volkshochschule Rheintal draft invoice', passed: true },
      { text: 'Validated the invoice', passed: false, note: 'left as draft' },
      { text: 'Recorded payment by bank transfer, current account', passed: false },
      { text: 'Paid in full, invoice shows as settled', passed: false },
      { text: 'Reported the task as done', passed: false, note: 'hit 100-step limit' },
    ],
    steps: 100,
    minutes: 45,
    tokens: '4.0M',
  },
  after: {
    heading: 'Holotron4 Nano',
    tag: 'Post-trained model',
    video: afterVideo,
    outcome: 'Invoice issued and settled',
    checks: [
      { text: 'Found the Volkshochschule Rheintal draft invoice', passed: true },
      { text: 'Validated the invoice', passed: true },
      { text: 'Recorded payment by bank transfer, current account', passed: true },
      { text: 'Paid in full, invoice shows as settled', passed: true },
      { text: 'Reported the task as done', passed: true },
    ],
    steps: 40,
    minutes: 9,
    tokens: '0.5M',
  },
} satisfies { subtitle: string; before: Run; after: Run }
