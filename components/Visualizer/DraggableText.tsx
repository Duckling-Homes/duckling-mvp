import React from 'react'
import { Text, Transformer } from 'react-konva'
import dynamic from 'next/dynamic'
import { UpdateVisualizerTextBlock, VisualizerTextBlock } from '@/types/types'
import Konva from 'konva'

const DraggableText: React.FC<{
  textBlock: VisualizerTextBlock
  isSelected: boolean
  onSelect: () => void
  onChange: (updates: UpdateVisualizerTextBlock) => void
  onClick: () => void
}> = ({ textBlock, isSelected, onSelect, onChange, onClick }) => {
  const shapeRef = React.useRef<Konva.Text | null>(null)
  const trRef = React.useRef<Konva.Transformer | null>(null)

  React.useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current])
      trRef.current.getLayer()?.batchDraw()
    }
  }, [isSelected])

  return (
    <>
      <Text
        onClick={onSelect}
        ref={shapeRef}
        text={textBlock.text}
        fill={textBlock.color}
        x={textBlock.position.x}
        y={textBlock.position.y}
        scale={{ x: textBlock.scale, y: textBlock.scale }}
        draggable
        onDblTap={onClick}
        onDblClick={onClick}
        onDragEnd={(e) => {
          onChange({
            position: {
              x: e.target.x(),
              y: e.target.y(),
            },
          })
        }}
        onTransformEnd={() => {
          const node = shapeRef.current
          if (node) {
            const updatedScale = node.scale() ? node.scale() : { x: 3, y: 3 }

            node.scaleX(1)
            node.scaleY(1)
            onChange({
              position: {
                x: node.x(),
                y: node.y(),
              },
              scale: updatedScale ? updatedScale.x : 1,
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

export default dynamic(() => Promise.resolve(DraggableText), {
  ssr: false,
})
