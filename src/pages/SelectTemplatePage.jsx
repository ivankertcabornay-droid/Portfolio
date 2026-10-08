import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TemplateSimple from '../components/TemplateSimple';
import TemplateModern from '../components/TemplateModern';
import TemplateCreative from '../components/TemplateCreative';
import { getPortfolio, savePortfolio } from '../lib/portfolioStorage';

const templates = [
  { id: 'simple', name: 'Simple', description: 'Clean and professional', Component: TemplateSimple },
  { id: 'modern', name: 'Modern', description: 'Cards, sections, and modern contrast', Component: TemplateModern },
  { id: 'creative', name: 'Creative', description: 'Bold and visually expressive', Component: TemplateCreative },
];

export default function SelectTemplatePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedTemplate, setSelectedTemplate] = useState('simple');
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    const loadPortfolio = async () => {
      const savedPortfolio = await getPortfolio(id);
      if (savedPortfolio) {
        setPortfolioData(savedPortfolio);
        setSelectedTemplate(savedPortfolio.template || 'simple');
      }
    };

    loadPortfolio();
  }, [id]);

  const handleTemplatePick = async (templateId) => {
    setSelectedTemplate(templateId);

    if (portfolioData) {
      const updatedPortfolio = { ...portfolioData, template: templateId };
      await savePortfolio(updatedPortfolio);
      setPortfolioData(updatedPortfolio);
    }
  };

  const currentTemplate = templates.find((template) => template.id === selectedTemplate) || templates[0];
  const TemplateComponent = currentTemplate.Component;

  if (!portfolioData) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f8fafc' }}>
        <div>Loading portfolio data...</div>
      </div>
    );
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', gap: '12px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0ea5e9', fontWeight: 700 }}>Template Studio</p>
            <h1 style={{ margin: '8px 0 0' }}>Select a portfolio template</h1>
          </div>
          <Link to="/manage" style={{ textDecoration: 'none', color: '#0f172a', fontWeight: 700 }}>Back to Manage</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          {templates.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => handleTemplatePick(template.id)}
              style={{
                textAlign: 'left',
                border: selectedTemplate === template.id ? '2px solid #0ea5e9' : '1px solid #cbd5e1',
                background: selectedTemplate === template.id ? '#e0f2fe' : '#fff',
                color: '#0f172a',
                borderRadius: '18px',
                padding: '20px',
                cursor: 'pointer',
                boxShadow: '0 10px 20px rgba(15, 23, 42, 0.04)',
              }}
            >
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b' }}>{template.name}</div>
              <h3 style={{ margin: '10px 0 8px' }}>{template.description}</h3>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
          <button type="button" onClick={() => navigate(`/preview/${id}`)} style={{ background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: '999px', padding: '12px 24px', fontWeight: 700, cursor: 'pointer' }}>
            Preview Portfolio
          </button>
        </div>

        <TemplateComponent data={portfolioData} />
      </div>
    </div>
  );
}
