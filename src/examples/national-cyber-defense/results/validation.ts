/**
 * Measured results shown under the threat map, from Dream's "Dreamer
 * Continuous Post-Training" page (September 2026), "Results" section:
 * Nemotron 3.5 Super VL 120B-A12B (the page calls it a preview), Posture agent, one RL
 * post-training run, scored on a held-out posture question set.
 * Start and end figures average the first three and the last three
 * validations of the run. Don't add figures that aren't on that page.
 * (The map above them is illustrative example data.)
 */
export const RUN = {
  model: 'Nemotron 3.5 Super VL 120B-A12B',
  scope: 'Posture agent · held-out question set · one post-training run',
  headline: 'Validation climbs while answers get shorter and finish more often',
  note: 'Start and end average the first three and last three validations of the run. Same agent, same tools, same base model; only the weights changed.',
}

export type Metric = {
  label: string
  /** What the metric measures. */
  detail: string
  /** Value at the start of the run. */
  start: string
  /** Value at the end of the run, shown as "start → end" (or alone when `change` is set). */
  end: string
  /** Shown instead of "start → end" when the source only gives a relative change. */
  change?: string
  /** Extra context shown after training. */
  extra?: string
}

export const METRICS: Metric[] = [
  {
    label: 'Validation score',
    detail: 'mean score on held-out posture questions; higher is better',
    start: '0.70',
    end: '0.75',
    extra: 'peak 0.76',
  },
  {
    label: 'Answer length',
    detail: 'mean generated tokens per answer',
    start: 'baseline',
    end: '−22%',
    change: '−22%',
  },
  {
    label: 'Truncated answers',
    detail: 'answers cut off at the generation limit',
    start: '4.8%',
    end: '1.0%',
  },
]
