'use client'

import { Button } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import {
  PhotoDetails,
  Project,
  UpdateVisualizerTextBlock,
  VisualizerTextBlock,
} from '@/types/types'
import { observer } from 'mobx-react-lite'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined'
import { useEffect, useRef, useState } from 'react'
import { Layer, Stage, Image } from 'react-konva'
import DraggableText from '@/components/Visualizer/DraggableText'
import dynamic from 'next/dynamic'
import { v4 as uuidv4 } from 'uuid'
import Konva from 'konva'
import EditTextModal from './EditTextModal'
import ModelStore from '@/app/stores/modelStore'

interface MarkupVisualizerProps {
  setShowVisualizer: (show: boolean) => void
  project: Project
  currentPhoto: PhotoDetails
  updateCurrentPhotoImage: (url: string) => void
}

const MarkupVisualizer: React.FC<MarkupVisualizerProps> = observer(
  ({ setShowVisualizer, project, currentPhoto, updateCurrentPhotoImage }) => {
    const stageRef = useRef<Konva.Stage>(null)
    const [stageSize, setStageSize] = useState({ width: 0, height: 0 })
    const [stageMargins, setStageMargins] = useState({ top: 0, left: 0 })
    const [konvaImage, setKonvaImage] = useState<HTMLImageElement | undefined>(
      undefined
    )

    const [textBlocks, setTextBlocks] = useState<VisualizerTextBlock[]>([])
    const [editingTextBlock, setEditingTextBlock] =
      useState<VisualizerTextBlock | null>(null)

    const [selectedId, selectShape] = useState<string | null>(null)

    const updateStageSize = () => {
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      const imageWidth = konvaImage ? konvaImage.width : 0
      const imageHeight = konvaImage ? konvaImage.height : 0

      const newWidth = Math.min(windowWidth, imageWidth)
      const newHeight = Math.min(windowHeight, imageHeight)
      const marginTop = (windowHeight - newHeight) / 2
      const marginLeft = (windowWidth - newWidth) / 2

      setStageSize({ width: newWidth, height: newHeight })
      setStageMargins({ top: marginTop, left: marginLeft })
    }

    useEffect(() => {
      const image = new window.Image()
      image.src = currentPhoto.photoUrl

      image.onload = () => {
        setKonvaImage(image)
        setStageSize({ width: image.width, height: image.height })
      }
    }, [currentPhoto.photoUrl])

    useEffect(() => {
      window.addEventListener('resize', updateStageSize)
      updateStageSize()
      return () => {
        window.removeEventListener('resize', updateStageSize)
      }
    }, [konvaImage])

    const checkDeselect = (
      e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
    ) => {
      const clickedOnEmpty = e.target.name() === 'backgroundImage'

      if (clickedOnEmpty) {
        selectShape(null)
      }
    }

    const addText = () => {
      const id = uuidv4().toString()
      const newText = {
        id,
        position: { x: stageSize.width / 2, y: stageSize.height / 2 },
        text: 'New Text',
        scale: 3,
        color: 'black',
      }
      setTextBlocks(textBlocks.concat([newText]))
      selectShape(id)
    }

    const updateTextBlock = (
      id: string,
      newAttrs: UpdateVisualizerTextBlock
    ) => {
      const updatedTexts = textBlocks.map((block) => {
        if (block.id === id) {
          return { ...block, ...newAttrs }
        }
        return block
      })
      setTextBlocks(updatedTexts)
    }

    const saveMarkupPhoto = async () => {
      selectShape(null)
      const stage = stageRef.current
      if (!stage) {
        return
      }

      const dataURL = stage.toDataURL({
        pixelRatio: 3,
      })
      await ModelStore.patchPhotoUrl(project.id!, currentPhoto.id!, dataURL)
      updateCurrentPhotoImage(dataURL)
      setShowVisualizer(false)
    }

    return (
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        {editingTextBlock && (
          <EditTextModal
            open={!!editingTextBlock}
            onClose={() => setEditingTextBlock(null)}
            block={editingTextBlock}
            setBlockDetails={(text: string, color: string) => {
              updateTextBlock(editingTextBlock.id, {
                text: text,
                color: color,
              })
            }}
          />
        )}
        {konvaImage && (
          <Stage
            ref={stageRef}
            width={stageSize.width}
            height={stageSize.height}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
            style={{
              position: 'absolute',
              top: stageMargins.top,
              left: stageMargins.left,
            }}
          >
            <Layer>
              <Image
                image={konvaImage}
                width={stageSize.width}
                height={stageSize.height}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
                name="backgroundImage"
              />
              {textBlocks.map((text, i) => (
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
                    setEditingTextBlock(text)
                  }}
                />
              ))}
            </Layer>
          </Stage>
        )}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            zIndex: 100,
          }}
        >
          <Button variant="contained" onClick={() => {}}>
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
    )
  }
)

export default dynamic(() => Promise.resolve(MarkupVisualizer), {
  ssr: false,
})
