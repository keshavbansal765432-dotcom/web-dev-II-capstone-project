import React from 'react';

const ReviewDashboard = ({ reviews, onDelete }) => {
  return (
    <section className="card">
      <h2>2. Received Reviews ({reviews.length})</h2>
      {reviews.length === 0 ? <p>No reviews yet.</p> : (
        <div className="review-list">
          {reviews.map(review => (
            <div key={review.id} className="review-item">
              <div className="review-content">
                {Object.entries(review).map(([key, val]) => (
                  key !== 'id' && <p key={key}><strong>{key}:</strong> {val}</p>
                ))}
              </div>
              <button className="btn-delete" onClick={() => onDelete(review.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ReviewDashboard;