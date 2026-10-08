import React from 'react';

export default function TemplateCreative({ data }) {
  const portfolio = data || {};

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexWrap: 'wrap', background: '#fff7ed', color: '#111827', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)' }}>
      <aside style={{ width: '320px', background: 'linear-gradient(180deg, #ec4899 0%, #8b5cf6 100%)', color: 'white', padding: '30px', flex: '1 1 280px' }}>
        {portfolio.profile_picture_url && (
          <img src={portfolio.profile_picture_url} alt="Profile" style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '16px', marginBottom: '20px' }} />
        )}
        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>{portfolio.full_name || 'Your Name'}</h2>
        <p>{portfolio.email || 'your@email.com'}</p>
        <p>{portfolio.contact_number || 'Your number'}</p>
        <p>{portfolio.address || 'Your address'}</p>

        <div style={{ marginTop: '28px' }}>
          <h3>Skills</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {(portfolio.skills || ['React']).map((skill, index) => (
              <span key={`skill-${index}`} style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', padding: '6px 10px', borderRadius: '999px' }}>{skill}</span>
            ))}
          </div>
        </div>
      </aside>

      <main style={{ flex: '2 1 500px', padding: '40px', background: '#fff7ed' }}>
        <section style={{ marginBottom: '28px' }}>
          <h2 style={{ marginBottom: '8px' }}>About Me</h2>
          <p style={{ lineHeight: 1.7, color: '#374151' }}>{portfolio.about_me || 'Tell your story here.'}</p>
        </section>

        <section style={{ marginBottom: '28px' }}>
          <h2>Education</h2>
          <ul>
            {(portfolio.education || ['Add education details']).map((item, index) => <li key={`edu-${index}`}>{item}</li>)}
          </ul>
        </section>

        <section style={{ marginBottom: '28px' }}>
          <h2>Projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {(portfolio.projects || []).map((project, index) => (
              <div key={`project-${index}`} style={{ background: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 10px 18px rgba(15, 23, 42, 0.04)' }}>
                <h3>{project.title || 'Project title'}</h3>
                <p style={{ color: '#475569' }}>{project.description || 'Project description goes here.'}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '28px' }}>
          <h2>Experience</h2>
          {(portfolio.work_experience || []).map((item, index) => (
            <div key={`exp-${index}`} style={{ marginBottom: '14px', padding: '14px 0', borderBottom: '1px solid #f1f5f9' }}>
              <strong>{item.role || 'Role'}</strong> at {item.company || 'Company'}
              <p style={{ color: '#475569', marginTop: '6px' }}>{item.description || 'Your experience description.'}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>Links</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {(portfolio.social_links || []).map((link, index) => (
              <a key={`link-${index}`} href={link.url || '#'} target="_blank" rel="noreferrer" style={{ color: '#7c3aed', fontWeight: 700, textDecoration: 'none' }}>
                {link.label || 'Link'}
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}