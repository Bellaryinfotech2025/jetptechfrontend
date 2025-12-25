"use client"

import { useState } from "react"
import ImageUploader from "../editingtoolcomponent/imageupload"
import Editor from "../editingtoolcomponent/editor"
import "../editingdesigncomponent/canva.css"

const Backgroundremoverwrapper = () => {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [processedImage, setProcessedImage] = useState(null)

  const handleImageUpload = (imageData) => {
    setUploadedImage(imageData)
    setProcessedImage(null)
  }

  const handleReset = () => {
    setUploadedImage(null)
    setProcessedImage(null)
  }

  return (
    <div className="rebecca-new-container">
      <header className="rebecca-new-header">
        <h1>✨ Background Remover</h1>
        <p>Remove backgrounds instantly with AI precision</p>
      </header>

      <main className="rebecca-new-main">
        {!uploadedImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <Editor originalImage={uploadedImage} onReset={handleReset} onProcessed={setProcessedImage} />
        )}
      </main>

      <footer className="rebecca-new-footer">
        <p>🎨 Powered by advanced AI background removal</p>
      </footer>
    </div>
  )
}

export default  Backgroundremoverwrapper;