import React from 'react';

function MentorView({ bookings, onApprove, onReject, onLogout }) {
  const pendingBookings = Object.entries(bookings).filter(([key, booking]) => 
    !booking.status || booking.status === 'pending'
  );

  const approvedBookings = Object.entries(bookings).filter(([key, booking]) => 
    booking.status === 'approved'
  );

  const rejectedBookings = Object.entries(bookings).filter(([key, booking]) => 
    booking.status === 'rejected'
  );

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderBookingList = (bookings, title, showActions = false) => {
    if (bookings.length === 0) {
      return (
        <div className="booking-section">
          <h3>{title}</h3>
          <p style={{ color: '#666', fontStyle: 'italic' }}>No {title.toLowerCase()} found.</p>
        </div>
      );
    }

    return (
      <div className="booking-section">
        <h3>{title} ({bookings.length})</h3>
        {bookings.map(([key, booking]) => (
          <div key={key} className="booking-item">
            <div className="booking-info">
              <div><strong>Date:</strong> {formatDate(booking.date)}</div>
              <div><strong>Time:</strong> {booking.time}</div>
              <div><strong>Purpose:</strong> {booking.message}</div>
              {booking.status && (
                <div><strong>Status:</strong> 
                  <span style={{ 
                    color: booking.status === 'approved' ? 'green' : 
                           booking.status === 'rejected' ? 'red' : 'orange',
                    marginLeft: '5px'
                  }}>
                    {booking.status}
                  </span>
                </div>
              )}
            </div>
            {showActions && (
              <div className="booking-actions">
                <button 
                  className="btn btn-primary" 
                  onClick={() => onApprove(key)}
                  style={{ marginRight: '10px' }}
                >
                  Approve
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => onReject(key)}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="mentor-view">
      <div className="mentor-header">
        <h2>Mentor Dashboard</h2>
        <button className="btn btn-secondary" onClick={onLogout}>
          Logout
        </button>
      </div>

      {renderBookingList(pendingBookings, 'Pending Requests', true)}
      {renderBookingList(approvedBookings, 'Approved Requests')}
      {renderBookingList(rejectedBookings, 'Rejected Requests')}
    </div>
  );
}

export default MentorView; 