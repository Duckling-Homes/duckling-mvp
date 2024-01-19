'use client'

import React, { useState } from 'react'
import {
  Add,
  Bolt,
  Construction,
  DeviceThermostat,
  Home,
} from '@mui/icons-material'
import { Button, Menu, MenuItem } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import { CatalogueItem, Plan } from '@/types/types'
import ModelStore from '@/app/stores/modelStore'
import PlanSubItem from './PlanSubItem'
import { observer } from 'mobx-react-lite'

import './style.scss'

interface PlanItemProps {
  catalogue: CatalogueItem[]
  plan: Plan
  title: string
  property: string
}

const PlanItem: React.FC<PlanItemProps> = observer(
  ({ catalogue, plan, title, property }) => {
    const subcategories = getSubcategories(property)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const subcategoryMenuOpen = Boolean(anchorEl)

    const items = extractPlanDetails(plan, property)

    function extractPlanDetails(plan: Plan, property: string) {
      let catalogueItems = []

      if (plan.catalogueItems) {
        catalogueItems = plan.catalogueItems
      } else if (plan.planDetails) {
        const planDetails = JSON.parse(plan.planDetails)
        catalogueItems = planDetails.catalogueItems
      }

      const itemsByProperty =
        catalogueItems ||
        [].filter((item: CatalogueItem) => item.category === property)

      return itemsByProperty
    }

    function handleMenuClick(event: React.MouseEvent<HTMLButtonElement>) {
      setAnchorEl(event.currentTarget)
    }

    function handleClose() {
      setAnchorEl(null)
    }

    function getSubcategories(category: string) {
      const filteredArray = catalogue.filter(
        (item) => item.category === category
      )
      const uniqueSubcategories: string[] = []

      filteredArray.forEach((obj) => {
        if (!uniqueSubcategories.includes(obj.subcategory as string)) {
          uniqueSubcategories.push(obj.subcategory as string)
        }
      })

      return uniqueSubcategories
    }

    function addItem(item: string) {
      const newItem: CatalogueItem = {
        customId: uuidv4(),
        subcategory: item,
        quantity: 0,
        category: property,
      }

      if (plan?.id) {
        ModelStore.addPlanItem(plan.id, newItem)
      }
    }

    function removeItem(itemCustomId: string) {
      ModelStore.removePlanItem(plan?.id as string, itemCustomId)
    }

    function selectItem(customId: string, itemDetails: CatalogueItem) {
      const updatedWorkItemsList = items.map((item: CatalogueItem) =>
        item.customId === customId ? { ...item, ...itemDetails } : item
      )

      const updatedItem = updatedWorkItemsList.find(
        (item: CatalogueItem) => item.customId === customId
      )

      if (plan?.id && updatedItem) {
        ModelStore.updatePlanItem(plan.id, updatedItem)
      }
    }

    const changeItemQuantity = (
      customId: string,
      propertyName: string,
      newValue: string | number
    ) => {
      const updatedWorkItemsList = items.map((item: CatalogueItem) =>
        item.customId === customId
          ? { ...item, [propertyName]: newValue }
          : item
      )

      const updatedItem = updatedWorkItemsList.find(
        (item: CatalogueItem) => item.customId === customId
      )

      if (plan?.id && updatedItem) {
        ModelStore.updatePlanItem(plan.id, updatedItem)
      }
    }

    function renderIcon() {
      switch (title) {
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
            {subcategories.map((subcategory) => (
              <MenuItem
                key={subcategory}
                onClick={() => {
                  addItem(subcategory)
                  handleClose()
                }}
              >
                {subcategory}
              </MenuItem>
            ))}
          </Menu>
        </div>
        {items?.map((item: CatalogueItem) => (
          <PlanSubItem
            planId={plan.id as string}
            key={item.customId}
            onQuantityChange={(
              customId: string,
              propertyName: string,
              newValue: string | number
            ) => changeItemQuantity(customId, propertyName, newValue)}
            onItemSelect={(customId: string, item: CatalogueItem) =>
              selectItem(customId, item)
            }
            item={item}
            removeItem={(customId: string) => removeItem(customId)}
            catalogue={catalogue}
          />
        ))}
      </div>
    )
  }
)

export default PlanItem
