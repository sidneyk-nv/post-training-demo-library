import { useState } from 'react'
import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import { Tabs } from '@kui/foundations-react'
import { StageFlow } from '../components/StageFlow'
import { isStageId, stages } from '../diagrams'
import { getExample } from '../examples'

/**
 * The post-training flow. `/introduction` shows the generic version;
 * `/examples/<id>` adds that use case's popovers, diagrams and logos.
 */
export function FlowPage() {
  const { exampleId } = useParams()
  const [searchParams] = useSearchParams()
  const [tab, setTab] = useState('architecture')

  const example = getExample(exampleId)
  if (exampleId !== undefined && !example?.hasPage) {
    return <Navigate to="/" replace />
  }

  const stageParam = searchParams.get('stage')
  const activeStage = isStageId(stageParam) ? stageParam : 'eval'
  // Use-case-specific diagrams replace the shared ones stage by stage.
  const exampleStages = stages.map((stage) => ({ ...stage, ...example?.diagrams?.[stage.id] }))

  return (
    <div className="flex flex-1 flex-col gap-6 px-12 pt-12 pb-6">
      <Tabs
        kind="primary"
        value={tab}
        onValueChange={setTab}
        items={[
          { value: 'architecture', children: 'Architecture' },
          { value: 'results', children: 'Results' },
        ]}
      />
      {tab === 'architecture' ? (
        <StageFlow stages={exampleStages} activeStage={activeStage} hotspots={example?.popovers} />
      ) : (
        // Results isn't designed yet: intentionally blank.
        <div className="flex-1" />
      )}
      {example?.pageLogos && (
        <div className="flex items-center gap-3">
          {example.pageLogos.map((logo) => (
            <img key={logo.src} src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} />
          ))}
        </div>
      )}
    </div>
  )
}
