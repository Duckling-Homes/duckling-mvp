'use client';

import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: (string | { value: string; name: string; parent?: string })[];
  disabled?: boolean;
  parent?: string;
  helperText?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  onChange,
  onBlur,
  options,
  disabled = false,
  parent,
  helperText
}) => {

  const transformOptions = (options: (string | {
    parent?: undefined | string; value: string, name: string 
})[]): { value: string, name: string, parent?: string }[] => {
    let result = [...options];

    if (!options || options?.length === 0) {
      return [];
    }

    if (typeof options[0] === "string") {
      result: {}[] = result.map((value) => ({
        value: value,
        name: value,
      }));
      return result as { value: string, name: string }[];
    }

    if (parent) {
      result = result.filter((option) => {
        if (typeof option === 'string' || option?.parent === undefined) {
          return false;
        } else {
          return option.parent === parent || option.parent === 'all';
        }
      });
    }

    return result as { value: string, name: string }[];
  };

  const transformedOptions = transformOptions(options);

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        disabled={disabled}
        label={label}
        value={value}
        onChange={({target}) => onChange(target.value)}
        onBlur={onBlur}
      >
        {
          transformedOptions.map((option, i) =>(
            <MenuItem key={i} value={option.value}>{option.name}</MenuItem>
          ))
        }
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}

export default SelectInput