'use client'
import IssuesView from '../Components/IssuesSummary'
import { Project } from '@/types/types'
import { observer } from 'mobx-react-lite'

import '../style.scss'

const HomeSummary: React.FC<{
  project: Project
}> = observer(({ project }) => {
  return (
    <>
      {/* TODO: Add summary back in - need to generate it first */}
      {/* <div className="summary">
        <div className="summary__header">
          <Home />
          <p>Summary</p>
        </div>
        <div className="summary__text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            iaculis ornare maximus. Quisque dictum nec urna ut interdum. Aenean
            mattis fermentum sollicitudin. Quisque porta dui vel libero commodo,
            ut pellentesque neque pellentesque. Mauris blandit tincidunt erat,
            sed egestas mi hendrerit ut. Nunc vehicula facilisis nibh, nec
            aliquet leo accumsan a. Quisque a egestas leo. Quisque faucibus odio
            eu scelerisque tempus. Donec id placerat nisi.
          </p>
        </div>
      </div> */}
      <div className="issuesOverview">
        <div className="issuesOverview__header">
          <p>Issues</p>
        </div>
        <IssuesView
          title={'Overall'}
          healthSafetyTags={project.data?.healthSafetyIssueTags ?? []}
          comfortTags={project.data?.comfortIssueTags ?? []}
        />
        {project.rooms?.map((room) => (
          <IssuesView
            key={room.id}
            title={room.name ?? ''}
            healthSafetyTags={room.safetyIssueTags ?? []}
            comfortTags={room.comfortIssueTags ?? []}
          />
        ))}
      </div>
    </>
  )
})

export default HomeSummary
