'use client'

import React, { useEffect, useState } from "react"
import { Add, Bolt, Clear, Construction, DeviceThermostat, Home } from "@mui/icons-material"
import { Button, Divider, IconButton, Menu, MenuItem, TextField } from "@mui/material"
import { v4 as uuidv4 } from 'uuid'
import { CatalogueItem, Plan } from "@/types/types"
import ModelStore from "@/app/stores/modelStore"

import './style.scss'

interface PlanItemProps {
  catalogue: CatalogueItem[],
  plan: Plan,
  title: string,
  property: string,
}

const PlanItem: React.FC<PlanItemProps> = (
  {
    catalogue,
    plan,
    title,
    property
  }) => {
  const [items, setItems] = useState<CatalogueItem[]>([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const subcategoryMenuOpen = Boolean(anchorEl)
  const [workItems, setWorkItems] = useState<CatalogueItem[]>([])

  useEffect(() => {
    setItems(removeDuplicates(catalogue.filter(item => item.category === property), 'subcategory')
    )
  }, [catalogue])

  useEffect(() => {
    if (plan.planDetails) {
      const itemsFromPlan = typeof plan.planDetails === 'string' ? JSON.parse(plan.planDetails)[property] : plan.planDetails
      setWorkItems(itemsFromPlan);
    } else {
      setWorkItems([])
    }
  }, [plan, property]);

  function removeDuplicates<T>(arr: T[], prop: keyof T): T[] {
    console.log(arr, 'items')
    const uniqueItems = new Map();
    arr.forEach(item => {
      uniqueItems.set(item[prop], item);
    });

    console.log(Array.from(uniqueItems.values()), 'deduped items')
    return Array.from(uniqueItems.values());
  }

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

    const newWorkItemsList = [...workItems]
    newWorkItemsList.push(newWorkItem)
    setWorkItems(newWorkItemsList)
    ModelStore.addCatalogItem(plan?.id as string, newWorkItem, property)
  }

  function removeWorkItem(itemCustomId: string) {
    let newWorkItemsList = workItems

    newWorkItemsList = newWorkItemsList.filter(item => item.customId !== itemCustomId)
    setWorkItems(newWorkItemsList)
    ModelStore.removeCatalogItem(plan?.id as string, itemCustomId, property)

  }

  const handlePropertyChange = (customId: string, propertyName: string, newValue: string | number) => {
    const updatedWorkItemsList = workItems.map((item) =>
      item.customId === customId ? { ...item, [propertyName]: newValue } : item
    );

    setWorkItems(updatedWorkItemsList);

    if (propertyName === 'quantity') {
      ModelStore.updateCatalogItemProperty(plan?.id as string, customId, property, newValue, 'quantity');
    } else if (propertyName === 'customName') {
      ModelStore.updateCatalogItemProperty(plan?.id as string, customId, property, newValue, 'customName');
    }
  };

  const calculateCost = (item: CatalogueItem) => {
    let quantValue = 0

    if (!item || !item.pricingType) {
      return 'error'
    }

    if (item.quantity) {
      quantValue = parseInt(item.quantity as string)
    }

    if (item.pricingType === 'PerUnit') {
      return `$${quantValue * item.basePricePer}`
    } else if (item.pricingType === 'ScaledPricing') {
      return `$${quantValue * parseInt(item.scaledPricingMetric)}`
    }

  }

  function renderWorkItems() {
    return workItems?.map((item) => (
      <React.Fragment key={item.customId}>
        <Divider />
        <div className="planItem__workItem" key={item.customId}>
          <div className="planItem__workItemHeader">
            <span>{item.subcategory}</span>
            <span>Estimated Cost: {calculateCost(item)}</span>
          </div>
          <div className="planItem__workItemContent">
            <TextField
              label="Name"
              placeholder="Name"
              value={item?.customName || ''}
              size="small"
              onChange={(e) => handlePropertyChange(item.customId as string, 'customName', e.target.value)}
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
                handlePropertyChange(item.customId as string, 'quantity', newQuantity);
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
              onClick={() => removeWorkItem(item.customId as string)}
            >
              <Clear/>
            </IconButton>
          </div>
        </div>  
      </React.Fragment>
    ))
  }

  function renderIcon() {
    switch(title) {
      case 'Home Performance':
        return <Home />
      case 'HVAC':
        return <DeviceThermostat />
      case 'Appliance Upgrades':
        return <Construction />
      case 'Energy and Storage':
        return <Bolt />
    }
  }

  return (
    <div className="planItem">
      <div className="planItem__header">
        <div className="planItem__text">
          {renderIcon()}
          <p>{title}</p>
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

export default PlanItem