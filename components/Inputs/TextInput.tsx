'use client';

import { TextField } from "@mui/material";

interface TextInputProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string | number;
  multiline?: boolean;
  onChange: (value: string | number) => void;
  onBlur: () => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  type = "text",
  value,
  multiline,
  onChange,
  onBlur
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
    />
  )
}

export default TextInput