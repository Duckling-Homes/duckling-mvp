'use client'

import { defaultPhotoFilter } from '@/app/helpers/defaultPhotoFilter'
import ModelStore from '@/app/stores/modelStore'
import AddPhotoButton from '@/components/AddPhotoButton'
import ChipManager from '@/components/ChipManager'
import { SelectInput, TextInput } from '@/components/Inputs'
import PhotoDisplay from '@/components/PhotoDisplay'
import { Project, ProjectRoom } from '@/types/types'
import { Chip, FormGroup, FormLabel } from '@mui/material'
import { useEffect, useState } from 'react'
import { v4 } from 'uuid'

const COMFORT_ISSUES = [
  'Drafty',
  'Too hot in summer',
  'Too cold in summer',
  'Too hot in winter',
  'Too cold in winter',
  'Humid',
  'Dry',
  'Noisy System',
]

const HEALTH_SAFETY = ['Mold', 'Allergens', 'Indoor air quality', 'Asbestos']

const ROOM_TYPES = [
  'Bedroom',
  'Living Room',
  'Dining Room',
  'Family Room',
  'Kitchen',
  'Office',
  'Bathroom',
  'Basement',
  'Other',
]

const ROOM_FLOORS = [
  'Basement',
  'Ground Floor',
  'Second Floor',
  'Third Floor',
  'Attic',
  'Other',
]

interface RoomsProps {
  currentProject: Project
}

const Rooms: React.FC<RoomsProps> = ({ currentProject }) => {
  const [currentRoom, setCurrentRoom] = useState<ProjectRoom>()

  const rooms = currentProject.rooms || []

  useEffect(() => {
    if (!currentRoom && currentProject?.rooms) {
      setCurrentRoom(currentProject.rooms[0])
    }
  }, [currentProject, currentRoom])

  async function deleteRoom(roomId: string) {
    await ModelStore.deleteRoom(currentProject.id!, roomId)
    const newRooms = rooms.filter((r) => r.id !== roomId)
    setCurrentRoom(newRooms[0] || {})
  }

  function createRoom() {
    const newRoom = {
      id: v4(),
      projectId: currentProject.id,
    }
    setCurrentRoom(newRoom)
  }

  async function handleRoomType(value: string) {
    let b = 0

    rooms.forEach((room) => {
      if (room.type === value) {
        b++
      }
    })

    const words = value.match(/[A-Z][a-z]*/g)

    const formatedName = words
      ? b === 0
        ? words.join(' ')
        : `${words.join(' ')} - ${b + 1}`
      : ''

    const updatedRoom = { ...currentRoom, type: value, name: formatedName }

    const createdRoom = await ModelStore.createRoom(
      currentProject.id!,
      updatedRoom
    )

    setCurrentRoom(createdRoom)
  }

  async function patchRoom(propName: string, updatedRoom = currentRoom) {
    if (!updatedRoom) {
      return
    }

    // TODO: Support propName selective updates!
    // const roomToUpdate: ProjectRoom = { id: updatedRoom.id }
    // roomToUpdate[propName] = updatedRoom[propName]

    await ModelStore.updateRoom(currentProject.id!, updatedRoom)
  }

  const toggleTagValue = (array: string[], value: string) => {
    return array.includes(value)
      ? array.filter((item) => item !== value)
      : [...array, value]
  }

  const handleChipChange = (inputName: string, value: string) => {
    if (currentRoom) {
      const array = (currentRoom[inputName] as string[]) || []
      const updatedRoom = {
        ...currentRoom,
        [inputName]: toggleTagValue(array, value),
      }
      setCurrentRoom(updatedRoom)
      patchRoom(inputName, updatedRoom)
    }
  }

  const handleInputChange = async (
    inputName: string,
    value: string | number
  ) => {
    if (currentRoom && currentRoom.id) {
      const updatedRoom = { ...currentRoom, [inputName]: value }
      setCurrentRoom(updatedRoom)
    }
  }

  const renderForm = () => {
    if (currentRoom?.type) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <TextInput
            label="Room Name"
            placeholder="Room Name"
            value={currentRoom?.name || ''}
            onChange={(value) => handleInputChange('name', value)}
            onBlur={() => patchRoom('name')}
          />
          <SelectInput
            label="Floor"
            value={currentRoom?.floor || ''}
            onChange={(value) => handleInputChange('floor', value)}
            onBlur={() => patchRoom('floor')}
            options={ROOM_FLOORS}
          />

          <FormGroup>
            <FormLabel>Comfort Issues</FormLabel>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                marginTop: '12px',
                marginBottom: '24px',
              }}
            >
              {COMFORT_ISSUES.map((issue, i) => (
                <Chip
                  onClick={() => handleChipChange('comfortIssueTags', issue)}
                  label={issue}
                  key={i}
                  color={
                    currentRoom?.comfortIssueTags?.includes(issue)
                      ? 'primary'
                      : 'default'
                  }
                />
              ))}
            </div>
          </FormGroup>
          <FormGroup>
            <FormLabel>Health & Safety Issues</FormLabel>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                marginTop: '12px',
                marginBottom: '24px',
              }}
            >
              {HEALTH_SAFETY.map((issue, i) => (
                <Chip
                  onClick={() => handleChipChange('safetyIssueTags', issue)}
                  label={issue}
                  key={i}
                  color={
                    currentRoom?.safetyIssueTags?.includes(issue)
                      ? 'primary'
                      : 'default'
                  }
                />
              ))}
            </div>
          </FormGroup>
          <TextInput
            label="Notes"
            placeholder="Notes"
            onChange={(value) => handleInputChange('notes', value)}
            onBlur={() => patchRoom('notes')}
            value={currentRoom?.notes || ''}
            multiline={true}
          />
          <PhotoDisplay
            currentProject={currentProject}
            filterPhotos={defaultPhotoFilter({
              roomId: currentRoom.id!,
            })}
          ></PhotoDisplay>
          <AddPhotoButton photoUpdates={{ roomId: currentRoom?.id }} />
        </div>
      )
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        padding: '32px',
        gap: '32px',
      }}
    >
      <ChipManager
        chips={rooms}
        onDelete={deleteRoom}
        onCreate={createRoom}
        currentChip={currentRoom?.id || ''}
        chipType="Room"
        onChipClick={(i: number) => setCurrentRoom(rooms[i])}
      />
      <div
        style={{
          width: '100%',
        }}
      >
        {currentRoom?.id ? (
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              <SelectInput
                label="Room Type"
                value={currentRoom?.type || ''}
                onChange={(value) => handleRoomType(value)}
                onBlur={() => patchRoom('type')}
                options={ROOM_TYPES}
              />
              {renderForm()}
            </div>
          </form>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default Rooms
