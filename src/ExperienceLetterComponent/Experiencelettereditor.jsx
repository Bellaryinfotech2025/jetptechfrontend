import { useState } from "react"
import ExperienceLetter from "../ExperienceLetterComponent/Experinece"
import "../ExperienceLetterComponent/TemplateEditor.css"

const TemplateEditor = () => {
  const [formData, setFormData] = useState({
    // Company Details
    companyName: "Omex Technology Inc",
    companyWebsite: "www.omextechnologyinc.com",
    companyEmail: "contact@omextechnologyinc.com",
    companyPhone: "+1 650-660-0966",
    companyAddress: "2023 Ebony Dove st, Round Rock TX 78664",

    // Employee Details
    employeeName: "Mitt Jayswal",
    position: "Software Developer",
    startDate: "January 15, 2022",
    endDate: "December 20, 2024",
    employeeId: "EXP/2024/001",

    // Signatory Details
    signatoryName: "Mitt Jayswal",
    signatoryTitle: "Founder & CEO",

    // Experience Letter Content (Editable Paragraphs)
    openingStatement:
      "This is to certify that Mr. Khaja Moinaddin was employed with Omex Technology Inc as a Software Developer from January 15, 2022 to December 20, 2024.",

    performanceParagraph:
      "During his tenure with our organization, Mr.Khaja  demonstrated exceptional technical skills, professionalism, and dedication to his work. He was instrumental in developing and maintaining various software applications and contributed significantly to our technology initiatives.",

    skillsParagraph:
      "Mr. Khaja possesses strong analytical and problem-solving skills, excellent communication abilities, and a thorough understanding of software development lifecycle. He has consistently shown initiative, reliability, and the ability to work effectively both independently and as part of a team.",

    technicalParagraph:
      "His technical expertise includes proficiency in Java Spring Boot, React.js, database management, and modern development tools. The Billing Management System he led was successfully deployed and is currently serving thousands of users with high performance and reliability.",

    characterParagraph:
      "We found him to be honest, hardworking, and sincere in his approach, and we wish him all the best in his future endeavors.",

    recommendationParagraph:
      "We recommend him highly for any suitable position and are confident that he will be an asset to any organization he joins.",

    // Project Details
    mainProject: "Billing Management System",
    technologies: "Java Spring Boot, React.js",

    // Custom Responsibilities (editable list)
    responsibilities: [
      
    ],
  })

  const [showPreview, setShowPreview] = useState(true)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleResponsibilityChange = (index, value) => {
    const newResponsibilities = [...formData.responsibilities]
    newResponsibilities[index] = value
    setFormData((prev) => ({
      ...prev,
      responsibilities: newResponsibilities,
    }))
  }

  const addResponsibility = () => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: [...prev.responsibilities, ""],
    }))
  }

  const removeResponsibility = (index) => {
    const newResponsibilities = formData.responsibilities.filter((_, i) => i !== index)
    setFormData((prev) => ({
      ...prev,
      responsibilities: newResponsibilities,
    }))
  }

  const downloadPDF = async () => {
    setIsGeneratingPDF(true)

    try {
      // Import html2pdf dynamically
      const html2pdf = (await import("html2pdf.js")).default

      const element = document.getElementById("experience-letter-content")

      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `Experience_Letter_${formData.employeeName.replace(/\s+/g, "_")}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          width: 794, // A4 width in pixels at 96 DPI
          height: 1123, // A4 height in pixels at 96 DPI
        },
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait",
          compress: true,
        },
      }

      await html2pdf().set(opt).from(element).save()
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF. Please try again.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const exportTemplate = () => {
    const dataStr = JSON.stringify(formData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "experience-letter-template.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  const importTemplate = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result)
          setFormData(importedData)
        } catch (error) {
          alert("Invalid template file")
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="template-editor">
      <div className="editor-header">
        <div className="header-left">
          <h1>Experience Letter Template Editor Developed By Khaja Moinaddin</h1>
          <p className="header-subtitle">Create professional experience letters with ease</p>
        </div>
        <div className="header-buttons">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`modern-btn ${showPreview ? "btn-secondary" : "btn-primary"}`}
          >
            <span className="btn-icon">👁️</span>
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
          <button onClick={downloadPDF} className="modern-btn btn-success" disabled={isGeneratingPDF}>
            <span className="btn-icon">📄</span>
            {isGeneratingPDF ? "Generating..." : "Download PDF"}
          </button>
          <button onClick={exportTemplate} className="modern-btn btn-info">
            <span className="btn-icon">💾</span>
            Export Template
          </button>
          <label className="modern-btn btn-warning">
            <span className="btn-icon">📁</span>
            Import Template
            <input type="file" accept=".json" onChange={importTemplate} style={{ display: "none" }} />
          </label>
        </div>
      </div>

      <div className="editor-content">
        <div className="form-section">
          <div className="form-container">
            {/* Company Information */}
            <div className="form-card">
              <div className="card-header">
                <h3>🏢 Company Information</h3>
              </div>
              <div className="card-body">
                <div className="input-grid">
                  <div className="input-group">
                    <label>Company Name</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div className="input-group">
                    <label>Website</label>
                    <input
                      type="text"
                      value={formData.companyWebsite}
                      onChange={(e) => handleInputChange("companyWebsite", e.target.value)}
                      placeholder="www.company.com"
                    />
                  </div>
                  <div className="input-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={formData.companyEmail}
                      onChange={(e) => handleInputChange("companyEmail", e.target.value)}
                      placeholder="contact@company.com"
                    />
                  </div>
                  <div className="input-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      value={formData.companyPhone}
                      onChange={(e) => handleInputChange("companyPhone", e.target.value)}
                      placeholder="+1 650-660-0966"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label>Address</label>
                  <textarea
                    value={formData.companyAddress}
                    onChange={(e) => handleInputChange("companyAddress", e.target.value)}
                    rows="2"
                    placeholder="Enter company address"
                  />
                </div>
              </div>
            </div>

            {/* Employee Information */}
            <div className="form-card">
              <div className="card-header">
                <h3>👤 Employee Information</h3>
              </div>
              <div className="card-body">
                <div className="input-grid">
                  <div className="input-group">
                    <label>Employee Name</label>
                    <input
                      type="text"
                      value={formData.employeeName}
                      onChange={(e) => handleInputChange("employeeName", e.target.value)}
                      placeholder="Enter employee name"
                    />
                  </div>
                  <div className="input-group">
                    <label>Position</label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => handleInputChange("position", e.target.value)}
                      placeholder="Enter position"
                    />
                  </div>
                  <div className="input-group">
                    <label>Start Date</label>
                    <input
                      type="text"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                      placeholder="January 15, 2022"
                    />
                  </div>
                  <div className="input-group">
                    <label>End Date</label>
                    <input
                      type="text"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange("endDate", e.target.value)}
                      placeholder="December 20, 2024"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label>Reference Number</label>
                  <input
                    type="text"
                    value={formData.employeeId}
                    onChange={(e) => handleInputChange("employeeId", e.target.value)}
                    placeholder="EXP/2024/001"
                  />
                </div>
              </div>
            </div>

            {/* Experience Letter Content */}
            <div className="form-card">
              <div className="card-header">
                <h3>📝 Experience Letter Content</h3>
              </div>
              <div className="card-body">
                <div className="input-group">
                  <label>Opening Statement</label>
                  <textarea
                    value={formData.openingStatement}
                    onChange={(e) => handleInputChange("openingStatement", e.target.value)}
                    rows="2"
                    placeholder="This is to certify that..."
                  />
                </div>
                <div className="input-group">
                  <label>Performance Paragraph</label>
                  <textarea
                    value={formData.performanceParagraph}
                    onChange={(e) => handleInputChange("performanceParagraph", e.target.value)}
                    rows="3"
                    placeholder="During his tenure..."
                  />
                </div>
                <div className="input-group">
                  <label>Skills Paragraph</label>
                  <textarea
                    value={formData.skillsParagraph}
                    onChange={(e) => handleInputChange("skillsParagraph", e.target.value)}
                    rows="3"
                    placeholder="Employee possesses..."
                  />
                </div>
                <div className="input-group">
                  <label>Technical Expertise Paragraph</label>
                  <textarea
                    value={formData.technicalParagraph}
                    onChange={(e) => handleInputChange("technicalParagraph", e.target.value)}
                    rows="3"
                    placeholder="Technical expertise includes..."
                  />
                </div>
                <div className="input-group">
                  <label>Character Assessment Paragraph</label>
                  <textarea
                    value={formData.characterParagraph}
                    onChange={(e) => handleInputChange("characterParagraph", e.target.value)}
                    rows="2"
                    placeholder="We found him to be..."
                  />
                </div>
                <div className="input-group">
                  <label>Recommendation Paragraph</label>
                  <textarea
                    value={formData.recommendationParagraph}
                    onChange={(e) => handleInputChange("recommendationParagraph", e.target.value)}
                    rows="2"
                    placeholder="We recommend him highly..."
                  />
                </div>
              </div>
            </div>

            {/* Project Information */}
            <div className="form-card">
              <div className="card-header">
                <h3>🚀 Project Information</h3>
              </div>
              <div className="card-body">
                <div className="input-grid">
                  <div className="input-group">
                    <label>Main Project</label>
                    <input
                      type="text"
                      value={formData.mainProject}
                      onChange={(e) => handleInputChange("mainProject", e.target.value)}
                      placeholder="Billing Management System"
                    />
                  </div>
                  <div className="input-group">
                    <label>Technologies Used</label>
                    <input
                      type="text"
                      value={formData.technologies}
                      onChange={(e) => handleInputChange("technologies", e.target.value)}
                      placeholder="Java Spring Boot, React.js"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Responsibilities */}
            <div className="form-card">
              <div className="card-header">
                <h3>✅ Key Responsibilities & Achievements</h3>
              </div>
              <div className="card-body">
                {formData.responsibilities.map((responsibility, index) => (
                  <div key={index} className="responsibility-item">
                    <textarea
                      value={responsibility}
                      onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                      rows="2"
                      placeholder="Enter responsibility..."
                    />
                    <button
                      type="button"
                      onClick={() => removeResponsibility(index)}
                      className="remove-btn"
                      title="Remove responsibility"
                    >
                      ❌
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addResponsibility} className="add-btn">
                  ➕ Add Responsibility
                </button>
              </div>
            </div>

            {/* Signatory Information */}
            <div className="form-card">
              <div className="card-header">
                <h3>✍️ Signatory Information</h3>
              </div>
              <div className="card-body">
                <div className="input-grid">
                  <div className="input-group">
                    <label>Signatory Name</label>
                    <input
                      type="text"
                      value={formData.signatoryName}
                      onChange={(e) => handleInputChange("signatoryName", e.target.value)}
                      placeholder="Enter signatory name"
                    />
                  </div>
                  <div className="input-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={formData.signatoryTitle}
                      onChange={(e) => handleInputChange("signatoryTitle", e.target.value)}
                      placeholder="Founder & CEO"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showPreview && (
          <div className="preview-section">
            <div className="preview-header">
              <h3>📋 Live Preview</h3>
              <button onClick={downloadPDF} className="modern-btn btn-success btn-sm" disabled={isGeneratingPDF}>
                {isGeneratingPDF ? "⏳ Generating..." : "📄 Download PDF"}
              </button>
            </div>
            <ExperienceLetter formData={formData} />
          </div>
        )}
      </div>
    </div>
  )
}

export default TemplateEditor;
