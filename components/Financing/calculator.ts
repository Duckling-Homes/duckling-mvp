import { FinancingOption } from "@/types/types"

export type FinancingCalculatorProps = {
    totalAmount: number
    financingOptions: FinancingOption[];
}

export type FinancingSelection = {
    option: FinancingOption
    termLength: number,
    loanAmount: number,
    apr: number,
    monthlyPayment?: number,
    upfrontCost?: number
}

export class FinancingCalculator {

    props: FinancingCalculatorProps;

    constructor(props: FinancingCalculatorProps) {
        this.props = props;
    }

    listAvailableOptions = () => {
        return this.props.financingOptions.map(opt => {
            return {
                option: opt,
                available: this.isOptionAvailable(opt)
            }
        })
    }

    isOptionAvailable = (option: FinancingOption) => {
        if (this.props.totalAmount < option.minAmount!) {
            return false;
        }

        return true;
    }

    calculate = (inputs: FinancingSelection) : FinancingSelection => {
        const { loanAmount, termLength, apr } = inputs;

        const calcMonthlyPayment = () => {
            // Special case for apr === 0;
            if (apr === 0) {
                return loanAmount / termLength;
            }

            // Amortized loan formula for monthly payment
            // P = a ÷ { [ (1 + r) ** n ] - 1 } ÷ [ r (1 + r) ** n]
            const r = apr / 100 / 12;
            const n = termLength;
            const a = loanAmount;

            return a / ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)))
        }

        const upfront = this.props.totalAmount - inputs.loanAmount;
        const monthly = calcMonthlyPayment();

        return {
            ...inputs,
            upfrontCost: upfront,
            monthlyPayment: monthly
        }
    }

}