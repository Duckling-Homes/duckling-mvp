export function formatCurrency(amount: string | number) {
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

export function formatDateTime(dateTimeString: string) {
  const dateObj = new Date(dateTimeString)

  const formattedDate =
    dateObj.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    }) +
    ' ' +
    dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })

  return formattedDate
}

export default { formatCurrency, formatDateTime }
