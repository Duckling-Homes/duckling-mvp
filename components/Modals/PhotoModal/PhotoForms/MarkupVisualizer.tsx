'use client'

import { Button } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { PhotoDetails, VizualizerTextBlock } from '@/types/types'
import { observer } from 'mobx-react-lite'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined'
import { useState } from 'react'
import Draggable, { DraggableEvent } from 'react-draggable'
import EditTextModal from '@/components/Vizualizer/EditTextModal'

interface MarkupVisualizerProps {
  setShowVisualizer: (show: boolean) => void
  currentPhoto?: PhotoDetails
}

const MarkupVisualizer: React.FC<MarkupVisualizerProps> = observer(
  ({ setShowVisualizer, currentPhoto }) => {
    const [openTextMarkup, setOpenTextMarkup] = useState<boolean>(false)

    const [textBlocks, setTextBlocks] = useState<VizualizerTextBlock[]>([])
    const [selectedTextBlock, setSelectedTextBlock] =
      useState<VizualizerTextBlock | null>(null)

    const addTextBlock = () => {
      const newTextBlock = {
        id: Date.now(),
        text: 'New Text',
        color: 'black',
        position: {
          x: window.innerWidth / 2 - 100,
          y: window.innerHeight / 2 - 50,
        },
      }
      setTextBlocks([...textBlocks, newTextBlock])
    }

    const updateTextPosition = (
      e: DraggableEvent,
      data: { x: number; y: number },
      id: number
    ) => {
      const newTextBlocks = textBlocks.map((block) => {
        if (block.id === id) {
          return { ...block, position: { x: data.x, y: data.y } }
        }
        return block
      })
      setTextBlocks(newTextBlocks)
    }

    const updateTextBlock = (
      blockId: number,
      newText: string,
      newColor: string
    ) => {
      const updatedTextBlocks = textBlocks.map((block) => {
        if (block.id === blockId) {
          return { ...block, text: newText, color: newColor }
        }
        return block
      })
      setTextBlocks(updatedTextBlocks)
    }

    const saveMarkupPhoto = () => {
      setShowVisualizer(false)
    }

    return (
      <>
        {selectedTextBlock && (
          <EditTextModal
            open={openTextMarkup}
            onClose={() => setOpenTextMarkup(false)}
            block={selectedTextBlock}
            setBlockDetails={updateTextBlock}
          />
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            overflowY: 'auto',
            maxHeight: '600px',
            padding: '20px',
            position: 'relative',
          }}
        >
          <img
            src={currentPhoto?.photoUrl}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
            }}
            alt="Preview"
          />

          {textBlocks.map((block) => (
            <Draggable
              key={block.id}
              position={block.position}
              onStop={(e, data) => updateTextPosition(e, data, block.id)}
            >
              <div
                style={{
                  position: 'absolute',
                  zIndex: 1000,
                  padding: '1px',
                  fontSize: '20px',
                  display: 'flex',
                  color: block.color,
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
                onDoubleClick={() => {
                  setSelectedTextBlock(block)
                  setOpenTextMarkup(true)
                }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                {block.text}
              </div>
            </Draggable>
          ))}

          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <Button variant="contained">
              <WorkOutlineOutlinedIcon />
            </Button>
            <Button variant="contained" onClick={addTextBlock}>
              <TextFieldsIcon />
            </Button>
            <Button variant="contained" onClick={saveMarkupPhoto}>
              <CheckIcon />
            </Button>
          </div>
        </div>
      </>
    )
  }
)

export default MarkupVisualizer
