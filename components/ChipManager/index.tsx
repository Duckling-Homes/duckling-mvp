"use client";

import { useState } from "react";
import { Add } from "@mui/icons-material";
import { Button, Chip, Modal } from "@mui/material";
import { ProjectAppliance, ProjectElectrical, ProjectEnvelope, ProjectRoom } from "@/types/types";

import './style.scss'

interface ChipManagerProps {
  chips: (
    ProjectRoom |
    ProjectAppliance |
    ProjectEnvelope |
    ProjectElectrical)[];
  currentChip: string;
  chipType: string;
  onChipClick: (i: number) => void;
  onDelete: (i: string) => void;
  onCreate: () => void;
}

//TODO: Turn this into a component
const DeleteModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  chipName?: string;
}> = ({ open, onClose, onConfirm, chipName }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="deleteModal"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="deleteModal__content">
        <p>
          {chipName
            ? `Are you sure you want to delete envelope: ${chipName}?`
            : 'Are you sure you want to delete this envelope?'}
        </p>
        <div>
          <Button onClick={onClose}>Cancel</Button>
          <Button color="error" onClick={onConfirm}>Delete</Button>
        </div>
      </div>
    </Modal>
  );
};

const ChipManager: React.FC<ChipManagerProps> = ({
  chips,
  currentChip,
  chipType,
  onChipClick,
  onDelete,
  onCreate,
}) => {
  const [deleteEnvelope, setDeleteEnvelope] = useState<{
    id: string;
    name: string;
  }>({
    id: "",
    name: "",
  });

  const handleDeleteClick = () => {
    onDelete(deleteEnvelope.id);
    setDeleteEnvelope({
      id: "",
      name: "",
    });
  };

  return (
    <>
      <DeleteModal
        open={!!deleteEnvelope.name}
        onClose={() => setDeleteEnvelope({
          id: "",
          name: "",
        })}
        onConfirm={handleDeleteClick}
        chipName={deleteEnvelope.name}
      />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        {chips.map((chip, i) => (
          <Chip
            label={chip.name || `${chip.type} ${i + 1}` }
            key={i}
            sx={{
              width: '197px',
              justifyContent: 'space-between'
            }}
            color={chip.id === currentChip ? "primary" : "default"}
            onClick={() => onChipClick(i)}
            onDelete={() => setDeleteEnvelope({
              id: chip.id,
              name: chip.name || "Unknown Name"
            })}
          />
        ))}
        <Button
          variant="contained"
          size="small"
          startIcon={<Add />}
          onClick={onCreate}
          sx={{
            width: '200px',
          }}
        >
          Add {chipType}
        </Button>
      </div>
    </>

  )
}

export default ChipManager