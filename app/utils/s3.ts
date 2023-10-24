type ImageType = 'ORIGINAL' | 'CROPPED'

function constructS3ImageKey(
  orgId: string,
  type: ImageType,
  id: string
): string {
  return `${orgId}/${type.toLowerCase()}/${id}`
}
