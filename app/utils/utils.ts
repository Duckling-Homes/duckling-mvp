export default function formatCurrency(amount: string | number) {
  amount = parseFloat(amount as string)
  amount = Math.round((amount + Number.EPSILON) * 100) / 100

  return (
    '$' +
    amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  )
}
