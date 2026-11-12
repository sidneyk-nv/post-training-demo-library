import { useSearchParams } from 'react-router-dom'
import { StageFlow } from '../components/StageFlow'
import { isStageId, stages } from '../diagrams'

/** The generic post-training flow, with no use-case content and no tabs. */
export function IntroductionPage() {
  const [searchParams] = useSearchParams()
  const stageParam = searchParams.get('stage')
  const activeStage = isStageId(stageParam) ? stageParam : 'eval'

  return (
    <div className="flex flex-1 flex-col gap-6 px-12 pt-8 pb-12">
      <StageFlow stages={stages} activeStage={activeStage} />
    </div>
  )
}
