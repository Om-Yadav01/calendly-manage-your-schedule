import React from 'react';

function TimeSlots({ selectedDate, onTimeSelect, bookings }) {
  const timeSlots = [
    '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];
  
  const getBookingStatus = (time) => {
    const bookingKey = `${selectedDate.toDateString()}-${time}`;
    const booking = bookings[bookingKey];
    
    if (!booking) return null;
    
    return {
      isBooked: booking.status === 'approved',
      isPending: booking.status === 'pending',
      isRejected: booking.status === 'rejected',
      message: booking.message
    };
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
    <div className="time-slots">
      <h2>Available Time Slots for {formatDate(selectedDate)}</h2>
      
      {timeSlots.map(time => {
        const bookingStatus = getBookingStatus(time);
        
        let className = 'time-slot';
        let isClickable = true;
        let statusText = '';
        
        if (bookingStatus) {
          if (bookingStatus.isBooked) {
            className += ' booked';
            isClickable = false;
            statusText = 'Approved';
          } else if (bookingStatus.isPending) {
            className += ' pending';
            isClickable = false;
            statusText = 'Pending Approval';
          } else if (bookingStatus.isRejected) {
            className += ' rejected';
            isClickable = true; // Can be re-booked
            statusText = 'Rejected';
          }
        }
        
        return (
          <div
            key={time}
            className={className}
            onClick={() => isClickable && onTimeSelect(time)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{time}</span>
              <div style={{ textAlign: 'right' }}>
                {bookingStatus && (
                  <div>
                    <span style={{ 
                      color: bookingStatus.isBooked ? '#4caf50' : 
                             bookingStatus.isPending ? '#ff9800' : 
                             bookingStatus.isRejected ? '#f44336' : '#999',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {statusText}
                    </span>
                    {bookingStatus.message && (
                      <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                        {bookingStatus.message}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TimeSlots; 