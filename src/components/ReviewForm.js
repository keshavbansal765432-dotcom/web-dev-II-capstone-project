import React, { useState } from 'react';

const ReviewForm = ({ config }) => {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct the email body
    let body = "New Review Received:%0D%0A%0D%0A";
    config.forEach(field => {
      body += `${field.label}: ${formData[field.label] || 'N/A'}%0D%0A`;
    });

    // Replace with your actual email
    const mailtoLink = `mailto:your-email@example.com?subject=New Review&body=${body}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="card shared-view">
      <h2>Submit Your Review</h2>
      <form onSubmit={handleSubmit}>
        {config.map(field => (
          <div key={field.id} className="form-group">
            <label>{field.label}</label>
            <input 
              required
              onChange={(e) => setFormData({...formData, [field.label]: e.target.value})} 
            />
          </div>
        ))}
        <button type="submit" className="btn-submit">Submit via Email</button>
      </form>
    </div>
  );
};

export default ReviewForm;