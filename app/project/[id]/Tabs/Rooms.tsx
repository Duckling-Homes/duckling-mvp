"use client";

import ChipManager from "@/components/ChipManager";
import { Project, ProjectRoom } from "@/types/types";
import { Chip, FormControl, FormGroup, FormLabel, InputLabel, MenuItem, Select, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";

const COMFORT_ISSUES = [
  "Drafty",
  "Too hot in summer",
  "Too cold in summer",
  "Too hot in winter",
  "Too cold in winter",
  "Humid",
  "Dry",
  "Noisy System",
]

const HEALTH_SAFETY = [
  "Mold",
  "Allergens",
  "Indoor air quality",
  "Asbestos",
]

const ROOM_TYPES = [
  "Bedroom",
  "Living Room",
  "Dining Room",
  "Family Room",
  "Kitchen",
  "Office",
  "Bathroom",
  "Basement",
  "Other",
];

//TODO: check these values
const ROOM_FLOORS = [
  "Basement",
  "Ground Floor",
  "Second Floor",
  "Third Floor",
  "Attic",
  "Other",
]

interface RoomsProps {
  currentProject: Project
}

const Rooms: React.FC<RoomsProps> = ({ currentProject }) => {
  const [rooms, setRooms] = useState<ProjectRoom[]>([]);
  const [currentRoom, setCurrentRoom] = useState<ProjectRoom>({
    id: "",
    name: "",
    type: "",
    width: 0,
    length: 0,
    ceilingHeight: 0,
    floor: "",
    usage: "",
    comfortIssueTags: [],
    safetyIssueTags: [],
    notes: "",
  });

  useEffect(() => {
    if (currentProject && currentProject.rooms) {
      setRooms(currentProject.rooms)
      setCurrentRoom(currentProject.rooms[0])
    }
  }, [currentProject])

  async function deleteRoom(roomId: string) {
    try {
      await fetch(`/api/projectRooms/${roomId}`, {
        method: 'DELETE',
      })

      const newRooms = rooms.filter(r => r.id !== roomId);
      setRooms(newRooms);
      setCurrentRoom(newRooms[0] || {});
      
    } catch (error) {
      console.error(error)
    }
  }

  async function createRoom() {
    try {
      const response = await fetch('/api/projectRooms', {
        method: 'POST',
        body: JSON.stringify({
          name: "New Room",
          projectId: currentProject.id
        })
      })

      const newRoom = await response.json();
      const newRoomList = [...rooms, newRoom];

      console.log(newRoomList)
      setRooms(newRoomList);
      setCurrentRoom(newRoom);
      
    } catch (error) {
      console.error(error)
    }
  }

  async function patchRoom(room: ProjectRoom) {
    if (currentRoom && currentRoom.id) {
      try {
        await fetch(`/api/projectRooms/${currentRoom.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            ...room,
            projectId: currentProject.id
          })
        })
        
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleChipChange = (inputName: string, value: string) => {
    let array = currentRoom ? currentRoom[inputName] as string[] : [];

    if (array && array.includes(value)) {
      array = array.filter(item => item !== value);
    } else {
      array.push(value);
    }

    const updatedRoom = { ...currentRoom, [inputName]: array }
  
    setCurrentRoom(updatedRoom)  
    patchRoom(updatedRoom);
  }

  const handleInputChange = async (inputName: string, value: string | number) => {
    if (currentRoom && currentRoom.id) {
      const updatedRoom = { ...currentRoom, [inputName]: value };
      setCurrentRoom(updatedRoom);
      patchRoom(updatedRoom);
    }
  };

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
        currentChip={currentRoom?.id}
        chipType="Room"
        onChipClick={(i: number) => setCurrentRoom(rooms[i])}
      />
      <div style={{
        width: '100%',
      }}>
        {currentRoom ? <form style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}>
            <TextField
              id="outlined-basic"
              label="Room Name"
              value={currentRoom.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              variant="outlined"
              placeholder='Name'
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="room-type-label">
                Room Type
              </InputLabel>
              <Select
                placeholder="Room Type"
                labelId="room-type-label"
                id="room-type-select"
                label="Room Type"
                value={currentRoom.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
              >
                {ROOM_TYPES.map((roomType, i) => (
                  <MenuItem key={i} value={roomType}>{roomType}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Width"
              variant="outlined"
              value={currentRoom.width}
              onChange={(e) => handleInputChange('width', parseInt(e.target.value))}
              placeholder='Width'
              fullWidth
              type="number"
            />
            <TextField
              id="outlined-basic"
              label="Length"
              variant="outlined"
              value={currentRoom.length}
              onChange={(e) => handleInputChange('length', parseInt(e.target.value))}
              placeholder='Length'
              fullWidth
              type="number"
            />
            <TextField
              id="outlined-basic"
              label="Ceiling Height"
              variant="outlined"
              onChange={(e) => handleInputChange('ceilingHeight', parseInt(e.target.value))}
              value={currentRoom.ceilingHeight}
              placeholder='Ceiling Height'
              fullWidth
              type="number"
            />
            <FormControl fullWidth>
              <InputLabel id="width-label">
                Floor
              </InputLabel>
              <Select
                labelId="width-label"
                id="width-select"
                label="Floor"
                value={currentRoom.floor}
                onChange={(e) => handleInputChange('floor', e.target.value)}
              >
                {ROOM_FLOORS.map((floor, i) => (
                  <MenuItem key={i} value={floor}>{floor}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel component="legend">Usage</FormLabel>
              <ToggleButtonGroup
                value={currentRoom.usage}
                exclusive
                color="primary"
                onChange={(e, value) => handleInputChange('usage', value)}
                aria-label="usage"
              >
                <ToggleButton value="rare" aria-label="left aligned">
                  Rare
                </ToggleButton>
                <ToggleButton value="regular" aria-label="centered">
                  Regular
                </ToggleButton>
                <ToggleButton value="frequent" aria-label="right aligned">
                  Frequent
                </ToggleButton>
              </ToggleButtonGroup>
            </FormControl>
            <FormGroup>
              <FormLabel>Comfort Issues</FormLabel>
              <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                marginTop: '12px',
                marginBottom: '24px',
              }}>
                {
                  COMFORT_ISSUES.map((issue, i) => (
                    <Chip
                      onClick={() => handleChipChange('comfortIssueTags', issue)}
                      label={issue}
                      key={i}
                      color={currentRoom?.comfortIssueTags?.includes(issue) ? "primary" : "default"}
                    />
                  ))
                }
              </div>
            </FormGroup>
            <FormGroup>
              <FormLabel>Health & Safety Issues</FormLabel>
              <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                marginTop: '12px',
                marginBottom: '24px',
              }}>
                {
                  HEALTH_SAFETY.map((issue, i) => (
                    <Chip
                      onClick={() => handleChipChange('safetyIssueTags', issue)}
                      label={issue}
                      key={i}
                      color={currentRoom?.safetyIssueTags?.includes(issue) ? "primary" : "default"}
                    />
                  ))
                }
              </div>
            </FormGroup>
          </div>
        </form> : <></>}
      </div>
    </div>
  )
}

export default Rooms