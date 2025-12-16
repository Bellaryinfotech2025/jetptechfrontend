import "../designresumebuilderdesingcomponent/resumeeditordesign.css";
import "../designresumebuilderdesingcomponent/globas.css"

export default function ResumeEditor({ resumeData, onDataChange }) {
  const handleSkillChange = (index, field, value) => {
    const newSkills = [...resumeData.skills]
    newSkills[index][field] = value
    onDataChange("skills", newSkills)
  }

  const addSkill = () => {
    onDataChange("skills", [...resumeData.skills, { category: "", items: "" }])
  }

  const removeSkill = (index) => {
    const newSkills = resumeData.skills.filter((_, i) => i !== index)
    onDataChange("skills", newSkills)
  }

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...resumeData.experience]
    newExperience[index][field] = value
    onDataChange("experience", newExperience)
  }

  const handleExperienceDetailChange = (expIndex, detailIndex, value) => {
    const newExperience = [...resumeData.experience]
    newExperience[expIndex].details[detailIndex] = value
    onDataChange("experience", newExperience)
  }

  const addExperienceDetail = (expIndex) => {
    const newExperience = [...resumeData.experience]
    newExperience[expIndex].details.push("")
    onDataChange("experience", newExperience)
  }

  const removeExperienceDetail = (expIndex, detailIndex) => {
    const newExperience = [...resumeData.experience]
    newExperience[expIndex].details = newExperience[expIndex].details.filter((_, i) => i !== detailIndex)
    onDataChange("experience", newExperience)
  }

  const addExperience = () => {
    onDataChange("experience", [
      ...resumeData.experience,
      {
        title: "",
        type: "",
        duration: "",
        details: [""],
        techStack: "",
      },
    ])
  }

  const removeExperience = (index) => {
    const newExperience = resumeData.experience.filter((_, i) => i !== index)
    onDataChange("experience", newExperience)
  }

  const handleEducationChange = (field, value) => {
    onDataChange("education", {
      ...resumeData.education,
      [field]: value,
    })
  }

  const handleSoftSkillChange = (index, value) => {
    const newSoftSkills = [...resumeData.softSkills]
    newSoftSkills[index] = value
    onDataChange("softSkills", newSoftSkills)
  }

  const addSoftSkill = () => {
    onDataChange("softSkills", [...resumeData.softSkills, ""])
  }

  const removeSoftSkill = (index) => {
    const newSoftSkills = resumeData.softSkills.filter((_, i) => i !== index)
    onDataChange("softSkills", newSoftSkills)
  }

  return (
    <div className="orchid-editor">
      <div className="lotus-editor-sections">
        {/* Personal Information */}
        <div className="tiger-editor-card">
          <div className="phoenix-card-header">
            <h3>Personal Information</h3>
          </div>
          <div className="swan-card-body">
            <div className="eagle-input-group">
              <label>Full Name</label>
              <input
                type="text"
                value={resumeData.name}
                onChange={(e) => onDataChange("name", e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div className="eagle-input-group">
              <label>Professional Title</label>
              <input
                type="text"
                value={resumeData.title}
                onChange={(e) => onDataChange("title", e.target.value)}
                placeholder="e.g., Full Stack Developer"
              />
            </div>
            <div className="dolphin-input-grid">
              <div className="eagle-input-group">
                <label>Email</label>
                <input
                  type="email"
                  value={resumeData.email}
                  onChange={(e) => onDataChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="eagle-input-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={resumeData.phone}
                  onChange={(e) => onDataChange("phone", e.target.value)}
                  placeholder="+1 234 567 8900"
                />
              </div>
            </div>

            <div className="sparrow-checkbox-wrapper">
              <input
                type="checkbox"
                id="enableOptionalFields"
                checked={resumeData.showOptionalFields}
                onChange={(e) => onDataChange("showOptionalFields", e.target.checked)}
              />
              <label htmlFor="enableOptionalFields">Add Location & Social Links (Optional)</label>
            </div>

            {resumeData.showOptionalFields && (
              <div className="hawk-optional-section">
                <div className="dolphin-input-grid">
                  <div className="eagle-input-group">
                    <label>Location</label>
                    <input
                      type="text"
                      value={resumeData.location || ""}
                      onChange={(e) => onDataChange("location", e.target.value)}
                      placeholder="e.g., San Francisco, CA"
                    />
                  </div>
                  <div className="eagle-input-group">
                    <label>LinkedIn</label>
                    <input
                      type="url"
                      value={resumeData.linkedin || ""}
                      onChange={(e) => onDataChange("linkedin", e.target.value)}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  <div className="eagle-input-group">
                    <label>GitHub</label>
                    <input
                      type="url"
                      value={resumeData.github || ""}
                      onChange={(e) => onDataChange("github", e.target.value)}
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                  <div className="eagle-input-group">
                    <label>Portfolio</label>
                    <input
                      type="url"
                      value={resumeData.portfolio || ""}
                      onChange={(e) => onDataChange("portfolio", e.target.value)}
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        <div className="tiger-editor-card">
          <div className="phoenix-card-header">
            <h3>Professional Summary</h3>
          </div>
          <div className="swan-card-body">
            <div className="eagle-input-group">
              <label>Summary</label>
              <textarea
                value={resumeData.summary}
                onChange={(e) => onDataChange("summary", e.target.value)}
                rows="5"
                placeholder="Write a brief professional summary..."
              />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="tiger-editor-card">
          <div className="phoenix-card-header">
            <h3>Technical Skills</h3>
          </div>
          <div className="swan-card-body">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="panther-skill-item">
                <div className="dolphin-input-grid">
                  <div className="eagle-input-group">
                    <label>Category</label>
                    <input
                      type="text"
                      value={skill.category}
                      onChange={(e) => handleSkillChange(index, "category", e.target.value)}
                      placeholder="e.g., Frontend"
                    />
                  </div>
                  <div className="eagle-input-group lotus-full-width">
                    <label>Skills</label>
                    <input
                      type="text"
                      value={skill.items}
                      onChange={(e) => handleSkillChange(index, "items", e.target.value)}
                      placeholder="e.g., React, Angular, Vue.js"
                    />
                  </div>
                </div>
                <button onClick={() => removeSkill(index)} className="lotus-remove-btn" type="button">
                  Remove
                </button>
              </div>
            ))}
            <button onClick={addSkill} className="rose-add-btn" type="button">
              Add Skill Category
            </button>
          </div>
        </div>

        <div className="tiger-editor-card">
          <div className="phoenix-card-header">
            <h3>Soft Skills</h3>
          </div>
          <div className="swan-card-body">
            <div className="sparrow-checkbox-wrapper">
              <input
                type="checkbox"
                id="enableSoftSkills"
                checked={resumeData.showSoftSkills}
                onChange={(e) => onDataChange("showSoftSkills", e.target.checked)}
              />
              <label htmlFor="enableSoftSkills">Add Soft Skills (Optional)</label>
            </div>

            {resumeData.showSoftSkills && (
              <div className="hawk-optional-section">
                {resumeData.softSkills.map((skill, index) => (
                  <div key={index} className="jasmine-detail-item">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleSoftSkillChange(index, e.target.value)}
                      placeholder="e.g., Leadership, Communication"
                      className="eagle-input-group"
                      style={{
                        padding: "0.65rem 0.875rem",
                        border: "2px solid var(--tulip-border)",
                        borderRadius: "var(--hawk-radius)",
                      }}
                    />
                    <button onClick={() => removeSoftSkill(index)} className="tiger-remove-detail-btn" type="button">
                      Remove
                    </button>
                  </div>
                ))}
                <button onClick={addSoftSkill} className="rose-add-btn" type="button">
                  Add Soft Skill
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Experience */}
        <div className="tiger-editor-card">
          <div className="phoenix-card-header">
            <h3>Experience & Projects</h3>
          </div>
          <div className="swan-card-body">
            {resumeData.experience.map((exp, expIndex) => (
              <div key={expIndex} className="wolf-experience-item">
                <div className="dolphin-input-grid">
                  <div className="eagle-input-group">
                    <label>Project/Company Title</label>
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => handleExperienceChange(expIndex, "title", e.target.value)}
                      placeholder="e.g., E-commerce Platform"
                    />
                  </div>
                  <div className="eagle-input-group">
                    <label>Type</label>
                    <input
                      type="text"
                      value={exp.type}
                      onChange={(e) => handleExperienceChange(expIndex, "type", e.target.value)}
                      placeholder="e.g., Personal Project"
                    />
                  </div>
                  <div className="eagle-input-group">
                    <label>Duration</label>
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) => handleExperienceChange(expIndex, "duration", e.target.value)}
                      placeholder="e.g., 6 Months"
                    />
                  </div>
                </div>

                <div className="eagle-input-group">
                  <label>Key Achievements</label>
                  {exp.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="jasmine-detail-item">
                      <textarea
                        value={detail}
                        onChange={(e) => handleExperienceDetailChange(expIndex, detailIndex, e.target.value)}
                        rows="2"
                        placeholder="Describe your achievement..."
                      />
                      <button
                        onClick={() => removeExperienceDetail(expIndex, detailIndex)}
                        className="tiger-remove-detail-btn"
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button onClick={() => addExperienceDetail(expIndex)} className="orchid-add-detail-btn" type="button">
                    Add Achievement
                  </button>
                </div>

                <div className="eagle-input-group">
                  <label>Tech Stack</label>
                  <input
                    type="text"
                    value={exp.techStack}
                    onChange={(e) => handleExperienceChange(expIndex, "techStack", e.target.value)}
                    placeholder="e.g., React, Node.js, MongoDB"
                  />
                </div>

                <button onClick={() => removeExperience(expIndex)} className="lotus-remove-btn" type="button">
                  Remove Experience
                </button>
              </div>
            ))}
            <button onClick={addExperience} className="rose-add-btn" type="button">
              Add Experience/Project
            </button>
          </div>
        </div>

        {/* Education */}
        <div className="tiger-editor-card">
          <div className="phoenix-card-header">
            <h3>Education</h3>
          </div>
          <div className="swan-card-body">
            <div className="sparrow-checkbox-wrapper">
              <input
                type="checkbox"
                id="enableSchool"
                checked={resumeData.showSchool}
                onChange={(e) => onDataChange("showSchool", e.target.checked)}
              />
              <label htmlFor="enableSchool">Add School Education (Optional)</label>
            </div>

            {resumeData.showSchool && (
              <div className="hawk-optional-section">
                <div className="eagle-input-group">
                  <label>School Name</label>
                  <input
                    type="text"
                    value={resumeData.education.schoolName || ""}
                    onChange={(e) => handleEducationChange("schoolName", e.target.value)}
                    placeholder="e.g., St. Mary's High School"
                  />
                </div>
                <div className="dolphin-input-grid">
                  <div className="eagle-input-group">
                    <label>Board</label>
                    <input
                      type="text"
                      value={resumeData.education.schoolBoard || ""}
                      onChange={(e) => handleEducationChange("schoolBoard", e.target.value)}
                      placeholder="e.g., CBSE"
                    />
                  </div>
                  <div className="eagle-input-group">
                    <label>Year</label>
                    <input
                      type="text"
                      value={resumeData.education.schoolYear || ""}
                      onChange={(e) => handleEducationChange("schoolYear", e.target.value)}
                      placeholder="e.g., 2015"
                    />
                  </div>
                  <div className="eagle-input-group">
                    <label>Percentage/Grade</label>
                    <input
                      type="text"
                      value={resumeData.education.schoolGrade || ""}
                      onChange={(e) => handleEducationChange("schoolGrade", e.target.value)}
                      placeholder="e.g., 95%"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="sparrow-checkbox-wrapper">
              <input
                type="checkbox"
                id="enableIntermediate"
                checked={resumeData.showIntermediate}
                onChange={(e) => onDataChange("showIntermediate", e.target.checked)}
              />
              <label htmlFor="enableIntermediate">Add Intermediate/+2 Education (Optional)</label>
            </div>

            {resumeData.showIntermediate && (
              <div className="hawk-optional-section">
                <div className="eagle-input-group">
                  <label>College Name</label>
                  <input
                    type="text"
                    value={resumeData.education.intermediateName || ""}
                    onChange={(e) => handleEducationChange("intermediateName", e.target.value)}
                    placeholder="e.g., ABC Junior College"
                  />
                </div>
                <div className="dolphin-input-grid">
                  <div className="eagle-input-group">
                    <label>Board/Stream</label>
                    <input
                      type="text"
                      value={resumeData.education.intermediateBoard || ""}
                      onChange={(e) => handleEducationChange("intermediateBoard", e.target.value)}
                      placeholder="e.g., State Board - Science"
                    />
                  </div>
                  <div className="eagle-input-group">
                    <label>Year</label>
                    <input
                      type="text"
                      value={resumeData.education.intermediateYear || ""}
                      onChange={(e) => handleEducationChange("intermediateYear", e.target.value)}
                      placeholder="e.g., 2017"
                    />
                  </div>
                  <div className="eagle-input-group">
                    <label>Percentage/Grade</label>
                    <input
                      type="text"
                      value={resumeData.education.intermediateGrade || ""}
                      onChange={(e) => handleEducationChange("intermediateGrade", e.target.value)}
                      placeholder="e.g., 92%"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="eagle-input-group">
              <label>Degree</label>
              <input
                type="text"
                value={resumeData.education.degree}
                onChange={(e) => handleEducationChange("degree", e.target.value)}
                placeholder="e.g., Bachelor of Engineering"
              />
            </div>
            <div className="dolphin-input-grid">
              <div className="eagle-input-group">
                <label>School/University</label>
                <input
                  type="text"
                  value={resumeData.education.school}
                  onChange={(e) => handleEducationChange("school", e.target.value)}
                  placeholder="e.g., MIT"
                />
              </div>
              <div className="eagle-input-group">
                <label>Year</label>
                <input
                  type="text"
                  value={resumeData.education.year}
                  onChange={(e) => handleEducationChange("year", e.target.value)}
                  placeholder="e.g., 2015 – 2019"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="tiger-editor-card">
          <div className="phoenix-card-header">
            <h3>Academic Projects</h3>
          </div>
          <div className="swan-card-body">
            <div className="sparrow-checkbox-wrapper">
              <input
                type="checkbox"
                id="enableAcademicProjects"
                checked={resumeData.showAcademicProjects}
                onChange={(e) => onDataChange("showAcademicProjects", e.target.checked)}
              />
              <label htmlFor="enableAcademicProjects">Add Academic Projects (Optional)</label>
            </div>

            {resumeData.showAcademicProjects && (
              <div className="hawk-optional-section">
                {resumeData.academicProjects.map((project, index) => (
                  <div key={index} className="wolf-experience-item">
                    <div className="eagle-input-group">
                      <label>Project Title</label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => {
                          const newProjects = [...resumeData.academicProjects]
                          newProjects[index].title = e.target.value
                          onDataChange("academicProjects", newProjects)
                        }}
                        placeholder="e.g., Machine Learning Model for Prediction"
                      />
                    </div>
                    <div className="eagle-input-group">
                      <label>Description</label>
                      <textarea
                        value={project.description}
                        onChange={(e) => {
                          const newProjects = [...resumeData.academicProjects]
                          newProjects[index].description = e.target.value
                          onDataChange("academicProjects", newProjects)
                        }}
                        rows="3"
                        placeholder="Brief description of the project..."
                      />
                    </div>
                    <div className="eagle-input-group">
                      <label>Technologies Used</label>
                      <input
                        type="text"
                        value={project.technologies}
                        onChange={(e) => {
                          const newProjects = [...resumeData.academicProjects]
                          newProjects[index].technologies = e.target.value
                          onDataChange("academicProjects", newProjects)
                        }}
                        placeholder="e.g., Python, TensorFlow, Pandas"
                      />
                    </div>
                    <button
                      onClick={() => {
                        const newProjects = resumeData.academicProjects.filter((_, i) => i !== index)
                        onDataChange("academicProjects", newProjects)
                      }}
                      className="lotus-remove-btn"
                      type="button"
                    >
                      Remove Project
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    onDataChange("academicProjects", [
                      ...resumeData.academicProjects,
                      { title: "", description: "", technologies: "" },
                    ])
                  }}
                  className="rose-add-btn"
                  type="button"
                >
                  Add Academic Project
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="tiger-editor-card">
          <div className="phoenix-card-header">
            <h3>Certifications</h3>
          </div>
          <div className="swan-card-body">
            <div className="sparrow-checkbox-wrapper">
              <input
                type="checkbox"
                id="enableCertifications"
                checked={resumeData.showCertifications}
                onChange={(e) => onDataChange("showCertifications", e.target.checked)}
              />
              <label htmlFor="enableCertifications">Add Certifications (Optional)</label>
            </div>

            {resumeData.showCertifications && (
              <div className="hawk-optional-section">
                {resumeData.certifications.map((cert, index) => (
                  <div key={index} className="jasmine-detail-item">
                    <input
                      type="text"
                      value={cert}
                      onChange={(e) => {
                        const newCerts = [...resumeData.certifications]
                        newCerts[index] = e.target.value
                        onDataChange("certifications", newCerts)
                      }}
                      placeholder="e.g., AWS Certified Developer - Amazon (2023)"
                      style={{
                        padding: "0.65rem 0.875rem",
                        border: "2px solid var(--tulip-border)",
                        borderRadius: "var(--hawk-radius)",
                      }}
                    />
                    <button
                      onClick={() => {
                        const newCerts = resumeData.certifications.filter((_, i) => i !== index)
                        onDataChange("certifications", newCerts)
                      }}
                      className="tiger-remove-detail-btn"
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    onDataChange("certifications", [...resumeData.certifications, ""])
                  }}
                  className="rose-add-btn"
                  type="button"
                >
                  Add Certification
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="tiger-editor-card">
          <div className="phoenix-card-header">
            <h3>Achievements</h3>
          </div>
          <div className="swan-card-body">
            <div className="sparrow-checkbox-wrapper">
              <input
                type="checkbox"
                id="enableAchievements"
                checked={resumeData.showAchievements}
                onChange={(e) => onDataChange("showAchievements", e.target.checked)}
              />
              <label htmlFor="enableAchievements">Add Achievements (Optional)</label>
            </div>

            {resumeData.showAchievements && (
              <div className="hawk-optional-section">
                {resumeData.achievements.map((achievement, index) => (
                  <div key={index} className="jasmine-detail-item">
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => {
                        const newAchievements = [...resumeData.achievements]
                        newAchievements[index] = e.target.value
                        onDataChange("achievements", newAchievements)
                      }}
                      placeholder="e.g., Won First Prize in National Hackathon 2023"
                      style={{
                        padding: "0.65rem 0.875rem",
                        border: "2px solid var(--tulip-border)",
                        borderRadius: "var(--hawk-radius)",
                      }}
                    />
                    <button
                      onClick={() => {
                        const newAchievements = resumeData.achievements.filter((_, i) => i !== index)
                        onDataChange("achievements", newAchievements)
                      }}
                      className="tiger-remove-detail-btn"
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    onDataChange("achievements", [...resumeData.achievements, ""])
                  }}
                  className="rose-add-btn"
                  type="button"
                >
                  Add Achievement
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="tiger-editor-card">
          <div className="phoenix-card-header">
            <h3>Languages</h3>
          </div>
          <div className="swan-card-body">
            <div className="sparrow-checkbox-wrapper">
              <input
                type="checkbox"
                id="enableLanguages"
                checked={resumeData.showLanguages}
                onChange={(e) => onDataChange("showLanguages", e.target.checked)}
              />
              <label htmlFor="enableLanguages">Add Languages (Optional)</label>
            </div>

            {resumeData.showLanguages && (
              <div className="hawk-optional-section">
                {resumeData.languages.map((lang, index) => (
                  <div key={index} className="wolf-experience-item">
                    <div className="dolphin-input-grid">
                      <div className="eagle-input-group">
                        <label>Language</label>
                        <input
                          type="text"
                          value={lang.name}
                          onChange={(e) => {
                            const newLanguages = [...resumeData.languages]
                            newLanguages[index].name = e.target.value
                            onDataChange("languages", newLanguages)
                          }}
                          placeholder="e.g., English"
                        />
                      </div>
                      <div className="eagle-input-group">
                        <label>Proficiency</label>
                        <select
                          value={lang.proficiency}
                          onChange={(e) => {
                            const newLanguages = [...resumeData.languages]
                            newLanguages[index].proficiency = e.target.value
                            onDataChange("languages", newLanguages)
                          }}
                        >
                          <option value="">Select Level</option>
                          <option value="Native">Native</option>
                          <option value="Fluent">Fluent</option>
                          <option value="Professional">Professional</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Basic">Basic</option>
                        </select>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const newLanguages = resumeData.languages.filter((_, i) => i !== index)
                        onDataChange("languages", newLanguages)
                      }}
                      className="lotus-remove-btn"
                      type="button"
                    >
                      Remove Language
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    onDataChange("languages", [...resumeData.languages, { name: "", proficiency: "" }])
                  }}
                  className="rose-add-btn"
                  type="button"
                >
                  Add Language
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="tiger-editor-card">
          <div className="phoenix-card-header">
            <h3>Hobbies & Interests</h3>
          </div>
          <div className="swan-card-body">
            <div className="sparrow-checkbox-wrapper">
              <input
                type="checkbox"
                id="enableHobbies"
                checked={resumeData.showHobbies}
                onChange={(e) => onDataChange("showHobbies", e.target.checked)}
              />
              <label htmlFor="enableHobbies">Add Hobbies & Interests (Optional)</label>
            </div>

            {resumeData.showHobbies && (
              <div className="hawk-optional-section">
                <div className="eagle-input-group">
                  <label>Hobbies (comma separated)</label>
                  <input
                    type="text"
                    value={resumeData.hobbies}
                    onChange={(e) => onDataChange("hobbies", e.target.value)}
                    placeholder="e.g., Reading, Photography, Traveling, Coding"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
