import { useState } from "react";
import "../navbarcmponent/designnavbar.css";
import { AiOutlineMenuFold } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { Link } from "react-router-dom";
import jetlogo from "../assets/newlogo.jpg"

export default function NavbarJet() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDesktopMore, setShowDesktopMore] = useState(false);
  const [showMobileMore, setShowMobileMore] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) setShowMobileMore(false);
  };

  const toggleMobileMore = () => {
    setShowMobileMore(!showMobileMore);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-content">
          
          <div className="logo">
            <div className="logo-icon"><Link to="/" style={{textDecoration:'none'}}>
            <img src={jetlogo} alt="jetptech" style={{width:'90px',height:'60px'}}/>
            </Link></div>
            
          </div>

          {/* Desktop Menu */}
          <div className="nav-links desktop-only">
           <Link to="/" className="nav-link">Home</Link>
            <Link to="/tools" className="nav-link">Tools</Link>
            <Link to="/resumejetptechbuilder" className="nav-link">Resume Builder</Link>
             <Link to="/atsresumechecker" className="nav-link">ATS Resume Score Checker</Link>
             <Link to="/documenteditor" className="nav-link">Document</Link>
            <Link to="/support" className="nav-link">Support</Link>
            <Link to="/features" className="nav-link">JetPTech Features</Link>

            <div
              className="nav-dropdown-wrapper"
              onMouseEnter={() => setShowDesktopMore(true)}
              onMouseLeave={() => setShowDesktopMore(false)}
            >
              <a href="#" className="nav-link">More</a>
              {showDesktopMore && (
                <div className="more-dropdown">
                   <Link to="/file-converter">File Converter</Link>
                  <Link to="/image-tools">Image Tools</Link>
                  <Link to="/pdf-tools">PDF Tools</Link>
                  <Link to="/qr-generator">QR Generator</Link>
                  <Link to="/text-tools">Text Tools</Link>
                  <Link to="/about">About Us</Link>
                  <Link to="/pricing">Pricing</Link>
                  <Link to="/blog">Blog</Link>
                </div>
              )}
            </div>
          </div>

          {/* Right CTA + Hamburger */}
          <div className="nav-right">
            <button className="nav-cta desktop-only">Create Account</button>

            <button
              className="hamburger-btn"
              onClick={toggleMobileMenu}
              aria-label="Open menu"
            >
              <AiOutlineMenuFold size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar from Left */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={toggleMobileMenu}>
          <div
            className="mobile-sidebar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-header">
              <div className="logo">
                <div className="logo-icon">JetPTech</div>
                 
              </div>
              <button
                className="close-btn"
                onClick={toggleMobileMenu}
                aria-label="Close menu"
              >
                <MdOutlineClose size={32} />
              </button>
            </div>

            <nav className="mobile-nav-links">
              <Link to="/" onClick={toggleMobileMenu}>Home</Link>
              <a href="/tools" onClick={toggleMobileMenu}>Tools</a>
              <Link to="/resumejetptechbuilder" onClick={toggleMobileMenu}>Resume Builder</Link>
              <Link to="/atsresumechecker" onClick={toggleMobileMenu}>Resume Builder</Link>
              <a href="/support" onClick={toggleMobileMenu}>Support</a>
              <a href="/features" onClick={toggleMobileMenu}>JetPTech Features</a>

              {/* More with Clickable Dropdown in Mobile */}
              <div className="mobile-more-wrapper">
                <button
                  className="mobile-more-toggle"
                  onClick={toggleMobileMore}
                >
                  More
                  {showMobileMore ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}
                </button>

                {showMobileMore && (
                  <div className="mobile-more-dropdown">
                    <a href="/file-converter" onClick={toggleMobileMenu}>File Converter</a>
                    <a href="/image-tools" onClick={toggleMobileMenu}>Image Tools</a>
                    <a href="/pdf-tools" onClick={toggleMobileMenu}>PDF Tools</a>
                    <a href="/qr-generator" onClick={toggleMobileMenu}>QR Generator</a>
                    <a href="/text-tools" onClick={toggleMobileMenu}>Text Tools</a>
                    <a href="/about" onClick={toggleMobileMenu}>About Us</a>
                    <a href="/pricing" onClick={toggleMobileMenu}>Pricing</a>
                    <a href="/blog" onClick={toggleMobileMenu}>Blog</a>
                  </div>
                )}
              </div>
            </nav>

            <div className="mobile-cta-section">
              <button className="nav-cta full-width" onClick={toggleMobileMenu}>
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}