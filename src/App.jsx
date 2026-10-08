import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InformationFormPage from './pages/InformationFormPage';
import ManagePortfolioPage from './pages/ManagePortfolioPage';
import SelectTemplatePage from './pages/SelectTemplatePage';
import PortfolioPreviewPage from './pages/PortfolioPreviewPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<InformationFormPage />} />
        <Route path="/manage" element={<ManagePortfolioPage />} />
        <Route path="/select-template/:id" element={<SelectTemplatePage />} />
        <Route path="/preview/:id" element={<PortfolioPreviewPage />} />
      </Routes>
    </Router>
  );
}