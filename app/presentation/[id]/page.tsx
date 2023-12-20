'use client'

import { useParams } from 'next/navigation'
import ModelStore from '@/app/stores/modelStore'
import '../style.scss'
import { useEffect } from 'react'

const PublicPlanPresentation = () => {
  // TODO: Fetch the json blob details of the given id to be displayed
  const presentation = ModelStore.currentPresentation
  const { id } = useParams()
  console.log('kiley', id)
  // const presentationData = ModelStore.getPresentationData(id)

  useEffect(() => {
    if (typeof id === 'string') {
      ModelStore.setCurrentPresentation(id)
    }

    return () => {
      ModelStore.clearCurrentPresentation()
    }
  }, [id])
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#E8EAF6',
      }}
    >
      <div
        className="header"
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <p className="header__title">{'organization?.name'}</p>
      </div>
      <div>{presentation.name}</div>
    </div>
  )
}

export default PublicPlanPresentation
