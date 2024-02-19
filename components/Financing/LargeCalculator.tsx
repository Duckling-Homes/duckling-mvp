'use client'

import {
  Box,
  Button,
  Container,
  Divider,
  InputAdornment,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import {
  FinancingCalculatorProps,
  FinancingSelection,
} from '../../lib/financing'

import { useFinancingCalculator } from '@/hooks/useFinancingCalculator'
import { InputSlider } from '../Sliders/InputSlider'
import { useState } from 'react'

import formatCurrency from '@/app/utils/utils'
import { Check, Done, Edit, EditOutlined } from '@mui/icons-material'

import './style.scss'
import { TextInput } from '../Inputs'
import { toJS } from 'mobx'

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
  const [editLoan, setEditLoan] = useState(false)
  const [editApr, setEditApr] = useState(false)

  const upfrontCostDisplayValue = calculated?.upfrontCost
    ? '$' + Math.round(calculated.upfrontCost).toLocaleString()
    : '-'
  const monthlyCostDisplayValue = calculated?.monthlyPayment
    ? '$' + Math.round(calculated.monthlyPayment).toLocaleString()
    : '-'

  return (
    <div
      style={{
        width: '400px',
        padding: '24px 0px',
      }}
    >
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
          <Select
            fullWidth
            size={'small'}
            sx={{
              backgroundColor: '#FFF',
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
            disabled={option === undefined || OPTION_IS_NO_LOAN}
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
        {option === undefined || OPTION_IS_NO_LOAN ? (
          <></>
        ) : (
          <>
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
                {editLoan ? (
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    size="small"
                    variant="standard"
                    value={loanAmount.toFixed(2)}
                    sx={{
                      width: '120px',
                    }}
                    onChange={({ target }) => setLoanAmount(target.value)}
                  />
                ) : (
                  <Typography style={{ fontWeight: 'bold', fontSize: '20px' }}>
                    {formatCurrency(loanAmount)}
                  </Typography>
                )}
                {editLoan ? (
                  <Done onClick={() => setEditLoan(false)} />
                ) : (
                  <EditOutlined
                    fontSize="small"
                    onClick={() => setEditLoan(true)}
                  />
                )}
              </div>
              <Slider
                value={loanAmount}
                onChange={(e, newValue) => setLoanAmount(newValue)}
                min={loanAmtSliderMin}
                max={loanAmtSliderMax}
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
                {editApr ? (
                  <TextField
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">%</InputAdornment>
                      ),
                      inputProps: {
                        max: option?.minAPR ?? 0,
                        min: option?.maxAPR ?? 100,
                      },
                    }}
                    type="number"
                    size="small"
                    variant="standard"
                    value={apr ?? 0}
                    sx={{
                      width: '120px',
                    }}
                    onChange={({ target }) => setAPR(target.value)}
                  />
                ) : (
                  <Typography style={{ fontWeight: 'bold', fontSize: '20px' }}>
                    {`${apr}%`}
                  </Typography>
                )}
                {editApr ? (
                  <Done onClick={() => setEditApr(false)} />
                ) : (
                  <EditOutlined
                    fontSize="small"
                    onClick={() => setEditApr(true)}
                  />
                )}
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
          </>
        )}

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
    </div>
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
