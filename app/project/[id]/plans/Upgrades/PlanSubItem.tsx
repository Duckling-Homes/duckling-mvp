import { SelectInput } from "@/components/Inputs";
import { Clear } from "@mui/icons-material";
import { Divider, IconButton, TextField } from "@mui/material";

const PlanSubItem = ({item, onQuantityChange, catalogue, removeItem, onItemSelect}) => {

  const filterOptions = () => {
    const filteredArray = catalogue.filter(catalogueItem => catalogueItem.subcategory === item.subcategory)

    const resultArray = filteredArray.map(item => ({
      name: item.name,
      value: item.id,
    }));

    console.log(resultArray)
    return resultArray;
  }

  const calculateCost = (item: CatalogueItem) => {
    if (!item || !item.pricingType) {
      return 'error';
    }

    const quantValue = parseInt(item.quantity as string);
    const roundedCost = (quantValue * item.basePricePer).toFixed(2);

    return `$${roundedCost}`;
  };


  function selectWorkItem(itemId) {
    const selectedItem = catalogue.find(catalogueItem => catalogueItem.id === itemId)
    onItemSelect(item.customId as string, selectedItem)
  }

  return (
    <>
      <Divider />
      <div className="planItem__workItem" key={item.customId}>
        <div className="planItem__workItemHeader">
          <span>{item.subcategory}</span>
          <span>Estimated Cost: {item.id ? calculateCost(item) : '-'}</span>
        </div>
        <div className="planItem__workItemContent">
          <SelectInput
            label="Type"
            value={item.id || ''}
            onChange={(value) => selectWorkItem(value)}
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
            disabled={!item.id}
            type="tel"
            size="small"
            onChange={(e) => {
              const newQuantity = parseInt(e.target.value, 10) || 0;
              onQuantityChange(item.customId as string, 'quantity', newQuantity);
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
            <Clear />
          </IconButton>
        </div>
      </div>  
    </>
  )
}

export default PlanSubItem