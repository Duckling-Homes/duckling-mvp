"use client";

import { useState } from "react";
import { Add } from "@mui/icons-material";
import { Button, Chip, Modal } from "@mui/material";
import { Envelope } from "@/app/project/[id]/Tabs";

import './style.scss'

interface ChipManagerProps {
  chips: Envelope[];
  currentChip: Envelope;
  onChipClick: (i: number) => void;
}

const DeleteModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  envelopeName?: string;
}> = ({ open, onClose, onConfirm, envelopeName }) => {
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
          Are you sure you want to delete envelope: {envelopeName}?
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
  onChipClick,
}) => {
  const [deleteEnvelope, setDeleteEnvelope] = useState<{
    name?: string;
  }>({});

  const handleDeleteClick = () => {
    // Handle delete action here
    // You can use deleteEnvelope.name to identify which envelope to delete
    // Make sure to implement this functionality
    // Example: onDelete(deleteEnvelope.name);
    setDeleteEnvelope({});
  };

  return (
    <>
      <DeleteModal
        open={!!deleteEnvelope.name}
        onClose={() => setDeleteEnvelope({})}
        onConfirm={handleDeleteClick}
        envelopeName={deleteEnvelope.name}
      />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        {chips.map((chip, i) => (
          <Chip
            label={chip.name}
            key={i}
            sx={{
              width: '197px',
              justifyContent: 'space-between'
            }}
            color={chip.id === currentChip.id ? "primary" : "default"}
            onClick={() => onChipClick(i)}
            onDelete={() => setDeleteEnvelope(chip)} />
        ))
        }
        <Button
          variant="contained"
          size="small" startIcon={<Add />}>
          Add Envelope
        </Button>
      </div>
    </>

  )
}

export default ChipManager