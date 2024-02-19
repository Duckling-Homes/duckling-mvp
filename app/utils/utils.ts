export default function formatCurrency(amount) {
  amount = parseFloat(amount)
  amount = Math.round((amount + Number.EPSILON) * 100) / 100

  return (
    '$' +
    amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  )
}
