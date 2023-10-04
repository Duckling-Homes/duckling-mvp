"use client";

import ChipManager from "@/components/ChipManager";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { StringLiteralLike } from "typescript";

const ROOMS = [
  {
    id: "4fe31a3c-cbe2-4020-b2b5-e0996169ffd7",
    project_id: "ee30fb58-ee45-4efc-a302-9774133515dc",
    name: "Main Bedroom",
    type: "Bedroom",
    width: 15,
    length: 20,
    ceiling_height: 8,
    floor: "Second",
    usage: "Frequent",
    comfort_issues_tags: "",
    safety_issues_tags: "",
    notes: ""
  },
  {
    id: "80687ee9-4ea7-4e62-8cec-fab5e7ad3057",
    project_id: "ee30fb58-ee45-4efc-a302-9774133515dc",
    name: "Living Room",
    type: "Living Room",
    width: 30,
    length: 10,
    ceiling_height: 10,
    floor: "First",
    usage: "Sometimes",
    comfort_issues_tags: "",
    safety_issues_tags: "",
    notes: ""
  }
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

const ROOM_FLOORS = [
  "Basement",
  "Ground Floor",
  "Second Floor",
  "Third Floor",
  "Attic",
  "Other",
]

const Rooms = () => {
  const [rooms, setRooms] = useState(ROOMS);
  const [currentRoom, setCurrentRoom] = useState(ROOMS[0]);

  function deleteRoom(roomId: string) {
    let newRooms = rooms.filter(r => r.id !== roomId);
    setRooms(newRooms);
    setCurrentRoom(newRooms[0] || {});
  }

  function generateUID() {
    const randomNumber = Math.random();
    const base36String = randomNumber.toString(36).substr(2, 9);
    const timestamp = Date.now().toString(36).substr(2, 5);
    const uid = base36String + timestamp;

    return uid;
  };

  function createRoom() {

    let newRoom = {
      id: generateUID(),
      project_id: "ee30fb58-ee45-4efc-a302-9774133515dc",
      name: "New Room",
      type: "",
      width: 0,
      length: 0,
      ceiling_height: 0,
      floor: "",
      usage: "",
      comfort_issues_tags: "",
      safety_issues_tags: "",
      notes: ""
    };

    let newRoomList = [...rooms, newRoom];
    setRooms(newRoomList);
    setCurrentRoom(newRoom);
    console.log(currentRoom);
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
        currentChip={currentRoom.id}
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
                value={location}
              >
                {ROOM_TYPES.map((roomType, i) => (
                  <MenuItem key={i} value={'roomType'}>{roomType}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Width"
              variant="outlined"
              value={currentRoom.width}
              placeholder='Width'
              fullWidth
            />
            <TextField
              id="outlined-basic"
              label="Length"
              variant="outlined"
              value={currentRoom.length}
              placeholder='Length'
              fullWidth
            />
            <TextField
              id="outlined-basic"
              label="Ceiling Height"
              variant="outlined"
              value={currentRoom.ceiling_height}
              placeholder='Ceiling Height'
              fullWidth
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
              >
                {ROOM_FLOORS.map((floor, i) => (
                  <MenuItem key={i} value={floor}>{floor}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </form> : <></>}
      </div>
    </div>
  )
}

export default Rooms