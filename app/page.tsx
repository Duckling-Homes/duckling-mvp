'use client'

import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { checkDeviceType } from "@/hooks/checkDeviceType";
import { Button, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import Link from "next/link";
import { Project } from "@/types/types";
import { observer } from "mobx-react-lite";
import ModelStore from "./stores/modelStore";
import { Container } from "@/components/Container";
import ProjectModal from "@/components/Modals/ProjectModal";

import './style.scss'


const  Home = observer(() => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [openModal, setOpenModal]              = useState<boolean>(false);

  const device   = checkDeviceType();
  const projects = ModelStore.projects;

  useEffect(() => {
    ModelStore.loadProjects();
  }, [])

  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]); 

  function searchData(searchValue: string) {
    if (searchValue === '') {
      setFilteredProjects(projects)
      return
    }

    const lowerCaseSearch = searchValue.toLowerCase()

    const result = projects.filter((project) =>
      Object.values(project).some(
        (prop) =>
          typeof prop === 'string' &&
          prop.toLocaleLowerCase().includes(lowerCaseSearch)
      )
    )

    setFilteredProjects(result)
  }

  async function handleCreate(newProject: Project) {
    await ModelStore.createProject(newProject);
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
          <Link href={`/project/${params.id}`} passHref>
            <Button
              variant="contained"
              size="small"
            >
              Edit
            </Button>
          </Link>
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
          <Link href={`/project/${params.id}`} passHref>
            <Button
              variant="contained"
              size="small"
            >
              Edit
            </Button>
          </Link>
        </div>
      ),
    },
  ]

  return (
    <main>
      <ProjectModal
        open={openModal}
        onConfirm={(newProject: Project) => handleCreate(newProject)}
        onClose={() => setOpenModal(false)}
      />
      <Container>
        <div className="projectList__upperWrapper">
          <div className="projectList__header">
            <p>My Projects</p>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenModal(true)}
              color="primary"
            >
              New Project
            </Button>
          </div>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            placeholder="Name, address"
            sx={{
              width: 300,
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
  )
});

export default Home;