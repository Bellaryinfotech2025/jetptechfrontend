import "../ExperienceLetterComponent/Ex.css"
// import logo from '../assets/omexlogo.jpg'

const ExperienceLetter = ({ formData }) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Use formData if provided, otherwise use default values
  const data = formData || {
    companyName: "Omex Technology Inc",
    companyWebsite: "www.omextechnologyinc.com",
    companyEmail: "contact@omextechnologyinc.com",
    companyPhone: "+1 650-660-0966",
    companyAddress: "2023 Ebony Dove st, Round Rock TX 78664",
    employeeName: "Khaja Moinaddin",
    position: "Software Developer",
    startDate: "January 15, 2022",
    endDate: "December 20, 2024",
    employeeId: "EXP/2024/001",
    signatoryName: "Mitt Jayswal",
    signatoryTitle: "Founder & CEO",
    openingStatement:
      "This is to certify that Mr. Khaja Moinaddin was employed with Omex Technology Inc as a Software Developer from January 15, 2022 to December 20, 2024.",
    performanceParagraph:
      "During his tenure with our organization, Mr. Moinaddin demonstrated exceptional technical skills, professionalism, and dedication to his work.",
    skillsParagraph:
      "Mr. Moinaddin possesses strong analytical and problem-solving skills, excellent communication abilities, and a thorough understanding of software development lifecycle.",
    technicalParagraph:
      "His technical expertise includes proficiency in Java Spring Boot, React.js, database management, and modern development tools.",
    characterParagraph: "We found him to be honest, hardworking, and sincere in his approach.",
    recommendationParagraph:
      "We recommend him highly for any suitable position and are confident that he will be an asset to any organization he joins.",
    responsibilities: [],
  }

  return (
    <div id="experience-letter-content" className="pdf-container">
      <div className="container">
        <div className="letter-card">
          {/* Header */}
          <div className="header">
            <div className="header-content">
              <div className="logo-section">
                <img src="" alt="Company Logo" className="logo" />
                <div className="company-info">
                  <h1>{data.companyName}</h1>
                </div>
              </div>
              <div className="contact-info">
                <p>{data.companyWebsite}</p>
                <p>{data.companyEmail}</p>
                <p>{data.companyPhone}</p>
              </div>
            </div>
          </div>

          {/* Letter Content */}
          <div className="letter-body">
            <div className="background-logo"></div>

            {/* Date and Reference */}
            <div className="date-ref">
              <div className="date-info">
                <p>Date: {currentDate}</p>
                <p>Ref: {data.employeeId}</p>
              </div>
              <div>
                
              </div>
            </div>
<br/>
  <center><h2 className="certificate-title">EXPERIENCE CERTIFICATE</h2></center>
            
            <div className="separator"></div>
            <br/>
            <br/>

            {/* Letter Body */}
            <div className="content">
              <p className="greeting">Dear Khaja Moinaddin,</p>

              <p>{data.openingStatement}</p>

              <p>{data.performanceParagraph}</p>

              {data.responsibilities && data.responsibilities.length > 0 && (
                <div className="responsibilities">
                  <h3>Key Responsibilities & Achievements:</h3>
                  <ul>
                    {data.responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              )}

              <p>{data.skillsParagraph}</p>

              <p>{data.technicalParagraph}</p>

              <p>{data.characterParagraph}</p>

              <p>{data.recommendationParagraph}</p>
            </div>

            <div className="separator"></div>

            {/* Signature Section */}
            <div className="signature-section">
              <div className="verification-info">
                <p>For any verification, please contact:</p>
                <p>HR Department: {data.companyEmail}</p>
                <p>Phone: {data.companyPhone} Ext. 101</p>
              </div>

              <div className="signature-block">
                <div className="signature-space"></div>
                <div className="signature-line">
                  <p className="signature-name">{data.signatoryName}</p>
                  <p className="signature-title">{data.signatoryTitle}</p>
                  <p className="signature-title">{data.companyName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="footer">
            <div className="footer-offices">
              <div className="office-info">
                <strong>Corporate Office:</strong>
                <br />
                {data.companyAddress}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExperienceLetter;
