'use client'

import React, { useEffect, useState } from "react"
import { Add, Bolt, Clear, Construction, DeviceThermostat, Home } from "@mui/icons-material"
import { Button, Divider, IconButton, Menu, MenuItem, TextField } from "@mui/material"
import { v4 as uuidv4 } from 'uuid'
import { CatalogueItem, Plan } from "@/types/types"
import ModelStore from "@/app/stores/modelStore"

import './style.scss'
import { SelectInput } from "@/components/Inputs"


const WorkItem = ({item, onPropChange, catalogue, removeItem}) => {

  const filterOptions = () => {
    const filteredArray = catalogue.filter(catalogueItem => catalogueItem.subcategory === item.subcategory)

    console.log(filteredArray)
    console.log(item)

    return filteredArray
  }

  const calculateCost = (item: CatalogueItem) => {
    let quantValue = 0

    if (!item || !item.pricingType) {
      return 'error'
    }

    if (item.quantity) {
      quantValue = parseInt(item.quantity as string)
    }

    return `$${quantValue * item.basePricePer}`
  }

  return (
    <>
      <Divider />
      <div className="planItem__workItem" key={item.customId}>
        <div className="planItem__workItemHeader">
          <span>{item.subcategory}</span>
          <span>Estimated Cost: {calculateCost(item)}</span>
        </div>
        <div className="planItem__workItemContent">
          <SelectInput
            label="Type"
            value={''}
            onChange={(value) => console.log('type', value)}
            options={filterOptions()}
          />
          <TextField
            label={
              item.pricingType === 'PerUnit' ? 'Quantity' : item.scaledPricingMetric
            }
            placeholder={
              item.pricingType === 'PerUnit' ? 'Quantity' : item.scaledPricingMetric
            }
            value={item?.quantity || 0}
            type="tel"
            size="small"
            onChange={(e) => {
              const newQuantity = parseInt(e.target.value, 10) || 0;
              onPropChange(item.customId as string, 'quantity', newQuantity);
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
            onClick={() => removeItem(item.customId)}
          >
            <Clear/>
          </IconButton>
        </div>
      </div>  
    </>
  )
}

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
    setItems(getSubcat(property))
  }, [catalogue])

  useEffect(() => {
    if (plan.planDetails) {
      const itemsFromPlan = typeof plan.planDetails === 'string' ? JSON.parse(plan.planDetails)[property] : plan.planDetails[property] || []
      setWorkItems(itemsFromPlan);
    } else {
      setWorkItems([])
    }
  }, [plan, property])

  function getSubcat(category: string) {
    console.log(catalogue)
    const filteredArray = catalogue.filter(item => item.category === category)

    const uniqueSubcategories = [...new Set(filteredArray.map(obj => obj.subcategory))];

    return uniqueSubcategories

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


  function removeDuplicates<T>(arr: T[], prop: keyof T): T[] {
    const uniqueItems = new Map();
    arr.forEach(item => {
      uniqueItems.set(item[prop], item);
    });

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
      subcategory: item,
      quantity: 0,
    }

    const newWorkItemsList = [...workItems] || []
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
              }}>{item}</MenuItem>
            ))
          }
        </Menu>
      </div>
      {workItems?.map(item => (
        <WorkItem
          onPropChange={(customId, propertyName,newValue) => handlePropertyChange(customId, propertyName,newValue)}
          item={item}
          removeItem={(customId) => removeWorkItem(customId as string)}
          catalogue={catalogue}
        />
      ))}
    </div>
  )
}

export default PlanItem