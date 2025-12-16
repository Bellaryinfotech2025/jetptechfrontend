"use client"

import { useState } from "react"
import ResumeEditor from "../resumebuildingcomponent/resumeeditor"
import ResumePreview from "../resumebuildingcomponent/resumepreview"
import ResumeSelectorChoose from "../resumebuildingcomponent/resumechoose"
import { generatePDF, generateWord } from "../utilscomponent/utils"
import "../designresumebuilderdesingcomponent/resumebuilderdesign.css"
import "../designresumebuilderdesingcomponent/globas.css"

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState({
    name: "AKSHAR THAKKAR",
    title: "AI Solutions Architect | JAVA(Springboot) | Node.js • ReactJS • GenAI",
    email: "xxxxxxxxxx@gmail.com",
    phone: "+91 xxxxxxxxxx",
    showOptionalFields: false,
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    summary:
      "Full Stack Engineer with 7+ years of experience in building scalable web platforms using Angular, React, and Node.js. Skilled in designing microservice APIs, single-page applications, and real-time systems. Expert in modern AI/GenAI technologies including LangChain, OpenAI, RAG architectures, vector databases, and agent-based systems.",
    skills: [
      {
        category: "Frontend",
        items: "Angular (2–16), React.js, Next.js, Tailwind CSS, Bootstrap, Material UI, PrimeNG, Kendo UI",
      },
      {
        category: "Backend & APIs",
        items: "Node.js, Express.js, FastAPI, Flask, Streamlit, PyMuPDF, REST/GraphQL, WebSockets, Socket.io",
      },
      { category: "Databases", items: "MongoDB, MySQL, Firebase, Redis, Supabase, PostgreSQL" },
      {
        category: "AI/GenAI Frameworks",
        items: "OpenAI (GPT-4, DALL·E, Whisper), LangChain, LangGraph, LlamaIndex, Hugging Face, Replicate",
      },
    ],
    showSoftSkills: false,
    softSkills: [],
    experience: [
      {
        title: "Interior AI – GenAI Interior Design Platform",
        type: "Personal Project",
        duration: "3 Months",
        details: [
          "Built AI stylist: upload room photo → get modern/minimal/cozy style transformations",
          "Integrated Replicate + Fal.AI via FastAPI for image-to-image generation",
          "Secure file upload, cloud storage, download link generation",
        ],
        techStack: "Replicate, Fal.AI, FastAPI, React, Tailwind, Node.js, REST API",
      },
    ],
    education: {
      degree: "Bachelor of Engineering in Computer Science",
      school: "SVIT, Vasad (GTU)",
      year: "2011 – 2015",
      showSchool: false,
      schoolName: "",
      schoolBoard: "",
      schoolYear: "",
      schoolGrade: "",
      showIntermediate: false,
      intermediateName: "",
      intermediateBoard: "",
      intermediateYear: "",
      intermediateGrade: "",
    },
    showAcademicProjects: false,
    academicProjects: [],
    showCertifications: false,
    certifications: [],
    showAchievements: false,
    achievements: [],
    showLanguages: false,
    languages: [],
    showHobbies: false,
    hobbies: "",
  })

  const [isExporting, setIsExporting] = useState(false)
  const [showEditor, setShowEditor] = useState(true)
  const [showSelector, setShowSelector] = useState(false)

  const handleDataChange = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      await generatePDF(resumeData)
    } catch (error) {
      alert("Failed to generate PDF. Check console.")
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportWord = async () => {
    setIsExporting(true)
    try {
      await generateWord(resumeData)
    } catch (error) {
      alert("Failed to generate Word document. Check console.")
    } finally {
      setIsExporting(false)
    }
  }

  const handleTemplateSelect = (templateData) => {
    setResumeData(templateData)
    setShowSelector(false)
    setShowEditor(true)
  }

  return (
    <div className="phoenix-wrapper">
      <header
        className="eagle-header"
        style={{ background: "linear-gradient(135deg, #1f2937, #111827)", color: "#fff", padding: "16px 24px" }}
      >
        <div className="dolphin-header-content">
          <div className="lotus-header-left">
            <h1 className="orchid-header-title">Resume Builder</h1>
            <p className="jasmine-header-subtitle">Create your professional resume and get ready for Interview</p>
          </div>
          <div className="tiger-header-actions">
            <button
              onClick={() => setShowEditor(!showEditor)}
              className="hawk-btn dolphin-btn-secondary wolf-mobile-toggle"
            >
              {showEditor ? "Preview Only" : "Edit"}
            </button>
            <button
              className="hawk-btn panther-btn-primary-new"
              disabled={isExporting}
              onClick={() => setShowSelector(true)}
            >
              Choose Resume
            </button>
            <button onClick={handleExportPDF} className="hawk-btn panther-btn-primary" disabled={isExporting}>
              {isExporting ? "Generating..." : "Download PDF"}
            </button>
            <button onClick={handleExportWord} className="hawk-btn orchid-btn-success" disabled={isExporting}>
              {isExporting ? "Generating..." : "Download Word"}
            </button>
          </div>
        </div>
      </header>

      <div className="swan-builder-content">
        <div className={`lily-editor-panel ${showEditor ? "show" : "iris-hide"}`}>
          <ResumeEditor resumeData={resumeData} onDataChange={handleDataChange} />
        </div>
        <div className={`rose-preview-panel ${!showEditor ? "jasmine-show-mobile" : ""}`}>
          <div className="tulip-preview-header">
            <h3>Live Preview</h3>
          </div>
          <ResumePreview resumeData={resumeData} />
        </div>
      </div>

      {showSelector && (
        <ResumeSelectorChoose onSelectTemplate={handleTemplateSelect} onClose={() => setShowSelector(false)} />
      )}
    </div>
  )
}
