import React, { useState } from 'react'
import { SelectInput } from '@/components/Inputs'
import CostsModal from '@/components/Modals/CostsModal'
import { CatalogueItem } from '@/types/types'
import { Clear, Edit, ExpandLess, ExpandMore } from '@mui/icons-material'
import { Divider, IconButton, TextField } from '@mui/material'
import { observer } from 'mobx-react-lite'

interface PlanSubItemProps {
  item: CatalogueItem
  onQuantityChange: (
    customId: string,
    property: string,
    newQuantity: number
  ) => void
  catalogue: CatalogueItem[]
  removeItem: (customId: string) => void
  onItemSelect: (customId: string, selectedItem: CatalogueItem) => void
  planId: string
}

const PlanSubItem: React.FC<PlanSubItemProps> = observer(
  ({ item, onQuantityChange, catalogue, removeItem, onItemSelect, planId }) => {
    const [costModal, setCostModal] = useState(false)
    const [showCosts, setShowCosts] = useState(false)

    const filterOptions = () => {
      const filteredArray = catalogue.filter(
        (catalogueItem) => catalogueItem.subcategory === item.subcategory
      )

      const resultArray = filteredArray.map((item) => ({
        name: item.name,
        value: item.id,
      }))

      return resultArray
    }

    const calculateCost = (item: CatalogueItem) => {
      if (!item || !item.pricingType) {
        return 'error'
      }

      let additionalCostTotal = 0

      if (item.additionalCosts) {
        item.additionalCosts.forEach(cost => {
          additionalCostTotal += Number(cost.price)
        })
      }

      const quantValue = item.quantity || 0
      const roundedCost = (quantValue * (item.basePricePer as number) +  + additionalCostTotal).toFixed(
        2
      )

      return `$${roundedCost}`
    }

    function selectWorkItem(itemId: string) {
      const selectedItem = catalogue.find(
        (catalogueItem) => catalogueItem.id === itemId
      )
      onItemSelect(item.customId as string, selectedItem as CatalogueItem)
    }

    return (
      <React.Fragment key={item.customId}>
        <CostsModal
          open={costModal}
          onClose={() => setCostModal(false)}
          item={item}
          planId={planId}
        />
        <Divider />
        <div className="planItem__workItem">
          <div className="planItem__workItemHeader">
            <span>{item.subcategory}</span>
            <span
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              Estimated Cost: {item.id ? calculateCost(item) : '$0.00'}
              {item.id && (
                <Edit
                  fontSize="small"
                  style={{ color: '#2196F3' }}
                  onClick={() => setCostModal(true)}
                />
              )}
            </span>
          </div>
          <div className="planItem__workItemContent">
            <SelectInput
              label="name"
              smallSize={true}
              value={item.id || ''}
              onChange={(value) => selectWorkItem(value)}
              options={(filterOptions() as []) || []}
            />
            <TextField
              label={
                item.pricingType === 'PerUnit'
                  ? 'Quantity'
                  : item.scaledPricingMetric
              }
              placeholder={
                item.pricingType === 'PerUnit'
                  ? 'Quantity'
                  : item.scaledPricingMetric
              }
              value={item?.quantity || 0}
              disabled={!item.id}
              type="tel"
              size="small"
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value, 10) || 0
                onQuantityChange(
                  item.customId as string,
                  'quantity',
                  newQuantity
                )
              }}
              className="planItem__quantityInput"
            />
            <IconButton
              sx={{
                borderRadius: '4px',
                border: '1px solid #2196F3',
                color: '#2196F3',
                padding: '4px 11px',
              }}
              aria-label="remove-work-item"
              onClick={() => removeItem(item.customId as string)}
            >
              <Clear />
            </IconButton>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <small>
              {`${item?.additionalCosts?.length ?? 0} additional ${
                (item?.additionalCosts?.length ?? 0) !== 1 ? 'costs' : 'cost'
              }`}
            </small>
            {showCosts ? (
              <ExpandLess
                style={{ color: '#2196F3' }}
                onClick={() => setShowCosts(!showCosts)}
              />
            ) : (
              <ExpandMore
                style={{ color: '#2196F3' }}
                onClick={() => setShowCosts(!showCosts)}
              />
            )}
          </div>
          {item.additionalCosts && showCosts && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {item.additionalCosts.map((cost) => (
                <span key={cost.id}>{cost.name}</span>
              ))}
            </div>
          )}
        </div>
      </React.Fragment>
    )
  }
)

export default PlanSubItem
