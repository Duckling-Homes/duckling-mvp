'use client';

import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";

type Option = {
  value: string;
  name: string;
  parent?: string;
};

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: (string | Option)[];
  disabled?: boolean;
  parent?: string;
  helperText?: string;
  smallSize?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  onChange,
  onBlur,
  options,
  disabled = false,
  parent,
  helperText,
  smallSize,
}) => {

  const transformOptions = (options: (string | Option)[]): Option[] => {
    if (!options || options?.length === 0) {
      return [];
    }

    const result = options.map((option) => {
      if (typeof option === "string") {
        return {
          value: option,
          name: option,
        };
      }
      return option;
    });

    if (parent) {
      return result.filter((option) => {
        return option.parent === parent || option.parent === 'all';
      });
    }

    return result;
  };

  const transformedOptions = transformOptions(options);

  return (
    <FormControl fullWidth size={smallSize ? 'small' : undefined}>
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