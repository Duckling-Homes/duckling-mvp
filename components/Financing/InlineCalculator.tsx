'use client';

import { Box, Divider, Input, MenuItem, Select, Slider, Stack } from '@mui/material'
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


    const loanAmtSliderMin = option?.minAmount ?? 0;
    const loanAmtSliderMax = Math.min(option?.maxAmount ?? props.totalAmount, props.totalAmount);

    const upfrontCostDisplayValue = calculated?.upfrontCost ? '$' + Math.round(calculated.upfrontCost).toLocaleString() : '-';
    const monthlyCostDisplayValue = calculated?.monthlyPayment ? '$' + Math.round(calculated.monthlyPayment).toLocaleString() : '-';

    useEffect(() => {
        if (option) {
            if (!term || (term && !option.termLengths?.includes(term))) {
                console.log("SET TERM", term, option);
                setTerm(option.termLengths![0]);
            }
            if (apr === undefined || (option.minAPR! > apr) || (option?.maxAPR! < apr)) {
                setAPR(option.minAPR)
            }

            if (loanAmount > loanAmtSliderMax) {
                setLoanAmount(loanAmtSliderMax);
            }

            if (loanAmount < loanAmtSliderMin) {
                setLoanAmount(loanAmtSliderMin);
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

    return <>

        <div className="planCreation__financing" style={{color: "#00000099"}}>
                <Box sx={{fontSize: 16, color: "#000000"}}> Financing</Box>
                <Stack sx={{rowGap: 1, my: 1}}>
                    <Box sx={{fontSize: 14}}> Financing Option </Box>
                    <Select
                        fullWidth
                        size={'small'}
                        value={option?.id ?? ''}  
                        onChange={(event) => {
                            const opt = financingOptions.find(o => o.option.id === event.target.value);
                            setOption(opt?.option);
                        }}
                    >
                        {financingOptions.map(opt => {
                            return <MenuItem disabled={!opt.available} value={opt.option.id} key={opt.option.id}>{opt.option.name}</MenuItem>
                        })}
                    </Select>
                    <Box sx={{fontSize: 14}}> Length </Box>
                    <Select
                        fullWidth
                        disabled={option === undefined}
                        size={'small'}
                        value={term ?? ''} 
                        onChange={(event) => {setTerm(event.target.value as number);}}
                    >
                        {option?.termLengths?.map(opt => {
                            return <MenuItem value={opt} key={opt}>{opt + ' months'}</MenuItem>
                        })}
                    </Select>

                <Box sx={{fontSize: 14}}> Financing Amount </Box>
                <Box sx={{paddingX: 1, display: "flex", gap: 2 }}>
                    <Box sx={{fontSize: 14, pt: 1, width: '50px'}} >${loanAmount.toLocaleString()} </Box>
                    <Slider
                        value={loanAmount}
                        step={1}
                        //@ts-ignore
                        onChange={(event) => {setLoanAmount(event?.target?.value as number)}} 
                        // marks={[{value: loanAmtSliderMin, label: `$${loanAmtSliderMin}`}, {value: loanAmtSliderMax, label: `$${loanAmtSliderMax.toLocaleString()}`} ]} 
                        valueLabelFormat={(val) => '$' + val.toFixed(0).toLocaleString()} 
                        valueLabelDisplay="auto" 
                        min={loanAmtSliderMin} 
                        max={loanAmtSliderMax}
                    />
                </Box>
                <Box sx={{fontSize: 14}}> APR </Box>
                <Box sx={{paddingX: 1, display: "flex", gap: 2}}>
                    <Box sx={{fontSize: 14, pt: 1, width: '50px'}} >{apr}%</Box>
                    <Slider
                        value={apr ?? 0}
                        step={0.01}
                        //@ts-ignore
                        onChange={(event) => {setAPR(event?.target?.value as number)}} 
                        // marks={[{value: option?.minAPR ?? 0, label: `${option?.minAPR ?? 0}%`}, {value: option?.maxAPR ?? 100, label: `${option?.maxAPR ?? 100}%`} ]}
                        valueLabelFormat={(val) => val.toFixed(2) + '%'} 
                        valueLabelDisplay="auto" 
                        min={option?.minAPR} 
                        max={option?.maxAPR}
                    />
                </Box>
            <Divider />
            <Box> Upfront Cost:</Box>
            <Box>{upfrontCostDisplayValue}</Box>
            <Box>Monthly Payment:</Box>
            <Box>{monthlyCostDisplayValue}</Box>
            </Stack>

        </div>
    </>
}