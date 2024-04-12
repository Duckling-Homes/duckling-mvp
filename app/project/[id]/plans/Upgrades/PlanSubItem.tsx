import React, { useState } from 'react'
import CostsModal from '@/components/Modals/CostsModal'
import { CatalogueItem, FilteredCatalogueItem } from '@/types/types'
import { Clear, Edit, ExpandLess, ExpandMore } from '@mui/icons-material'
import { Autocomplete, Divider, IconButton, TextField } from '@mui/material'
import { observer } from 'mobx-react-lite'

interface PlanSubItemType {
  label: string
  value: string
  item: CatalogueItem
}

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
        label: item.name,
        value: item.id,
        item: item,
      }))

      return resultArray
    }

    const calculateCost = (item: CatalogueItem) => {
      if (!item || !item.pricingType) {
        return 'error'
      }

      let additionalCostTotal = 0

      if (item.additionalCosts) {
        item.additionalCosts.forEach((cost) => {
          additionalCostTotal += Number(cost.totalPrice)
        })
      }

      const quantValue = item.quantity || 0
      const roundedCost = (
        quantValue * (item.basePricePer as number) +
        additionalCostTotal
      ).toFixed(2)

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
          filteredCatalogueOptions={filterOptions() as FilteredCatalogueItem[]}
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
            <Autocomplete
              size="small"
              renderInput={(params) => <TextField {...params} label="Name" />}
              options={(filterOptions() as []) || []}
              onChange={(event, newValue: PlanSubItemType | string | null) => {
                if (newValue && typeof newValue !== 'string') {
                  selectWorkItem(newValue.value)
                }
              }}
              className="autocomplete"
              value={item.name || ''}
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
