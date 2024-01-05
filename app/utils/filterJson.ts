// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function filterJson(inputJson: any): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const step1 = JSON.parse(
    JSON.stringify(inputJson, (k, v) => (k === 'updatedAt' ? undefined : v))
  )

  const step2 = JSON.parse(
    JSON.stringify(step1, (k, v) => (k === 'createdAt' ? undefined : v))
  )

  const step3 = JSON.parse(
    JSON.stringify(step2, (k, v) =>
      k.toLowerCase().includes('id') ? undefined : v
    )
  )

  // removing nulls

  const step4 = JSON.parse(
    JSON.stringify(step3, (k, v) => (v === null ? undefined : v))
  )

  return step4
}
