import { useEffect, useState } from 'react'
import { Badge, Button, Text } from '@nvidia/foundations-react-core'
import { Pause, Play } from '@nvidia/react-gui-icons/icons'
import { refill, type Segment, type Side, type Turn } from './refill'

/** How long each turn takes to appear when playing, in ms. Assistant turns show a typing indicator first. */
const PATIENT_DELAY = 900
const ASSISTANT_DELAY = 1800

/** Turn steps: both conversations advance together, one turn per step. */
const STEPS = Math.max(refill.before.turns.length, refill.after.turns.length)

/**
 * Results tab for Patient Interaction: the recorded prescription refill
 * conversation before and after GRPO, side by side (adapted from the GTC
 * Healthcare demo's "Before & After" view). Both conversations are shown in
 * full; Play replays them turn by turn, in step.
 */
export function RefillComparison() {
  // How many turns of each conversation are shown, and whether they're playing.
  const [shown, setShown] = useState(STEPS)
  const [playing, setPlaying] = useState(false)
  const finished = shown >= STEPS

  // The next turn waits longer when an assistant is "typing" it.
  const nextIsAssistant = [refill.before, refill.after].some((side) => side.turns[shown]?.role === 'assistant')
  useEffect(() => {
    if (!playing) return
    if (finished) {
      setPlaying(false)
      return
    }
    const timer = setTimeout(() => setShown((n) => n + 1), nextIsAssistant ? ASSISTANT_DELAY : PATIENT_DELAY)
    return () => clearTimeout(timer)
  }, [playing, finished, shown, nextIsAssistant])

  const onPlay = () => {
    if (playing) return setPlaying(false)
    if (finished) setShown(0)
    setPlaying(true)
  }

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Text kind="title/2xl" asChild>
            <h2 className="m-0">{refill.title}</h2>
          </Text>
          <Text kind="body/regular/xl" className="block text-secondary">
            {refill.subtitle}
          </Text>
        </div>
        <Button kind="secondary" size="large" onClick={onPlay}>
          {playing ? <Pause /> : <Play />}
          {playing ? 'Pause' : finished ? 'Play conversation' : 'Resume'}
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Column side={refill.before} tone="bad" shown={shown} playing={playing} />
        <Column side={refill.after} tone="good" shown={shown} playing={playing} />
      </div>
    </div>
  )
}

function Column({ side, tone, shown, playing }: { side: Side; tone: 'bad' | 'good'; shown: number; playing: boolean }) {
  const bad = tone === 'bad'
  const typing = playing && side.turns[shown]?.role === 'assistant'
  return (
    <section
      aria-label={side.heading}
      className={`flex flex-col gap-5 border-t-2 pt-5 ${bad ? 'border-feedback-danger' : 'border-feedback-success'}`}
    >
      <div className="flex items-center justify-between gap-4">
        <Text kind="title/lg" asChild>
          <h3 className="m-0">{side.heading}</h3>
        </Text>
        {side.checkpoint && (
          <Badge color={bad ? 'red' : 'green'} size="large">
            {side.checkpoint}
          </Badge>
        )}
      </div>
      <Text kind="body/bold/xl" className={`block ${bad ? 'text-feedback-danger' : 'text-feedback-success'}`}>
        {side.caption}
      </Text>
      {/* New turns are announced to screen readers as they appear. */}
      <ol className="m-0 flex list-none flex-col gap-4 p-0" aria-live="polite">
        {side.turns.slice(0, shown).map((turn, i) => (
          <Bubble key={i} turn={turn} />
        ))}
        {typing && <TypingIndicator />}
      </ol>
    </section>
  )
}

const bubbleClass = (patient: boolean) =>
  `turn-in flex flex-col gap-3 rounded-lg border border-base p-5 ${patient ? 'ml-12 bg-surface-sunken' : 'mr-12 bg-surface-raised'}`

/** One message. Patient messages are inset from the left, the assistant's from the right. */
function Bubble({ turn }: { turn: Turn }) {
  const patient = turn.role === 'patient'
  return (
    <li className={bubbleClass(patient)}>
      <Text kind="label/bold/md" className="block uppercase tracking-wide text-secondary">
        {patient ? 'Patient' : 'Assistant'}
      </Text>
      {turn.tools && (
        <div className="flex flex-wrap items-center gap-2">
          <Text kind="label/regular/md" className="text-secondary">
            Tool calls:
          </Text>
          {turn.tools.map((tool, i) => (
            <span key={tool} className="flex items-center gap-2">
              {i > 0 && (
                <span className="text-secondary" aria-hidden>
                  →
                </span>
              )}
              <code className="rounded bg-surface-overlay px-2 py-0.5 font-mono text-14 text-primary">{tool}</code>
            </span>
          ))}
        </div>
      )}
      <Text kind="body/regular/xl" className="block whitespace-pre-line">
        {turn.segments.map((segment, i) => (
          <Quote key={i} segment={segment} />
        ))}
      </Text>
    </li>
  )
}

/** Shown in place of the assistant's next turn while it plays. */
function TypingIndicator() {
  return (
    <li className={`${bubbleClass(false)} self-start`} aria-label="Assistant is typing">
      <Text kind="label/bold/md" className="block uppercase tracking-wide text-secondary">
        Assistant
      </Text>
      <span className="flex h-7 items-center gap-1.5" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} className="typing-dot size-2 rounded-full bg-[var(--text-color-secondary)]" style={{ animationDelay: `${i * 160}ms` }} />
        ))}
      </span>
    </li>
  )
}

function Quote({ segment }: { segment: Segment }) {
  const text = withBold(segment.text)
  if (!segment.mark) return <>{text}</>
  const bad = segment.mark === 'bad'
  return (
    <mark
      title={segment.note}
      className={`rounded-sm px-0.5 text-primary underline decoration-1 underline-offset-4 ${
        bad ? 'bg-accent-red-subtle decoration-[var(--border-color-feedback-danger)]' : 'bg-accent-green-subtle decoration-[var(--border-color-feedback-success)]'
      }`}
    >
      {text}
    </mark>
  )
}

/** Renders the recorded reply's **bold** markdown. */
function withBold(text: string) {
  return text.split(/\*\*(.+?)\*\*/).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))
}
