'use client'

import React, { useEffect, useState } from "react";
import { Button, Tab, Tabs } from "@mui/material";
import { CalendarMonth, Delete, Edit, Home, Person } from "@mui/icons-material";
import Image from "next/image";
import { Container } from "@/components/Container";
import PlaceHolderPhoto from '../../assets/placeholder-image.png';
import {
  Appliances,
  Basics,
  Electrical,
  Envelope,
  Objectives,
  Photos,
  Rooms,
} from './Tabs/index'
import { Project } from "@/types/types";
import { useParams } from "next/navigation";
import DeleteProjectModal from "@/components/Modals/DeleteProject";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import ProjectModal from "@/components/Modals/ProjectModal";
import ModelStore from "@/app/stores/modelStore";

import './style.scss'

const DataCollection = observer(() => {
  const [openModal, setOpenModal]             = useState<boolean>(false);
  const [deleteModal, setDeleteModal]         = useState<boolean>(false);
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (typeof id === 'string') {
      ModelStore.fetchProject(id)
    }

    return () => {
      ModelStore.clearCurrentProject();
    };

  }, [id]);

  const renderTabContent = (index: number, component: JSX.Element) => (
    <div hidden={currentTabIndex !== index}>{component}</div>
  )

  function handleChangeTab(event: React.SyntheticEvent, newValue: number) {
    setCurrentTabIndex(newValue)
  }

  async function handleDeleteProject(projectId: string) {
    await ModelStore.deleteProject(projectId);
    setDeleteModal(false);
    router.push('/')
  }

  function handleUpdateProject(updatedProject: Project) {
    ModelStore.patchProject(updatedProject);
  }

  return (
    <>
      {ModelStore.currentProject && (
        <ProjectModal
          open={openModal}
          project={ModelStore.currentProject}
          onClose={() => setOpenModal(false)}
          onConfirm={(updatedProject) => handleUpdateProject(updatedProject)}
        />
      )}
      {ModelStore.currentProject && (
        <DeleteProjectModal
          open={deleteModal}
          project={ModelStore.currentProject}
          onClose={() => setDeleteModal(false)}
          onConfirm={handleDeleteProject}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        />
      )}
      <Container>
        <div className="dataCollection">
          <div className="dataCollection__header">
            <div className="dataCollection__photoWrapper">
              <Image src={PlaceHolderPhoto} alt="project-image" />
              <Button
                variant="contained"
                size="small"
              >
                Add Photo
              </Button>
            </div>
            <div className="dataCollection__projectInfo">
              <p className="dataCollection__title">{ModelStore.currentProject?.name}</p>
              <div className="dataCollection__infoWrapper">
                <span className="dataCollection__info">
                  <Home />{ModelStore.currentProject?.homeownerAddress}
                </span>
                <span className="dataCollection__info">
                  <Person />{ModelStore.currentProject?.homeownerName}
                </span>
                <span className="dataCollection__info">
                  {/* TODO: make this beautiful */}
                  <CalendarMonth />{ModelStore.currentProject?.createdAt}
                </span>
              </div>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>
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
          <div style={{
            padding: '8px 24px 16px 24px',
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
          }}>
            <Button variant="outlined">Home Info</Button>
            <Button variant="outlined">Plans</Button>
            <Button variant="outlined">Present</Button>
          </div>
          {ModelStore.currentProject ? <div>
            <Tabs sx={{ background: '#FAFAFA' }}
              variant="fullWidth" value={currentTabIndex} onChange={handleChangeTab}>
              <Tab label="Basics" />
              <Tab label="Objectives" />
              <Tab label="Envelope" />
              <Tab label="Rooms" />
              <Tab label="Appliances" />
              <Tab label="Electrical" />
              <Tab label="Photos" />
            </Tabs>
            {renderTabContent(0, <Basics currentProject={ModelStore.currentProject}/>)}
            {renderTabContent(1, <Objectives currentProject={ModelStore.currentProject} />)}
            {renderTabContent(2, <Envelope />)}
            {renderTabContent(3, <Rooms />)}
            {renderTabContent(4, <Appliances />)}
            {renderTabContent(5, <Electrical />)}
            {renderTabContent(6, <Photos />)}
          </div> : null}
        </div>
      </Container>
    </>
  )
})

export default DataCollection
