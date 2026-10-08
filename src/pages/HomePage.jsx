import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f8fafc', color: '#0f172a' }}>
      <div style={{ maxWidth: '700px', textAlign: 'center', padding: '40px 24px' }}>
        <p style={{ letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0ea5e9', fontSize: '0.8rem', fontWeight: 700 }}>
          Portfolio Studio
        </p>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '16px' }}>Build a portfolio that feels like you.</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '32px', color: '#475569' }}>
          Create a polished personal portfolio, choose a beautiful layout, and manage updates from one place.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/create" style={{ textDecoration: 'none', background: '#0ea5e9', color: '#fff', padding: '12px 20px', borderRadius: '999px', fontWeight: 700 }}>
            Create Portfolio
          </Link>
          <Link to="/manage" style={{ textDecoration: 'none', background: '#fff', color: '#0f172a', border: '1px solid #cbd5e1', padding: '12px 20px', borderRadius: '999px', fontWeight: 700 }}>
            Manage Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
