'use client'
import IssuesView from '../Components/IssuesSummary'
import { PhotoDetails, Project } from '@/types/types'
import { observer } from 'mobx-react-lite'
import PlaceHolderPhoto from '../../../../assets/placeholder-image.png'

import '../style.scss'
import {
  CalendarMonth,
  Home,
  HomeOutlined,
  MailOutline,
  Person,
  PersonOutline,
  Phone,
  PhoneOutlined,
} from '@mui/icons-material'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import ModelStore from '@/app/stores/modelStore'
import { toJS } from 'mobx'

const HomeSummary: React.FC<{
  project: Project
}> = observer(({ project }) => {
  const [heroPhoto, setHeroPhoto] = useState<PhotoDetails>({})

  console.log(toJS(project))
  useEffect(() => {
    if (project?.heroImageId) {
      ModelStore.downloadPhoto(project.heroImageId).then((response) => {
        setHeroPhoto({ photoUrl: response })
      })
    } else {
      setHeroPhoto({})
    }
  }, [project?.heroImageId])

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
      <div className="homeSummary__header">
        {!heroPhoto?.photoUrl && (
          <Image src={PlaceHolderPhoto} alt="project-image" />
        )}
        {heroPhoto?.photoUrl && (
          <Image
            alt="project-image"
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            src={heroPhoto.photoUrl}
          ></Image>
        )}
        <div className="homeSummary__info">
          <span className="homeSummary__infoItem">
            <HomeOutlined />
            {project?.homeownerAddress}
          </span>
          <span className="homeSummary__infoItem">
            <PersonOutline />
            {project?.homeownerName}
          </span>
          <span className="homeSummary__infoItem">
            <MailOutline />
            {project.homeownerEmail}
          </span>
          <span className="homeSummary__infoItem">
            <PhoneOutlined />
            {project.homeownerPhone}
          </span>
        </div>
      </div>
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
