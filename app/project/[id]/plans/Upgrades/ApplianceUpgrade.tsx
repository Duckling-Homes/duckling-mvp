'use client'

import React, { useEffect, useState } from "react"
import { Add, Clear, Construction } from "@mui/icons-material"
import { Button, Divider, IconButton, Menu, MenuItem, TextField } from "@mui/material"
import { v4 as uuidv4 } from 'uuid'
import { CatalogueItem } from "@/types/types"

import './style.scss'
import ModelStore from "@/app/stores/modelStore"

interface ApplianceUgpradesProps {
  catalogue: CatalogueItem[]
}

const ApplianceUpgrades: React.FC<ApplianceUgpradesProps> = ({ catalogue, plan, projectId }) => {
  const [items, setItems] = useState<CatalogueItem[]>([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const subcategoryMenuOpen = Boolean(anchorEl)
  const [workItems, setWorkItems] = useState<CatalogueItem[]>([])

  useEffect(() => {
    setItems(
      catalogue.filter(item => item.category === "Appliances")
    )
  }, [catalogue])

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  function addWorkItem(item: CatalogueItem) {
    const newWorkItem = {
      customId: uuidv4(),
      customName: '',
      quantity: 0,
      ...item
    }

    const newWorkItemsList = workItems
    newWorkItemsList.push(newWorkItem)
    setWorkItems(newWorkItemsList)
    ModelStore.addCatalogItem(plan.id, newWorkItem,'applianceUpgrades')
  }

  function removeWorkItem(itemCustomId: string) {
    let newWorkItemsList = workItems

    newWorkItemsList = newWorkItemsList.filter(item => item.customId !== itemCustomId)
    setWorkItems(newWorkItemsList)
    ModelStore.removeCatalogItem(plan.id, itemCustomId,'applianceUpgrades')

  }

  const handlePropertyChange = (customId: string, propertyName: string, newValue: any) => {
    const updatedWorkItemsList = workItems.map((item) =>
      item.customId === customId ? { ...item, [propertyName]: newValue } : item
    );

    setWorkItems(updatedWorkItemsList);

    if (propertyName === 'quantity') {
      ModelStore.updateCatalogItemProperty(plan.id, customId, 'applianceUpgrades', newValue, 'quantity');
    } else if (propertyName === 'customName') {
      ModelStore.updateCatalogItemProperty(plan.id, customId, 'applianceUpgrades', newValue, 'customName');
    }
  };

  function renderWorkItems() {
    return workItems.map((item: CatalogueItem) => (
      <React.Fragment key={item?.customId}>
        <Divider />
        <div className="applianceUpgrades__workItem" >
          <div className="applianceUpgrades__workItemHeader">
            <span>{item?.subcategory}</span>
            <span>Estimated Cost: ${item.quantity * item.basePricePer}</span>
          </div>
          <div className="applianceUpgrades__workItemContent">
            <TextField
              label="Name"
              placeholder="Name"
              value={item?.customName || ''}
              size="small"
              onChange={(e) => handlePropertyChange(item.customId, 'customName', e.target.value)}
            />
            <TextField
              label={
                item.pricingType === 'PerUnit' ? 'Quantity' : item.pricingType
              }
              placeholder={
                item.pricingType === 'PerUnit' ? 'Quantity' : item.pricingType
              }
              value={item?.quantity || 0}
              type="tel"
              size="small"
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value, 10) || 0;
                handlePropertyChange(item.customId, 'quantity', newQuantity);
              }}
            />
            <IconButton
              sx={{
                borderRadius: '4px',
                border: '1px solid #2196F3',
                color: '#2196F3',
                padding: '4px 11px',
              }}
              aria-label="remove-work-item"
              onClick={() => removeWorkItem(item.customId)}
            >
              <Clear/>
            </IconButton>
          </div>
        </div>  
      </React.Fragment>
    ))
  }

  return (
    <div className="applianceUpgrades">
      <div className="applianceUpgrades__header">
        <div className="applianceUpgrades__text">
          <Construction/>
          <p>Appliance Upgrades</p>
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
              <MenuItem
              key={item.id}
              onClick={() => {
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

export default ApplianceUpgrades