import { useState, useEffect } from 'react'
import {
  FinancingCalculator,
  FinancingSelection,
  FinancingCalculatorProps,
  NO_LOAN,
} from '../lib/financing'

import { FinancingOption } from '@/types/types'

export const useFinancingCalculator = (props: FinancingCalculatorProps) => {
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

  const OPTION_IS_NO_LOAN = option === NO_LOAN

  useEffect(() => {
    if (OPTION_IS_NO_LOAN) {
      return setCalculated({
        option,
        termLength: 0,
        apr: 0,
        loanAmount,
        upfrontCost: loanAmount,
        monthlyPayment: NaN,
      })
    }

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
      if (
        apr === undefined ||
        (option?.minAPR ?? Infinity) > apr ||
        (option?.maxAPR ?? -1) < apr
      ) {
        setAPR(option.minAPR)
      }

      if (loanAmount > loanAmtSliderMax) {
        setLoanAmount(loanAmtSliderMax)
      }

      if (loanAmount < loanAmtSliderMin) {
        setLoanAmount(loanAmtSliderMin)
      }

      if (OPTION_IS_NO_LOAN) {
        setLoanAmount(props.totalAmount)
      }
    }
  }, [option])

  return {
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
  }
}
