import React, { useState } from 'react';

const FormBuilder = ({ config, setConfig }) => {
  const [newLabel, setNewLabel] = useState('');
  const [newType, setNewType] = useState('text');

  const addField = () => {
    if (!newLabel) return;
    setConfig([...config, { id: Date.now(), label: newLabel, type: newType }]);
    setNewLabel('');
  };

  const removeField = (id) => {
    setConfig(config.filter(f => f.id !== id));
  };

  return (
    <section className="card builder-card">
      <div className="card-header">
        <h2 className="section-title">1. Build Your Form</h2>
        <p className="section-subtitle">Select a data type and add your questions.</p>
      </div>
      
      <div className="builder-controls">
        <input 
          className="input-main"
          placeholder="e.g., What is your Roll No?" 
          value={newLabel} 
          onChange={(e) => setNewLabel(e.target.value)} 
        />
        <div className="select-wrapper">
          <select className="select-main" value={newType} onChange={(e) => setNewType(e.target.value)}>
            <option value="text">Short Text</option>
            <option value="textarea">Long Feedback</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="range">Rating (1-10)</option>
            <option value="email">Email Address</option>
            <option value="time">Time</option>
          </select>
        </div>
        <button className="btn-add" onClick={addField}>Add Question</button>
      </div>

      <div className="field-grid">
        {config.map(field => (
          <div key={field.id} className="field-card">
            <div className="field-info">
              <span className="field-label">{field.label}</span>
              <span className="field-type-tag">{field.type}</span>
            </div>
            <button className="btn-remove" onClick={() => removeField(field.id)} title="Delete Field">
              &times;
            </button>
          </div>
        ))}
        {config.length === 0 && <p className="empty-state">No fields added yet. Start building above!</p>}
      </div>
    </section>
  );
};

export default FormBuilder;