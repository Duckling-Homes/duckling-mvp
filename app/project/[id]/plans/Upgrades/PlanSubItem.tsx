import { SelectInput } from "@/components/Inputs";
import CostsModal from "@/components/Modals/CostsModal";
import { CatalogueItem } from "@/types/types";
import { Clear, Edit } from "@mui/icons-material";
import { Divider, IconButton, TextField } from "@mui/material";
import { useState } from "react";

interface PlanSubItemProps {
  item: CatalogueItem;
  onQuantityChange: (customId: string, property: string, newQuantity: number) => void;
  catalogue: CatalogueItem[];
  removeItem: (customId: string) => void;
  onItemSelect: (customId: string, selectedItem: CatalogueItem) => void;
}

const PlanSubItem: React.FC<PlanSubItemProps> = ({item, onQuantityChange, catalogue, removeItem, onItemSelect}) => {
  const [costModal, setCostModal] = useState(false)

  const filterOptions = () => {
    const filteredArray = catalogue.filter(catalogueItem => catalogueItem.subcategory === item.subcategory)

    const resultArray = filteredArray.map(item => ({
      name: item.name,
      value: item.id,
    }));

    return resultArray;
  }

  const calculateCost = (item: CatalogueItem) => {
    if (!item || !item.pricingType) {
      return 'error';
    }

    const quantValue = parseInt(item.quantity as string);
    const roundedCost = (quantValue * (item.basePricePer as number)).toFixed(2);

    return `$${roundedCost}`;
  };


  function selectWorkItem(itemId: string) {
    const selectedItem = catalogue.find(catalogueItem => catalogueItem.id === itemId)
    onItemSelect(item.customId as string, selectedItem as CatalogueItem)
  }

  return (
    <>
      <CostsModal
        open={costModal}
        onClose={() => setCostModal(false)}
        onConfirm={() => console.log('olar')}
        item={item}
      />
      <Divider />
      <div className="planItem__workItem" key={item.customId}>
        <div className="planItem__workItemHeader">
          <span>{item.subcategory}</span>
          <span style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '4px'
          }}>
            Estimated Cost: {item.id ? calculateCost(item) : '$0.00'}
            {item.id && <Edit
              fontSize="small" style={{color: '#2196F3'}}
              onClick={() => setCostModal(true)}
            />}
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
              item.pricingType === 'PerUnit' ? 'Quantity' : item.scaledPricingMetric
            }
            placeholder={
              item.pricingType === 'PerUnit' ? 'Quantity' : item.scaledPricingMetric
            }
            value={item?.quantity || 0}
            disabled={!item.id}
            type="tel"
            size="small"
            onChange={(e) => {
              const newQuantity = parseInt(e.target.value, 10) || 0;
              onQuantityChange(item.customId as string, 'quantity', newQuantity);
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
      </div>  
    </>
  )
}

export default PlanSubItem