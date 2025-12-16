export const generatePDF = async (resumeData) => {
  try {
    const html2pdf = (await import("html2pdf.js")).default

    const element = document.getElementById("resume-content")
    if (!element) {
      throw new Error("Resume content element not found")
    }

    const clonedElement = element.cloneNode(true)

    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `Resume_${resumeData.name.replace(/\s+/g, "_")}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        logging: false,
      },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait",
      },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    }

    await html2pdf().set(opt).from(clonedElement).save()
  } catch (error) {
    console.error("PDF generation failed:", error)
    throw error
  }
}

export const generateWord = async (resumeData) => {
  try {
    const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = await import("docx")
    const { saveAs } = await import("file-saver")

    const children = []

    children.push(
      new Paragraph({
        text: resumeData.name,
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
      }),
      new Paragraph({
        text: resumeData.title,
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
      }),
      new Paragraph({
        text: `${resumeData.email} | ${resumeData.phone}`,
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
      }),
    )

    if (resumeData.summary) {
      children.push(
        new Paragraph({
          text: "PROFESSIONAL SUMMARY",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
        new Paragraph({
          text: resumeData.summary,
          spacing: { after: 300 },
        }),
      )
    }

    if (resumeData.skills && resumeData.skills.length > 0) {
      children.push(
        new Paragraph({
          text: "TECHNICAL SKILLS",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        }),
      )

      resumeData.skills.forEach((skill) => {
        if (skill.category && skill.items) {
          children.push(
            new Paragraph({
              children: [new TextRun({ text: `${skill.category}: `, bold: true }), new TextRun({ text: skill.items })],
              spacing: { after: 100 },
            }),
          )
        }
      })
    }

    if (resumeData.experience && resumeData.experience.length > 0) {
      children.push(
        new Paragraph({
          text: "PROFESSIONAL EXPERIENCE & PROJECTS",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 100 },
        }),
      )

      resumeData.experience.forEach((exp) => {
        if (exp.title) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: exp.title, bold: true }),
                exp.type ? new TextRun({ text: ` | ${exp.type}` }) : new TextRun({ text: "" }),
              ],
              spacing: { after: 50 },
            }),
          )

          if (exp.duration) {
            children.push(
              new Paragraph({
                text: exp.duration,
                italic: true,
                spacing: { after: 100 },
              }),
            )
          }

          if (exp.details && exp.details.length > 0) {
            exp.details.forEach((detail) => {
              if (detail && detail.trim() !== "") {
                children.push(
                  new Paragraph({
                    text: `• ${detail}`,
                    spacing: { after: 50 },
                  }),
                )
              }
            })
          }

          if (exp.techStack) {
            children.push(
              new Paragraph({
                children: [new TextRun({ text: "Tech: ", bold: true }), new TextRun({ text: exp.techStack })],
                spacing: { after: 200 },
              }),
            )
          }
        }
      })
    }

    if (resumeData.education && resumeData.education.degree) {
      children.push(
        new Paragraph({
          text: "EDUCATION",
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 100 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: resumeData.education.degree, bold: true }),
            resumeData.education.school
              ? new TextRun({ text: ` — ${resumeData.education.school}` })
              : new TextRun({ text: "" }),
          ],
          spacing: { after: 50 },
        }),
      )

      if (resumeData.education.year) {
        children.push(
          new Paragraph({
            text: resumeData.education.year,
            spacing: { after: 200 },
          }),
        )
      }
    }

    children.push(
      new Paragraph({
        text: "DECLARATION",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 100 },
      }),
      new Paragraph({
        text: "I hereby declare that the information furnished above is true to the best of my knowledge.",
        spacing: { after: 100 },
      }),
      new Paragraph({
        children: [new TextRun({ text: resumeData.name, bold: true })],
        spacing: { after: 200 },
      }),
    )

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: children,
        },
      ],
    })

    const blob = await Packer.toBlob(doc)
    saveAs(blob, `Resume_${resumeData.name.replace(/\s+/g, "_")}.docx`)
  } catch (error) {
    console.error("Word generation failed:", error)
    throw error
  }
}
