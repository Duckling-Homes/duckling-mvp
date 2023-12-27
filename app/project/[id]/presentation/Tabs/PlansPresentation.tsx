'use client'

import ModelStore from '@/app/stores/modelStore'
import { LargeFinancingCalculator } from '@/components/Financing/LargeCalculator'

const PlansPresentation = () => {
  const financingOptions = ModelStore.financingOptions

  return (
    <div>
      <LargeFinancingCalculator
        totalAmount={260000}
        financingOptions={financingOptions}
      />
    </div>
  )
}

export default PlansPresentation
