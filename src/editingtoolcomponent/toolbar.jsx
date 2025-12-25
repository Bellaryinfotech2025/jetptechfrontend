"use client"

import "../editingdesigncomponent/toolbar.css"

export default function Toolbar({
  isLoading,
  onRemoveBackground,
  onDownload,
  brushSize,
  onBrushSizeChange,
  bgColor,
  onBgColorChange,
  onReset,
  hasProcessed,
  onClearBackground,
}) {
  return (
    <div className="rebecca-new-toolbar">
      <button
        onClick={onRemoveBackground}
        disabled={isLoading}
        className="rebecca-new-button rebecca-new-button-primary"
      >
        {isLoading ? (
          <>
            <span className="rebecca-new-spinner"></span> Processing...
          </>
        ) : (
          "✨ Remove Background"
        )}
      </button>

      {hasProcessed && (
        <>
          <div className="rebecca-new-color-picker">
            <label>Background Color:</label>
            <div className="rebecca-new-color-options">
              <button
                onClick={() => onBgColorChange("transparent")}
                className={`rebecca-new-color-btn rebecca-new-color-transparent ${bgColor === "transparent" ? "rebecca-new-active" : ""}`}
                title="Transparent"
              >
                ✓
              </button>
              <input
                type="color"
                value={bgColor === "transparent" ? "#ffffff" : bgColor}
                onChange={(e) => onBgColorChange(e.target.value)}
                className="rebecca-new-color-input"
              />
              <button
                onClick={() => onBgColorChange("white")}
                className={`rebecca-new-color-btn rebecca-new-color-white ${bgColor === "white" ? "rebecca-new-active" : ""}`}
              >
                ⊙
              </button>
            </div>
          </div>

          <button onClick={onDownload} className="rebecca-new-button rebecca-new-button-success">
            📥 Download PNG
          </button>

          <button onClick={onClearBackground} className="rebecca-new-button rebecca-new-button-secondary">
            🔄 Clear
          </button>
        </>
      )}

      <button onClick={onReset} className="rebecca-new-button rebecca-new-button-danger">
        ← Start Over
      </button>
    </div>
  )
}
