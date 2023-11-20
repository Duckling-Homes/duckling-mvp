import React, { useState } from 'react'
import { Text, Transformer } from 'react-konva'
import dynamic from 'next/dynamic'
import EditTextModal from './EditTextModal'
import { VizualizerTextBlock } from '@/types/types'

// Add the onClick - I dont think I can do the modal in here needs to be in the vizualizer..

const DraggableText: React.FC<{
  textBlock: VizualizerTextBlock
  isSelected: boolean
  onSelect: any
  onChange: any
  onClick: any
}> = ({ textBlock, isSelected, onSelect, onChange, onClick }) => {
  const shapeRef = React.useRef()
  const trRef = React.useRef()
  const [editTextBlock, setEditTextBlock] = useState(false)

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current])
      trRef.current.getLayer().batchDraw()
    }
  }, [isSelected])

  return (
    <>
      {/* <EditTextModal
        open={editTextBlock}
        onClose={() => setEditTextBlock(false)}
        block={textBlock}
        setBlockDetails={(text: string, color: string) => {
          onChange({
            color: color,
            text: text,
          })
        }}
      /> */}
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
            x: e.target.x(),
            y: e.target.y(),
          })
        }}
        onTransformEnd={() => {
          const node = shapeRef.current
          const updatedScale = node.scale() ? node.scale() : { x: 1, y: 1 }

          node.scaleX(1) // whats this doing?
          node.scaleY(1)
          onChange({
            x: node.x(),
            y: node.y(),
            scale: updatedScale.x, // Assuming uniform scaling
          })
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
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
