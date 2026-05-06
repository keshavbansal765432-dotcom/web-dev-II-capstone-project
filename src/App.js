import React, { useState, useEffect } from 'react';
import './App.css';

// Form Builder Component
const FormBuilder = ({ config, setConfig }) => {
  const [newLabel, setNewLabel] = useState('');
  const [newType, setNewType] = useState('text');

  const addField = () => {
    if (!newLabel) return;
    setConfig([...config, { id: Date.now(), label: newLabel, type: newType }]);
    setNewLabel('');
  };

  const removeField = (id) => setConfig(config.filter(f => f.id !== id));

  return (
    <section className="card builder-card">
      <div className="card-header">
        <h2 className="section-title">1. Build Your Form</h2>
        <p className="section-subtitle">Select a data type and add your questions.</p>
      </div>
      <div className="builder-controls">
        <input className="input-main" placeholder="e.g., Your Feedback" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} />
        <select className="select-main" value={newType} onChange={(e) => setNewType(e.target.value)}>
          <option value="text">Short Text</option>
          <option value="textarea">Long Feedback</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
          <option value="range">Rating (1-10)</option>
        </select>
        <button className="btn-add" onClick={addField}>Add Question</button>
      </div>
      <div className="field-grid">
        {config.map(field => (
          <div key={field.id} className="field-card">
            <div className="field-info">
              <span className="field-label">{field.label}</span>
              <span className="field-type-tag">{field.type}</span>
            </div>
            <button className="btn-remove" onClick={() => removeField(field.id)}>&times;</button>
          </div>
        ))}
      </div>
    </section>
  );
};

// Review Form Component (Now with Email Submission)
const ReviewForm = ({ config }) => {
  const [responses, setResponses] = useState({});

  const handleInputChange = (label, value) => {
    setResponses({ ...responses, [label]: value });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    
    // Constructing the email body text
    let bodyText = "New Review Submission:%0D%0A%0D%0A";
    Object.entries(responses).forEach(([label, value]) => {
      bodyText += `${label}: ${value}%0D%0A`;
    });

    // Replace with your actual email address
    const adminEmail = "your-email@example.com"; 
    const subject = "New Form Submission - Review Collector Pro";
    
    window.location.href = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${bodyText}`;
  };

  return (
    <div className="card public-form-card">
      <h2>Submit Your Review</h2>
      <form onSubmit={handleEmailSubmit}>
        {config.map(field => (
          <div key={field.id} className="form-group">
            <label className="form-label">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea className="form-control" rows="4" onChange={(e) => handleInputChange(field.label, e.target.value)} required />
            ) : (
              <input type={field.type} className="form-control" onChange={(e) => handleInputChange(field.label, e.target.value)} required />
            )}
          </div>
        ))}
        <button type="submit" className="btn-submit">Submit via Email</button>
      </form>
    </div>
  );
};

function App() {
  const [formConfig, setFormConfig] = useState([]);
  const [view, setView] = useState('admin');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    const configData = params.get('config');
    if (mode === 'shared' && configData) {
      try {
        setFormConfig(JSON.parse(atob(configData)));
        setView('public');
      } catch (e) { console.error("Invalid config"); }
    }
  }, []);

  const getShareLink = () => {
    const encoded = btoa(JSON.stringify(formConfig));
    return `${window.location.origin}${window.location.pathname}?mode=shared&config=${encoded}`;
  };

  return (
    <div className="App">
      {view === 'admin' ? (
        <>
          <header className="card header-card">
            <h1>Review Collector Pro</h1>
            <div className="share-container">
              <input className="share-input" readOnly value={getShareLink()} />
              <button className="btn-copy" onClick={() => { navigator.clipboard.writeText(getShareLink()); alert("Copied!"); }}>Copy Link</button>
            </div>
          </header>
          <FormBuilder config={formConfig} setConfig={setFormConfig} />
          <button className="btn-submit" onClick={() => setView('public')}>Preview Form</button>
        </>
      ) : (
        <>
          <ReviewForm config={formConfig} />
          <button className="btn-remove" onClick={() => setView('admin')} style={{marginTop: '20px', fontSize: '1rem'}}>← Back to Editor</button>
        </>
      )}
    </div>
  );
}

export default App;