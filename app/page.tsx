// though we don't need to do this, I think we're not going to accommodate server side components because of the offline nature of the product
"use client";

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Project } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import createServer from '../fakeAPI/server';
import { DataGrid } from "@mui/x-data-grid";
import { checkDeviceType } from "@/hooks/checkDeviceType";
import { Button } from "@mui/material";

createServer()

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const device = checkDeviceType();


  useEffect(() => {
    fetch("/fakeapi/projects/")
      .then((response) => response.json())
      .then(({ projects }) => setProjects(projects));
  }, []);

  const columns = [
    { field: 'projectName', headerName: 'Project Name', flex: true },
    { field: 'name', headerName: 'Name', flex: true },
    { field: 'address', headerName: 'Address', flex: true },
    { field: 'created', headerName: 'Created', flex: true },
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
            href="/project/123"
          >
            Edit
          </Button>
        </div>
      ),
    },
  ]

  const mobileColumns = [
    { field: 'projectName', headerName: 'Project Name', flex: true },
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
            href="/project/123"
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
        <div>
          <Heading>Project List</Heading>
          <Link href="/project/create">Create Project</Link>
        </div>
        <DataGrid
          rows={projects}
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
