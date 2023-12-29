import { useState } from 'react'
import { Add, Close, Delete } from '@mui/icons-material'
import {
  Button,
  Divider,
  FormControl,
  IconButton,
  Modal,
  TextField,
} from '@mui/material'
import { CatalogueItem } from '@/types/types'


const AdditionalCost: React.FC = () => {

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      gap: '16px'
    }}>
      <FormControl>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Additional Cost Name"
          variant="outlined"
          value={''}
          size='small'
          required
          placeholder="Additional Cost Name"
        />
      </FormControl>
      <FormControl>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Price"
          variant="outlined"
          value={''}
          type='tel'
          size='small'
          required
          placeholder="Price"
        />
      </FormControl>
      <IconButton
        sx={{
          borderRadius: '4px',
          border: '1px solid #2196F3',
          color: '#2196F3',
          padding: '4px 11px',
        }}
        aria-label="add"
        onClick={() => console.log(true)}
      >
        <Delete />
      </IconButton>
    </div>
  )
}

const CostsModal: React.FC<{
  open: boolean
  onClose: () => void
  onConfirm: () => void
  item: CatalogueItem
}> = ({ open, onConfirm, onClose, item }) => {
  const [additionalCosts] = useState([1, 2])
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
              size='small'
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
        {additionalCosts.length > 0 && (
          <>
            <Divider/>
            {additionalCosts.map(cost => (
              <>
                {cost}
                <AdditionalCost />
                <Divider/>
              </>
            ))}
          </>
        )}
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
