import { useState, useRef } from "react"
import "../jetptechdesigncomponent/designjetptech.css"

const WORD_TO_PDF_API = "http://localhost:6060/convert/word";  
const IMAGE_TO_PDF_API = "http://localhost:6060/convert/image";

export default function FileConverter() {
  const [selectedConverter, setSelectedConverter] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isConverting, setIsConverting] = useState(false)
  const [convertedFile, setConvertedFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [conversionProgress, setConversionProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("all")
  const [loading, setLoading] = useState(false)  
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
     
    // {
    //   id: "excel-to-pdf",
    //   name: "Excel to PDF",
    //   description: "Transform spreadsheets",
    //   accept: ".xls,.xlsx,.csv,.txt",
    //   output: "pdf",
    //   category: "document",
    //   color: "#06b6d4",
    // },
     
  ]

  const stats = [
     
  ]

  const categories = [
    { id: "all", name: "All Tools", icon: "🌐" },
     { id: "document", name: "Document", icon: "📝" },
    { id: "image", name: "Image", icon: "🖼️" },
    
  ]

  const filteredConverters = activeTab === "all" ? converters : converters.filter((c) => c.category === activeTab)

  const handleConverterSelect = (converter) => {
    setSelectedConverter(converter)
    setSelectedFile(null)
    setConvertedFile(null)
    setConversionProgress(0)

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
    }
  }

  const handleConvert = async () => {
    if (!selectedFile) return

    setLoading(true)
    setIsConverting(true)
    setConversionProgress(0)

    // Start progress from 0 to 100 over 1 second
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 1;
      setConversionProgress(progress);
      if (progress >= 100) {
        clearInterval(progressInterval);
      }
    }, 10); // 100 steps over 1 second (1000ms / 100 = 10ms per step)

    // Wait for at least 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      let convertedBlob;
      let outputExt = selectedConverter.output;
      let fileName = selectedFile.name.replace(/\.[^/.]+$/, "");

      if (selectedConverter.id === "word-to-pdf") {
        // Real API call for Word to PDF
        const formData = new FormData();
        formData.append("file", selectedFile);
        const response = await fetch(WORD_TO_PDF_API, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Conversion failed");
        }

        convertedBlob = await response.blob();
        outputExt = "pdf";
      } else if (selectedConverter.id === "image-to-pdf") {
        // Real API call for Image to PDF
        const formData = new FormData();
        formData.append("file", selectedFile);
        const response = await fetch(IMAGE_TO_PDF_API, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Conversion failed");
        }

        convertedBlob = await response.blob();
        outputExt = "pdf";
      } else {
        // Mock conversions for others
        if (selectedConverter.id === "pdf-to-word") {
          convertedBlob = await convertPDFToWord(selectedFile);
          outputExt = "docx";
        } else if (selectedConverter.id === "pdf-to-image") {
          convertedBlob = await convertPDFToImage(selectedFile);
          outputExt = "png";
        } else {
          convertedBlob = await convertDocumentToPDF(selectedFile);
        }
      }

      const convertedFileName = `JetPTech_${fileName}_Converted.${outputExt}`;

      setConvertedFile({
        name: convertedFileName,
        blob: convertedBlob,
        size: convertedBlob.size,
      });
    } catch (error) {
      console.error(error);
      alert("Error converting file. Check if server is running.");
    } finally {
      setLoading(false);
      setIsConverting(false);
      setConversionProgress(100);
    }
  }

  const convertDocumentToPDF = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          let text = ""
          if (file.type.includes("text") || file.name.endsWith(".txt")) {
            text = e.target.result
          } else {
            text = `JetPTech File Converter\n\nOriginal File: ${file.name}\nConversion Date: ${new Date().toLocaleString()}\nFile Size: ${formatFileSize(file.size)}\n\nThis file has been successfully converted to PDF format.\n\nContent from ${file.name} has been processed and converted to PDF format by JetPTech converter.\n\nIn a production environment with backend processing, this would contain the actual extracted and formatted content from your ${file.type || "document"}.\n\nThank you for using JetPTech!`
          }

          const pdfBlob = await createTextPDF(text)
          resolve(pdfBlob)
        } catch (error) {
          reject(error)
        }
      }
      reader.onerror = () => reject(new Error("Failed to read file"))
      if (file.type.includes("text") || file.name.endsWith(".txt")) {
        reader.readAsText(file)
      } else {
        reader.readAsArrayBuffer(file)
      }
    })
  }

  const createTextPDF = async (text) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = 1200
    canvas.height = 1600

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 100)
    gradient.addColorStop(0, "#3b82f6")
    gradient.addColorStop(1, "#8b5cf6")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, 100)

    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 48px Arial"
    ctx.textAlign = "center"
    ctx.fillText("JetPTech", canvas.width / 2, 65)

    ctx.fillStyle = "#1a1a1a"
    ctx.font = "24px Arial"
    ctx.textAlign = "left"

    const lines = text.split("\n")
    const lineHeight = 36
    const margin = 60
    let y = 180

    lines.forEach((line) => {
      if (y > canvas.height - margin) return
      const words = line.split(" ")
      let currentLine = ""

      words.forEach((word) => {
        const testLine = currentLine + word + " "
        const metrics = ctx.measureText(testLine)
        if (metrics.width > canvas.width - 2 * margin && currentLine !== "") {
          ctx.fillText(currentLine, margin, y)
          currentLine = word + " "
          y += lineHeight
        } else {
          currentLine = testLine
        }
      })
      ctx.fillText(currentLine, margin, y)
      y += lineHeight
    })

    return new Promise((resolve) => {
      canvas.toBlob(
        async (blob) => {
          const arrayBuffer = await blob.arrayBuffer()
          const imageBytes = new Uint8Array(arrayBuffer)
          const pdfBytes = createProperPDF(imageBytes, canvas.width, canvas.height)
          resolve(new Blob([pdfBytes], { type: "application/pdf" }))
        },
        "image/jpeg",
        0.95,
      )
    })
  }

  const createProperPDF = (imageBytes, width, height) => {
    const pdfWidth = 595.28
    const pdfHeight = 841.89
    const margin = 40

    const imgAspect = width / height
    const availableWidth = pdfWidth - 2 * margin
    const availableHeight = pdfHeight - 2 * margin

    let drawWidth, drawHeight, x, y

    if (imgAspect > availableWidth / availableHeight) {
      drawWidth = availableWidth
      drawHeight = availableWidth / imgAspect
      x = margin
      y = (pdfHeight - drawHeight) / 2
    } else {
      drawHeight = availableHeight
      drawWidth = availableHeight * imgAspect
      x = (pdfWidth - drawWidth) / 2
      y = margin
    }

    const contentStream = `q\n${drawWidth.toFixed(2)} 0 0 ${drawHeight.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} cm\n/Im1 Do\nQ\n`

    let pdf = "%PDF-1.4\n"
    const startxref = []

    startxref.push(pdf.length)
    pdf += "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n"

    startxref.push(pdf.length)
    pdf += "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n"

    startxref.push(pdf.length)
    pdf += `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pdfWidth} ${pdfHeight}] /Contents 4 0 R /Resources << /XObject << /Im1 5 0 R >> >> >>\nendobj\n`

    startxref.push(pdf.length)
    pdf += `4 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}endstream\nendobj\n`

    startxref.push(pdf.length)
    pdf += `5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imageBytes.length} >>\nstream\n`

    const encoder = new TextEncoder()
    const pdfHeaderBytes = encoder.encode(pdf)
    const streamEnd = encoder.encode("\nendstream\nendobj\n")

    const xrefStart = pdfHeaderBytes.length + imageBytes.length + streamEnd.length
    let xref = "xref\n0 6\n0000000000 65535 f \n"
    startxref.forEach((offset) => {
      xref += offset.toString().padStart(10, "0") + " 00000 n \n"
    })
    xref += `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`

    const xrefBytes = encoder.encode(xref)

    const totalLength = pdfHeaderBytes.length + imageBytes.length + streamEnd.length + xrefBytes.length
    const fullPDF = new Uint8Array(totalLength)

    let offset = 0
    fullPDF.set(pdfHeaderBytes, offset)
    offset += pdfHeaderBytes.length
    fullPDF.set(imageBytes, offset)
    offset += imageBytes.length
    fullPDF.set(streamEnd, offset)
    offset += streamEnd.length
    fullPDF.set(xrefBytes, offset)

    return fullPDF.buffer
  }

  const convertPDFToWord = async (file) => {
    const content = `JetPTech PDF to Word Conversion

Original PDF: ${file.name}
Converted: ${new Date().toLocaleString()}
File Size: ${formatFileSize(file.size)}

This DOCX file was converted from your PDF using JetPTech converter.

The content from your PDF has been extracted and formatted into this Word document.

In a full production environment with backend processing, this would contain:
- The actual text extracted from your PDF
- Preserved formatting and styles
- Images and tables from the original document
- Page breaks and sections
- Headers and footers

This demo shows the conversion capability. For full PDF text extraction with formatting, a backend service with PDF parsing libraries would be used.

Thank you for using JetPTech for your file conversion needs!`

    const rtfContent = `{\\rtf1\\ansi\\deff0
{\\fonttbl{\\f0\\fnil\\fcharset0 Arial;}}
{\\colortbl;\\red0\\green0\\blue0;\\red59\\green130\\blue246;}
\\viewkind4\\uc1\\pard\\cf2\\b\\fs32 JetPTech PDF to Word Conversion\\par
\\cf1\\b0\\fs24\\par
\\b Original PDF:\\b0  ${file.name}\\par
\\b Converted:\\b0  ${new Date().toLocaleString()}\\par
\\b File Size:\\b0  ${formatFileSize(file.size)}\\par
\\par
This DOCX file was converted from your PDF using JetPTech converter.\\par
\\par
The content from your PDF has been extracted and formatted into this Word document.\\par
\\par
\\b In a full production environment with backend processing, this would contain:\\b0\\par
\\pard\\li720 - The actual text extracted from your PDF\\par
- Preserved formatting and styles\\par
- Images and tables from the original document\\par
- Page breaks and sections\\par
- Headers and footers\\par
\\pard\\par
This demo shows the conversion capability. For full PDF text extraction with formatting, a backend service with PDF parsing libraries would be used.\\par
\\par
\\b Thank you for using JetPTech for your file conversion needs!\\b0\\par
}`

    return new Blob([rtfContent], {
      type: "application/rtf",
    })
  }

  const convertPDFToImage = async (file) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas")
      canvas.width = 1200
      canvas.height = 1600
      const ctx = canvas.getContext("2d")

      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 150)
      gradient.addColorStop(0, "#3b82f6")
      gradient.addColorStop(1, "#8b5cf6")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, 150)

      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 56px Arial"
      ctx.textAlign = "center"
      ctx.fillText("JetPTech", canvas.width / 2, 95)

      ctx.fillStyle = "#1a1a1a"
      ctx.font = "28px Arial"
      ctx.fillText("PDF to Image Conversion", canvas.width / 2, 250)

      ctx.font = "20px Arial"
      ctx.fillStyle = "#64748b"
      ctx.fillText(`Original File: ${file.name}`, canvas.width / 2, 320)
      ctx.fillText(`Converted: ${new Date().toLocaleDateString()}`, canvas.width / 2, 370)
      ctx.fillText(`Size: ${formatFileSize(file.size)}`, canvas.width / 2, 420)

      ctx.fillStyle = "#1a1a1a"
      ctx.font = "18px Arial"
      const lines = [
        "",
        "This image represents your converted PDF file.",
        "",
        "In a production environment with backend processing,",
        "this would display the actual rendered pages from your",
        "PDF document with all text, images, and formatting",
        "preserved as a high-quality image.",
        "",
        "For complete PDF rendering, server-side PDF libraries",
        "like pdf.js or similar would be used.",
      ]

      lines.forEach((line, i) => {
        ctx.fillText(line, canvas.width / 2, 520 + i * 40)
      })

      ctx.strokeStyle = "#e2e8f0"
      ctx.lineWidth = 2
      ctx.strokeRect(100, 1000, canvas.width - 200, 400)

      ctx.fillStyle = "#94a3b8"
      ctx.font = "16px Arial"
      ctx.fillText("[ PDF Content Would Appear Here ]", canvas.width / 2, 1200)

      ctx.fillStyle = "#94a3b8"
      ctx.font = "16px Arial"
      ctx.fillText("Powered by JetPTech Converter", canvas.width / 2, canvas.height - 60)

      canvas.toBlob(
        (blob) => {
          resolve(blob)
        },
        "image/png",
        1.0,
      )
    })
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
      {/* Navigation */}
      
      

      {/* Hero */}
      <header className="hero">
        <div className="hero-badge">
          <span className="badge-icon">✨</span>
          <span>Trusted by 500,000+ users</span>
        </div>
        <h1 className="hero-title">
          Professional File Conversion
          <span className="hero-gradient"> Made Simple</span>
        </h1>
        <p className="hero-subtitle">Transform your files instantly with JetPTech conversion tools</p>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content" id="converters">
        <div className="section-header">
          <h2 className="section-title">Hey Choose Your Converter</h2>
          <p className="section-subtitle">Select from our professional conversion tools</p>
        </div>

        {/* Category Tabs */}
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

        {/* Converters Grid */}
        <div className="converters-grid">
          {filteredConverters.map((converter) => (
            <div
              key={converter.id}
              className={`converter-card ${selectedConverter?.id === converter.id ? "selected" : ""}`}
              onClick={() => handleConverterSelect(converter)}
              style={{ "--card-color": converter.color }}
            >
              <div className="card-header">
                <div className="card-icon">{converter.icon}</div>
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

        {/* Upload Section */}
        {selectedConverter && (
          <div ref={uploadSectionRef} className="upload-section">
            <div className="upload-container">
              <div className="upload-header">
                <h3 className="upload-heading">
                  <span className="heading-icon">{selectedConverter.icon}</span>
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

              {/* Progress */}
              {(isConverting || loading) && (
                <div className="progress-section">
                  <div className="progress-header">
                    <span className="progress-label">Converting...</span>
                    <span className="progress-percentage">{conversionProgress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${conversionProgress}%` }}></div>
                  </div>
                  <p className="progress-message">
                    <span className="spinner-small"></span>
                    Processing with premium quality
                  </p>
                </div>
              )}

              {/* Convert Button */}
              {selectedFile && !convertedFile && !isConverting && !loading && (
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

              {/* Download Section */}
              {convertedFile && (
                <div className="download-section">
                  <div className="success-card">
                    <div className="success-icon-wrapper">
                      <span className="success-icon">✓</span>
                    </div>
                    <div className="success-content">
                      <h4 className="success-title">Conversion Successful!</h4>
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
      </main>
    </div>
    </div>
  )
}