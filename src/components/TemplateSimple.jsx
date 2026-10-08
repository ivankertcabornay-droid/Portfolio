import React from 'react';

export default function TemplateSimple({ data }) {
  const portfolio = data || {};

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', background: '#fff', color: '#0f172a', borderRadius: '20px', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)' }}>
      <header style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '2.8rem' }}>{portfolio.full_name || 'Your Name'}</h1>
            <p style={{ margin: '8px 0 0', color: '#475569' }}>{portfolio.email || 'your@email.com'} • {portfolio.contact_number || 'Your contact number'}</p>
          </div>
          {portfolio.profile_picture_url && (
            <img src={portfolio.profile_picture_url} alt="Profile" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '3px solid #e2e8f0' }} />
          )}
        </div>
        <p style={{ marginTop: '12px', color: '#475569' }}>{portfolio.address || 'Your address'}</p>
      </header>

      <section style={{ marginBottom: '28px' }}>
        <h2>About Me</h2>
        <p style={{ color: '#475569', lineHeight: 1.7 }}>{portfolio.about_me || 'Write a short introduction about yourself here.'}</p>
      </section>

      <section style={{ marginBottom: '28px' }}>
        <h2>Education</h2>
        <ul>
          {(portfolio.education || ['Add your educational background']).map((item, index) => <li key={`edu-${index}`}>{item}</li>)}
        </ul>
      </section>

      <section style={{ marginBottom: '28px' }}>
        <h2>Skills</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {(portfolio.skills || ['React', 'Design']).map((skill, index) => (
            <span key={`skill-${index}`} style={{ background: '#e2e8f0', color: '#0f172a', padding: '6px 12px', borderRadius: '999px' }}>{skill}</span>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '28px' }}>
        <h2>Projects</h2>
        <div style={{ display: 'grid', gap: '16px' }}>
          {(portfolio.projects || []).map((project, index) => (
            <div key={`project-${index}`} style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
              <h3 style={{ marginTop: 0 }}>{project.title || 'Project title'}</h3>
              <p style={{ marginBottom: 0, color: '#475569' }}>{project.description || 'Project description goes here.'}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '28px' }}>
        <h2>Experience</h2>
        {(portfolio.work_experience || []).map((item, index) => (
          <div key={`exp-${index}`} style={{ marginBottom: '14px' }}>
            <strong>{item.role || 'Role'}</strong> at {item.company || 'Company'}
            <p style={{ marginTop: '6px', color: '#475569' }}>{item.description || 'Add your work experience details.'}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Links</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {(portfolio.social_links || []).map((link, index) => (
            <a key={`link-${index}`} href={link.url || '#'} target="_blank" rel="noreferrer" style={{ color: '#0ea5e9', textDecoration: 'none' }}>
              {link.label || 'Link'}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}