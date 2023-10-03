"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { checkDeviceType } from "@/hooks/checkDeviceType";
import { Button, FormControl, IconButton, Modal, TextField } from "@mui/material";
import { Add, Check, Close } from "@mui/icons-material";

import './style.scss'

interface Project {
  id: number;
  name: string;
  homeownerName: string;
  homeownerPhone: string;
  homeownerEmail: string;
  homeownerAddress: string;
  createdAt: string;
}

interface NewProject {
  name: string;
  homeownerName: string;
  homeownerPhone: string;
  homeownerEmail: string;
  homeownerAddress: string;
}

const CreateProjectModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onConfirm: (newProject: NewProject) => void;
}> = ({ open, onConfirm, onClose }) => {
  const [newProjectData, setNewProjectData] = useState<NewProject>({
    name: '',
    homeownerName: '',
    homeownerPhone: '',
    homeownerEmail: '',
    homeownerAddress: '',
  })

  const handleDataChange = (fieldName: string, value: string) => {
    setNewProjectData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const isSaveButtonEnabled =
    newProjectData.name &&
    newProjectData.homeownerName &&
    newProjectData.homeownerAddress &&
    newProjectData.homeownerEmail &&
    newProjectData.homeownerPhone;

  return (
    <Modal
      open={open}
      className="createModal"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="createModal__content">
        <div className="createModal__header">
          <p>New Project</p>
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
        <form className='modal__form'>
          <FormControl>
            <TextField
              onChange={
                ({ target }) => handleDataChange('homeownerName', target.value)
              }
              id="outlined-basic"
              label="Client Name"
              variant="outlined"
              value={newProjectData.homeownerName}
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
              value={newProjectData.name}
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
              value={newProjectData.homeownerAddress}
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
              value={newProjectData.homeownerEmail}
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
              value={newProjectData.homeownerPhone}
              required
              placeholder='Client Phone Number'
            />
          </FormControl>
        </form>
        <div>
          <Button
            variant='contained'
            startIcon={<Check />}
            onClick={() => onConfirm(newProjectData)}
            disabled={!isSaveButtonEnabled}
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
};

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const device = checkDeviceType();


  useEffect(() => {
    fetch("/api/projects/")
      .then((response) => response.json())
      .then((data) => {
        const projectsWithFormattedDate = data.map((project: Project) => ({
          ...project,
          createdAt: new Date(project.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        }));

        setProjects(projectsWithFormattedDate);
        setFilteredProjects(projectsWithFormattedDate);
      });
  }, []);

  function searchData(searchValue: string) {
    if (searchValue === '') {
      setFilteredProjects(projects)
      return
    }

    let lowerCaseSearch = searchValue.toLowerCase()

    let result = projects.filter(project =>
      Object.values(project).some(prop =>
        typeof prop === 'string' && prop.toLocaleLowerCase().includes(lowerCaseSearch)
      )
    )

    setFilteredProjects(result)
  }

  function createProject(newProject: Project) {
    fetch("/api/projects/", {
      method: 'POST',
      body: JSON.stringify(newProject),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
    setOpenModal(false)
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Project Name', flex: 1 },
    { field: 'homeownerName', headerName: 'Name', flex: 1 },
    { field: 'homeownerAddress', headerName: 'Address', flex: 1 },
    { field: 'createdAt', headerName: 'Created', flex: 1 },
    {
      field: 'edit',
      headerName: '',
      renderCell: (params) => (
        <div style={{
          padding: '16px'
        }}>
          <Button
            variant="contained"
            size="small"
            href="/project/details/123"
          >
            Edit
          </Button>
        </div>
      ),
    },
  ]

  const mobileColumns: GridColDef[] = [
    { field: 'name', headerName: 'Project Name', flex: 1 },
    {
      field: 'edit',
      headerName: '',
      renderCell: (params) => (
        <div style={{
          padding: '16px'
        }}>
          <Button
            variant="contained"
            size="small"
            href="/project/details/123"
          >
            Edit
          </Button>
        </div>
      ),
    },
  ]

  return (
    <main>
      <CreateProjectModal
        open={openModal}
        onConfirm={(newProject: Project) => createProject(newProject)}
      />
      <Container>
        <div className='projectList__upperWrapper'>
          <div className='projectList__header'>
            <p>My Projects</p>
            <Button
              variant='contained'
              startIcon={<Add />}
              onClick={() => setOpenModal(true)}
              color='primary'>New Project</Button>
          </div>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            placeholder='Name, address'
            sx={{
              width: 300
            }}
            onChange={({ target }) => searchData(target.value)}
          />
        </div>
        <DataGrid
          rows={filteredProjects}
          columns={device === 'phone' ? mobileColumns : columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          sx={{
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            borderWidth: '0px',
          }}
          pageSizeOptions={[5, 10]}
        />
      </Container>
    </main>
  );
}
