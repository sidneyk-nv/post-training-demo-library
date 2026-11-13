import { useState } from 'react'
import { Badge, PopoverContent, PopoverRoot, PopoverTrigger, SegmentedControl, Text } from '@nvidia/foundations-react-core'
import { appeals, type AppealSide, type Evidence, type Passage } from './appeals'

/**
 * Results tab for Healthcare (R1): recorded appeal excerpts before and after
 * post-training, side by side, for two synthetic cases (adapted from R1's
 * "The appeal room" replay; see `appeals.ts`). Each citation opens the quoted
 * source record.
 */
export function AppealComparison() {
  const [id, setId] = useState(appeals[0].id)
  const example = appeals.find((a) => a.id === id) ?? appeals[0]

  return (
    <div className="flex flex-col gap-6">
      <SegmentedControl
        className="self-start"
        size="large"
        value={id}
        onValueChange={setId}
        items={appeals.map((a) => ({ value: a.id, children: a.title }))}
      />

      {/* Re-mount on switch so the new example fades in. */}
      <div key={example.id} className="turn-in flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          <Text kind="title/2xl" asChild>
            <h2 className="m-0">{example.headline}</h2>
          </Text>
          <Text kind="body/regular/xl" className="block text-secondary">
            {example.description}
          </Text>
          <Text kind="body/regular/lg" className="block text-secondary">
            <span className="font-bold text-primary">The denial: </span>
            {example.dispute}
          </Text>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Column heading="Before" side={example.before} tone="bad" />
          <Column heading="After Post-Training" side={example.after} tone="good" />
        </div>
      </div>
    </div>
  )
}

function Column({ heading, side, tone }: { heading: string; side: AppealSide; tone: 'bad' | 'good' }) {
  const bad = tone === 'bad'
  const verdict =
    side.passingDraws === 2
      ? 'Passed review (2 of 2 evaluator runs)'
      : side.passingDraws === 1
        ? 'Passed 1 of 2 evaluator runs'
        : 'Failed review (0 of 2 evaluator runs)'
  return (
    <section
      aria-label={`${heading}: ${side.model}`}
      className={`flex flex-col gap-4 border-t-2 pt-5 ${bad ? 'border-feedback-danger' : 'border-feedback-success'}`}
    >
      <div className="flex items-center justify-between gap-4">
        <Text kind="title/lg" asChild>
          <h3 className="m-0">{heading}</h3>
        </Text>
        <Badge color={bad ? 'red' : 'green'} size="large">
          {side.model}
        </Badge>
      </div>
      <Text kind="body/bold/xl" className={`block ${bad ? 'text-feedback-danger' : 'text-feedback-success'}`}>
        {side.headline}
      </Text>

      <div className="flex flex-col gap-3 rounded-lg border border-base bg-surface-raised p-5">
        <Text kind="label/bold/md" className="block uppercase tracking-wide text-secondary">
          From the appeal letter
        </Text>
        {side.passages.map((p, i) => (
          <Text key={i} kind="body/regular/xl" className="block">
            <Highlighted passage={p} tone={tone} />
          </Text>
        ))}
        <div className="flex flex-wrap items-center gap-2">
          <Text kind="label/regular/md" className="text-secondary">
            Sources cited:
          </Text>
          {side.evidence.map((e) => (
            <Citation key={e.id} evidence={e} />
          ))}
        </div>
      </div>

      <Text kind="body/regular/lg" className="block text-secondary">
        {side.annotation}
      </Text>
      <Badge className="self-start" color={bad ? 'red' : 'green'} kind="solid" size="large">
        {verdict}
      </Badge>
    </section>
  )
}

/** The passage, with its highlighted phrase marked red (the problem) or green (the fix). */
function Highlighted({ passage, tone }: { passage: Passage; tone: 'bad' | 'good' }) {
  const at = passage.highlight ? passage.text.indexOf(passage.highlight) : -1
  if (!passage.highlight || at < 0) return <>{passage.text}</>
  const end = at + passage.highlight.length
  return (
    <>
      {passage.text.slice(0, at)}
      <mark
        className={`rounded-sm px-0.5 text-primary underline decoration-1 underline-offset-4 ${
          tone === 'bad'
            ? 'bg-accent-red-subtle decoration-[var(--border-color-feedback-danger)]'
            : 'bg-accent-green-subtle decoration-[var(--border-color-feedback-success)]'
        }`}
      >
        {passage.text.slice(at, end)}
      </mark>
      {passage.text.slice(end)}
    </>
  )
}

/** A citation chip; hover or focus shows the quoted source record. */
function Citation({ evidence: e }: { evidence: Evidence }) {
  const [open, setOpen] = useState(false)
  return (
    <PopoverRoot open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={`${e.id}: show source evidence`}
        className="cursor-help rounded border border-base bg-surface-overlay px-2 py-0.5 font-mono text-14 text-primary transition-colors hover:border-interaction-selected focus-visible:border-interaction-selected"
        onPointerEnter={() => setOpen(true)}
        onPointerLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        {e.id}
      </PopoverTrigger>
      <PopoverContent side="top" align="start" style={{ width: 420 }}>
        <div className="flex flex-col gap-2">
          <Text kind="label/bold/lg" className="block">
            {e.document}
          </Text>
          <Text kind="body/regular/md" className="block">
            “{e.excerpt}”
          </Text>
          <Text kind="label/regular/sm" className="block text-secondary">
            {e.id} · synthetic patient record
          </Text>
        </div>
      </PopoverContent>
    </PopoverRoot>
  )
}
