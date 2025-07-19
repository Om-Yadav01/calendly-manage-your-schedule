import React, { useState } from 'react';

function BookingForm({ selectedDate, selectedTime, onSubmit }) {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit(message);
    }
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="booking-form">
      <h2>Book Appointment</h2>
      <p><strong>Date:</strong> {formatDate(selectedDate)}</p>
      <p><strong>Time:</strong> {selectedTime}</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="message">What is the purpose of your appointment?</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Please describe the purpose of your appointment..."
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Book Appointment
        </button>
      </form>
    </div>
  );
}

export default BookingForm; 