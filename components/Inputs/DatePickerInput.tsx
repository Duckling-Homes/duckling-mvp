'use client';

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import React from "react";

interface DatePickerInputProps {
  label: string;
  onChange: (value: Dayjs) => void;
  value: Dayjs;
  maxDate: Dayjs;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
    label,
    onChange,
    value,
    maxDate 
  }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        openTo="year"
        views={['year']}
        onChange={(e) => onChange(e)}
        value={value}
        maxDate={maxDate}
      />
    </LocalizationProvider>
  )
}

export default DatePickerInput