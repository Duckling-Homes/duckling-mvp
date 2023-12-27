'use client'
import { observer } from 'mobx-react-lite'
import '../style.scss'
import { Chip, FormLabel } from '@mui/material'

const IssuesView: React.FC<{
  title: string
  healthSafetyTags: string[]
  comfortTags: string[]
}> = observer(({ title, healthSafetyTags, comfortTags }) => {
  return (
    <div className="issues">
      <div className="issues__header">
        <p>{title}</p>
      </div>
      <FormLabel>Comfort Issues</FormLabel>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginTop: '12px',
          marginBottom: '24px',
        }}
      >
        {comfortTags.map((issue) => (
          <Chip label={issue} key={issue} color={'primary'} />
        ))}
      </div>

      <FormLabel>Health & Safety Issues</FormLabel>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginTop: '12px',
          marginBottom: '24px',
        }}
      >
        {healthSafetyTags.map((issue) => (
          <Chip label={issue} key={issue} color={'primary'} />
        ))}
      </div>
    </div>
  )
})

export default IssuesView
