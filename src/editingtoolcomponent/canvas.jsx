"use client"

import { useRef, useEffect } from "react"
import "../editingdesigncomponent/canva.css"

export default function Canvas({ imageData, onImageUpdate }) {
  const canvasRef = useRef(null)
  const isDrawingRef = useRef(false)

  useEffect(() => {
    if (!canvasRef.current || !imageData) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
    }
    img.src = imageData
  }, [imageData])

  const handleMouseDown = () => {
    isDrawingRef.current = true
  }

  const handleMouseUp = () => {
    isDrawingRef.current = false
  }

  return (
    <canvas
      ref={canvasRef}
      className="rebecca-new-canvas"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  )
}
