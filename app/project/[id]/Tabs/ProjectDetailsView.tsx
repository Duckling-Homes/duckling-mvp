'use client'

import { PhotoDetails, Project } from '@/types/types'
import { CalendarMonth, Home, Person } from '@mui/icons-material'
import { Button } from '@mui/material'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import React from 'react'
import PlaceHolderPhoto from '../../../assets/placeholder-image.png'

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
          <Image
            alt="project-image"
            width={150}
            height={150}
            objectFit="cover"
            src={heroPhoto.photoUrl}
          />
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
