import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarJet from "./navbarcmponent/navbarj";
import FileConverter from "./jetptechworldcomponent/convetrets";
import ResumeBuilder from "./resumebuildingcomponent/resumebuilder";
import AtsResumeChecker from "./atsresumecheckercomponent/atsresumechecker";
import DocumentEditor from "./documenteditorcomponent/dosumenteditor";

function App() {
  return (
    <Router>
      
      <NavbarJet />

       
      <div className="main-content">
        <Routes>
          <Route path="/" element={<FileConverter />} />
          <Route path="/resumejetptechbuilder" element={<ResumeBuilder />} />
          <Route path="/atsresumechecker" element={<AtsResumeChecker />} />
          <Route path="/documenteditor" element={<DocumentEditor />} />
           
        </Routes>
      </div>
    </Router>
  );
}

export default App;