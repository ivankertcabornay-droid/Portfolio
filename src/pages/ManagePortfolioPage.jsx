import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deletePortfolio, getPortfolios, getRawPortfolios } from '../lib/portfolioStorage';

export default function ManagePortfolioPage() {
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);
  const [rawPortfolios, setRawPortfolios] = useState([]);

  const refreshPortfolios = async () => {
    setPortfolios(await getPortfolios());
    setRawPortfolios(await getRawPortfolios());
  };

  useEffect(() => {
    refreshPortfolios();
  }, []);

  const handleDelete = async (id) => {
    await deletePortfolio(id);
    refreshPortfolios();
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px 40px', background: '#f8fafc' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <p style={{ textTransform: 'uppercase', letterSpacing: '0.12em', color: '#0ea5e9', fontWeight: 700, margin: 0 }}>Portfolio Manager</p>
          <h1 style={{ marginTop: '8px', marginBottom: 0, color: '#0f172a' }}>Your portfolio list</h1>
        </div>
        <Link to="/create" style={{ textDecoration: 'none', background: '#38bdf8', color: '#fff', padding: '12px 18px', borderRadius: '10px', fontWeight: 700, boxShadow: '0 8px 18px rgba(56, 189, 248, 0.2)' }}>
          Create New
        </Link>
      </div>

      {portfolios.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '30px', textAlign: 'center', boxShadow: '0 8px 20px rgba(15, 23, 42, 0.03)' }}>
          <p style={{ margin: 0, fontSize: '1.05rem', color: '#475569' }}>No portfolios saved yet.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {portfolios.map((portfolio) => (
            <div key={portfolio.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 8px 20px rgba(15, 23, 42, 0.04)' }}>
              <p style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                {portfolio.template || 'simple'} template
              </p>
              <h2 style={{ margin: '0 0 8px', color: '#0f172a' }}>{portfolio.full_name || 'Untitled Portfolio'}</h2>
              <p style={{ margin: '0 0 20px', color: '#475569' }}>{portfolio.email || 'No email provided'}</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button type="button" onClick={() => navigate(`/create?id=${portfolio.id}`)} style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 12px', cursor: 'pointer', fontWeight: 600 }}>
                  Edit
                </button>
                <button type="button" onClick={() => navigate(`/preview/${portfolio.id}`)} style={{ background: '#e2e8f0', color: '#0f172a', border: 'none', borderRadius: '8px', padding: '10px 12px', cursor: 'pointer', fontWeight: 600 }}>
                  Preview
                </button>
                <button type="button" onClick={() => handleDelete(portfolio.id)} style={{ background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '8px', padding: '10px 12px', cursor: 'pointer', fontWeight: 600 }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
