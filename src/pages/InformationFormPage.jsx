import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { savePortfolio } from '../lib/portfolioStorage';

export default function InformationFormPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    contact_number: '',
    address: '',
    about_me: '',
    educational_background: '',
    skills: '',
    projects: '',
    work_experience: '',
    github_link: '',
    linkedin_link: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        full_name: formData.full_name,
        email: formData.email,
        contact_number: formData.contact_number,
        address: formData.address,
        about_me: formData.about_me,
        educational_background: formData.educational_background
          ? [{ school: formData.educational_background }]
          : [],
        skills: formData.skills ? formData.skills.split(',').map((s) => s.trim()) : [],
        projects: formData.projects
          ? [{ title: formData.projects, description: 'Featured Project' }]
          : [],
        work_experience: formData.work_experience
          ? [{ role: formData.work_experience, company: 'Company Name', description: 'Professional experience summary' }]
          : [],
        github_link: formData.github_link,
        linkedin_link: formData.linkedin_link,
        social_links: {
          github: formData.github_link,
          linkedin: formData.linkedin_link
        }
      };

      const savedPortfolio = await savePortfolio(payload);
      setLoading(false);

      if (savedPortfolio && savedPortfolio.id) {
        navigate(`/select-template/${savedPortfolio.id}`);
      }
    } catch (error) {
      setLoading(false);
      alert('Error saving data: ' + error.message);
    }
  };

  return (
    <div style={pageContainerStyle}>
      {/* Top Header Navigation */}
      <header style={headerStyle}>
        <div>
          <h1 style={logoTitleStyle}>PORTFOLIO BUILDER</h1>
          <p style={subTitleStyle}>Fill in your details below to generate your professional portfolio</p>
        </div>
        <Link to="/manage" style={manageButtonStyle}>
          📋 Manage Saved Portfolios
        </Link>
      </header>

      <form onSubmit={handleSubmit} style={formStyle}>
        {/* Section 1: Personal Information */}
        <div style={cardStyle}>
          <h3 style={sectionHeadingStyle}>👤 1. Personal Information</h3>
          
          <div style={rowStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Full Name *</label>
              <input
                type="text"
                name="full_name"
                placeholder="e.g. Your Full Name"
                required
                value={formData.full_name}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Email Address *</label>
              <input
                type="email"
                name="email"
                placeholder="e.g. yourname@email.com"
                required
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={rowStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Contact Number</label>
              <input
                type="text"
                name="contact_number"
                placeholder="e.g. +63 9XX XXX XXXX"
                value={formData.contact_number}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Location / Address</label>
              <input
                type="text"
                name="address"
                placeholder="e.g. City, Country"
                value={formData.address}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>About Me Summary</label>
            <textarea
              name="about_me"
              rows="3"
              placeholder="Write a short introduction about your skills, experience, and career goals..."
              value={formData.about_me}
              onChange={handleChange}
              style={textareaStyle}
            />
          </div>
        </div>

        {/* Section 2: Education & Experience */}
        <div style={cardStyle}>
          <h3 style={sectionHeadingStyle}>🎓 2. Education & Experience</h3>
          
          <div style={rowStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Educational Background</label>
              <input
                type="text"
                name="educational_background"
                placeholder="e.g. BS Information Technology - University Name"
                value={formData.educational_background}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Work / Internship Experience</label>
              <input
                type="text"
                name="work_experience"
                placeholder="e.g. Web Developer at Company Name"
                value={formData.work_experience}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Skills & Projects */}
        <div style={cardStyle}>
          <h3 style={sectionHeadingStyle}>💻 3. Skills & Projects</h3>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Technical & Professional Skills</label>
            <input
              type="text"
              name="skills"
              placeholder="e.g. HTML, CSS, JavaScript, React, Git"
              value={formData.skills}
              onChange={handleChange}
              style={inputStyle}
            />
            <span style={hintStyle}>Separate each skill with a comma</span>
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Featured Project Name</label>
            <input
              type="text"
              name="projects"
              placeholder="e.g. Portfolio Website or Business App"
              value={formData.projects}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Section 4: Social Links */}
        <div style={cardStyle}>
          <h3 style={sectionHeadingStyle}>🔗 4. Social & Portfolio Links</h3>

          <div style={rowStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>GitHub Profile Link</label>
              <input
                type="url"
                name="github_link"
                placeholder="https://github.com/yourusername"
                value={formData.github_link}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>LinkedIn Profile Link</label>
              <input
                type="url"
                name="linkedin_link"
                placeholder="https://linkedin.com/in/yourprofile"
                value={formData.linkedin_link}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Submit Action Button */}
        <button type="submit" disabled={loading} style={submitButtonStyle}>
          {loading ? 'Saving Data to Online Database...' : 'Save Portfolio & Choose Template →'}
        </button>
      </form>
    </div>
  );
}

/* Clear, High-Contrast UI Layout Styles */
const pageContainerStyle = {
  maxWidth: '920px',
  margin: '32px auto',
  padding: '0 20px 40px',
  fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  color: '#0f172a',
  backgroundColor: '#f8fafc'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '26px',
  paddingBottom: '18px',
  borderBottom: '1px solid #e2e8f0'
};

const logoTitleStyle = {
  margin: 0,
  fontSize: '24px',
  color: '#0f172a',
  fontWeight: '800',
  letterSpacing: '0.08em'
};

const subTitleStyle = {
  margin: '6px 0 0 0',
  color: '#475569',
  fontSize: '14px'
};

const manageButtonStyle = {
  padding: '10px 16px',
  backgroundColor: '#e0f2fe',
  color: '#0f172a',
  borderRadius: '10px',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '14px',
  border: '1px solid #bae6fd'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
};

const cardStyle = {
  backgroundColor: '#ffffff',
  padding: '22px',
  borderRadius: '14px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 8px 20px rgba(15, 23, 42, 0.04)',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px'
};

const sectionHeadingStyle = {
  margin: '0 0 8px 0',
  fontSize: '18px',
  color: '#1e293b',
  borderBottom: '1px solid #e2e8f0',
  paddingBottom: '8px'
};

const rowStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '16px'
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px'
};

const labelStyle = {
  fontSize: '13px',
  fontWeight: '700',
  color: '#334155'
};

const hintStyle = {
  fontSize: '12px',
  color: '#64748b'
};

const inputStyle = {
  padding: '12px 14px',
  fontSize: '14px',
  backgroundColor: '#ffffff',
  color: '#0f172a',
  border: '1px solid #cbd5e1',
  borderRadius: '10px',
  outline: 'none',
  boxShadow: 'inset 0 1px 2px rgba(15, 23, 42, 0.04)'
};

const textareaStyle = {
  padding: '12px 14px',
  fontSize: '14px',
  backgroundColor: '#ffffff',
  color: '#0f172a',
  border: '1px solid #cbd5e1',
  borderRadius: '10px',
  outline: 'none',
  resize: 'vertical',
  boxShadow: 'inset 0 1px 2px rgba(15, 23, 42, 0.04)'
};

const submitButtonStyle = {
  padding: '15px 22px',
  fontSize: '15px',
  fontWeight: '700',
  color: '#ffffff',
  background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  boxShadow: '0 8px 18px rgba(14, 165, 233, 0.2)'
};