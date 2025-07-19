import React, { useState } from 'react';

function Calendar({ onDateSelect }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add days from previous month
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      days.push({ date: currentDate, isCurrentMonth: true });
    }
    
    // Add days from next month to complete the grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ date: nextDate, isCurrentMonth: false });
    }
    
    return days;
  };
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const handleDateClick = (date) => {
    if (date >= new Date()) {
      onDateSelect(date);
    }
  };
  
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const days = getDaysInMonth(currentDate);
  
  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="btn btn-secondary" onClick={goToPreviousMonth}>
          ←
        </button>
        <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <button className="btn btn-secondary" onClick={goToNextMonth}>
          →
        </button>
      </div>
      
      <div className="calendar-grid">
        {dayNames.map(day => (
          <div key={day} style={{ textAlign: 'center', fontWeight: 'bold', padding: '10px' }}>
            {day}
          </div>
        ))}
        
        {days.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${!day.isCurrentMonth ? 'other-month' : ''}`}
            onClick={() => handleDateClick(day.date)}
            style={{
              cursor: day.date >= new Date() ? 'pointer' : 'default',
              opacity: day.date >= new Date() ? 1 : 0.5
            }}
          >
            {day.date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar; 