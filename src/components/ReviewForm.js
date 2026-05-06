import React from 'react';

const ReviewForm = ({ config }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Review submitted successfully!");
  };

  return (
    <div className="card public-form-card">
      <h2 className="form-title">Submit Your Review</h2>
      <p className="form-subtitle">Please fill out the fields below.</p>
      
      <form onSubmit={handleSubmit}>
        {config.map((field) => (
          <div key={field.id} className="form-group">
            <label className="form-label">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea className="form-control" rows="4" required />
            ) : field.type === 'range' ? (
              <div className="range-container">
                <input type="range" min="1" max="10" className="form-range" />
                <div className="range-labels">
                  <span>1</span>
                  <span>10</span>
                </div>
              </div>
            ) : (
              <input type={field.type} className="form-control" required />
            )}
          </div>
        ))}
        
        {config.length > 0 ? (
          <button type="submit" className="btn-submit">Submit Feedback</button>
        ) : (
          <p className="empty-state">This form has no questions yet.</p>
        )}
      </form>
    </div>
  );
};

export default ReviewForm;