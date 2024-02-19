'use client'

import {
  Box,
  Button,
  Container,
  Divider,
  MenuItem,
  Select,
  Slider,
  Stack,
  Typography,
} from '@mui/material'

import {
  FinancingCalculatorProps,
  FinancingSelection,
} from '../../lib/financing'

import { useFinancingCalculator } from '@/hooks/useFinancingCalculator'
import { InputSlider } from '../Sliders/InputSlider'
import { useState } from 'react'

import './style.scss'
import formatCurrency from '@/app/utils/utils'
import { Edit, EditOutlined } from '@mui/icons-material'

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
  const [selectedTerm, setSelectedTerm] = useState(0)

  const upfrontCostDisplayValue = calculated?.upfrontCost
    ? '$' + Math.round(calculated.upfrontCost).toLocaleString()
    : '-'
  const monthlyCostDisplayValue = calculated?.monthlyPayment
    ? '$' + Math.round(calculated.monthlyPayment).toLocaleString()
    : '-'

  return (
    <>
      <Stack sx={{ rowGap: 4, my: 1 }}>
        <CalculatorRow label="Financing Option">
          <Select
            fullWidth
            size={'small'}
            sx={{
              backgroundColor: '#FFF',
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: '8px',
              width: '100%',
            }}
          >
            {option?.termLengths?.map((opt) => {
              return (
                <div
                  className={`termCard ${term === opt ? 'selected' : ''}`}
                  key={opt}
                  onClick={() => setTerm(opt)}
                >
                  <span>{opt}</span>
                  <span>months</span>
                </div>
              )
            })}
          </div>
          {/* 
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
            </Select> */}
        </CalculatorRow>

        <CalculatorRow label="Loan Amount">
          {/* <InputSlider
            inputSX={{ fontSize: 20, color: '#388E3C', fontWeight: 'bold' }}
            value={loanAmount}
            setValue={setLoanAmount}
            min={loanAmtSliderMin}
            max={loanAmtSliderMax}
            prefixLabel="$"
            disabled={OPTION_IS_NO_LOAN}
          /> */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              gap: '8px',
            }}
          >
            <Typography style={{ fontWeight: 'bold', fontSize: '20px' }}>
              {formatCurrency(loanAmount)}
            </Typography>
            <EditOutlined fontSize="small" />
          </div>
          <Slider
            value={loanAmount}
            onChange={(e, newValue) => setLoanAmount(newValue)}
            min={loanAmtSliderMin}
            max={loanAmtSliderMax}
            disabled={OPTION_IS_NO_LOAN}
          />
        </CalculatorRow>

        <CalculatorRow label="APR">
          {/* <InputSlider
            inputSX={{ fontSize: 20, color: '#388E3C', fontWeight: 'bold' }}
            value={apr ?? 0}
            setValue={setAPR}
            min={option?.minAPR ?? 0}
            max={option?.maxAPR ?? 100}
            postfixLabel="%"
            step={0.01}
            disabled={OPTION_IS_NO_LOAN}
          /> */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              gap: '4px',
            }}
          >
            <Typography style={{ fontWeight: 'bold', fontSize: '20px' }}>
              {`${apr}%`}
            </Typography>
          </div>
          <Slider
            onChange={(e, newValue) => setAPR(newValue)}
            value={apr ?? 0}
            min={option?.minAPR ?? 0}
            max={option?.maxAPR ?? 100}
            step={0.01}
            disabled={OPTION_IS_NO_LOAN}
          />
        </CalculatorRow>

        <Divider />

        <CalculatorRow label="Upfront Cost">
          <Box sx={{ fontSize: 20, color: '#000', fontWeight: 'bold' }}>
            {upfrontCostDisplayValue}
          </Box>
        </CalculatorRow>
        <CalculatorRow label="Monthly Payment">
          <Box sx={{ fontSize: 20, color: '#000', fontWeight: 'bold' }}>
            {monthlyCostDisplayValue}
          </Box>
        </CalculatorRow>
      </Stack>
    </>
  )
}

type CalculatorRowProps = {
  label: string
  children?: React.ReactNode
}

const CalculatorRow = ({ children, label }: CalculatorRowProps) => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 'bold',
        }}
      >
        {label}:
      </Typography>
      {children}
    </Container>
  )
}
