'use client'

import { Box, Container, Divider, MenuItem, Select, Stack } from '@mui/material'

import {
  FinancingCalculatorProps,
  FinancingSelection,
} from '../../lib/financing'

import { useFinancingCalculator } from '@/hooks/useFinancingCalculator'
import { InputSlider } from '../Sliders/InputSlider'

type Props = FinancingCalculatorProps & {
  onUpdate?: (selection: FinancingSelection) => void
}

export const LargeFinancingCalculator = (props: Props) => {
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
      <Box
        sx={{
          color: '#00000099',
          background: '#ffffff',
          padding: '16px',
        }}
      >
        <Stack sx={{ rowGap: 4, my: 1 }}>
          <CalculatorRow label="Financing Option">
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
          </CalculatorRow>

          <CalculatorRow label="Length">
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
          </CalculatorRow>

          <CalculatorRow label="Loan Amount">
            <InputSlider
              inputSX={{ fontSize: 20, color: '#388E3C', fontWeight: 'bold' }}
              value={loanAmount}
              setValue={setLoanAmount}
              min={loanAmtSliderMin}
              max={loanAmtSliderMax}
              prefixLabel="$"
              disabled={OPTION_IS_NO_LOAN}
            />
          </CalculatorRow>

          <CalculatorRow label="APR">
            <InputSlider
              inputSX={{ fontSize: 20, color: '#388E3C', fontWeight: 'bold' }}
              value={apr ?? 0}
              setValue={setAPR}
              min={option?.minAPR ?? 0}
              max={option?.maxAPR ?? 100}
              postfixLabel="%"
              step={0.01}
              disabled={OPTION_IS_NO_LOAN}
            />
          </CalculatorRow>

          <Divider />
          <CalculatorRow label="Upfront Cost">
            <Box sx={{ fontSize: 20, color: '#388E3C', fontWeight: 'bold' }}>
              {upfrontCostDisplayValue}
            </Box>
          </CalculatorRow>
          <CalculatorRow label="Monthly Payment">
            <Box sx={{ fontSize: 20, color: '#388E3C', fontWeight: 'bold' }}>
              {monthlyCostDisplayValue}
            </Box>
          </CalculatorRow>
        </Stack>
      </Box>
    </>
  )
}

type CalculatorRowProps = {
  label: string
  children?: React.ReactNode
}

const CalculatorRow = ({ children, label }: CalculatorRowProps) => {
  return (
    <Container sx={{ display: 'flex', columnGap: 4, alignItems: 'center' }}>
      <Box
        sx={{
          minWidth: '100px',
          maxWidth: '6em',
          fontSize: 14,
          whiteSpace: 'nowrap',
        }}
      >
        {label}:
      </Box>
      {children}
    </Container>
  )
}
