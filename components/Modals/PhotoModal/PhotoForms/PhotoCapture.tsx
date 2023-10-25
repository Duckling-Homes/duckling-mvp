import { Box, Button, Grid } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import ModelStore from '@/app/stores/modelStore'
import { Project } from '@/types/types'

interface PhotoCaptureProps {
  project: Project
  onChange: (key: string, value: string | number | boolean | undefined) => void
}

const PhotoCapture: React.FC<PhotoCaptureProps> = ({ project, onChange }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [imageX, setImageX] = useState<number>(0)
  const [imageY, setImageY] = useState<number>(0)
  const videoStreamRef = useRef<MediaStream | null>(null) // Create a ref instead of state

  const handleCapture = async () => {
    const canvas = canvasRef.current
    if (canvas !== null) {
      const imgDataUrl = canvas.toDataURL('image/png')
      onChange('photoUrl', imgDataUrl)
      console.log(imgDataUrl)
      console.log(typeof imgDataUrl)
      await ModelStore.createPhotoEntry(project.id!, imgDataUrl, {})
      // TODO: Make API call to upload the image
    }
  }

  const draw = (video: HTMLVideoElement, ctx: CanvasRenderingContext2D) => {
    if (video.paused || video.ended || !ctx || !video) return
    canvasRef.current!.width = video.videoWidth
    canvasRef.current!.height = video.videoHeight
    ctx.clearRect(0, 0, video.videoWidth, video.videoHeight)
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
    requestAnimationFrame(() => draw(video, ctx))
  }

  // Camera feed setup effect
  useEffect(() => {
    const video = videoRef.current
    const onResize = () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Stop the current video stream before getting a new one
        if (videoStreamRef.current) {
          videoStreamRef.current.getTracks().forEach((track) => track.stop())
        }

        navigator.mediaDevices
          .getUserMedia({
            video: {
              facingMode: {
                ideal: 'user', // TODO: Add the ability to change the camera facing env
              },
              width: { ideal: window.innerWidth },
              height: { ideal: window.innerHeight },
              frameRate: { ideal: 20 },
            },
          })
          .then((stream) => {
            if (video) {
              video.srcObject = stream
              video.play().catch((error) => {
                console.error('Error starting video playback:', error)
              })
              videoStreamRef.current = stream

              // Set the initial position of the image in the middle of the video
              video.onloadedmetadata = () => {
                setImageX(video.videoWidth / 2)
                setImageY(video.videoHeight / 2)
              }

              video.onplay =
                video.onplay ||
                (() => {
                  const canvas = canvasRef.current
                  if (canvas) {
                    const ctx = canvas.getContext('2d')
                    if (ctx) {
                      draw(video, ctx)
                    }
                  }
                })
            }
          })
          .catch((error) => {
            console.error('Error getting user media:', error)
          })
      }
    }

    window.addEventListener('resize', onResize)

    // initial setup
    onResize()

    return () => {
      window.removeEventListener('resize', onResize)
      if (videoStreamRef.current) {
        videoStreamRef.current.getTracks().forEach((track) => track.stop())
        if (video) {
          video.srcObject = null
        }
        console.log('Camera feed stopped and video source object cleared.')
      }
    }
  })

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (video && canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // Only set video.onplay if it's not already set
        video.onplay = video.onplay || (() => draw(video, ctx))

        if (video.onplay === null) {
          // Only set video.onplay if it's not already set
          video.onplay = () => {
            draw(video, ctx)
          }
        } else {
          draw(video, ctx) // If video is already playing, just start drawing
        }
      }
    }
  }, [imageX, imageY])

  return (
    <Grid
      container
      direction="row"
      style={{ height: '100%', position: 'relative' }}
      rowSpacing={{ xs: 1 }}
    >
      <Grid item xs={12} style={{ position: 'relative' }}>
        <video
          ref={videoRef}
          playsInline
          style={{ width: '100vw', height: '100vh' }}
        />

        <Box
          component="canvas"
          ref={canvasRef}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            objectFit: 'contain',
            touchAction: 'none',
          }}
        ></Box>

        <Box
          component="div"
          style={{
            position: 'absolute',
            bottom: '50px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleCapture}
            style={{
              padding: '8px 16px',
              minWidth: 'auto',
            }}
          >
            <PhotoCameraIcon />
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default PhotoCapture
