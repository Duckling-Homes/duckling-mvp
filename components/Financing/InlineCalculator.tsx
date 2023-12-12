'use client';

import { Divider, MenuItem, Select, Slider, Stack } from '@mui/material'
import { FinancingCalculator, FinancingCalculatorProps, FinancingSelection } from './calculator'
import { useEffect, useState } from 'react';
import { FinancingOption } from '@/types/types';

type Props = FinancingCalculatorProps & {
    onUpdate: (selection: FinancingSelection) => void;
}

export const InlineFinancingCalculator = (props: Props) => {
    const [option, setOption] = useState<FinancingOption>();
    const [term, setTerm] = useState<number>();
    const [apr, setAPR] = useState<number>();
    const [loanAmount, setLoanAmount] = useState<number>(props.totalAmount);

    const [calculated, setCalculated] = useState<FinancingSelection>();

    const calculator = new FinancingCalculator(props);
    const financingOptions = calculator.listAvailableOptions();

    useEffect(() => {

        if (option) {
            if (!term || (term && !option.termLengths?.includes(term))) {
                console.log("SET TERM", term, option);
                setTerm(option.termLengths![0]);
            }
            if (apr === undefined || (option.minAPR! > apr) || (option?.maxAPR! < apr)) {
                setAPR(option.minAPR)
            }
        }

        if (term && option && apr !== undefined && loanAmount !== undefined) {

            const result = calculator.calculate({
                option,
                termLength: term,
                apr,
                loanAmount,
            })

            setCalculated(result);
        }
    }, [term, option, apr, loanAmount])


    const loanAmtSliderMin = 0;
    const loanAmtSliderMax = Math.min(option?.maxAmount ?? props.totalAmount, props.totalAmount);

    const upfrontCostDisplayValue = calculated?.upfrontCost ? '$' + Math.round(calculated.upfrontCost).toLocaleString() : '-';
    const monthlyCostDisplayValue = calculated?.monthlyPayment ? '$' + Math.round(calculated.monthlyPayment).toLocaleString() : '-';


    return <>

        <div className="planCreation__financing">
            Financing Options
            <div className="planCreation__financingItem">

                <div> 
                    <div> Loan Options: </div>
                    <Select
                        size={'small'}
                        value={option?.id ?? '-'}  
                        onChange={(event) => {
                            const opt = financingOptions.find(o => o.option.id === event.target.value);
                            setOption(opt?.option);
                        }}
                    >
                        {financingOptions.map(opt => {
                            return <MenuItem disabled={!opt.available} value={opt.option.id} key={opt.option.id}>{opt.option.name}</MenuItem>
                        })}
                    </Select>
                </div>

                <div> 
                    <div> Length: </div>
                    <Select
                        size={'small'}
                        value={term ?? '-'} 
                        onChange={(event) => {setTerm(event.target.value as number);}}
                    >
                        {option?.termLengths?.map(opt => {
                            return <MenuItem value={opt} key={opt}>{opt + ' months'}</MenuItem>
                        })}
                    </Select>
                </div>

                <Stack>
                <span> Loan Amount: ${loanAmount.toLocaleString()} </span>
                <span style={{paddingLeft: '16px', paddingRight: '16px'}}>
                    <Slider
                        value={loanAmount}
                        step={1}
                        //@ts-ignore
                        onChange={(event) => {setLoanAmount(event?.target?.value as number)}} 
                        marks={[{value: loanAmtSliderMin, label: `$0`}, {value: loanAmtSliderMax, label: `$${loanAmtSliderMax.toLocaleString()}`} ]} 
                        valueLabelFormat={(val) => '$' + val.toFixed(0).toLocaleString()} 
                        valueLabelDisplay="auto" 
                        min={loanAmtSliderMin} 
                        max={loanAmtSliderMax}
                    />
                </span>
                <span> APR: {apr}%</span>
                <span style={{paddingLeft: '16px', paddingRight: '16px'}}>
                    <Slider
                        value={apr ?? 0}
                        step={0.01}
                        //@ts-ignore
                        onChange={(event) => {setAPR(event?.target?.value as number)}} 
                        marks={[{value: option?.minAPR ?? 0, label: `${option?.minAPR ?? 0}%`}, {value: option?.maxAPR ?? 100, label: `${option?.maxAPR ?? 100}%`} ]}
                        valueLabelFormat={(val) => val.toFixed(2) + '%'} 
                        valueLabelDisplay="auto" 
                        min={option?.minAPR} 
                        max={option?.maxAPR}
                    />
                </span>
                </Stack>
            </div>
            <Divider />
            <div className="planCreation__financingItem">
                Upfront Cost:
                <span>{upfrontCostDisplayValue}</span>
                Monthly Payment:
                <span>{monthlyCostDisplayValue}</span>
            </div>
        </div>
    </>
}