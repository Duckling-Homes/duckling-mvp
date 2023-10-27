'use client';

import { InputAdornment, TextField } from "@mui/material";

interface TextInputProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string | number;
  multiline?: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
  startAdornment?: string | number;
  endAdornment?: string | number;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  type = "text",
  value,
  multiline,
  onChange,
  onBlur,
  startAdornment,
  endAdornment
}) => {

  const blurActiveElement = () => {
    const activeElement = document.activeElement as HTMLInputElement;
    if (activeElement) {
      activeElement.blur();
    }
  };

  return (
    <TextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={({ target }) => onChange(target.value)}
      onBlur={onBlur}
      onWheel={blurActiveElement}
      multiline={multiline || false}
      InputProps={{
        startAdornment: <InputAdornment position="start">{startAdornment}</InputAdornment>,
        endAdornment: <InputAdornment position="start">{endAdornment}</InputAdornment>,
      }}
    />
  )
}

export default TextInput