"use client"

import { useState } from "react"
import "../designresumebuilderdesingcomponent/resumeselector.css"

const ResumeSelectorChoose = ({ onSelectTemplate, onClose }) => {
  const [selectedId, setSelectedId] = useState(null)

  const resumeTemplates = [
    {
      id: 1,
      role: "Java Developer",
      data: {
        name: "RAHUL SHARMA",
        title: "Java Developer | Spring Boot • Microservices • REST API",
        email: "rahul.sharma@email.com",
        phone: "+91 98765 43210",
        showOptionalFields: false,
        location: "",
        linkedin: "",
        github: "",
        portfolio: "",
        summary:
          "Java Developer with 3+ years of experience in building enterprise applications using Spring Boot, Hibernate, and RESTful APIs. Proficient in microservices architecture, database design, and cloud deployment. Strong problem-solving skills with focus on clean code and best practices.",
        skills: [
          { category: "Languages", items: "Java, SQL, JavaScript" },
          { category: "Frameworks", items: "Spring Boot, Spring MVC, Hibernate, JPA" },
          { category: "Databases", items: "MySQL, PostgreSQL, MongoDB" },
          { category: "Tools", items: "Maven, Git, Jenkins, Docker, AWS" },
        ],
        showSoftSkills: false,
        softSkills: [],
        experience: [
          {
            title: "E-Commerce Platform Backend",
            type: "Company Project",
            duration: "8 Months",
            details: [
              "Developed RESTful APIs for product catalog, cart, and order management using Spring Boot",
              "Implemented JWT authentication and role-based access control",
              "Optimized database queries reducing response time by 40%",
            ],
            techStack: "Java, Spring Boot, MySQL, Redis, AWS EC2",
          },
          {
            title: "Payment Gateway Integration",
            type: "Team Project",
            duration: "4 Months",
            details: [
              "Integrated multiple payment gateways (Razorpay, PayPal) with error handling",
              "Built webhook listeners for payment status updates",
            ],
            techStack: "Java, Spring Boot, REST API, PostgreSQL",
          },
        ],
        education: {
          degree: "Bachelor of Technology in Computer Science",
          school: "IIT Delhi",
          year: "2018 – 2022",
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
      },
    },
    {
      id: 2,
      role: "Frontend Developer",
      data: {
        name: "PRIYA PATEL",
        title: "Frontend Developer | React.js • Next.js • TypeScript",
        email: "priya.patel@email.com",
        phone: "+91 87654 32109",
        showOptionalFields: false,
        location: "",
        linkedin: "",
        github: "",
        portfolio: "",
        summary:
          "Creative Frontend Developer with 2+ years of experience building responsive and user-friendly web applications. Expert in React.js, Next.js, and modern CSS frameworks. Passionate about creating intuitive user interfaces and optimizing performance for seamless user experiences.",
        skills: [
          { category: "Frontend", items: "React.js, Next.js, JavaScript, TypeScript, HTML5, CSS3" },
          { category: "Styling", items: "Tailwind CSS, Material UI, Styled Components, SASS" },
          { category: "State Management", items: "Redux, Context API, Zustand" },
          { category: "Tools", items: "Git, Webpack, Vite, Figma, npm" },
        ],
        showSoftSkills: false,
        softSkills: [],
        experience: [
          {
            title: "SaaS Dashboard Application",
            type: "Freelance Project",
            duration: "6 Months",
            details: [
              "Built responsive admin dashboard with 15+ reusable components",
              "Implemented real-time data visualization using Chart.js",
              "Achieved 95+ Lighthouse performance score through optimization",
            ],
            techStack: "React.js, Next.js, Tailwind CSS, Chart.js, REST API",
          },
          {
            title: "E-learning Platform Frontend",
            type: "Company Project",
            duration: "5 Months",
            details: [
              "Developed course catalog, video player, and quiz modules",
              "Integrated payment gateway and user authentication flows",
            ],
            techStack: "React.js, Redux, Material UI, Axios",
          },
        ],
        education: {
          degree: "Bachelor of Computer Applications",
          school: "Mumbai University",
          year: "2019 – 2022",
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
      },
    },
    {
      id: 3,
      role: "Full Stack Developer",
      data: {
        name: "AMIT KUMAR",
        title: "Full Stack Developer | MERN Stack • Node.js • React.js",
        email: "amit.kumar@email.com",
        phone: "+91 76543 21098",
        showOptionalFields: false,
        location: "",
        linkedin: "",
        github: "",
        portfolio: "",
        summary:
          "Full Stack Developer with 4+ years of experience in MERN stack development. Skilled in building scalable web applications from scratch, RESTful API design, database optimization, and cloud deployment. Strong understanding of software development lifecycle and agile methodologies.",
        skills: [
          { category: "Frontend", items: "React.js, Next.js, Redux, JavaScript, TypeScript, HTML5, CSS3" },
          { category: "Backend", items: "Node.js, Express.js, REST API, GraphQL" },
          { category: "Databases", items: "MongoDB, MySQL, PostgreSQL, Redis" },
          { category: "DevOps", items: "Docker, AWS, CI/CD, Git, Nginx" },
        ],
        showSoftSkills: false,
        softSkills: [],
        experience: [
          {
            title: "Social Media Platform",
            type: "Startup Project",
            duration: "10 Months",
            details: [
              "Built full-stack social platform with posts, comments, and real-time chat",
              "Implemented JWT authentication, image uploads to AWS S3, and push notifications",
              "Scaled backend to handle 10K+ concurrent users with Redis caching",
            ],
            techStack: "MERN Stack, Socket.io, Redis, AWS S3, Docker",
          },
          {
            title: "Task Management SaaS",
            type: "Company Project",
            duration: "6 Months",
            details: [
              "Developed task boards, team collaboration features, and reporting dashboards",
              "Integrated third-party APIs for calendar sync and email notifications",
            ],
            techStack: "React.js, Node.js, MongoDB, Express.js",
          },
        ],
        education: {
          degree: "Bachelor of Engineering in Information Technology",
          school: "NIT Trichy",
          year: "2016 – 2020",
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
      },
    },
    {
      id: 4,
      role: "DevOps Engineer",
      data: {
        name: "VIKRAM SINGH",
        title: "DevOps Engineer | AWS • Docker • Kubernetes • CI/CD",
        email: "vikram.singh@email.com",
        phone: "+91 65432 10987",
        showOptionalFields: false,
        location: "",
        linkedin: "",
        github: "",
        portfolio: "",
        summary:
          "DevOps Engineer with 3+ years of experience in cloud infrastructure, containerization, and automation. Expert in AWS services, Docker, Kubernetes, and CI/CD pipelines. Proven track record of reducing deployment time and improving system reliability through automation.",
        skills: [
          { category: "Cloud Platforms", items: "AWS (EC2, S3, RDS, Lambda), Azure, GCP" },
          { category: "Containerization", items: "Docker, Kubernetes, Helm" },
          { category: "CI/CD", items: "Jenkins, GitLab CI, GitHub Actions, ArgoCD" },
          { category: "Scripting", items: "Bash, Python, Terraform, Ansible" },
        ],
        showSoftSkills: false,
        softSkills: [],
        experience: [
          {
            title: "Cloud Infrastructure Automation",
            type: "Enterprise Project",
            duration: "7 Months",
            details: [
              "Automated infrastructure provisioning using Terraform reducing setup time by 70%",
              "Implemented monitoring and alerting with Prometheus and Grafana",
              "Set up auto-scaling groups and load balancers for high availability",
            ],
            techStack: "AWS, Terraform, Ansible, Prometheus, Grafana",
          },
          {
            title: "Kubernetes Migration Project",
            type: "Team Project",
            duration: "5 Months",
            details: [
              "Migrated 20+ microservices from EC2 to Kubernetes cluster",
              "Built CI/CD pipelines with Jenkins and ArgoCD for automated deployments",
            ],
            techStack: "Kubernetes, Docker, Jenkins, GitLab CI, Helm",
          },
        ],
        education: {
          degree: "Bachelor of Technology in Computer Engineering",
          school: "Delhi Technological University",
          year: "2017 – 2021",
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
      },
    },
    {
      id: 5,
      role: "Backend Developer",
      data: {
        name: "SNEHA REDDY",
        title: "Backend Developer | Python • Django • Flask • REST API",
        email: "sneha.reddy@email.com",
        phone: "+91 54321 09876",
        showOptionalFields: false,
        location: "",
        linkedin: "",
        github: "",
        portfolio: "",
        summary:
          "Backend Developer with 2+ years of experience in Python web frameworks and API development. Skilled in Django, Flask, database design, and building secure, scalable backend systems. Strong focus on code quality, testing, and documentation.",
        skills: [
          { category: "Languages", items: "Python, SQL, JavaScript" },
          { category: "Frameworks", items: "Django, Django REST Framework, Flask, FastAPI" },
          { category: "Databases", items: "PostgreSQL, MySQL, MongoDB, Redis" },
          { category: "Tools", items: "Git, Docker, Celery, RabbitMQ, Postman" },
        ],
        showSoftSkills: false,
        softSkills: [],
        experience: [
          {
            title: "Healthcare Management API",
            type: "Company Project",
            duration: "6 Months",
            details: [
              "Built REST APIs for patient records, appointments, and prescriptions",
              "Implemented role-based access control and HIPAA compliance measures",
              "Optimized queries achieving 50% faster response times",
            ],
            techStack: "Django, Django REST Framework, PostgreSQL, Redis",
          },
          {
            title: "Inventory Management System",
            type: "Freelance Project",
            duration: "4 Months",
            details: [
              "Developed backend APIs for product tracking, orders, and suppliers",
              "Integrated automated email notifications using Celery",
            ],
            techStack: "Flask, SQLAlchemy, MySQL, Celery, RabbitMQ",
          },
        ],
        education: {
          degree: "Bachelor of Technology in Information Science",
          school: "RVCE Bangalore",
          year: "2019 – 2023",
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
      },
    },
    {
      id: 6,
      role: "Software Developer",
      data: {
        name: "KARTHIK MENON",
        title: "Software Developer | C++ • Data Structures • Algorithms",
        email: "karthik.menon@email.com",
        phone: "+91 43210 98765",
        showOptionalFields: false,
        location: "",
        linkedin: "",
        github: "",
        portfolio: "",
        summary:
          "Software Developer with strong foundation in data structures, algorithms, and problem-solving. Experienced in C++, Python, and system design. Passionate about writing efficient code and optimizing performance. Active competitive programmer with multiple coding contest wins.",
        skills: [
          { category: "Languages", items: "C++, Python, Java, JavaScript" },
          { category: "Core Skills", items: "Data Structures, Algorithms, OOP, System Design" },
          { category: "Tools", items: "Git, Linux, VS Code, GDB" },
          { category: "Databases", items: "MySQL, SQLite" },
        ],
        showSoftSkills: false,
        softSkills: [],
        experience: [
          {
            title: "File Compression Tool",
            type: "Personal Project",
            duration: "2 Months",
            details: [
              "Implemented Huffman coding algorithm for lossless file compression",
              "Achieved 60% compression ratio on text files with fast processing",
              "Built command-line interface for easy usage",
            ],
            techStack: "C++, Data Structures, Algorithms",
          },
          {
            title: "Student Management System",
            type: "Academic Project",
            duration: "3 Months",
            details: [
              "Developed desktop application with SQLite database integration",
              "Implemented CRUD operations, search, and reporting features",
            ],
            techStack: "C++, SQLite, Qt Framework",
          },
        ],
        education: {
          degree: "Bachelor of Engineering in Computer Science",
          school: "Anna University Chennai",
          year: "2020 – 2024",
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
      },
    },
    {
      id: 7,
      role: "Fresher",
      data: {
        name: "ANANYA GUPTA",
        title: "Software Engineer Fresher | Java • Python • Web Development",
        email: "ananya.gupta@email.com",
        phone: "+91 32109 87654",
        showOptionalFields: false,
        location: "",
        linkedin: "",
        github: "",
        portfolio: "",
        summary:
          "Recent Computer Science graduate with strong foundation in programming, web development, and problem-solving. Completed multiple projects in Java, Python, and web technologies. Eager to learn and contribute to innovative software solutions. Quick learner with excellent academic record.",
        skills: [
          { category: "Languages", items: "Java, Python, C, JavaScript, HTML5, CSS3" },
          { category: "Frameworks", items: "Spring Boot, Django, React.js" },
          { category: "Databases", items: "MySQL, MongoDB" },
          { category: "Tools", items: "Git, VS Code, Eclipse, Postman" },
        ],
        showSoftSkills: false,
        softSkills: [],
        experience: [
          {
            title: "Online Book Store",
            type: "Academic Project",
            duration: "4 Months",
            details: [
              "Developed full-stack web application with user authentication and cart functionality",
              "Implemented book search, filters, and payment integration",
              "Created responsive UI with modern design principles",
            ],
            techStack: "Java, Spring Boot, MySQL, React.js, Bootstrap",
          },
          {
            title: "Weather Forecasting App",
            type: "Personal Project",
            duration: "1 Month",
            details: [
              "Built web app that fetches real-time weather data using OpenWeather API",
              "Added location search and 7-day forecast visualization",
            ],
            techStack: "JavaScript, React.js, REST API, CSS3",
          },
        ],
        education: {
          degree: "Bachelor of Technology in Computer Science",
          school: "VIT Vellore",
          year: "2020 – 2024",
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
      },
    },
    {
      id: 8,
      role: "Student/Intern",
      data: {
        name: "ROHAN MALHOTRA",
        title: "Computer Science Student | Python • Machine Learning Enthusiast",
        email: "rohan.malhotra@email.com",
        phone: "+91 21098 76543",
        showOptionalFields: false,
        location: "",
        linkedin: "",
        github: "",
        portfolio: "",
        summary:
          "Third-year Computer Science student with strong interest in machine learning and data science. Completed coursework in algorithms, databases, and AI. Building projects to apply theoretical knowledge. Seeking internship opportunities to gain industry experience.",
        skills: [
          { category: "Languages", items: "Python, Java, C++, SQL" },
          { category: "Libraries", items: "NumPy, Pandas, Scikit-learn, TensorFlow" },
          { category: "Web", items: "HTML, CSS, Flask, Django basics" },
          { category: "Tools", items: "Git, Jupyter Notebook, VS Code" },
        ],
        showSoftSkills: false,
        softSkills: [],
        experience: [
          {
            title: "Image Classification Model",
            type: "Academic Project",
            duration: "2 Months",
            details: [
              "Built CNN model to classify images with 92% accuracy",
              "Used TensorFlow and Keras for model training",
              "Created simple web interface using Flask for demo",
            ],
            techStack: "Python, TensorFlow, Keras, Flask, NumPy",
          },
          {
            title: "College Event Management System",
            type: "Team Project",
            duration: "3 Months",
            details: [
              "Developed web portal for event registration and management",
              "Implemented user authentication and admin dashboard",
            ],
            techStack: "Python, Django, SQLite, Bootstrap",
          },
        ],
        education: {
          degree: "Bachelor of Technology in Computer Science (Pursuing)",
          school: "BITS Pilani",
          year: "2022 – 2026",
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
      },
    },
    {
      id: 9,
      role: "Data Analyst",
      data: {
        name: "MEERA KRISHNAN",
        title: "Data Analyst | Python • SQL • Power BI • Excel",
        email: "meera.krishnan@email.com",
        phone: "+91 10987 65432",
        showOptionalFields: false,
        location: "",
        linkedin: "",
        github: "",
        portfolio: "",
        summary:
          "Data Analyst with 2+ years of experience in data analysis, visualization, and reporting. Skilled in Python, SQL, and BI tools. Expert in extracting insights from complex datasets and creating interactive dashboards. Strong analytical mindset with attention to detail.",
        skills: [
          { category: "Analytics", items: "Python, SQL, R, Statistics" },
          { category: "Visualization", items: "Power BI, Tableau, Excel, Matplotlib, Seaborn" },
          { category: "Libraries", items: "Pandas, NumPy, Scikit-learn" },
          { category: "Databases", items: "MySQL, PostgreSQL, MongoDB" },
        ],
        showSoftSkills: false,
        softSkills: [],
        experience: [
          {
            title: "Sales Analytics Dashboard",
            type: "Company Project",
            duration: "5 Months",
            details: [
              "Built interactive Power BI dashboards tracking sales metrics across regions",
              "Automated data pipeline using Python reducing manual work by 80%",
              "Generated insights that increased conversion rate by 15%",
            ],
            techStack: "Python, SQL, Power BI, Pandas, Excel",
          },
          {
            title: "Customer Churn Prediction",
            type: "Team Project",
            duration: "3 Months",
            details: [
              "Analyzed customer behavior data and built predictive model",
              "Created visualization reports for stakeholder presentations",
            ],
            techStack: "Python, Pandas, Scikit-learn, SQL, Tableau",
          },
        ],
        education: {
          degree: "Master of Science in Data Science",
          school: "ISI Kolkata",
          year: "2020 – 2022",
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
      },
    },
    {
      id: 10,
      role: "Mobile Developer",
      data: {
        name: "ARJUN NAIR",
        title: "Mobile Developer | React Native • Flutter • iOS • Android",
        email: "arjun.nair@email.com",
        phone: "+91 09876 54321",
        showOptionalFields: false,
        location: "",
        linkedin: "",
        github: "",
        portfolio: "",
        summary:
          "Mobile Developer with 3+ years of experience building cross-platform mobile applications. Expert in React Native and Flutter with strong understanding of mobile UI/UX principles. Delivered 10+ apps to App Store and Play Store with excellent user ratings.",
        skills: [
          { category: "Mobile Frameworks", items: "React Native, Flutter, Expo" },
          { category: "Languages", items: "JavaScript, TypeScript, Dart, Swift basics" },
          { category: "State Management", items: "Redux, Provider, Riverpod" },
          { category: "Tools", items: "Xcode, Android Studio, Firebase, Git" },
        ],
        showSoftSkills: false,
        softSkills: [],
        experience: [
          {
            title: "Fitness Tracking App",
            type: "Freelance Project",
            duration: "6 Months",
            details: [
              "Built cross-platform mobile app with workout tracking and nutrition logging",
              "Integrated device sensors for step counting and calorie burn estimation",
              "Implemented push notifications and social sharing features",
            ],
            techStack: "React Native, Redux, Firebase, REST API",
          },
          {
            title: "Food Delivery Application",
            type: "Company Project",
            duration: "8 Months",
            details: [
              "Developed customer and delivery partner apps with real-time tracking",
              "Integrated payment gateways and Google Maps API",
            ],
            techStack: "Flutter, Provider, Firebase, Google Maps API",
          },
        ],
        education: {
          degree: "Bachelor of Engineering in Electronics and Communication",
          school: "NIT Calicut",
          year: "2017 – 2021",
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
      },
    },
  ]

  const handleSelectTemplate = (template) => {
    setSelectedId(template.id)
    onSelectTemplate(template.data)
  }

  return (
    <div className="selector-overlay">
      <div className="selector-modal">
        <div className="selector-header">
          <h2>Choose Your Resume Template</h2>
          <p>Select from 10 ATS-friendly resume templates for different roles</p>
          <button className="selector-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="selector-grid">
          {resumeTemplates.map((template) => (
            <div
              key={template.id}
              className={`resume-card ${selectedId === template.id ? "selected" : ""}`}
              onClick={() => handleSelectTemplate(template)}
            >
              <div className="resume-card-header">
                <h3>{template.role}</h3>
              </div>
              <div className="resume-card-preview">
                <div className="mini-resume">
                  <div className="mini-name">{template.data.name}</div>
                  <div className="mini-title">{template.data.title}</div>
                  <div className="mini-contact">
                    {template.data.email} | {template.data.phone}
                  </div>
                  <div className="mini-section">
                    <div className="mini-section-title">Summary</div>
                    <div className="mini-text">{template.data.summary.substring(0, 100)}...</div>
                  </div>
                  <div className="mini-section">
                    <div className="mini-section-title">Skills</div>
                    <div className="mini-text">
                      {template.data.skills[0].category}: {template.data.skills[0].items.substring(0, 40)}...
                    </div>
                  </div>
                </div>
              </div>
              <button className="select-btn">{selectedId === template.id ? "✓ Selected" : "Select Template"}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ResumeSelectorChoose;
