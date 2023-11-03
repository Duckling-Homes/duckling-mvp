import React, { useEffect, useState } from 'react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { ProjectRoom, Project } from '@/types/types'
import PhotoDisplay from '@/components/PhotoDisplay'
import { observer } from 'mobx-react-lite'
import AddPhotoButton from '@/components/AddPhotoButton'

interface PhotosTabProps {
  currentProject: Project
}

const Photos: React.FC<PhotosTabProps> = observer(({ currentProject }) => {
  const [rooms, setRooms] = useState<ProjectRoom[]>([])
  const [roomFilter, setRoomFilter] = useState<string>('UNSELECTED')

  useEffect(() => {
    if (currentProject && currentProject.rooms) {
      setRooms(currentProject.rooms)
    }
  }, [currentProject])

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '32px',
        }}
      >
        <FormControl style={{ width: '300px' }}>
          <InputLabel id="photo-filter-label">Photos Filter</InputLabel>
          <Select
            labelId="photo-filter-label"
            id="photo-filter-select"
            label="Photos Filter"
            onChange={(e) => {
              setRoomFilter(e.target.value as string)
            }}
            value={roomFilter}
          >
            {[{ id: 'UNSELECTED', name: 'All Rooms' }, ...rooms].map(
              (room, i) => (
                <MenuItem key={i} value={room.id}>
                  {room.name}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
        <AddPhotoButton />
      </div>
      <div
        style={{
          padding: '32px'
        }}
      >
        <PhotoDisplay
          currentProject={currentProject}
          filterCriteria={
            roomFilter == 'UNSELECTED' ? {} : { roomId: roomFilter }
          }
        ></PhotoDisplay>
      </div>
    </>
  );
})

export default Photos
