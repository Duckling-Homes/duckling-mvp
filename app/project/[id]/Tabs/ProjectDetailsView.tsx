'use client'

import React from 'react'
import { Button } from '@mui/material'
import { CalendarMonth, Home, Person } from '@mui/icons-material'
import Image from 'next/image'
import PlaceHolderPhoto from '../../../assets/placeholder-image.png'
import { PhotoDetails, Project } from '@/types/types'
import { observer } from 'mobx-react-lite'
import dayjs from 'dayjs'

import '../style.scss'

const ProjectDetails: React.FC<{
  project: Project
  heroPhoto?: PhotoDetails
  setOpenCamera?: (val: boolean) => void
}> = observer(({ project, heroPhoto, setOpenCamera }) => {
  return (
    <>
      <div className="dataCollection__photoWrapper">
        {!heroPhoto?.photoUrl && (
          <Image src={PlaceHolderPhoto} alt="project-image" />
        )}
        {heroPhoto?.photoUrl && (
          <img
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            src={heroPhoto.photoUrl}
          ></img>
        )}
        {setOpenCamera && !heroPhoto?.photoUrl && (
          <Button
            variant="contained"
            size="small"
            onClick={() => setOpenCamera(true)}
          >
            Add Photo
          </Button>
        )}
      </div>
      <div className="dataCollection__projectInfo">
        <p className="dataCollection__title">{project?.name}</p>
        <div className="dataCollection__infoWrapper">
          <span className="dataCollection__info">
            <Home />
            {project?.homeownerAddress}
          </span>
          <span className="dataCollection__info">
            <Person />
            {project?.homeownerName}
          </span>
          <span className="dataCollection__info">
            <CalendarMonth />
            {dayjs(project?.createdAt).format('MMMM D, YYYY')}
          </span>
        </div>
      </div>
    </>
  )
})

export default ProjectDetails
