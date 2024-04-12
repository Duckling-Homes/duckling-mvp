import ModelStore from '@/app/stores/modelStore'
import { AdditionalCost, CatalogueItem } from '@/types/types'
import { Add, Delete } from '@mui/icons-material'
import {
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import './style.scss'
import { TextInput } from '@/components/Inputs'

const AdditionalCostFunctionalComponent: React.FC<{
  cost: AdditionalCost
  onDelete: (costId: string) => void
  onChange: (value: string, property: string, costId: string) => void
}> = ({ cost, onDelete, onChange }) => {
  return (
    <div className="additionalCost">
      <TextField
        className="additionalCost__name"
        label="Additional Cost Name"
        variant="outlined"
        value={cost.name}
        onChange={({ target }) => onChange(target.value, 'name', cost.id)}
        size="small"
        type="text"
        required
        placeholder="Additional Cost Name"
      />
      <TextField
        label="Price"
        variant="outlined"
        value={cost.totalPrice}
        onChange={({ target }) => onChange(target.value, 'price', cost.id)}
        type="tel"
        size="small"
        required
        placeholder="Price"
      />
      {cost.type === 'catalog' && (
        <TextField
          label="Quantity"
          variant="outlined"
          value={cost.quantity}
          onChange={({ target }) => onChange(target.value, 'quantity', cost.id)}
          type="tel"
          size="small"
          required
          placeholder="Quantity"
        />
      )}
      <IconButton
        sx={{
          borderRadius: '4px',
          border: '1px solid #2196F3',
          color: '#2196F3',
          padding: '4px 11px',
        }}
        aria-label="add"
        onClick={() => onDelete(cost.id)}
      >
        <Delete />
      </IconButton>
    </div>
  )
}

const CostsModal: React.FC<{
  open: boolean
  onClose: () => void
  item: CatalogueItem
  planId: string
}> = ({ open, onClose, item, planId }) => {
  const [additionalCosts, setAdditionalCosts] = useState<AdditionalCost[]>([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const subcategoryMenuOpen = Boolean(anchorEl)

  useEffect(() => {
    if (item?.additionalCosts) {
      setAdditionalCosts(item.additionalCosts)
    }
  }, [])

  function handleMenuClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  function addCost(type: string) {
    let newCost: AdditionalCost = {
      id: uuidv4(),
      name: '',
      totalPrice: 0,
      type: type,
    }

    if (type === 'catalog') {
      newCost = {
        ...newCost,
        pricePer: 0,
        quantity: 0,
      }
    }

    const costsList = [...additionalCosts]
    costsList.push(newCost)
    setAdditionalCosts(costsList)
  }

  function deleteCost(costId: string) {
    const costsList = [...additionalCosts]

    const updatedCosts = costsList.filter((cost) => cost.id !== costId)
    setAdditionalCosts(updatedCosts)
  }

  function changeCost(
    value: number | string,
    property: string,
    costId: string
  ) {
    const costsList = [...additionalCosts]

    const updatedCosts = costsList.map((cost) => {
      if (cost.id === costId) {
        return {
          ...cost,
          [property]: value,
        }
      }
      return cost
    })

    setAdditionalCosts(updatedCosts)
  }

  function saveAdditionalCosts() {
    const updatedItem = {
      ...item,
      additionalCosts: additionalCosts,
    }

    ModelStore.updatePlanItem(planId, updatedItem)
    onClose()
  }

  return (
    <Modal
      open={open}
      className="costsModal"
      onClose={() => onClose()}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="costsModal__content">
        <div className="costsModal__header">
          <h1>Edit {item.name}</h1>
        </div>
        <form className="costsModal__form">
          <div className="costsModal__formItem">
            <h2>Edit Description</h2>
            <TextField
              fullWidth
              multiline
              size="small"
              id="item-description"
              label="Description"
              variant="outlined"
              value={item.description}
              type="text"
              required
              placeholder="Description"
            />
            <Divider />
          </div>
          <div className="costsModal__formItem">
            <h2>Edit Cost</h2>
            <p>Total Cost: $5,200</p>
            <div className="costsModal__inputGroup">
              <TextInput
                label="Name"
                onChange={(value) => {
                  console.log(value)
                }}
                type="tel"
                value={item.name || ''}
                placeholder="Name"
                size="small"
                required
                sx={{
                  display: 'flex',
                  flex: '3',
                }}
              />
              <TextInput
                onChange={(value) => {
                  console.log(value)
                }}
                label="Base Cost"
                type="tel"
                value={item.basePricePer || ''}
                startAdornment="$"
                placeholder="Base Cost"
                size="small"
                required
                sx={{
                  display: 'flex',
                  flex: '1',
                }}
              />
              <TextInput
                onChange={(value) => {
                  console.log(value)
                }}
                label="Quantity"
                type="tel"
                value={item.quantity || ''}
                placeholder="Quantity"
                size="small"
                required
                sx={{
                  display: 'flex',
                  flex: '1',
                }}
              />
            </div>
            {additionalCosts.map((cost, index) => (
              <React.Fragment key={index}>
                <Divider style={{ marginInline: '30%' }} />
                <AdditionalCostFunctionalComponent
                  cost={cost}
                  onDelete={(costId) => deleteCost(costId)}
                  onChange={(value, property, costId) =>
                    changeCost(value, property, costId)
                  }
                  type={cost.type}
                />
              </React.Fragment>
            ))}
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleMenuClick}
              size="small"
              sx={{
                marginRight: 'auto',
              }}
            >
              Add a cost
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={subcategoryMenuOpen}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem
                onClick={() => {
                  addCost('catalog')
                  handleClose()
                }}
              >
                Add cost from catalog
              </MenuItem>
              <MenuItem
                onClick={() => {
                  addCost('additional')
                  handleClose()
                }}
              >
                Add miscellaneous cost
              </MenuItem>
            </Menu>
          </div>
        </form>
        <div className="costsModal__footer">
          <Button
            variant="outlined"
            sx={{
              border: 'none',
            }}
            onClick={() => onClose()}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={() => saveAdditionalCosts()}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default CostsModal
