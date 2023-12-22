'use client'

import { Box, Divider, MenuItem, Select, Stack } from '@mui/material'

import {
  FinancingCalculatorProps,
  FinancingSelection,
} from '../../lib/financing'

import { useFinancingCalculator } from '@/hooks/useFinancingCalculator'
import { InputSlider } from '../Sliders/InputSlider'

type Props = FinancingCalculatorProps & {
  onUpdate?: (selection: FinancingSelection) => void
}

export const InlineFinancingCalculator = (props: Props) => {
  const {
    option,
    setOption,
    term,
    setTerm,
    apr,
    setAPR,
    loanAmount,
    setLoanAmount,
    calculated,
    financingOptions,
    loanAmtSliderMin,
    loanAmtSliderMax,
    OPTION_IS_NO_LOAN,
  } = useFinancingCalculator(props)

  const upfrontCostDisplayValue = calculated?.upfrontCost
    ? '$' + Math.round(calculated.upfrontCost).toLocaleString()
    : '-'
  const monthlyCostDisplayValue = calculated?.monthlyPayment
    ? '$' + Math.round(calculated.monthlyPayment).toLocaleString()
    : '-'

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
            disabled={option === undefined || OPTION_IS_NO_LOAN}
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
            disabled={OPTION_IS_NO_LOAN}
          />
          <Box sx={{ fontSize: 14 }}> APR </Box>
          <InputSlider
            value={apr ?? 0}
            setValue={setAPR}
            min={option?.minAPR ?? 0}
            max={option?.maxAPR ?? 100}
            postfixLabel="%"
            step={0.01}
            disabled={OPTION_IS_NO_LOAN}
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
