'use client'

import React, { useEffect, useState } from "react";
import { Button, FormControl, IconButton, Modal, Tab, Tabs, TextField } from "@mui/material";
import { CalendarMonth, Check, Close, Delete, Edit, Home, Person } from "@mui/icons-material";
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
import { useProjectContext } from "@/context/ProjectContext";
import { useParams } from "next/navigation";

import './style.scss'
import DeleteProjectModal from "@/components/Modals/DeleteProject";
import { useProjectListContext } from "@/context/ProjectListContext";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";

// TODO: Definitely transform this into a component

const EditProjectModal: React.FC<{
  open: boolean;
  onClose: () => void;
  project: Project;
}> = observer(({ open, onClose, project }) => {

  const { currentProject, patchProject } = useProjectContext();
  const projectInfo = currentProject as Project;

  const handleDataChange = (fieldName: keyof Project, value: string) => {
    projectInfo[fieldName] = value;
  };

  const onConfirm = () => {
    patchProject(projectInfo);
    onClose();
  }

  const handleClose = () => {
    onClose();
  }

  return (
    <Modal
      open={open}
      className="createModal"
      onClose={() => handleClose()}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="createModal__content">
        <div className="createModal__header">
          <p>{project?.name}</p>
          <IconButton
            sx={{
              borderRadius: '4px',
              border: '1px solid #2196F3',
              color: '#2196F3',
              padding: '4px 10px',
            }}
            onClick={onClose}
            aria-label="close">
            <Close />
          </IconButton>
        </div>
        <form className='createModal__form'>
          <FormControl>
            <TextField
              onChange={
                ({ target }) => handleDataChange('homeownerName', target.value)
              }
              fullWidth
              id="outlined-basic"
              label="Client Name"
              variant="outlined"
              value={projectInfo?.homeownerName}
              required
              placeholder='Client Name'
            />
          </FormControl>
          <FormControl>
            <TextField
              onChange={({ target }) => handleDataChange('name', target.value)}
              id="outlined-basic"
              label="Project Name"
              variant="outlined"
              value={projectInfo?.name}
              required
              placeholder='Project Name'
            />
          </FormControl>
          <FormControl>
            <TextField
              onChange={
                ({ target }) => handleDataChange('homeownerAddress', target.value)
              }
              id="outlined-basic"
              label="Project Address"
              variant="outlined"
              value={projectInfo?.homeownerAddress}
              required
              placeholder='Project Address'
            />
          </FormControl>
          <FormControl>
            <TextField
              onChange={
                ({ target }) => handleDataChange('homeownerEmail', target.value)
              }
              id="outlined-basic"
              label="Client Email Address"
              variant="outlined"
              value={projectInfo?.homeownerEmail}
              required
              placeholder='Client Email Address'
            />
          </FormControl>
          <FormControl>
            <TextField
              onChange={
                ({ target }) => handleDataChange('homeownerPhone', target.value)
              }
              id="outlined-basic"
              label="Client Phone Number"
              variant="outlined"
              value={projectInfo?.homeownerPhone}
              required
              placeholder='Client Phone Number'
            />
          </FormControl>
        </form>
        <div className="createModal__footer">
          <Button
            variant='contained'
            startIcon={<Check />}
            onClick={onConfirm}
            // disabled={!isSaveButtonEnabled}
            size='small'
            sx={{
              marginLeft: 'auto'
            }}
            color='primary'>Save
          </Button>
        </div>
      </div>
    </Modal>
  );
});

const DataCollection = observer(() => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0); //TODO: rename this please
  const { currentProject, fetchProject, clearCurrentProject } = useProjectContext();
  const { deleteProject } = useProjectListContext();
  const router = useRouter()
  const { id } = useParams()

  useEffect(() => {
    if (typeof id === 'string') {
      fetchProject(id)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    return () => {
      clearCurrentProject();
    };

  }, [id]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const renderTabContent = (index: number, component: JSX.Element) => (
    <div hidden={value !== index}>{component}</div>
  )

  async function handleDeleteProject(projectId: string) {
    await deleteProject(projectId);
    setDeleteModal(false);
    router.push('/')
  }

  return (
    <>
      {currentProject && (
        <EditProjectModal
          open={openModal}
          project={currentProject}
          onClose={() => setOpenModal(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
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
              <p className="dataCollection__title">{currentProject?.name}</p>
              <div className="dataCollection__infoWrapper">
                <span className="dataCollection__info">
                  <Home />{currentProject?.homeownerAddress}
                </span>
                <span className="dataCollection__info">
                  <Person />{currentProject?.homeownerName}
                </span>
                <span className="dataCollection__info">
                  {/* TODO: make this beautiful */}
                  <CalendarMonth />{currentProject?.createdAt}
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
          {currentProject?.data ? <div>
            <Tabs sx={{ background: '#FAFAFA' }}
              variant="fullWidth" value={value} onChange={handleChange}>
              <Tab label="Basics" />
              <Tab label="Objectives" />
              <Tab label="Envelope" />
              <Tab label="Rooms" />
              <Tab label="Appliances" />
              <Tab label="Electrical" />
              <Tab label="Photos" />
            </Tabs>
            {renderTabContent(0, <Basics projectData={currentProject.data} projectId={currentProject.id}/>)}
            {renderTabContent(1, <Objectives projectData={currentProject.data} />)}
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
