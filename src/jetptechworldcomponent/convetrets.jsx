import { useState, useRef } from "react"
import "../jetptechdesigncomponent/designjetptech.css"
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs"

const workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc

const WORD_TO_PDF_API = "http://localhost:6060/convert/word"
const IMAGE_TO_PDF_API = "http://localhost:6060/convert/image"
const PROTECT_PDF_API = "http://localhost:6060/convert/protect"

 const FileConverter = ()=> {
  const [selectedConverter, setSelectedConverter] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isConverting, setIsConverting] = useState(false)
  const [convertedFile, setConvertedFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [conversionProgress, setConversionProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const uploadSectionRef = useRef(null)

  const converters = [
    {
      id: "image-to-pdf",
      name: "Image to PDF",
      description: "Convert JPG, PNG to PDF",
      accept: "image/*",
      output: "pdf",
      category: "image",
      color: "#3b82f6",
    },
    {
      id: "word-to-pdf",
      name: "Word to PDF",
      description: "Convert DOCX to PDF",
      accept: ".doc,.docx,.txt",
      output: "pdf",
      category: "document",
      color: "#8b5cf6",
    },
    {
      id: "pdf-to-jpg",
      name: "PDF to JPG",
      description: "Convert PDF to JPG images",
      accept: ".pdf",
      output: "jpg",
      category: "pdf",
      color: "#ec4899",
    },
    {
      id: "protect-pdf",
      name: "Protect PDF with Password",
      description: "Add password protection to PDF",
      accept: ".pdf",
      output: "pdf",
      category: "pdf",
      color: "#f59e0b",
    },
  ]

  const categories = [
    { id: "all", name: "All Tools", icon: "🌐" },
    { id: "document", name: "Document", icon: "📝" },
    { id: "image", name: "Image", icon: "🖼️" },
    { id: "pdf", name: "PDF Tools", icon: "📄" },
  ]

  const filteredConverters = activeTab === "all" ? converters : converters.filter((c) => c.category === activeTab)

  const handleConverterSelect = (converter) => {
    setSelectedConverter(converter)
    setSelectedFile(null)
    setConvertedFile(null)
    setConversionProgress(0)
    setShowPasswordModal(false)
    setPassword("")

    setTimeout(() => {
      uploadSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }, 100)
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setConvertedFile(null)
      setConversionProgress(0)
      if (selectedConverter?.id === "protect-pdf") {
        setShowPasswordModal(true)
      }
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      setSelectedFile(file)
      setConvertedFile(null)
      setConversionProgress(0)
      if (selectedConverter?.id === "protect-pdf") {
        setShowPasswordModal(true)
      }
    }
  }

  const convertPDFToJPG = async (pdfFile) => {
    const arrayBuffer = await pdfFile.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    const numPages = pdf.numPages
    const blobs = []

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i)
      const scale = 2
      const viewport = page.getViewport({ scale })
      const canvas = document.createElement("canvas")
      canvas.width = viewport.width
      canvas.height = viewport.height
      const context = canvas.getContext("2d")
      await page.render({ canvasContext: context, viewport }).promise

      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/jpeg", 0.95)
      })
      blobs.push(blob)
    }

    if (blobs.length === 1) {
      return blobs[0]
    }

    const zip = new JSZip()
    blobs.forEach((blob, index) => {
      zip.file(`page_${index + 1}.jpg`, blob)
    })

    const zipBlob = await zip.generateAsync({ type: "blob" })
    return zipBlob
  }

  const handleConvert = async () => {
    if (!selectedFile) return

    setLoading(true)
    setIsConverting(true)
    setConversionProgress(0)

    let progress = 0
    const progressInterval = setInterval(() => {
      progress += 1
      setConversionProgress(progress)
      if (progress >= 100) {
        clearInterval(progressInterval)
      }
    }, 10)

    await new Promise(resolve => setTimeout(resolve, 1000))

    try {
      let convertedBlob
      let outputExt = selectedConverter.output
      let fileName = selectedFile.name.replace(/\.[^/.]+$/, "")

      if (selectedConverter.id === "word-to-pdf") {
        const formData = new FormData()
        formData.append("file", selectedFile)
        const response = await fetch(WORD_TO_PDF_API, {
          method: "POST",
          body: formData,
        })

        if (!response.ok) throw new Error("Conversion failed")
        convertedBlob = await response.blob()
        outputExt = "pdf"
      } else if (selectedConverter.id === "image-to-pdf") {
        const formData = new FormData()
        formData.append("file", selectedFile)
        const response = await fetch(IMAGE_TO_PDF_API, {
          method: "POST",
          body: formData,
        })

        if (!response.ok) throw new Error("Conversion failed")
        convertedBlob = await response.blob()
        outputExt = "pdf"
      } else if (selectedConverter.id === "pdf-to-jpg") {
        convertedBlob = await convertPDFToJPG(selectedFile)
        outputExt = convertedBlob.type === "application/zip" ? "zip" : "jpg"
      } else if (selectedConverter.id === "protect-pdf") {
        if (!password) {
          alert("Please enter a password")
          setLoading(false)
          setIsConverting(false)
          return
        }
        const formData = new FormData()
        formData.append("file", selectedFile)
        formData.append("password", password)
        const response = await fetch(PROTECT_PDF_API, {
          method: "POST",
          body: formData,
        })

        if (!response.ok) throw new Error("Protection failed")
        convertedBlob = await response.blob()
        fileName = `${fileName}_protected`
        outputExt = "pdf"
      }

      const convertedFileName = `JetPTree_${fileName}_Converted.${outputExt}`

      setConvertedFile({
        name: convertedFileName,
        blob: convertedBlob,
        size: convertedBlob.size,
      })
      setShowPasswordModal(false)
      setPassword("")
    } catch (error) {
      console.error(error)
      alert("Error processing file. Check server or file validity.")
    } finally {
      setLoading(false)
      setIsConverting(false)
      setConversionProgress(100)
    }
  }

  const handleDownload = () => {
    if (!convertedFile) return

    const url = URL.createObjectURL(convertedFile.blob)
    const a = document.createElement("a")
    a.href = url
    a.download = convertedFile.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    setSelectedFile(null)
    setConvertedFile(null)
    setConversionProgress(0)
    setShowPasswordModal(false)
    setPassword("")
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  return (
    <div className="jetptech-container-re">
      <div className="converter-container">
        <header className="hero">
          <div className="hero-badge">
            <span className="badge-icon">✨</span>
            <span>Trusted by 500+ users</span>
          </div>
          <h1 className="hero-title">
            Professional File Conversion
            <span className="hero-gradient"> Made Simple</span>
          </h1>
          <p className="hero-subtitle">Transform your files instantly with JetPTech conversion tools</p>
        </header>

        <main className="main-content" id="converters">
          <div className="section-header">
            <h2 className="section-title">Hey Choose Your Converter</h2>
            <p className="section-subtitle">Select from our professional conversion tools</p>
          </div>

          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-tab ${activeTab === category.id ? "active" : ""}`}
                onClick={() => setActiveTab(category.id)}
              >
                <span className="tab-icon">{category.icon}</span>
                <span className="tab-name">{category.name}</span>
              </button>
            ))}
          </div>

          <div className="converters-grid">
            {filteredConverters.map((converter) => (
              <div
                key={converter.id}
                className={`converter-card ${selectedConverter?.id === converter.id ? "selected" : ""}`}
                onClick={() => handleConverterSelect(converter)}
                style={{ "--card-color": converter.color }}
              >
                <div className="card-header">
                  <div className="card-icon"></div>
                  <div className="card-badge">Try This!!</div>
                </div>
                <h3 className="card-title">{converter.name}</h3>
                <p className="card-description">{converter.description}</p>
                <div className="card-footer">
                  <span className="card-arrow">→</span>
                  <span className="card-action">Select</span>
                </div>
              </div>
            ))}
          </div>

          {selectedConverter && (
            <div ref={uploadSectionRef} className="upload-section">
              <div className="upload-container">
                <div className="upload-header">
                  <h3 className="upload-heading">
                    <span className="heading-icon">🔐</span>
                    {selectedConverter.name}
                  </h3>
                  <p className="upload-description">{selectedConverter.description}</p>
                </div>

                <div
                  className={`upload-area ${isDragging ? "dragging" : ""} ${selectedFile ? "has-file" : ""}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {!selectedFile ? (
                    <>
                      <div className="upload-icon-large">📁</div>
                      <h4 className="upload-title">Drag & Drop Your File</h4>
                      <p className="upload-subtitle">or</p>
                      <label className="select-file-btn">
                        <input type="file" accept={selectedConverter.accept} onChange={handleFileSelect} hidden />
                        <span className="btn-icon">📂</span>
                        Select File
                      </label>
                      <p className="file-info">
                        <span className="info-icon">ℹ️</span>
                        {selectedConverter.accept}
                      </p>
                    </>
                  ) : (
                    <div className="file-preview">
                      <div className="file-icon-large">📄</div>
                      <div className="file-details">
                        <h4 className="file-name">{selectedFile.name}</h4>
                        <p className="file-size">{formatFileSize(selectedFile.size)}</p>
                        <div className="file-meta">
                          <span className="meta-item">
                            <span className="meta-icon">✓</span>
                            Ready
                          </span>
                        </div>
                      </div>
                      <button className="file-remove" onClick={handleReset}>
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                {(isConverting || loading) && (
                  <div className="progress-section">
                    <div className="progress-header">
                      <span className="progress-label">Processing...</span>
                      <span className="progress-percentage">{conversionProgress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${conversionProgress}%` }}></div>
                    </div>
                    <p className="progress-message">
                      <span className="spinner-small"></span>
                      Applying protection with strong encryption
                    </p>
                  </div>
                )}

                {selectedFile && !convertedFile && !isConverting && !loading && selectedConverter.id !== "protect-pdf" && (
                  <div className="action-buttons">
                    <button className="convert-btn" onClick={handleConvert}>
                      <span className="btn-icon">⚡</span>
                      Convert Now
                    </button>
                    <button className="reset-btn" onClick={handleReset}>
                      <span className="btn-icon">↻</span>
                      Reset
                    </button>
                  </div>
                )}

                {convertedFile && (
                  <div className="download-section">
                    <div className="success-card">
                      <div className="success-icon-wrapper">
                        <span className="success-icon">✓</span>
                      </div>
                      <div className="success-content">
                        <h4 className="success-title">Processing Successful!</h4>
                        <p className="success-message">Your file is ready to download</p>
                      </div>
                    </div>

                    <div className="converted-file-info">
                      <div className="file-info-left">
                        <span className="file-icon">📥</span>
                        <div>
                          <div className="converted-file-name">{convertedFile.name}</div>
                          <div className="converted-file-size">{formatFileSize(convertedFile.size)}</div>
                        </div>
                      </div>
                      <div className="file-status">
                        <span className="status-badge">Ready</span>
                      </div>
                    </div>

                    <button className="download-btn" onClick={handleDownload}>
                      <span className="btn-icon">⬇️</span>
                      Download File
                      <span className="btn-arrow">→</span>
                    </button>

                    <button className="convert-another-btn" onClick={handleReset}>
                      <span className="btn-icon">+</span>
                      Convert Another
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {showPasswordModal && selectedConverter?.id === "protect-pdf" && selectedFile && (
            <div className="modal-overlay">
              <div className="password-modal">
                <h3>Protect PDF with Password</h3>
                <p className="modal-file-name">File: {selectedFile.name}</p>
                <div className="password-input-group">
                  <label>Enter Password</label>
                  <div className="password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Type your password"
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div className="modal-actions">
                   
                  <button className="submit-btn" onClick={handleConvert} disabled={!password}>
                    <span>🔒</span>
                    Protect & Download
                  </button>
                  <button className="cancel-btn" onClick={() => { setShowPasswordModal(false); handleReset(); }}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
export default FileConverter;