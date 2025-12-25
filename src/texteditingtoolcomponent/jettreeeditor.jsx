"use client"
import { useState } from "react"
import PixVerseSidebar from "../texteditingtoolcomponent/jetptreesidebar"
import PixVerseCanvas from "../texteditingtoolcomponent/jetedittext"
import "../texteditingtoolcomponent/designjetptreeediting.css"

export default function PixVerseEditor() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [textElements, setTextElements] = useState([])
  const [selectedElementId, setSelectedElementId] = useState(null)
  const [backgroundImage, setBackgroundImage] = useState(null)

  const addTextElement = () => {
    const newElement = {
      id: Date.now(),
      text: "Click to edit text",
      x: 100,
      y: 100,
      fontSize: 24,
      fontFamily: "Arial",
      color: "#000000",
      backgroundColor: "transparent",
      fontWeight: "normal",
      width: 300,
      height: 50,
    }
    setTextElements([...textElements, newElement])
    setSelectedElementId(newElement.id)
  }

  const updateTextElement = (id, updates) => {
    setTextElements(textElements.map((el) => (el.id === id ? { ...el, ...updates } : el)))
  }

  const deleteTextElement = (id) => {
    setTextElements(textElements.filter((el) => el.id !== id))
    if (selectedElementId === id) {
      setSelectedElementId(null)
    }
  }

  const handleMediaUpload = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setBackgroundImage(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  const downloadCanvas = () => {
    const canvas = document.getElementById("jetptree-canvas")
    if (canvas) {
      const link = document.createElement("a")
      link.href = canvas.toDataURL("image/png")
      link.download = "pixverse-creation.png"
      link.click()
    }
  }

  return (
    <div className="jetptree-editor-root">
      <PixVerseSidebar
        onAddText={addTextElement}
        onMediaUpload={handleMediaUpload}
        onDownload={downloadCanvas}
        onOpenChange={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />
      <PixVerseCanvas
        textElements={textElements}
        selectedElementId={selectedElementId}
        onSelectElement={setSelectedElementId}
        onUpdateElement={updateTextElement}
        onDeleteElement={deleteTextElement}
        closeSidebar={() => setSidebarOpen(false)}
        backgroundImage={backgroundImage}
      />
    </div>
  )
}
