"use client"
import { useState } from "react"
import { Menu, X, Plus, Download, Upload } from "lucide-react"

export default function PixVerseSidebar({ onAddText, onMediaUpload, onDownload, onOpenChange, sidebarOpen }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    onOpenChange(!isOpen)
  }

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      onMediaUpload(file)
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Mobile Hamburger */}
      <button className="jetptree-hamburger" onClick={toggleMenu}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`jetptree-sidebar ${isOpen ? "jetptree-sidebar-open" : ""}`}>
        <div className="jetptree-sidebar-header">
          <div className="jetptree-logo">
            <span className="jetptree-logo-icon">🎨</span>
            <span className="jetptree-logo-text">JetPTree</span>
          </div>
        </div>

        <div className="jetptree-sidebar-content">
          {/* Create Section */}
          <div className="jetptree-menu-section">
            <h3 className="jetptree-menu-title">Create</h3>
            <button
              className="jetptree-menu-item jetptree-add-text-btn"
              onClick={() => {
                onAddText()
                setIsOpen(false)
              }}
            >
              <Plus size={18} />
              Add Text
            </button>
          </div>

          {/* Media Section - Replaced static buttons with upload functionality */}
          <div className="jetptree-menu-section">
            <h3 className="jetptree-menu-title">Media</h3>
            <label className="jetptree-menu-item jetptree-upload-btn">
              <Upload size={18} />
              Upload Image/Video
              <input type="file" accept="image/*,video/*" onChange={handleFileUpload} className="jetptree-file-input" />
            </label>
          </div>

          {/* Export Section */}
          <div className="jetptree-menu-section">
            <h3 className="jetptree-menu-title">Export</h3>
            <button
              className="jetptree-menu-item jetptree-download-btn"
              onClick={() => {
                onDownload()
                setIsOpen(false)
              }}
            >
              <Download size={18} />
              Download
            </button>
          </div>
        </div>

        <div className="jetptree-sidebar-footer">
          <p className="jetptree-footer-text">JetPTree © 2025</p>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="jetptree-sidebar-overlay"
          onClick={() => {
            setIsOpen(false)
            onOpenChange(false)
          }}
        />
      )}
    </>
  )
}
