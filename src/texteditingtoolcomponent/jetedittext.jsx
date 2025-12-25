"use client"
import { useRef } from "react"
import TextElement from "../texteditingtoolcomponent/jetptreeelement"

export default function PixVerseCanvas({
  textElements,
  selectedElementId,
  onSelectElement,
  onUpdateElement,
  onDeleteElement,
  closeSidebar,
  backgroundImage,
}) {
  const canvasRef = useRef(null)

  const handleCanvasClick = (e) => {
    if (e.target === canvasRef.current) {
      onSelectElement(null)
    }
    closeSidebar()
  }

  return (
    <div className="jetptree-canvas-wrapper">
      <div className="jetptree-canvas-header">
         
        <div className="jetptree-canvas-info">
           
        </div>
      </div>

      <div className="jetptree-canvas-container" ref={canvasRef} onClick={handleCanvasClick}>
        <svg className="jetptree-canvas-grid" />

        <div
          className="jetptree-canvas-content"
          style={{
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {textElements.map((element) => (
            <TextElement
              key={element.id}
              element={element}
              isSelected={selectedElementId === element.id}
              onSelect={() => onSelectElement(element.id)}
              onUpdate={(updates) => onUpdateElement(element.id, updates)}
              onDelete={() => onDeleteElement(element.id)}
            />
          ))}
        </div>
      </div>

      <div className="jetptree-canvas-footer">
        <p className="jetptree-footer-hint">
          Click to select • Drag to move • Resize via handles • Double-click to edit
        </p>
      </div>
    </div>
  )
}
