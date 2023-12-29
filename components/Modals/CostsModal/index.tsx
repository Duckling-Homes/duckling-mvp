import { useState } from 'react'
import { Add, Close, Delete } from '@mui/icons-material'
import {
  Button,
  FormControl,
  IconButton,
  Modal,
  TextField,
} from '@mui/material'
import { CatalogueItem } from '@/types/types'

const CostsModal: React.FC<{
  open: boolean
  onClose: () => void
  onConfirm: () => void
  item: CatalogueItem
}> = ({ open, onConfirm, onClose, item }) => {
  console.log(item)
  return (
    <Modal
      open={open}
      className="createModal"
      onClose={() => onClose()}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="createModal__content">
        <div className="createModal__header">
          <p>Edit Cost for {item.subcategory}</p>
          <IconButton
            sx={{
              borderRadius: '4px',
              border: '1px solid #2196F3',
              color: '#2196F3',
              padding: '4px 10px',
            }}
            onClick={() => onClose()}
            aria-label="close"
          >
            <Close />
          </IconButton>
        </div>
        <small>Type: {item?.category}</small>
        <small>Sub-type: {item?.subcategory}</small>
        <small>{item.pricingType === 'PerUnit' ? 'Quantity' : 'Sizing'}: {item.quantity} {item.pricingType === 'PerUnit' ? 'units' : item.scaledPricingMetric}</small>
        <form className="createModal__form">
          <FormControl>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Base Cost"
              variant="outlined"
              value={item.basePricePer}
              type='tel'
              required
              placeholder="Base Cost"
            />
          </FormControl>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              onConfirm()
              onClose()
            }}
            size="small"
            sx={{
              marginLeft: 'auto',
            }}
          >
            Add a cost
          </Button>
        </form>
        <div className="createModal__footer">
          <Button
            variant="contained"
            onClick={() => {
              onConfirm()
              onClose()
            }}
            size="small"
            sx={{
              marginLeft: 'auto',
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default CostsModal
