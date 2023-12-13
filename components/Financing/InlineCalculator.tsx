'use client'

import {
  Box,
  Divider,
  Grid,
  Input,
  InputAdornment,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
} from '@mui/material'
import {
  FinancingCalculator,
  FinancingCalculatorProps,
  FinancingSelection,
} from './calculator'
import { useEffect, useState } from 'react'
import { FinancingOption } from '@/types/types'

type Props = FinancingCalculatorProps & {
  onUpdate: (selection: FinancingSelection) => void
}

export const InlineFinancingCalculator = (props: Props) => {
  const [option, setOption] = useState<FinancingOption>()
  const [term, setTerm] = useState<number>()
  const [apr, setAPR] = useState<number>()
  const [loanAmount, setLoanAmount] = useState<number>(props.totalAmount)

  const [calculated, setCalculated] = useState<FinancingSelection>()

  const calculator = new FinancingCalculator(props)
  const financingOptions = calculator.listAvailableOptions()

  const loanAmtSliderMin = option?.minAmount ?? 0
  const loanAmtSliderMax = Math.min(
    option?.maxAmount ?? props.totalAmount,
    props.totalAmount
  )

  const upfrontCostDisplayValue = calculated?.upfrontCost
    ? '$' + Math.round(calculated.upfrontCost).toLocaleString()
    : '-'
  const monthlyCostDisplayValue = calculated?.monthlyPayment
    ? '$' + Math.round(calculated.monthlyPayment).toLocaleString()
    : '-'

  useEffect(() => {
    // Recalculate after any changes
    if (term && option && apr !== undefined && loanAmount !== undefined) {
      const result = calculator.calculate({
        option,
        termLength: term,
        apr,
        loanAmount,
      })

      setCalculated(result)
    }
  }, [term, option, apr, loanAmount])

  useEffect(() => {
    // On option change - need to set things to correct bounds
    if (option) {
      if (!term || (term && !option.termLengths?.includes(term))) {
        setTerm(option.termLengths![0])
      }
      if (apr === undefined || option.minAPR! > apr || option?.maxAPR! < apr) {
        setAPR(option.minAPR)
      }

      if (loanAmount > loanAmtSliderMax) {
        setLoanAmount(loanAmtSliderMax)
      }

      if (loanAmount < loanAmtSliderMin) {
        setLoanAmount(loanAmtSliderMin)
      }
    }
  }, [option])

  return (
    <>
      <div className="planCreation__financing" style={{ color: '#00000099' }}>
        <Box sx={{ fontSize: 16, color: '#000000' }}> Financing</Box>
        <Stack sx={{ rowGap: 1, my: 1 }}>
          <Box sx={{ fontSize: 14 }}> Financing Option </Box>
          <Select
            fullWidth
            size={'small'}
            value={option?.id ?? ''}
            onChange={(event) => {
              const opt = financingOptions.find(
                (o) => o.option.id === event.target.value
              )
              setOption(opt?.option)
            }}
          >
            {financingOptions.map((opt) => {
              return (
                <MenuItem
                  disabled={!opt.available}
                  value={opt.option.id}
                  key={opt.option.id}
                >
                  {opt.option.name}
                </MenuItem>
              )
            })}
          </Select>
          <Box sx={{ fontSize: 14 }}> Length </Box>
          <Select
            fullWidth
            disabled={option === undefined}
            size={'small'}
            value={term ?? ''}
            onChange={(event) => {
              setTerm(event.target.value as number)
            }}
          >
            {option?.termLengths?.map((opt) => {
              return (
                <MenuItem value={opt} key={opt}>
                  {opt + ' months'}
                </MenuItem>
              )
            })}
          </Select>

          <Box sx={{ fontSize: 14 }}> Financing Amount </Box>
          <InputSlider
            value={loanAmount}
            setValue={setLoanAmount}
            min={loanAmtSliderMin}
            max={loanAmtSliderMax}
            prefixLabel="$"
          />
          <Box sx={{ fontSize: 14 }}> APR </Box>
          <InputSlider
            value={apr ?? 0}
            setValue={setAPR}
            min={option?.minAPR ?? 0}
            max={option?.maxAPR ?? 100}
            postfixLabel="%"
            step={0.01}
          />
          <Divider />
          <Box> Upfront Cost:</Box>
          <Box>{upfrontCostDisplayValue}</Box>
          <Box>Monthly Payment:</Box>
          <Box>{monthlyCostDisplayValue}</Box>
        </Stack>
      </div>
    </>
  )
}

type InputSliderProps = {
  value: number
  setValue: (val: number) => void
  min: number
  max: number
  prefixLabel?: string
  postfixLabel?: string
  step?: number
}
const InputSlider: React.FC<InputSliderProps> = ({
  value,
  setValue,
  min,
  max,
  prefixLabel,
  postfixLabel,
  step,
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
      <Grid item xs={12} md={4} lg={2}>
        <Input
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
          // @ts-ignore
          onChange={(event) => setValue(event.target.value as number)}
          onBlur={correctValuesOnBlur}
        />
      </Grid>
      <Grid item xs>
        <Slider
          value={value}
          step={step ?? 1}
          onChange={(event) => {
            //@ts-ignore
            setValue(event?.target?.value as number)
          }}
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
