'use client'

import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Tab, Tabs } from '@mui/material'
import { CalendarMonth, Delete, Edit, Home, Person } from '@mui/icons-material'
import Image from 'next/image'
import { Container } from '@/components/Container'
import PlaceHolderPhoto from '../../assets/placeholder-image.png'
import {
  Appliances,
  Basics,
  Electrical,
  Envelope,
  Objectives,
  Photos,
  Rooms,
} from './Tabs/index'
import { PhotoDetails, Project } from '@/types/types'
import { useParams } from 'next/navigation'
import DeleteProjectModal from '@/components/Modals/DeleteProject'
import { useRouter } from 'next/navigation'
import { observer } from 'mobx-react-lite'
import ProjectModal from '@/components/Modals/ProjectModal'
import ModelStore from '@/app/stores/modelStore'
import { v4 as uuidv4 } from 'uuid'

import './style.scss'
import PhotoCaptureModal from '@/components/Modals/PhotoModal'
import dayjs from 'dayjs'

const DataCollection = observer(() => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0)
  const [openCamera, setOpenCamera] = useState<boolean>(false)
  const [heroPhoto, setHeroPhoto] = useState<PhotoDetails>({})

  const currentProject = ModelStore.currentProject
  const router = useRouter()
  const { id } = useParams()

  useEffect(() => {
    if (typeof id === 'string') {
      ModelStore.setCurrentProject(id)
    }

    return () => {
      ModelStore.clearCurrentProject()
    }
  }, [id])

  useEffect(() => {}, [currentProject])

  useEffect(() => {
    console.log('I got a change in the image')
    if (currentProject?.heroImageId) {
      ModelStore.downloadPhoto(currentProject.heroImageId).then((response) => {
        setHeroPhoto({ photoUrl: response })
      })
    }
  }, [currentProject?.heroImageId])

  const renderTabContent = (index: number, component: JSX.Element) => (
    <div hidden={currentTabIndex !== index}>{component}</div>
  )

  function handleChangeTab(event: React.SyntheticEvent, newValue: number) {
    setCurrentTabIndex(newValue)
  }

  async function handleDeleteProject(projectId: string) {
    await ModelStore.deleteProject(projectId)
    setDeleteModal(false)
    router.push('/')
  }

  function handleUpdateProject(updatedProject: Project) {
    ModelStore.patchProject(updatedProject)
  }

  return (
    <>
      {currentProject && (
        <PhotoCaptureModal
          open={openCamera}
          project={currentProject}
          onClose={() => setOpenCamera(false)}
          photo={{isHeroPhoto: true}}
        />
      )}
      {currentProject && (
        <ProjectModal
          open={openModal}
          project={currentProject}
          onClose={() => setOpenModal(false)}
          onConfirm={(updatedProject) => handleUpdateProject(updatedProject)}
        />
      )}
      {currentProject && (
        <DeleteProjectModal
          open={deleteModal}
          project={currentProject}
          onClose={() => setDeleteModal(false)}
          onConfirm={handleDeleteProject}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        />
      )}
      {!openCamera && (
        <Container>
          <div className="dataCollection">
            <div className="dataCollection__header">
              <div className="dataCollection__photoWrapper">
                {!heroPhoto?.photoUrl && (
                  <Image src={PlaceHolderPhoto} alt="project-image" />
                )}
                {heroPhoto?.photoUrl && (
                  <img
                    style={{ width: '150px', height: '100px' }}
                    src={heroPhoto.photoUrl}
                  ></img>
                )}
                {!heroPhoto?.photoUrl && (
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
                <p className="dataCollection__title">{currentProject?.name}</p>
                <div className="dataCollection__infoWrapper">
                  <span className="dataCollection__info">
                    <Home />
                    {currentProject?.homeownerAddress}
                  </span>
                  <span className="dataCollection__info">
                    <Person />
                    {currentProject?.homeownerName}
                  </span>
                  <span className="dataCollection__info">
                    {/* TODO: make this beautiful */}
                    <CalendarMonth />
                    {dayjs(currentProject?.createdAt).format('MMMM D, YYYY')}
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setOpenModal(true)}
                  startIcon={<Edit />}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  onClick={() => setDeleteModal(true)}
                  startIcon={<Delete />}
                >
                  Delete
                </Button>
              </div>
            </div>
            <div
              style={{
                padding: '8px 24px 16px 24px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button>Home Info</Button>
                <Button>Plans</Button>
                <Button>Present</Button>
              </ButtonGroup>
            </div>
            {currentProject ? (
              <div>
                <Tabs
                  sx={{ background: '#FAFAFA' }}
                  variant="fullWidth"
                  value={currentTabIndex}
                  onChange={handleChangeTab}
                >
                  <Tab label="Basics" />
                  <Tab label="Objectives" />
                  <Tab label="Envelope" />
                  <Tab label="Rooms" />
                  <Tab label="Appliances" />
                  <Tab label="Electrical" />
                  <Tab label="Photos" />
                </Tabs>
                {renderTabContent(
                  0,
                  <Basics currentProject={currentProject} />
                )}
                {renderTabContent(
                  1,
                  <Objectives currentProject={currentProject} />
                )}
                {renderTabContent(
                  2,
                  <Envelope currentProject={currentProject} />
                )}
                {renderTabContent(3, <Rooms currentProject={currentProject} />)}
                {renderTabContent(
                  4,
                  <Appliances currentProject={currentProject} />
                )}
                {renderTabContent(
                  5,
                  <Electrical currentProject={currentProject} />
                )}
                {renderTabContent(
                  6,
                  <Photos currentProject={currentProject} />
                )}
              </div>
            ) : null}
          </div>
        </Container>
      )}
    </>
  )
})

export default DataCollection
