import React, { useState } from 'react';

const FormBuilder = ({ config, setConfig }) => {
  const [newLabel, setNewLabel] = useState('');

  const addField = () => {
    if (!newLabel) return;
    setConfig([...config, { id: Date.now(), label: newLabel, type: 'text' }]);
    setNewLabel('');
  };

  const removeField = (id) => {
    setConfig(config.filter(f => f.id !== id));
  };

  return (
    <section className="card">
      <h2>1. Customize Your Form</h2>
      <div className="input-group">
        <input 
          placeholder="Field Label (e.g. Feedback)" 
          value={newLabel} 
          onChange={(e) => setNewLabel(e.target.value)} 
        />
        <button onClick={addField}>Add Field</button>
      </div>
      <ul className="field-list">
        {config.map(field => (
          <li key={field.id}>
            {field.label} ({field.type})
            <button className="btn-small" onClick={() => removeField(field.id)}>×</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FormBuilder;