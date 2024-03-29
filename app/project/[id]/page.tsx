'use client'

import { Container } from '@/components/Container'
import DeleteProjectModal from '@/components/Modals/DeleteProject'
import ProjectModal from '@/components/Modals/ProjectModal'
import { PhotoDetails, Project } from '@/types/types'
import {
  Delete,
  Edit,
  FormatListNumbered,
  Home,
  Tune,
} from '@mui/icons-material'
import { Button, Tab, Tabs } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  Appliances,
  Basics,
  Electrical,
  Envelope,
  Objectives,
  Photos,
  Rooms,
} from './Tabs/index'

import ModelStore from '@/app/stores/modelStore'
import PhotoCaptureModal from '@/components/Modals/PhotoModal'
import Plans from './plans/Plans'
import Presentation from './presentation/Presentation'

import './style.scss'
import ProjectDetails from './Tabs/ProjectDetailsView'

const DataCollection = observer(() => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0)
  const [openCamera, setOpenCamera] = useState<boolean>(false)
  const [heroPhoto, setHeroPhoto] = useState<PhotoDetails>({})
  const [currentContent, setCurrentContent] = useState('tabs')
  const currentProject = ModelStore.currentProject as Project
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

  useEffect(() => {
    if (currentProject?.heroImageId) {
      ModelStore.downloadPhoto(currentProject.heroImageId).then((response) => {
        setHeroPhoto({ photoUrl: response })
      })
    } else {
      setHeroPhoto({})
    }
  }, [currentProject?.heroImageId])

  const renderTabContent = (index: number, component: JSX.Element) => (
    <div
      style={{
        backgroundColor: '#FFF',
      }}
      hidden={currentTabIndex !== index}
    >
      {component}
    </div>
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

  const handleBackButtonClick = () => {
    setCurrentContent('plans')
  }

  function renderContent() {
    switch (currentContent) {
      case 'tabs':
        return (
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
            {renderTabContent(0, <Basics currentProject={currentProject} />)}
            {renderTabContent(
              1,
              <Objectives currentProject={currentProject} />
            )}
            {renderTabContent(2, <Envelope currentProject={currentProject} />)}
            {renderTabContent(3, <Rooms currentProject={currentProject} />)}
            {renderTabContent(
              4,
              <Appliances currentProject={currentProject} />
            )}
            {renderTabContent(
              5,
              <Electrical currentProject={currentProject} />
            )}
            {renderTabContent(6, <Photos currentProject={currentProject} />)}
          </div>
        )
      case 'plans':
        return <Plans currentProject={currentProject} />
      case 'presentation':
        return <Presentation changeBack={handleBackButtonClick} />
    }
  }

  return (
    <>
      {currentProject && (
        <PhotoCaptureModal
          open={openCamera}
          project={currentProject}
          onClose={() => setOpenCamera(false)}
          photo={{ isHeroPhoto: true }}
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
            {currentContent !== 'presentation' && (
              <>
                <div className="dataCollection__header">
                  <ProjectDetails
                    project={currentProject}
                    heroPhoto={heroPhoto}
                    setOpenCamera={setOpenCamera}
                  ></ProjectDetails>
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
                <div className="dataCollection__buttonGroup">
                  <Button
                    style={{
                      backgroundColor: '#FFF',
                      textTransform: 'capitalize',
                      fontWeight: '400',
                      padding: '16px 0px',
                      width: '200px',
                      color:
                        currentContent === 'tabs'
                          ? '#2196F3'
                          : 'rgba(0,0,0,0.6)',
                      border:
                        currentContent === 'tabs'
                          ? '2px solid #2196F3'
                          : 'none',
                    }}
                    startIcon={<Home />}
                    onClick={() => setCurrentContent('tabs')}
                  >
                    Home Info
                  </Button>
                  <Button
                    style={{
                      backgroundColor: '#FFF',
                      textTransform: 'capitalize',
                      fontWeight: '400',
                      padding: '16px 0px',
                      width: '200px',
                      color:
                        currentContent === 'plans'
                          ? '#2196F3'
                          : 'rgba(0,0,0,0.6)',
                      border:
                        currentContent === 'plans'
                          ? '2px solid #2196F3'
                          : 'none',
                    }}
                    startIcon={<Tune />}
                    onClick={() => setCurrentContent('plans')}
                  >
                    Create Plans
                  </Button>
                  <Button
                    style={{
                      backgroundColor: '#FFF',
                      textTransform: 'capitalize',
                      fontWeight: '400',
                      padding: '16px 0px',
                      width: '200px',
                      color:
                        currentContent === 'presentation'
                          ? '#2196F3'
                          : 'rgba(0,0,0,0.6)',
                      border:
                        currentContent === 'presentation'
                          ? '2px solid #2196F3'
                          : 'none',
                    }}
                    startIcon={<FormatListNumbered />}
                    onClick={() => setCurrentContent('presentation')}
                  >
                    Present
                  </Button>
                </div>
              </>
            )}
            {currentProject ? renderContent() : null}
          </div>
        </Container>
      )}
    </>
  )
})

export default DataCollection
