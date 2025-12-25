"use client"

import { useState } from "react"
import "../editingdesigncomponent/preview.css"

export default function Preview({ originalImage, processedImage, bgColor }) {
  const [zoom, setZoom] = useState(1)
  const [isPanned, setIsPanned] = useState(false)
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)

  const handleMouseWheel = (e) => {
    e.preventDefault()
    const newZoom = e.deltaY > 0 ? Math.max(0.5, zoom - 0.1) : Math.min(3, zoom + 0.1)
    setZoom(newZoom)
  }

  const getBackgroundStyle = () => {
    if (bgColor === "transparent") {
      return {
        backgroundImage:
          "linear-gradient(45deg, #e0e0e0 25%, transparent 25%, transparent 75%, #e0e0e0 75%, #e0e0e0), linear-gradient(45deg, #e0e0e0 25%, transparent 25%, transparent 75%, #e0e0e0 75%, #e0e0e0)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 10px 10px",
        backgroundColor: "#f5f5f5",
      }
    }
    return { backgroundColor: bgColor }
  }

  return (
    <div className="rebecca-new-preview-container">
      <div className="rebecca-new-preview-wrapper" style={getBackgroundStyle()} onWheel={handleMouseWheel}>
        {!processedImage ? (
          <img
            src={originalImage || "/placeholder.svg"}
            alt="Original"
            className="rebecca-new-preview-image"
            style={{
              transform: `scale(${zoom})`,
              cursor: "grab",
            }}
          />
        ) : (
          <div className="rebecca-new-comparison-wrapper">
            <div className="rebecca-new-preview-item rebecca-new-preview-original">
              <img src={originalImage || "/placeholder.svg"} alt="Original" />
              <span>Original</span>
            </div>
            <div className="rebecca-new-preview-item rebecca-new-preview-processed">
              <img src={processedImage || "/placeholder.svg"} alt="Processed" />
              <span>Background Removed</span>
            </div>
          </div>
        )}
      </div>

      <div className="rebecca-new-preview-controls">
        <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="rebecca-new-zoom-button">
          🔍 −
        </button>
        <span className="rebecca-new-zoom-level">{Math.round(zoom * 100)}%</span>
        <button onClick={() => setZoom(Math.min(3, zoom + 0.1))} className="rebecca-new-zoom-button">
          🔍 +
        </button>
      </div>
    </div>
  )
}
