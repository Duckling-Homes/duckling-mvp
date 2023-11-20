'use client'

import { Button } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { PhotoDetails, VizualizerTextBlock } from '@/types/types'
import { observer } from 'mobx-react-lite'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined'
import { useState } from 'react'
import { Layer, Stage } from 'react-konva'
import DraggableText from '@/components/Vizualizer/DraggableText'
import dynamic from 'next/dynamic'
import EditTextModal from '@/components/Vizualizer/EditTextModal'

interface MarkupVisualizerProps {
  setShowVisualizer: (show: boolean) => void
  currentPhoto?: PhotoDetails
}

const MarkupVisualizer: React.FC<MarkupVisualizerProps> = observer(
  ({ setShowVisualizer, currentPhoto }) => {
    const [texts, setTexts] = useState<VizualizerTextBlock[]>([])
    const [selectedId, selectShape] = useState(null)
    const [imageSize, setImageSize] = useState({ width: 600, height: 600 }) // Default values
    const [selectedTextBlock, setSelectedTextBlock] =
      useState<VizualizerTextBlock | null>(null)

    const onImageLoad = ({ target: img }) => {
      setImageSize({ width: img.offsetWidth, height: img.offsetHeight })
    }

    const checkDeselect = (e) => {
      const clickedOnEmpty = e.target === e.target.getStage()
      if (clickedOnEmpty) {
        selectShape(null)
      }
    }

    const addText = () => {
      console.log('adding new text')
      const id = texts.length + 1 // Need a new id pattern cause what if I add delete?
      const newText = {
        position: { x: imageSize.width / 2, y: imageSize.height / 2 },
        text: 'New Text',
        id: `text${id}`,
        scale: 1,
        color: 'black',
      }
      setTexts(texts.concat([newText]))
      selectShape(`text${id}`)
    }

    const updateTextBlock = (id: number, newAttrs) => {
      const updatedTexts = texts.map((t) => {
        if (t.id === id) {
          return { ...t, ...newAttrs }
        }
        return t
      })
      setTexts(updatedTexts)
    }

    const saveMarkupPhoto = () => {
      setShowVisualizer(false)
    }

    return (
      <>
        {selectedTextBlock && (
          <EditTextModal
            open={!!selectedTextBlock}
            onClose={() => setSelectedTextBlock(null)}
            block={selectedTextBlock}
            setBlockDetails={(text: string, color: string) => {
              updateTextBlock(selectedTextBlock.id, {
                text: text,
                color: color,
              })
            }}
          />
        )}
        {/* <ApplianceMarkupSelection
          open={openApplianceMarkup}
          onClose={() => setOpenApplianceMarkup(false)}
          addSticker={addApplianceSticker}
        /> */}
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
            onLoad={onImageLoad}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
            }}
            alt="Preview"
          />

          <Stage
            width={imageSize.width}
            height={imageSize.height}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <Layer>
              {texts.map((text, i) => (
                <DraggableText
                  key={i}
                  textBlock={text}
                  isSelected={text.id === selectedId}
                  onSelect={() => {
                    selectShape(text.id)
                  }}
                  onChange={(newAttrs) => {
                    updateTextBlock(text.id, newAttrs)
                  }}
                  onClick={() => {
                    setSelectedTextBlock(text)
                  }}
                />
              ))}
            </Layer>
          </Stage>
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
            <Button
              variant="contained"
              onClick={() => {
                // setOpenApplianceMarkup(true)
              }}
            >
              <WorkOutlineOutlinedIcon />
            </Button>
            <Button variant="contained" onClick={addText}>
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

export default dynamic(() => Promise.resolve(MarkupVisualizer), {
  ssr: false,
})
