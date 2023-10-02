"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import { Project } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { checkDeviceType } from "@/hooks/checkDeviceType";
import { Button, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";

import './style.scss'


export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const device = checkDeviceType();


  useEffect(() => {
    // TODO: Use this whenever the real API is available
    // fetch("/fakeapi/projects/")
    //   .then((response) => response.json())
    //   .then(({ projects }) => {
    //     setProjects(projects);
    //     setFilteredProjects(projects);
    //   });
    fetch("/api/projects/")
      .then((response) => response.json())
      .then((data) => setProjects(data));
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


  const columns: GridColDef[] = [
    { field: 'projectName', headerName: 'Project Name', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'created', headerName: 'Created', flex: 1 },
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
    { field: 'projectName', headerName: 'Project Name', flex: 1 },
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
      <Container>
        <div className='projectList__upperWrapper'>
          <div className='projectList__header'>
            <p>My Projects</p>
            <Button
              variant='contained'
              startIcon={<Add />}
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
