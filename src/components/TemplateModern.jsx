import React from 'react';

export default function TemplateModern({ data }) {
  const portfolio = data || {};

  return (
    <div style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)', color: '#1f2937', padding: '40px', minHeight: '100vh', borderRadius: '20px', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)' }}>
      <header style={{ textAlign: 'center', paddingBottom: '30px', borderBottom: '1px solid #dfe7f5' }}>
        {portfolio.profile_picture_url && (
          <img src={portfolio.profile_picture_url} alt="Profile" style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', border: '4px solid #4f46e5', marginBottom: '20px' }} />
        )}
        <h1 style={{ color: '#1f2937', margin: 0, fontSize: '3rem' }}>{portfolio.full_name || 'Your Name'}</h1>
        <p style={{ color: '#475569', marginTop: '12px' }}>{portfolio.email || 'your@email.com'} • {portfolio.contact_number || 'Your contact number'}</p>
        <p style={{ color: '#475569' }}>{portfolio.address || 'Your address'}</p>
        <p style={{ maxWidth: '700px', margin: '20px auto 0', color: '#475569', lineHeight: 1.7 }}>{portfolio.about_me || 'Write a professional summary here.'}</p>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#4f46e5' }}>Education</h2>
          <ul style={{ paddingLeft: '18px', color: '#334155' }}>
            {(portfolio.education || ['Add your education']).map((item, index) => <li key={`edu-${index}`}>{item}</li>)}
          </ul>
        </div>

        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#4f46e5' }}>Skills</h2>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {(portfolio.skills || ['React', 'UI Design']).map((skill, index) => (
              <span key={`skill-${index}`} style={{ background: '#eef2ff', color: '#3730a3', padding: '6px 10px', borderRadius: '999px', fontWeight: 600 }}>{skill}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ marginTop: '30px' }}>
        <h2 style={{ color: '#4f46e5' }}>Projects</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {(portfolio.projects || []).map((project, index) => (
            <div key={`project-${index}`} style={{ background: '#ffffff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ color: '#1f2937' }}>{project.title || 'Project title'}</h3>
              <p style={{ color: '#475569' }}>{project.description || 'Add project details here.'}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: '30px' }}>
        <h2 style={{ color: '#4f46e5' }}>Experience</h2>
        {(portfolio.work_experience || []).map((item, index) => (
          <div key={`exp-${index}`} style={{ background: '#ffffff', padding: '18px', borderRadius: '12px', marginBottom: '12px', border: '1px solid #e2e8f0' }}>
            <strong style={{ color: '#1f2937' }}>{item.role || 'Role'}</strong> <span style={{ color: '#64748b' }}>@ {item.company || 'Company'}</span>
            <p style={{ color: '#475569', marginTop: '8px' }}>{item.description || 'Your experience description.'}</p>
          </div>
        ))}
      </section>

      <section style={{ marginTop: '30px' }}>
        <h2 style={{ color: '#4f46e5' }}>Links</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {(portfolio.social_links || []).map((link, index) => (
            <a key={`link-${index}`} href={link.url || '#'} target="_blank" rel="noreferrer" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 600 }}>
              {link.label || 'Link'}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}