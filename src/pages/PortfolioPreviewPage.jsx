import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TemplateSimple from '../components/TemplateSimple';
import TemplateModern from '../components/TemplateModern';
import TemplateCreative from '../components/TemplateCreative';
import { getPortfolio, savePortfolio } from '../lib/portfolioStorage';

const templates = {
  simple: TemplateSimple,
  modern: TemplateModern,
  creative: TemplateCreative,
};

const buildDownloadHtml = (portfolioData) => {
  const portfolio = portfolioData || {};
  const name = portfolio.full_name || 'Portfolio';
  const email = portfolio.email || 'your@email.com';
  const phone = portfolio.contact_number || 'Your contact number';
  const address = portfolio.address || 'Your address';
  const aboutMe = portfolio.about_me || 'Write a short introduction about yourself here.';
  const skills = (portfolio.skills || []).length ? portfolio.skills : ['React', 'UI Design'];
  const education = (portfolio.education || []).length ? portfolio.education : ['Add your educational background'];
  const projects = portfolio.projects && portfolio.projects.length ? portfolio.projects : [{ title: 'Project Title', description: 'Project description goes here.' }];
  const experience = portfolio.work_experience && portfolio.work_experience.length ? portfolio.work_experience : [{ role: 'Role', company: 'Company', description: 'Work experience details' }];
  const links = portfolio.social_links && portfolio.social_links.length ? portfolio.social_links : [{ label: 'Portfolio', url: '#' }];

  const templateStyle = {
    simple: `
      body { font-family: Arial, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; }
      .container { max-width: 980px; margin: 40px auto; background: #fff; border-radius: 20px; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08); padding: 40px; }
      .header { border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 20px; }
      .name { font-size: 2.5rem; margin: 0; }
      .sub { color: #475569; margin: 8px 0 0; }
      .section h2 { margin-bottom: 8px; }
      .chip { display:inline-block; background:#e2e8f0; color:#0f172a; padding:8px 12px; border-radius:999px; margin:4px; }
      .project, .experience { background:#f8fafc; border-radius:12px; padding:16px; margin-bottom:12px; }
      a { color:#0ea5e9; text-decoration:none; }
    `,
    modern: `
      body { font-family: Arial, sans-serif; background: linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%); color: #1f2937; margin: 0; }
      .container { max-width: 1200px; margin: 40px auto; background: #ffffff; border-radius: 20px; padding: 40px; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08); }
      .header { text-align: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 24px; }
      .name { color: #1f2937; font-size: 3rem; margin: 0; }
      .sub, .address, .about { color: #475569; }
      .grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 24px; }
      .panel { background:#ffffff; border: 1px solid #e2e8f0; border-radius:16px; padding: 24px; }
      .chip { display:inline-block; background:#eef2ff; color:#3730a3; padding:6px 10px; border-radius:999px; margin:4px; font-weight:600; }
      a { color:#4f46e5; text-decoration:none; }
    `,
    creative: `
      body { font-family: Arial, sans-serif; background: #fff7ed; margin: 0; color: #111827; }
      .container { display: flex; flex-wrap: wrap; min-height: 100vh; max-width: 1200px; margin: 40px auto; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(15,23,42,.08); }
      .sidebar { background: linear-gradient(180deg,#ec4899 0%, #8b5cf6 100%); color: #fff; padding: 30px; flex: 1 1 280px; }
      .main { background: #fff7ed; padding: 40px; flex: 2 1 500px; }
      .chip { display:inline-block; background: rgba(255,255,255,0.12); color:#fff; padding:6px 10px; border-radius:999px; margin:4px; }
      a { color:#7c3aed; text-decoration:none; font-weight:700; }
      .project { background:#fff; border-radius:12px; padding:16px; box-shadow: 0 10px 18px rgba(15, 23, 42, 0.04); margin-bottom: 14px; }
    `,
  };

  const selectedTheme = templateStyle[portfolio.template] || templateStyle.simple;

  const renderSimpleBody = () => `
    <div class="container">
      <header class="header">
        <h1 class="name">${name}</h1>
        <p class="sub">${email} • ${phone}</p>
        <p class="sub">${address}</p>
      </header>
      <section class="section"><h2>About Me</h2><p>${aboutMe}</p></section>
      <section class="section"><h2>Education</h2><ul>${education.map((item) => `<li>${item}</li>`).join('')}</ul></section>
      <section class="section"><h2>Skills</h2>${skills.map((skill) => `<span class="chip">${skill}</span>`).join('')}</section>
      <section class="section"><h2>Projects</h2>${projects.map((project) => `<div class="project"><h3>${project.title || 'Project Title'}</h3><p>${project.description || 'Project description goes here.'}</p></div>`).join('')}</section>
      <section class="section"><h2>Experience</h2>${experience.map((item) => `<div class="experience"><strong>${item.role || 'Role'}</strong> at ${item.company || 'Company'}<p>${item.description || 'Experience details'}</p></div>`).join('')}</section>
      <section class="section"><h2>Links</h2>${links.map((link) => `<a href="${link.url || '#'}" target="_blank">${link.label || 'Link'}</a>`).join(' ')}</section>
    </div>`;

  const renderModernBody = () => `
    <div class="container">
      <header class="header">
        <h1 class="name">${name}</h1>
        <p class="sub">${email} • ${phone}</p>
        <p class="address">${address}</p>
        <p class="about">${aboutMe}</p>
      </header>
      <div class="grid">
        <div class="panel"><h2>Education</h2><ul>${education.map((item) => `<li>${item}</li>`).join('')}</ul></div>
        <div class="panel"><h2>Skills</h2>${skills.map((skill) => `<span class="chip">${skill}</span>`).join('')}</div>
      </div>
      <div class="grid">
        ${projects.map((project) => `<div class="panel"><h3>${project.title || 'Project Title'}</h3><p>${project.description || 'Project description goes here.'}</p></div>`).join('')}
      </div>
      <div class="panel" style="margin-top:24px"><h2>Experience</h2>${experience.map((item) => `<div style="margin-bottom:12px"><strong>${item.role || 'Role'}</strong> @ ${item.company || 'Company'}<p>${item.description || 'Experience details'}</p></div>`).join('')}</div>
      <div class="panel" style="margin-top:24px"><h2>Links</h2>${links.map((link) => `<a href="${link.url || '#'}" target="_blank">${link.label || 'Link'}</a>`).join(' ')}</div>
    </div>`;

  const renderCreativeBody = () => `
    <div class="container">
      <aside class="sidebar">
        <h2>${name}</h2>
        <p>${email}</p>
        <p>${phone}</p>
        <p>${address}</p>
        <div style="margin-top:24px;">
          <h3>Skills</h3>
          ${skills.map((skill) => `<span class="chip">${skill}</span>`).join('')}
        </div>
      </aside>
      <main class="main">
        <section><h2>About Me</h2><p>${aboutMe}</p></section>
        <section><h2>Education</h2><ul>${education.map((item) => `<li>${item}</li>`).join('')}</ul></section>
        <section><h2>Projects</h2>${projects.map((project) => `<div class="project"><h3>${project.title || 'Project Title'}</h3><p>${project.description || 'Project description goes here.'}</p></div>`).join('')}</section>
        <section><h2>Experience</h2>${experience.map((item) => `<div style="margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid #f1f5f9;"><strong>${item.role || 'Role'}</strong> at ${item.company || 'Company'}<p>${item.description || 'Experience details'}</p></div>`).join('')}</section>
        <section><h2>Links</h2>${links.map((link) => `<a href="${link.url || '#'}" target="_blank">${link.label || 'Link'}</a>`).join(' ')}</section>
      </main>
    </div>`;

  const body = portfolio.template === 'modern'
    ? renderModernBody()
    : portfolio.template === 'creative'
      ? renderCreativeBody()
      : renderSimpleBody();

  return `<!DOCTYPE html><html><head><meta charset="UTF-8" /><title>${name}</title><style>${selectedTheme}</style></head><body>${body}</body></html>`;
};

export default function PortfolioPreviewPage() {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadPortfolio = async () => {
      const data = await getPortfolio(id);
      setPortfolio(data);
    };

    loadPortfolio();
  }, [id]);

  const handleSaveFinal = async () => {
    if (!portfolio) return;

    setSaving(true);

    try {
      await savePortfolio(portfolio);
      alert('Portfolio saved successfully.');
    } catch (error) {
      alert('Could not save: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = () => {
    if (!portfolio) return;

    const html = buildDownloadHtml(portfolio);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = (portfolio.full_name || 'portfolio').replace(/\s+/g, '-').toLowerCase();

    link.href = url;
    link.download = `${safeName}-portfolio.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!portfolio) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f8fafc', color: '#0f172a' }}>
        <div>Loading portfolio preview...</div>
      </div>
    );
  }

  const SelectedTemplate = templates[portfolio.template] || TemplateSimple;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 20px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/manage" style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 700 }}>
            ← Back to Manage
          </Link>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to={`/select-template/${id}`} style={{ textDecoration: 'none', background: '#0ea5e9', color: '#fff', padding: '10px 18px', borderRadius: '999px', fontWeight: 700 }}>
              Change Template
            </Link>
            <button type="button" onClick={handleSaveFinal} disabled={saving} style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: '999px', padding: '10px 18px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Saving...' : 'Save Final'}
            </button>
            <button type="button" onClick={handleDownload} style={{ background: '#10b981', color: '#fff', border: 'none', borderRadius: '999px', padding: '10px 18px', fontWeight: 700, cursor: 'pointer' }}>
              Download
            </button>
          </div>
        </div>

        <SelectedTemplate data={portfolio} />
      </div>
    </div>
  );
}
