import { Grid, Input, InputAdornment, Slider } from '@mui/material'

type InputSliderProps = {
  value: number
  setValue: (val: number) => void
  min: number
  max: number
  prefixLabel?: string
  postfixLabel?: string
  step?: number
  disabled?: boolean
  inputSX?: object
}
export const InputSlider: React.FC<InputSliderProps> = ({
  value,
  setValue,
  min,
  max,
  prefixLabel,
  postfixLabel,
  step,
  disabled,
  inputSX,
}) => {
  const correctValuesOnBlur = () => {
    if (value < min) {
      setValue(min)
    }
    if (value > max) {
      setValue(max)
    }
  }

  return (
    <Grid container spacing={2} alignItems={'center'}>
      <Grid item xs={12} sm={6} md={4}>
        <Input
          sx={inputSX}
          disabled={disabled}
          size={'small'}
          startAdornment={
            prefixLabel ? (
              <InputAdornment position={'start'}>{prefixLabel}</InputAdornment>
            ) : null
          }
          endAdornment={
            postfixLabel ? (
              <InputAdornment position={'end'}>{postfixLabel}</InputAdornment>
            ) : null
          }
          value={value}
          onChange={(event) => setValue(parseFloat(event.target.value))}
          onBlur={correctValuesOnBlur}
          type="number"
        />
      </Grid>
      <Grid item xs>
        <Slider
          disabled={disabled}
          value={value}
          step={step ?? 1}
          onChange={(_, value) => setValue(value as number)}
          // marks={[{value: loanAmtSliderMin, label: `$${loanAmtSliderMin}`}, {value: loanAmtSliderMax, label: `$${loanAmtSliderMax.toLocaleString()}`} ]}
          valueLabelFormat={(value) =>
            (prefixLabel ?? '') + value + (postfixLabel ?? '')
          }
          valueLabelDisplay="auto"
          min={min}
          max={max}
          onBlur={correctValuesOnBlur}
        />
      </Grid>
    </Grid>
  )
}
