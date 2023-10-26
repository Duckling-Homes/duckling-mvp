'use client';

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: (string | {value: string, name: string, parent?: string})[];
  disabled?: boolean;
  parent?: string
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  onChange,
  onBlur,
  options,
  disabled = false,
  parent
}) => {

  const transformOptions = (options: (string | { value: string, name: string })[]): { value: string, name: string }[] => {
    let result = [...options];

    if (!options || options?.length === 0) {
      return [];
    }

    if (typeof options[0] === "string") {
      result = result.map((value) => ({
        value: value,
        name: value,
      }));
    }

     if (parent) {
      result = result
        .filter((option) => option.parent === parent || option.parent === 'all')
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
    </FormControl>
  )
}

export default SelectInput