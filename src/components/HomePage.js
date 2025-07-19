import React from 'react';

function HomePage({ onTryForFree }) {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Schedule Meetings with Ease
          </h1>
          <p className="hero-subtitle">
            The simplest way to schedule meetings and appointments. 
            No more back-and-forth emails. Just share your calendar and let others book time with you.
          </p>
          <button 
            className="btn btn-primary hero-cta"
            onClick={onTryForFree}
          >
            Try for Free
          </button>
        </div>
        <div className="hero-image">
          <div className="calendar-preview">
            <div className="calendar-header-preview">
              <span>←</span>
              <h3>December 2024</h3>
              <span>→</span>
            </div>
            <div className="calendar-grid-preview">
              {Array.from({ length: 35 }, (_, i) => (
                <div key={i} className={`day-preview ${i >= 25 ? 'other-month' : ''}`}>
                  {i < 25 ? i + 1 : ''}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2 className="section-title">Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Easy Scheduling</h3>
            <p>Simple and intuitive calendar interface that makes booking appointments effortless.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏰</div>
            <h3>Time Management</h3>
            <p>Efficiently manage your time slots and avoid double bookings with our smart system.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📧</div>
            <h3>Instant Notifications</h3>
            <p>Get notified immediately when someone books a meeting with you.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Your data is protected with industry-standard security measures.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of professionals who have simplified their scheduling process.</p>
        <button 
          className="btn btn-primary cta-button"
          onClick={onTryForFree}
        >
          Start Scheduling Now
        </button>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>Made with ❤️ by Om Yadav</p>
      </footer>
    </div>
  );
}

export default HomePage; 