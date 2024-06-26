import ModelStore from '@/app/stores/modelStore'
import { AdditionalCost, CatalogueItem } from '@/types/types'
import { Add, Delete } from '@mui/icons-material'
import {
  Autocomplete,
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
import { formatCurrency } from '@/app/utils/utils'

interface PlanSubItemType {
  label: string
  value: string
  item: CatalogueItem
}

const AdditionalCostFunctionalComponent: React.FC<{
  cost: AdditionalCost
  onDelete: (costId: string) => void
  onChange: (
    value: string,
    property: string,
    costId: string,
    costType?: string
  ) => void
  autocompleteOptions: CatalogueItem[]
}> = ({ cost, onDelete, onChange, autocompleteOptions }) => {
  function parseAutocompleteOptions() {
    return autocompleteOptions.map((option) => ({
      label: option.name,
      value: option.basePricePer,
      item: option,
    }))
  }

  return (
    <div className="additionalCost">
      {cost.type === 'catalog' ? (
        <Autocomplete
          size="small"
          renderInput={(params) => <TextField {...params} label="Name" />}
          options={(parseAutocompleteOptions() as []) || []}
          onChange={(event, newValue) => {
            if (newValue && typeof newValue !== 'string') {
              onChange(
                (newValue as PlanSubItemType).label || '',
                'name',
                cost.id,
                'catalog'
              )
            }
          }}
          className="additionalCost__name"
          value={cost.name || ''}
        />
      ) : (
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
      )}
      <TextInput
        startAdornment="$"
        label="Price"
        value={cost.pricePer || ''}
        onChange={(value) => onChange(value, 'pricePer', cost.id)}
        type="tel"
        size="small"
        required
        placeholder="Price"
        disabled={cost.type === 'catalog' && true}
        className="additionalCost__price"
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
          className="additionalCost__quantity"
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
  catalogueOptions: CatalogueItem[]
}> = ({ open, onClose, item, planId, catalogueOptions }) => {
  const [additionalCosts, setAdditionalCosts] = useState<AdditionalCost[]>([])
  const [customDescription, setCustomDescription] = useState<string>('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const subcategoryMenuOpen = Boolean(anchorEl)

  useEffect(() => {
    if (item?.additionalCosts) {
      setAdditionalCosts(item.additionalCosts)
    }
    if (item?.description) {
      setCustomDescription(item.description)
    }
  }, [])

  function handleMenuClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  function addCost(type: string) {
    const newCost: AdditionalCost = {
      id: uuidv4(),
      name: '',
      totalPrice: 0,
      pricePer: 0,
      quantity: 1,
      type: type,
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
    costId: string,
    costType?: string
  ) {
    const costsList = [...additionalCosts]

    const updatedCosts = costsList.map((cost) => {
      if (cost.id === costId) {
        cost = {
          ...cost,
          [property]: value,
        }
        if (costType === 'catalog') {
          cost.pricePer = catalogueOptions.find(
            (option) => option.name === cost.name
          )?.basePricePer
        }
        if (cost.pricePer && cost.quantity) {
          cost.totalPrice = Number(cost.pricePer) * Number(cost.quantity)
        }
        return cost
      }
      return cost
    })

    setAdditionalCosts(updatedCosts)
  }

  function saveAdditionalCosts() {
    const updatedItem = {
      ...item,
      description: customDescription || item.description,
      additionalCosts: additionalCosts,
    }

    ModelStore.updatePlanItem(planId, updatedItem)
    onClose()
  }

  function getTotalCost() {
    let totalCost = item.calculatedPrice || 0
    let additionalCostSum = 0

    additionalCosts?.forEach((cost) => {
      additionalCostSum += cost.totalPrice
    })

    totalCost += additionalCostSum

    return formatCurrency(totalCost)
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
              maxRows={6}
              size="small"
              id="item-description"
              label="Description"
              variant="outlined"
              value={customDescription || item?.description}
              onChange={({ target }) => setCustomDescription(target.value)}
              type="text"
              required
              placeholder="Description"
            />
            <Divider />
          </div>
          <div className="costsModal__formItem">
            <h2>Edit Cost</h2>
            <p>Total Cost: {getTotalCost()}</p>
            <div className="costsModal__inputGroup">
              <TextInput
                label="Name"
                disabled
                type="tel"
                value={item.name || ''}
                placeholder="Name"
                size="small"
                sx={{
                  display: 'flex',
                  flex: '3',
                }}
              />
              <TextInput
                label="Base Cost"
                type="tel"
                value={item.basePricePer || ''}
                startAdornment="$"
                placeholder="Base Cost"
                size="small"
                required
                disabled
                sx={{
                  display: 'flex',
                  flex: '1',
                }}
              />
              <TextInput
                label="Quantity"
                disabled
                type="tel"
                value={item.quantity || ''}
                placeholder="Quantity"
                size="small"
                sx={{
                  display: 'flex',
                  flex: '1',
                }}
              />
            </div>
            {additionalCosts.length > 0 && (
              <div className="costsModal__additionalCostGroup">
                <Divider style={{ marginInline: '30%' }} />
                {additionalCosts.map((cost, index) => (
                  <React.Fragment key={index}>
                    <AdditionalCostFunctionalComponent
                      cost={cost}
                      onDelete={(costId) => deleteCost(costId)}
                      onChange={(value, property, costId, costType) =>
                        changeCost(value, property, costId, costType)
                      }
                      autocompleteOptions={catalogueOptions}
                    />
                  </React.Fragment>
                ))}
              </div>
            )}
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
            onClick={() => {
              setAdditionalCosts([])
              onClose()
            }}
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
