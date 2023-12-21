'use client'

import ModelStore from '@/app/stores/modelStore'
import { LargeFinancingCalculator } from '@/components/Financing/LargeCalculator'

const Presentation = () => {
  const financingOptions = ModelStore.financingOptions
  return (
    <>
      <div>presentation</div>
      <LargeFinancingCalculator
        totalAmount={2600}
        financingOptions={financingOptions}
      />
    </>
  )
}

export default Presentation
