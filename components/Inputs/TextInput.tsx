'use client';

import { InputAdornment, TextField } from "@mui/material";
import { forwardRef } from "react";
import { IMaskInput } from "react-imask";

interface TextInputProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string | number;
  multiline?: boolean;
  onChange: (value: string) => void;
  onBlur?: () => void;
  startAdornment?: string | number;
  endAdornment?: string | number;
  masked?: string;
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
    
const TextMaskCustom = forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    
    return (
      <IMaskInput
        {...other}
        mask="(#00) 000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  type = "text",
  value,
  multiline,
  onChange,
  onBlur,
  startAdornment,
  endAdornment,
  masked
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
        inputComponent: masked ? TextMaskCustom as any : null,
        startAdornment: <InputAdornment position="start">{startAdornment}</InputAdornment>,
        endAdornment: <InputAdornment position="start">{endAdornment}</InputAdornment>,
      }}
    />
  )
}

export default TextInput