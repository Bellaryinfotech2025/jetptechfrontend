import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarJet from "./navbarcmponent/navbarj";
import FileConverter from "./jetptechworldcomponent/convetrets";
import ResumeBuilder from "./resumebuildingcomponent/resumebuilder";
import AtsResumeChecker from "./atsresumecheckercomponent/atsresumechecker";
import DocumentEditor from "./documenteditorcomponent/dosumenteditor";
// import Backgroundremoverwrapper from "./editingtoolcomponent/backgroundremoverwrapper";
// import PixVerseEditor from "./texteditingtoolcomponent/jettreeeditor";
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
          {/* <Route path="/bgremover" element={<Backgroundremoverwrapper />} />
          <Route path="/editortoolnew" element={<PixVerseEditor />} /> */}
           
        </Routes>
      </div>
    </Router>
  );
}

export default App;