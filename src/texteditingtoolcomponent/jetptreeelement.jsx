"use client"
import { useRef, useState, useEffect } from "react"
import { Trash2 } from "lucide-react"

export default function TextElement({ element, isSelected, onSelect, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(element.text)
  const [isDragging, setIsDragging] = useState(false)
  const [dragHandle, setDragHandle] = useState(null)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)
  const elementRef = useRef(null)
  const textInputRef = useRef(null)

  useEffect(() => {
    if (isEditing && textInputRef.current) {
      textInputRef.current.focus()
      textInputRef.current.select()
    }
  }, [isEditing])

  const handleMouseDownForMove = (e) => {
    if (isEditing) return
    e.preventDefault()
    e.stopPropagation()
    setIsMoving(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseDown = (e, handle) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    setDragHandle(handle)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    if (!isDragging && !isMoving) return

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - dragStart.x
      const deltaY = e.clientY - dragStart.y

      if (isMoving) {
        onUpdate({
          x: element.x + deltaX,
          y: element.y + deltaY,
        })
        setDragStart({ x: e.clientX, y: e.clientY })
      } else if (isDragging && dragHandle) {
        const delta = Math.max(deltaX, deltaY)
        if (delta !== 0) {
          let newFontSize = element.fontSize + delta * 0.5
          newFontSize = Math.max(12, Math.min(120, newFontSize))
          onUpdate({ fontSize: newFontSize })
        }
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsMoving(false)
      setDragHandle(null)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, isMoving, dragStart, dragHandle, element, onUpdate])

  const handleDoubleClick = (e) => {
    e.stopPropagation()
    setIsEditing(true)
  }

  const handleTextChange = (e) => {
    setEditText(e.target.value)
  }

  const handleTextBlur = () => {
    onUpdate({ text: editText })
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleTextBlur()
    }
  }

  const handleBgColorChange = (e) => {
    onUpdate({ backgroundColor: e.target.value })
  }

  const handleTextColorChange = (e) => {
    onUpdate({ color: e.target.value })
  }

  const getResizeCursor = (handle) => {
    const cursors = {
      tl: "nwse-resize",
      tr: "nesw-resize",
      bl: "nesw-resize",
      br: "nwse-resize",
    }
    return cursors[handle] || "default"
  }

  return (
    <div
      ref={elementRef}
      className={`jetptree-text-element ${isSelected ? "jetptree-text-element-selected" : ""}`}
      style={{
        left: `${element.x}px`,
        top: `${element.y}px`,
        position: "absolute",
        cursor: isMoving ? "grabbing" : "grab",
      }}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      onMouseDown={handleMouseDownForMove}
    >
      {isSelected && (
        <>
          {/* Resize Handles - Added resize corner handles */}
          {["tl", "tr", "bl", "br"].map((handle) => (
            <div
              key={handle}
              className={`jetptree-resize-handle jetptree-handle-${handle}`}
              onMouseDown={(e) => handleMouseDown(e, handle)}
              style={{ cursor: getResizeCursor(handle) }}
              title="Drag to resize"
            />
          ))}

          {/* Delete Button */}
          <button
            className="jetptree-delete-btn"
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            title="Delete element"
          >
            <Trash2 size={14} />
          </button>

          {/* Controls Panel - Added controls for text color and background */}
          {!isEditing && (
            <div className="jetptree-controls-panel">
              <label className="jetptree-control-group">
                <span className="jetptree-control-label">Font:</span>
                <input
                  type="number"
                  min="12"
                  max="120"
                  value={Math.round(element.fontSize)}
                  onChange={(e) => onUpdate({ fontSize: Number.parseInt(e.target.value) })}
                  className="jetptree-control-input"
                />
              </label>

              <label className="jetptree-control-group">
                <span className="jetptree-control-label">Text:</span>
                <input
                  type="color"
                  value={element.color}
                  onChange={handleTextColorChange}
                  className="jetptree-color-input"
                  title="Text Color"
                />
              </label>

              <label className="jetptree-control-group">
                <span className="jetptree-control-label">BG:</span>
                <input
                  type="color"
                  value={element.backgroundColor === "transparent" ? "#ffffff" : element.backgroundColor}
                  onChange={handleBgColorChange}
                  className="jetptree-color-input"
                  title="Background Color"
                />
              </label>
            </div>
          )}
        </>
      )}

      {isEditing ? (
        <textarea
          ref={textInputRef}
          value={editText}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          onKeyDown={handleKeyDown}
          className="jetptree-text-input"
          style={{
            fontSize: `${element.fontSize}px`,
            color: element.color,
            backgroundColor: element.backgroundColor,
            fontFamily: element.fontFamily,
            fontWeight: element.fontWeight,
            width: "100%",
            minWidth: "200px",
            padding: "8px",
          }}
        />
      ) : (
        <div
          className="jetptree-text-content"
          style={{
            fontSize: `${element.fontSize}px`,
            color: element.color,
            backgroundColor: element.backgroundColor,
            fontFamily: element.fontFamily,
            fontWeight: element.fontWeight,
            padding: element.backgroundColor !== "transparent" ? "8px" : "0",
            wordWrap: "break-word",
            whiteSpace: "pre-wrap",
            cursor: "text",
            minHeight: `${element.fontSize * 1.5}px`,
            borderRadius: "4px",
          }}
          onDoubleClick={handleDoubleClick}
        >
          {element.text}
        </div>
      )}
    </div>
  )
}
