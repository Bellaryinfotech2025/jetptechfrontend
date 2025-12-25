"use client"

import { useState } from "react"
import Toolbar from "../editingtoolcomponent/toolbar"
import Preview from "../editingtoolcomponent/preview"
import "../editingdesigncomponent/editor.css"

// IMPORTANT: the background removal library
import { removeBackground } from "@imgly/background-removal"

export default function Editor({ originalImage, onReset, onProcessed }) {
  const [processedImage, setProcessedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [progress, setProgress] = useState(0)
  const [bgColor, setBgColor] = useState("transparent")

  // Keep these for future brush feature (you can remove if not needed)
  const [brushSize, setBrushSize] = useState(30)
  const [isErasing, setIsErasing] = useState(false)

  const removeBackgroundHandler = async () => {
    if (!originalImage) return

    setIsLoading(true)
    setErrorMessage(null)
    setProgress(0)

    try {
      // Step 1: Convert data URL → Blob → object URL (this fixes "Invalid base URL")
      const response = await fetch(originalImage)
      if (!response.ok) throw new Error("Failed to load image")
      const imageBlob = await response.blob()
      const cleanImageUrl = URL.createObjectURL(imageBlob)

      console.log("Clean image URL ready:", cleanImageUrl) // debug

      // Step 2: Call the AI background removal
      const resultBlob = await removeBackground(cleanImageUrl, {
        publicPath: "/models/", // MUST have trailing slash!
        debug: true,            // shows logs in console (remove later)
        // model: "small",      // optional: faster but slightly less accurate
        progress: (type, current, total) => {
          if (type === "compute") {
            setProgress(Math.round((current / total) * 100))
          }
        },
      })

      const resultUrl = URL.createObjectURL(resultBlob)
      setProcessedImage(resultUrl)
      onProcessed(resultUrl)

      // Clean up memory (good practice)
      setTimeout(() => {
        URL.revokeObjectURL(cleanImageUrl)
        URL.revokeObjectURL(resultUrl)
      }, 5000)

    } catch (err) {
      console.error("Background removal error:", err)
      setErrorMessage(
        err.message?.includes("URL")
          ? "Image format or size issue. Try a smaller JPG/PNG."
          : "Background removal failed. Please try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = (imgSrc) => {
    if (!imgSrc) return
    const link = document.createElement("a")
    link.href = imgSrc
    link.download = `removed-background-${Date.now()}.png`
    link.click()
  }

  const handleClearBackground = () => {
    setProcessedImage(null)
  }

  return (
    <div className="rebecca-new-editor">
      <div className="rebecca-new-editor-wrapper">

        {/* Loading overlay */}
        {isLoading && (
          <div className="processing-overlay">
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
              <p>AI Removing Background... {progress}%</p>
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        {/* Preview component */}
        <Preview
          originalImage={originalImage}
          processedImage={processedImage}
          bgColor={bgColor}
        />

        {/* Toolbar */}
        <Toolbar
          isLoading={isLoading}
          onRemoveBackground={removeBackgroundHandler}
          onDownload={() => handleDownload(processedImage || originalImage)}
          brushSize={brushSize}
          onBrushSizeChange={setBrushSize}
          bgColor={bgColor}
          onBgColorChange={setBgColor}
          onReset={onReset}
          hasProcessed={!!processedImage}
          onClearBackground={handleClearBackground}
        />
      </div>
    </div>
  )
}