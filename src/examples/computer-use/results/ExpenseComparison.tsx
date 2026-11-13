import { useRef, useState } from 'react'
import { Button, Text } from '@nvidia/foundations-react-core'
import { ArrowRight } from '@nvidia/react-gui-icons/icons'
import { expense, type Run } from './expense'

/**
 * Results tab for Computer Use: the same invoice task run by the base model
 * and by the post-trained one, side by side (adapted from H Company's GTC demo
 * "Model comparison" view). Each side has the recorded screen capture, a
 * checklist of what got done, and the run's cost.
 */
/** Video size on the page: 1408 x 928, capped so both videos always fit on the screen. */
const VIDEO_ASPECT = 1408 / 928
const VIDEO_WIDTH = { aspectRatio: VIDEO_ASPECT, maxWidth: `calc((100vh - 24rem) * ${VIDEO_ASPECT})` }

export function ExpenseComparison() {
  const videos = useRef<(HTMLVideoElement | null)[]>([])
  // Whether each video has played to the end: the result is only shown then.
  const [done, setDone] = useState([false, false])
  // Once the comparison is running, the explanation and button go away.
  const [started, setStarted] = useState(false)
  const setFinished = (index: number, value: boolean) => setDone((d) => d.map((v, i) => (i === index ? value : v)))
  const runs = [expense.before, expense.after]

  /** Restart both recordings together. */
  const runComparison = () => {
    setStarted(true)
    setDone([false, false])
    for (const video of videos.current) {
      if (!video) continue
      video.currentTime = 0
      void video.play()
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-8">
        {runs.map((run, i) => (
          <section key={run.heading} aria-label={run.heading} className="flex flex-col items-center gap-4">
            {/* Which model this is: the kind of model, then its name in the side's colour. */}
            <div className="flex flex-col items-center text-center">
              <Text kind="body/regular/lg" className="block text-secondary">
                {run.tag}:
              </Text>
              <Text kind="title/2xl" className={`block ${i === 1 ? 'text-feedback-success' : 'text-feedback-danger'}`}>
                {run.heading}
              </Text>
            </div>

            {/* The cap keeps the video from growing taller than the screen has room for. */}
            <video
              ref={(el) => {
                videos.current[i] = el
              }}
              src={run.video}
              className="w-full rounded-lg border border-base bg-black"
              style={VIDEO_WIDTH}
              aria-label={`${run.heading} working on the invoice task`}
              controls
              muted
              playsInline
              preload="metadata"
              onPlay={(event) => event.currentTarget.currentTime < 0.5 && setFinished(i, false)}
              onEnded={() => setFinished(i, true)}
            />
          </section>
        ))}
      </div>

      {/* What the task is, and the button that runs both videos. */}
      {!started && (
        <div className="flex flex-col items-center gap-4 text-center">
          <Text kind="body/regular/xl" className="block max-w-3xl">
            {expense.subtitle}
          </Text>
          <Button kind="secondary" size="large" onClick={runComparison}>
            Run comparison
            <ArrowRight />
          </Button>
        </div>
      )}

      {/* Each result appears under its video once the video has finished. */}
      <div className="grid grid-cols-2 gap-8" aria-live="polite">
        {runs.map((run, i) => (
          <div key={run.heading} className="mx-auto w-full" style={{ maxWidth: VIDEO_WIDTH.maxWidth }}>
            {done[i] && <Result run={run} good={i === 1} />}
          </div>
        ))}
      </div>
    </div>
  )
}

function Result({ run, good }: { run: Run; good: boolean }) {
  return (
    <div className="flex flex-col gap-5">
      <Text kind="body/bold/xl" className={`block ${good ? 'text-feedback-success' : 'text-feedback-danger'}`}>
        {run.outcome}
      </Text>

      <dl className="m-0 flex flex-wrap gap-x-8 gap-y-2">
        <Stat label="steps" value={run.steps} />
        <Stat label="minutes" value={run.minutes} />
        <Stat label="tokens" value={run.tokens} />
      </dl>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-baseline gap-2">
      <dd className="m-0 order-first">
        <Text kind="title/lg">{value}</Text>
      </dd>
      <dt>
        <Text kind="body/regular/md" className="text-secondary">
          {label}
        </Text>
      </dt>
    </div>
  )
}
