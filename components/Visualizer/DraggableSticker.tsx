import { Image as KonvaImage, Transformer } from 'react-konva'
import Konva from 'konva'
import React from 'react'
import { ApplianceSticker, UpdateApplianceSticker } from '@/types/types'

const DraggableSticker: React.FC<{
  sticker: ApplianceSticker
  isSelected: boolean
  onSelect: () => void
  onChange: (updates: UpdateApplianceSticker) => void
}> = ({ sticker, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef<Konva.Image | null>(null)
  const trRef = React.useRef<Konva.Transformer | null>(null)

  React.useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current])
      trRef.current.getLayer()?.batchDraw()
    }
  }, [isSelected])

  return (
    <>
      <KonvaImage
        onClick={onSelect}
        ref={shapeRef}
        image={sticker.image}
        draggable
        x={sticker.position.x}
        y={sticker.position.y}
        scale={{ x: sticker.scale, y: sticker.scale }}
        onDragEnd={(e) => {
          onChange({
            position: {
              x: e.target.x(),
              y: e.target.y(),
            },
          })
        }}
        onTransformEnd={() => {
          if (!shapeRef.current) return
          const node = shapeRef.current
          const updatedPosition = node.position()
          const updatedScale = node.scale() ? node.scale() : { x: 1, y: 1 }

          if (updatedScale) {
            onChange({
              scale: updatedScale.x,
              position: { x: updatedPosition.x, y: updatedPosition.y },
            })
          }
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox
            }
            return newBox
          }}
        />
      )}
    </>
  )
}

export default DraggableSticker
