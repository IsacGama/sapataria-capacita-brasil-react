import './Stars.css';

function Stars({ rating, size = 'medium' }) {
  const sizeClasses = {
    small: 'star-small',
    medium: 'star-medium',
    large: 'star-large'
  };

  const sizeClass = sizeClasses[size] || sizeClasses.medium;

  return (
    <div className={`stars-container ${sizeClass}`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const fillPercentage = Math.max(0, Math.min(1, rating - star + 1)) * 100;
        return (
          <div className="star-container" key={star}>
            <div className="star-empty">★</div>
            <div 
              className="star-filled" 
              style={{ width: `${fillPercentage}%` }}
            >
              ★
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Stars;