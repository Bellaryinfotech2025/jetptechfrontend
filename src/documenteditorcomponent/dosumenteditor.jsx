import { useState, useRef, useEffect } from "react"
import {Bold,Italic,Underline,Strikethrough,AlignLeft,AlignCenter,AlignRight,AlignJustify,List,ListOrdered,RotateCcw,Upload,Download,ImageIcon,Type,Palette,Highlighter,Table,ChevronDown,Menu,ZoomIn,ZoomOut,FileText,X,Plus,Superscript,Subscript,Search,Minus,LinkIcon,
} from "lucide-react"
import "../documenteditorcomponent/editordocument.css"

export default function DocumentEditor() {
  const [pages, setPages] = useState([{ id: 1, content: "" }])
  const [fileName, setFileName] = useState("Untitled_Document")
  const [zoom, setZoom] = useState(100)
  const [selectedFont, setSelectedFont] = useState("Arial")
  const [selectedSize, setSelectedSize] = useState("14")
  const [textColor, setTextColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#FFFFFF")
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [lineSpacing, setLineSpacing] = useState("1.5")
  const [showFindReplace, setShowFindReplace] = useState(false)
  const [findText, setFindText] = useState("")
  const [replaceText, setReplaceText] = useState("")

  const editorRefs = useRef([])
  const fileInputRef = useRef(null)
  const imageInputRef = useRef(null)
  const sidebarRef = useRef(null)

  // Load saved content
  useEffect(() => {
    const saved = localStorage.getItem("orchid_elephant_pages")
    const savedName = localStorage.getItem("orchid_elephant_filename")
    if (saved) {
      try {
        const parsedPages = JSON.parse(saved)
        setPages(parsedPages)
      } catch (e) {
        console.error("Failed to parse saved pages:", e)
      }
    }
    if (savedName) setFileName(savedName)
  }, [])

  // Auto-save
  useEffect(() => {
    if (pages.length > 0) {
      localStorage.setItem("orchid_elephant_pages", JSON.stringify(pages))
    }
  }, [pages])

  // Handle outside click for mobile sidebar
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsMobileSidebarOpen(false)
      }
    }
    if (isMobileSidebarOpen) {
      document.addEventListener("mousedown", handleOutsideClick)
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [isMobileSidebarOpen])

  // Format commands
  const executeCommand = (command, value = null) => {
    document.execCommand(command, false, value)
    if (editorRefs.current[currentPage]) {
      editorRefs.current[currentPage].focus()
    }
  }

  // Handle file upload - FIXED
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name.replace(/\.[^/.]+$/, ""))
    const reader = new FileReader()

    reader.onload = async (event) => {
      let html = ""

      if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        // Handle plain text files
        html = event.target.result
        html = `<p>${html.replace(/\n/g, "<br>")}</p>`
        setPages([{ id: 1, content: html }])
      } else if (file.type === "text/html" || file.name.endsWith(".html")) {
        // Handle HTML files
        html = event.target.result
        setPages([{ id: 1, content: html }])
      } else if (file.name.endsWith(".docx") || file.name.endsWith(".doc")) {
        // Handle Word documents
        try {
          const mammoth = await import("mammoth")
          const arrayBuffer = event.target.result
          const result = await mammoth.convertToHtml({ arrayBuffer })
          html = result.value
          setPages([{ id: 1, content: html }])
        } catch (error) {
          console.error("Error loading document:", error)
          alert("Failed to load DOC/DOCX. Install mammoth: npm install mammoth")
        }
      }
      setCurrentPage(0)
    }

    // Read file based on type
    if (file.name.endsWith(".docx") || file.name.endsWith(".doc")) {
      reader.readAsArrayBuffer(file)
    } else {
      reader.readAsText(file)
    }
  }

  // Save to file
  const handleSave = () => {
    const fullContent = pages.map((p) => p.content).join('<div style="page-break-after: always;"></div>')
    const blob = new Blob([fullContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${fileName}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Export to DOC
  const handleExportDOC = () => {
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>${fileName}</title></head><body>`
    const footer = "</body></html>"
    const fullContent = pages.map((p) => p.content).join('<br style="page-break-after: always;">')
    const sourceHTML = header + fullContent + footer
    const blob = new Blob(["\ufeff", sourceHTML], { type: "application/msword" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${fileName}.doc`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Insert local image - FIXED
  const handleInsertLocalImage = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target.result
      // Insert image with proper sizing
      const img = `<img src="${dataUrl}" style="max-width: 100%; height: auto;" />`
      executeCommand("insertHTML", img)
    }
    reader.readAsDataURL(file)
  }

  // Insert table
  const handleInsertTable = () => {
    const rows = prompt("Number of rows:", "2")
    const cols = prompt("Number of columns:", "2")
    if (rows && cols) {
      let tableHTML = '<table border="1" style="border-collapse: collapse; width: 100%; margin: 10px 0;">'
      for (let i = 0; i < Number.parseInt(rows); i++) {
        tableHTML += "<tr>"
        for (let j = 0; j < Number.parseInt(cols); j++) {
          tableHTML += '<td style="padding: 8px; border: 1px solid #000;">&nbsp;</td>'
        }
        tableHTML += "</tr>"
      }
      tableHTML += "</table><p><br></p>"
      executeCommand("insertHTML", tableHTML)
    }
  }

  // Insert hyperlink
  const handleInsertLink = () => {
    const url = prompt("Enter URL:", "https://")
    if (url) {
      executeCommand("createLink", url)
    }
  }

  // Insert page break
  const handleInsertPageBreak = () => {
    executeCommand(
      "insertHTML",
      '<div style="page-break-after: always; border-bottom: 1px dashed #ccc; margin: 20px 0;"></div>',
    )
  }

  // Find and replace
  const handleFind = () => {
    if (!findText) return
    window.find(findText)
  }

  const handleReplace = () => {
    if (!findText || !replaceText) return
    const currentEditor = editorRefs.current[currentPage]
    if (currentEditor) {
      const content = currentEditor.innerHTML
      const newContent = content.replace(new RegExp(findText, "g"), replaceText)
      currentEditor.innerHTML = newContent
      handleContentChange(currentPage, newContent)
    }
  }

  // Zoom controls
  const handleZoomIn = () => zoom < 200 && setZoom(zoom + 10)
  const handleZoomOut = () => zoom > 50 && setZoom(zoom - 10)
  const handleZoomReset = () => setZoom(100)

  // Add new page - FIXED to show below
  const addNewPage = () => {
    const newPage = { id: pages.length + 1, content: "" }
    setPages([...pages, newPage])
    setCurrentPage(pages.length)
  }

  // Switch page
  const switchPage = (pageIndex) => {
    setCurrentPage(pageIndex)
    setTimeout(() => {
      if (editorRefs.current[pageIndex]) {
        editorRefs.current[pageIndex].scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }, 100)
  }

  // Handle content change - FIXED
  const handleContentChange = (index, html) => {
    const newPages = [...pages]
    newPages[index].content = html
    setPages(newPages)
  }

  // Delete page
  const deletePage = (index) => {
    if (pages.length === 1) {
      alert("Cannot delete the last page")
      return
    }
    const newPages = pages.filter((_, i) => i !== index)
    setPages(newPages)
    if (currentPage >= newPages.length) {
      setCurrentPage(newPages.length - 1)
    }
  }

  return (
    <div className="tulip-leopard-wrapper">
      {/* Header */}
      <header className="rose-tiger-header">
        <div className="daisy-wolf-left">
          <div className="lily-bear-logo">
            <FileText className="sunflower-fox-icon" />
            <span className="jasmine-deer-brand">JetPTech</span>
          </div>
          <div className="violet-rabbit-tabs">
            <button className="peony-mouse-tab peony-mouse-tab-active">Edit</button>
          </div>
        </div>

        <div className="poppy-squirrel-center">
          <input
            type="text"
            value={fileName}
            onChange={(e) => {
              setFileName(e.target.value)
              localStorage.setItem("orchid_elephant_filename", e.target.value)
            }}
            className="marigold-raccoon-filename"
          />
          <span className="iris-koala-modified">Modified {new Date().toLocaleDateString()}</span>
        </div>

        <div className="dahlia-panda-right">
          <button className="carnation-lion-btn" onClick={() => fileInputRef.current?.click()}>
            <Upload className="lavender-owl-icon" />
            Upload
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".html,.txt,.doc,.docx"
            onChange={handleFileUpload}
            className="hydrangea-hawk-hidden"
          />
          <button className="azalea-eagle-save" onClick={handleExportDOC}>
            <Download className="lavender-owl-icon" />
            Download DOC
          </button>
        </div>

        {/* Mobile Menu */}
        <button className="bluebell-kangaroo-mobile" onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}>
          <Menu />
        </button>
      </header>

      {/* Toolbar */}
      <div className="primrose-giraffe-toolbar">
        <div className="daffodil-rhino-tools">
          <button className="gardenia-beaver-tool" onClick={() => executeCommand("undo")} title="Undo">
            <RotateCcw className="aster-otter-icon" />
            <span className="zinnia-lynx-label">Undo</span>
          </button>
          <button className="gardenia-beaver-tool" onClick={() => executeCommand("redo")} title="Redo">
            <RotateCcw className="aster-otter-icon" style={{ transform: "scaleX(-1)" }} />
            <span className="zinnia-lynx-label">Redo</span>
          </button>

          <div className="begonia-seal-divider" />

          <button className="gardenia-beaver-tool gardenia-beaver-tool-active" title="Text">
            <Type className="aster-otter-icon" />
            <span className="zinnia-lynx-label">Text</span>
          </button>

          <button className="gardenia-beaver-tool" onClick={() => imageInputRef.current?.click()} title="Image">
            <ImageIcon className="aster-otter-icon" />
            <span className="zinnia-lynx-label">Image</span>
          </button>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleInsertLocalImage}
            className="hydrangea-hawk-hidden"
          />

          <button className="gardenia-beaver-tool" onClick={handleInsertTable} title="Table">
            <Table className="aster-otter-icon" />
            <span className="zinnia-lynx-label">Table</span>
          </button>

          <button className="gardenia-beaver-tool" onClick={handleInsertLink} title="Insert Link">
            <LinkIcon className="aster-otter-icon" />
            <span className="zinnia-lynx-label">Link</span>
          </button>

          <button className="gardenia-beaver-tool" onClick={handleInsertPageBreak} title="Page Break">
            <Minus className="aster-otter-icon" />
            <span className="zinnia-lynx-label">Break</span>
          </button>

          <button
            className="gardenia-beaver-tool"
            onClick={() => setShowFindReplace(!showFindReplace)}
            title="Find & Replace"
          >
            <Search className="aster-otter-icon" />
            <span className="zinnia-lynx-label">Find</span>
          </button>

          <button className="gardenia-beaver-tool" onClick={() => executeCommand("superscript")} title="Superscript">
            <Superscript className="aster-otter-icon" />
          </button>

          <button className="gardenia-beaver-tool" onClick={() => executeCommand("subscript")} title="Subscript">
            <Subscript className="aster-otter-icon" />
          </button>

          <div className="begonia-seal-divider" />

          <button className="gardenia-beaver-tool" onClick={handleZoomOut} title="Zoom Out">
            <ZoomOut className="aster-otter-icon" />
          </button>

          <span className="freesia-moose-zoom">{zoom}%</span>

          <button className="gardenia-beaver-tool" onClick={handleZoomIn} title="Zoom In">
            <ZoomIn className="aster-otter-icon" />
          </button>

          <button className="gardenia-beaver-tool" onClick={addNewPage} title="Add Page">
            <Plus className="aster-otter-icon" />
            <span className="zinnia-lynx-label">Page</span>
          </button>
        </div>
      </div>

      {/* Find & Replace Panel */}
      {showFindReplace && (
        <div className="find-replace-panel">
          <input
            type="text"
            placeholder="Find..."
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
            className="find-input"
          />
          <input
            type="text"
            placeholder="Replace with..."
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
            className="find-input"
          />
          <button onClick={handleFind} className="find-btn">
            Find
          </button>
          <button onClick={handleReplace} className="find-btn">
            Replace All
          </button>
          <button onClick={() => setShowFindReplace(false)} className="find-btn-close">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="hibiscus-dolphin-main">
        {/* Left Pages Sidebar - FIXED with thumbnails */}
        <div className="lotus-penguin-left">
          <div className="pages-sidebar-header">Pages</div>
          <div className="mimosa-swan-tools">
            {pages.map((page, index) => (
              <div
                key={page.id}
                className={`page-thumbnail ${currentPage === index ? "active" : ""}`}
                onClick={() => switchPage(index)}
              >
                <div className="page-thumbnail-content">
                  <div
                    className="page-mini-preview"
                    dangerouslySetInnerHTML={{ __html: page.content.substring(0, 100) + "..." }}
                  />
                </div>
                <div className="page-thumbnail-label">
                  <span>Page {index + 1}</span>
                  {pages.length > 1 && (
                    <button
                      className="delete-page-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        deletePage(index)
                      }}
                      title="Delete Page"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editor Area - FIXED: Shows all pages vertically */}
        <div className="snapdragon-bison-editor">
          <div className="amaryllis-puma-canvas" style={{ transform: `scale(${zoom / 100})` }}>
            {pages.map((page, index) => (
              <div
                key={page.id}
                ref={(el) => (editorRefs.current[index] = el)}
                contentEditable
                suppressContentEditableWarning
                className={`cherry-cobra-page ${currentPage === index ? "active-page" : ""}`}
                dangerouslySetInnerHTML={{ __html: page.content }}
                onInput={(e) => handleContentChange(index, e.currentTarget.innerHTML)}
                onClick={() => setCurrentPage(index)}
                style={{
                  fontFamily: selectedFont,
                  fontSize: `${selectedSize}px`,
                  color: textColor,
                  backgroundColor: bgColor,
                  direction: "ltr",
                  textAlign: "left",
                  unicodeBidi: "normal",
                  lineHeight: lineSpacing,
                }}
              />
            ))}
          </div>

          {/* Bottom Controls */}
          {/* <div className="magnolia-jaguar-bottom">
            <button
              className="buttercup-walrus-page-btn"
              onClick={() => switchPage(currentPage > 0 ? currentPage - 1 : 0)}
              disabled={currentPage === 0}
            >
              <ChevronDown style={{ transform: "rotate(90deg)" }} />
            </button>
            <span className="jasmine-meerkat-page">
              {currentPage + 1} / {pages.length}
            </span>
            <button
              className="buttercup-walrus-page-btn"
              onClick={() => switchPage(currentPage < pages.length - 1 ? currentPage + 1 : pages.length - 1)}
              disabled={currentPage === pages.length - 1}
            >
              <ChevronDown style={{ transform: "rotate(-90deg)" }} />
            </button>
            <button className="gardenia-crocodile-fit" onClick={handleZoomReset}>
              Fit
            </button>
          </div> */}
        </div>

        {/* Right Sidebar */}
        <aside
          ref={sidebarRef}
          className={`honeysuckle-flamingo-sidebar ${isMobileSidebarOpen ? "honeysuckle-flamingo-sidebar-open" : ""}`}
        >
          <button className="mobile-close-btn" onClick={() => setIsMobileSidebarOpen(false)}>
            <X />
          </button>
          <div className="larkspur-platypus-options">
            <h3 className="petunia-armadillo-title">Text Options</h3>

            <div className="crocus-badger-section">
              <label className="verbena-wombat-label">Turn into</label>
              <select
                className="geranium-hedgehog-select"
                onChange={(e) => executeCommand("formatBlock", e.target.value)}
              >
                <option value="p">Normal text</option>
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
                <option value="h4">Heading 4</option>
                <option value="h5">Heading 5</option>
                <option value="h6">Heading 6</option>
              </select>
            </div>

            <div className="crocus-badger-section">
              <label className="verbena-wombat-label">Font & Size</label>
              <div className="forsythia-mongoose-row">
                <select
                  className="geranium-hedgehog-select"
                  value={selectedFont}
                  onChange={(e) => {
                    setSelectedFont(e.target.value)
                    executeCommand("fontName", e.target.value)
                  }}
                >
                  <option>Arial</option>
                  <option>Times New Roman</option>
                  <option>Courier New</option>
                  <option>Georgia</option>
                  <option>Verdana</option>
                  <option>Comic Sans MS</option>
                  <option>Calibri</option>
                  <option>Helvetica</option>
                  <option>Tahoma</option>
                  <option>Impact</option>
                </select>
                <select
                  className="geranium-hedgehog-select geranium-hedgehog-select-small"
                  value={selectedSize}
                  onChange={(e) => {
                    setSelectedSize(e.target.value)
                    executeCommand("fontSize", "7")
                  }}
                >
                  <option>8</option>
                  <option>10</option>
                  <option>12</option>
                  <option>14</option>
                  <option>16</option>
                  <option>18</option>
                  <option>20</option>
                  <option>24</option>
                  <option>28</option>
                  <option>32</option>
                  <option>36</option>
                  <option>48</option>
                  <option>72</option>
                </select>
              </div>
            </div>

            <div className="crocus-badger-section">
              <label className="verbena-wombat-label">Line Spacing</label>
              <select
                className="geranium-hedgehog-select"
                value={lineSpacing}
                onChange={(e) => setLineSpacing(e.target.value)}
              >
                <option value="1">Single</option>
                <option value="1.15">1.15</option>
                <option value="1.5">1.5</option>
                <option value="2">Double</option>
                <option value="2.5">2.5</option>
                <option value="3">Triple</option>
              </select>
            </div>

            <div className="crocus-badger-section">
              <label className="verbena-wombat-label">Decoration</label>
              <div className="columbine-wolverine-buttons">
                <button className="echinacea-lemur-format" onClick={() => executeCommand("bold")} title="Bold">
                  <Bold />
                </button>
                <button className="echinacea-lemur-format" onClick={() => executeCommand("italic")} title="Italic">
                  <Italic />
                </button>
                <button
                  className="echinacea-lemur-format"
                  onClick={() => executeCommand("underline")}
                  title="Underline"
                >
                  <Underline />
                </button>
                <button
                  className="echinacea-lemur-format"
                  onClick={() => executeCommand("strikethrough")}
                  title="Strikethrough"
                >
                  <Strikethrough />
                </button>
              </div>
            </div>

            <div className="crocus-badger-section">
              <label className="verbena-wombat-label">Color & Background</label>
              <div className="forsythia-mongoose-row">
                <div className="anemone-capybara-color">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => {
                      setTextColor(e.target.value)
                      executeCommand("foreColor", e.target.value)
                    }}
                    className="bluebell-narwhal-picker"
                  />
                  <Palette className="aster-otter-icon" />
                </div>
                <div className="anemone-capybara-color">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => {
                      setBgColor(e.target.value)
                      executeCommand("backColor", e.target.value)
                    }}
                    className="bluebell-narwhal-picker"
                  />
                  <Highlighter className="aster-otter-icon" />
                </div>
              </div>
            </div>

            <div className="crocus-badger-section">
              <label className="verbena-wombat-label">Alignment</label>
              <div className="columbine-wolverine-buttons">
                <button
                  className="echinacea-lemur-format"
                  onClick={() => executeCommand("justifyLeft")}
                  title="Align Left"
                >
                  <AlignLeft />
                </button>
                <button
                  className="echinacea-lemur-format"
                  onClick={() => executeCommand("justifyCenter")}
                  title="Align Center"
                >
                  <AlignCenter />
                </button>
                <button
                  className="echinacea-lemur-format"
                  onClick={() => executeCommand("justifyRight")}
                  title="Align Right"
                >
                  <AlignRight />
                </button>
                <button
                  className="echinacea-lemur-format"
                  onClick={() => executeCommand("justifyFull")}
                  title="Justify"
                >
                  <AlignJustify />
                </button>
              </div>
            </div>

            <div className="crocus-badger-section">
              <label className="verbena-wombat-label">Lists</label>
              <div className="forsythia-mongoose-row">
                <button
                  className="echinacea-lemur-format"
                  onClick={() => executeCommand("insertUnorderedList")}
                  title="Bullet List"
                >
                  <List />
                </button>
                <button
                  className="echinacea-lemur-format"
                  onClick={() => executeCommand("insertOrderedList")}
                  title="Numbered List"
                >
                  <ListOrdered />
                </button>
              </div>
            </div>

            <div className="crocus-badger-section">
              <label className="verbena-wombat-label">Indent</label>
              <div className="forsythia-mongoose-row">
                <button
                  className="echinacea-lemur-format"
                  onClick={() => executeCommand("outdent")}
                  title="Decrease Indent"
                >
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>←</span>
                </button>
                <button
                  className="echinacea-lemur-format"
                  onClick={() => executeCommand("indent")}
                  title="Increase Indent"
                >
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>→</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
