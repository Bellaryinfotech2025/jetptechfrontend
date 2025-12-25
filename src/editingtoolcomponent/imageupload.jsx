"use client"

import { useRef } from "react"

import { useState } from "react"
import "../editingdesigncomponent/upload.css"

export default function ImageUploader({ onImageUpload }) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef(null)

  const supportedFormats = ["image/jpeg", "image/png", "image/webp"]
  const maxFileSize = 10 * 1024 * 1024 // 10MB

  const validateAndLoadImage = (file) => {
    if (!supportedFormats.includes(file.type)) {
      setError("❌ Supported formats: JPG, PNG, WEBP")
      return
    }

    if (file.size > maxFileSize) {
      setError("❌ File size must be under 10MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      setError("")
      onImageUpload(event.target.result)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) validateAndLoadImage(file)
  }

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) validateAndLoadImage(file)
  }

  return (
    <div className="rebecca-new-uploader-container">
      <div
        className={`rebecca-new-dropzone ${isDragging ? "rebecca-new-dropzone-active" : ""}`}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className="rebecca-new-dropzone-content">
          <div className="rebecca-new-icon-upload">📤</div>
          <h2>Drag & Drop Your Image</h2>
          <p>or click to browse</p>
          <div className="rebecca-new-formats">JPG • PNG • WEBP</div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleFileSelect}
          className="rebecca-new-hidden-input"
        />

        <button onClick={() => fileInputRef.current?.click()} className="rebecca-new-browse-button">
          Browse Files
        </button>
      </div>

      {error && <div className="rebecca-new-error-message">{error}</div>}
    </div>
  )
}
