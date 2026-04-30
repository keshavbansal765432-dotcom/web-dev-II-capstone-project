import React, { useState, useEffect } from 'react';
import FormBuilder from './components/FormBuilder';
import ReviewForm from './components/ReviewForm';
import './App.css';

function App() {
  const [formConfig, setFormConfig] = useState([]);
  const [view, setView] = useState('admin');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // Check if we are in shared mode
    if (params.get('mode') === 'shared') {
      setView('shared');
      // Decode the form structure from the URL
      const encodedConfig = params.get('config');
      if (encodedConfig) {
        try {
          const decoded = JSON.parse(atob(encodedConfig));
          setFormConfig(decoded);
        } catch (e) {
          console.error("Failed to decode form config");
        }
      }
    }
  }, []);

  const generateShareLink = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const encodedConfig = btoa(JSON.stringify(formConfig));
    return `${baseUrl}?mode=shared&config=${encodedConfig}`;
  };

  return (
    <div className="App">
      {view === 'admin' ? (
        <div className="admin-container">
          <header className="card">
            <h1>Review Collector (No-Backend)</h1>
            <p>1. Add fields below. 2. Copy the link. 3. Send to friend.</p>
          </header>
          
          <FormBuilder config={formConfig} setConfig={setFormConfig} />
          
          <div className="card share-section">
            <h3>Share Link</h3>
            <input readOnly value={generateShareLink()} />
            <button onClick={() => navigator.clipboard.writeText(generateShareLink())}>
              Copy Encoded Link
            </button>
          </div>
        </div>
      ) : (
        <ReviewForm config={formConfig} />
      )}
    </div>
  );
}

export default App;