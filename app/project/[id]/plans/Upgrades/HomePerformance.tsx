'use client'

import { useEffect, useState } from "react"
import { Add, Clear, Home } from "@mui/icons-material"
import { Button, Divider, IconButton, Menu, MenuItem } from "@mui/material"
import { v4 as uuidv4 } from 'uuid'

import './style.scss'
import { TextInput } from "@/components/Inputs"

const HomePerformance = ({ catalogue }) => {
  const [items, setItems] = useState([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const subcategoryMenuOpen = Boolean(anchorEl)
  const [workItems, setWorkItems] = useState([])

  useEffect(() => {
    setItems(
      catalogue.filter(item => item.category === "HomePerformance")
    )
  }, [catalogue])

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  function addWorkItem(item) {
    let newWorkItem = {
      id: uuidv4(),
      name: '',
      ...item
    }

    let newWorkItemsList = workItems
    newWorkItemsList.push(newWorkItem)
    setWorkItems(newWorkItemsList)
  }

  function removeWorkItem(itemId) {
    let newWorkItemsList = workItems

    newWorkItemsList = newWorkItemsList.filter(item => item.id !== itemId)
    setWorkItems(newWorkItemsList)
  }

  function renderWorkItems() {
    return workItems.map((item, index) => (
      <>
        <Divider />
        <div className="homePerformance__workItem">
          <div className="homePerformance__workItemHeader">
            <span>{item.subcategory}</span>
            <span>Estimated Cost: $5,500</span>
          </div>
          <div className="homePerformance__workItemContent">
            <TextInput
              label="Name"
              placeholder="Name"
              value={item.name || ''}
            />
            <TextInput
              label={
                item.pricingType === 'PerUnit' ? 'Quantity' : item.pricingType
              }
              placeholder={
                item.pricingType === 'PerUnit' ? 'Quantity' : item.pricingType
              }
              value={''}
            />
            <IconButton
              sx={{
                borderRadius: '4px',
                border: '1px solid #2196F3',
                color: '#2196F3',
                padding: '4px 11px',
              }}
              aria-label="remove-work-item"
              onClick={() => removeWorkItem(item.id)}
            >
              <Clear/>
            </IconButton>
          </div>
        </div>  
      </>
    ))
  }

  return (
    <div className="homePerformance">
      <div className="homePerformance__header">
        <div className="homePerformance__text">
          <Home/>
          <p>Home Performance</p>
        </div>
        <Button
        variant="contained"
        size="small"
        startIcon={<Add />}
        onClick={handleMenuClick}
        >
          Add
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
          {
            items.map(item => (
              <MenuItem onClick={() => {
                addWorkItem(item)
                handleClose()
              }}>{item?.subcategory}</MenuItem>
            ))
          }
        </Menu>
      </div>
      {renderWorkItems()}
    </div>
  )
}

export default HomePerformance