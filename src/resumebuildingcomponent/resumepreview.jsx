import "../designresumebuilderdesingcomponent/resumepreview.css";
import "../designresumebuilderdesingcomponent/globas.css";

export default function ResumePreview({ resumeData }) {
  return (
    <div className="panther-preview-container">
      <div id="resume-content" className="wolf-resume-container">
        <header className="eagle-header">
          <h1 className="phoenix-name">{resumeData.name}</h1>
          <p className="orchid-title">{resumeData.title}</p>
          <div className="lotus-contact-info">
            <span>{resumeData.email}</span>
            <span>|</span>
            <span>{resumeData.phone}</span>
            {resumeData.showOptionalFields && resumeData.location && (
              <>
                <span>|</span>
                <span>{resumeData.location}</span>
              </>
            )}
          </div>
          {resumeData.showOptionalFields && (resumeData.linkedin || resumeData.github || resumeData.portfolio) && (
            <div className="lotus-contact-info" style={{ marginTop: "8px" }}>
              {resumeData.linkedin && <span>{resumeData.linkedin}</span>}
              {resumeData.linkedin && (resumeData.github || resumeData.portfolio) && <span>|</span>}
              {resumeData.github && <span>{resumeData.github}</span>}
              {resumeData.github && resumeData.portfolio && <span>|</span>}
              {resumeData.portfolio && <span>{resumeData.portfolio}</span>}
            </div>
          )}
        </header>

        <div className="resume-main-content">
          {resumeData.summary && (
            <section className="resume-section">
              <h2 className="tiger-section-title">Professional Summary</h2>
              <p className="dolphin-summary">{resumeData.summary}</p>
            </section>
          )}

          {resumeData.skills.length > 0 && (
            <section className="resume-section">
              <h2 className="tiger-section-title">Technical Skills</h2>
              <table className="swan-skills-table">
                <tbody>
                  {resumeData.skills.map((skill, index) =>
                    skill.category && skill.items ? (
                      <tr key={index}>
                        <td className="skills-category">{skill.category}</td>
                        <td className="skills-items">{skill.items}</td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            </section>
          )}

          {resumeData.showSoftSkills && resumeData.softSkills?.length > 0 && resumeData.softSkills.some(s => s) && (
            <section className="resume-section">
              <h2 className="tiger-section-title">Soft Skills</h2>
              <p className="dolphin-summary">{resumeData.softSkills.filter(s => s).join(" • ")}</p>
            </section>
          )}

          {resumeData.experience.length > 0 && (
            <section className="resume-section">
              <h2 className="tiger-section-title">Professional Experience & Projects</h2>
              {resumeData.experience.map((exp, index) =>
                exp.title ? (
                  <div key={index} className="jasmine-project">
                    <div className="rose-project-header">
                      <div className="project-left">
                        <span className="orchid-project-title">{exp.title}</span>
                        {exp.type && <span className="lily-project-type"> | {exp.type}</span>}
                      </div>
                      <div className="project-right">
                        {exp.duration && <span className="tulip-project-duration">{exp.duration}</span>}
                      </div>
                    </div>
                    {exp.details.length > 0 && exp.details.some(d => d) && (
                      <ul className="hawk-project-details">
                        {exp.details.map((detail, i) => detail && <li key={i}>{detail}</li>)}
                      </ul>
                    )}
                    {exp.techStack && (
                      <p className="sparrow-tech-stack">
                        <strong>Tech:</strong> {exp.techStack}
                      </p>
                    )}
                  </div>
                ) : null
              )}
            </section>
          )}

          {resumeData.showAcademicProjects && resumeData.academicProjects?.length > 0 && resumeData.academicProjects.some(p => p.title) && (
            <section className="resume-section">
              <h2 className="tiger-section-title">Academic Projects</h2>
              {resumeData.academicProjects.map((project, index) =>
                project.title ? (
                  <div key={index} className="jasmine-project">
                    <div className="rose-project-header">
                      <span className="orchid-project-title">{project.title}</span>
                    </div>
                    {project.description && <p className="dolphin-summary">{project.description}</p>}
                    {project.technologies && (
                      <p className="sparrow-tech-stack">
                        <strong>Technologies:</strong> {project.technologies}
                      </p>
                    )}
                  </div>
                ) : null
              )}
            </section>
          )}

          {resumeData.showCertifications && resumeData.certifications?.length > 0 && resumeData.certifications.some(c => c) && (
            <section className="resume-section">
              <h2 className="tiger-section-title">Certifications</h2>
              <ul className="hawk-project-details">
                {resumeData.certifications.map((cert, i) => cert && <li key={i}>{cert}</li>)}
              </ul>
            </section>
          )}

          {resumeData.showAchievements && resumeData.achievements?.length > 0 && resumeData.achievements.some(a => a) && (
            <section className="resume-section">
              <h2 className="tiger-section-title">Achievements</h2>
              <ul className="hawk-project-details">
                {resumeData.achievements.map((ach, i) => ach && <li key={i}>{ach}</li>)}
              </ul>
            </section>
          )}

          {resumeData.showLanguages && resumeData.languages?.length > 0 && resumeData.languages.some(l => l.name) && (
            <section className="resume-section">
              <h2 className="tiger-section-title">Languages</h2>
              <table className="swan-skills-table">
                <tbody>
                  {resumeData.languages.map((lang, i) =>
                    lang.name ? (
                      <tr key={i}>
                        <td>{lang.name}</td>
                        <td>{lang.proficiency}</td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            </section>
          )}

          {resumeData.education.degree && (
            <section className="resume-section">
              <h2 className="tiger-section-title">Education</h2>

              {resumeData.showSchool && resumeData.education.schoolName && (
                <div className="iris-education-item">
                  <div className="education-left">
                    <span className="panther-education-degree">High School</span>
                    {resumeData.education.schoolName && <span className="wolf-education-school"> — {resumeData.education.schoolName}</span>}
                    {resumeData.education.schoolBoard && <span className="wolf-education-school"> ({resumeData.education.schoolBoard})</span>}
                  </div>
                  <div className="education-right">
                    {resumeData.education.schoolYear && <span className="eagle-education-year">{resumeData.education.schoolYear}</span>}
                    {resumeData.education.schoolGrade && <span className="eagle-education-year"> • {resumeData.education.schoolGrade}</span>}
                  </div>
                </div>
              )}

              {resumeData.showIntermediate && resumeData.education.intermediateName && (
                <div className="iris-education-item">
                  <div className="education-left">
                    <span className="panther-education-degree">Intermediate/+2</span>
                    {resumeData.education.intermediateName && <span className="wolf-education-school"> — {resumeData.education.intermediateName}</span>}
                    {resumeData.education.intermediateBoard && <span className="wolf-education-school"> ({resumeData.education.intermediateBoard})</span>}
                  </div>
                  <div className="education-right">
                    {resumeData.education.intermediateYear && <span className="eagle-education-year">{resumeData.education.intermediateYear}</span>}
                    {resumeData.education.intermediateGrade && <span className="eagle-education-year"> • {resumeData.education.intermediateGrade}</span>}
                  </div>
                </div>
              )}

              <div className="iris-education-item">
                <div className="education-left">
                  <span className="panther-education-degree">{resumeData.education.degree}</span>
                  {resumeData.education.school && <span className="wolf-education-school"> — {resumeData.education.school}</span>}
                </div>
                <div className="education-right">
                  {resumeData.education.year && <span className="eagle-education-year">{resumeData.education.year}</span>}
                </div>
              </div>
            </section>
          )}

          {resumeData.showHobbies && resumeData.hobbies && (
            <section className="resume-section">
              <h2 className="tiger-section-title">Hobbies & Interests</h2>
              <p className="dolphin-summary">{resumeData.hobbies}</p>
            </section>
          )}

          <div className="phoenix-declaration">
            <p>I hereby declare that the information furnished above is true to the best of my knowledge.</p>
            <p className="phoenix-declaration-signature">{resumeData.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}