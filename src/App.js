import React, { useState } from 'react';
import HomePage from './components/HomePage';
import Calendar from './components/Calendar';
import TimeSlots from './components/TimeSlots';
import BookingForm from './components/BookingForm';
import Login from './components/Login';
import MentorView from './components/MentorView';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookings, setBookings] = useState({});
  const [currentView, setCurrentView] = useState('home'); // 'home', 'calendar', 'timeslots', 'booking', 'login', 'mentor'
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setCurrentView('timeslots');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setCurrentView('booking');
  };

  const handleBookingSubmit = (message) => {
    const bookingKey = `${selectedDate.toDateString()}-${selectedTime}`;
    setBookings(prev => ({
      ...prev,
      [bookingKey]: {
        date: selectedDate,
        time: selectedTime,
        message: message,
        status: 'pending'
      }
    }));
    setCurrentView('calendar');
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleApprove = (bookingKey) => {
    setBookings(prev => ({
      ...prev,
      [bookingKey]: {
        ...prev[bookingKey],
        status: 'approved'
      }
    }));
  };

  const handleReject = (bookingKey) => {
    setBookings(prev => ({
      ...prev,
      [bookingKey]: {
        ...prev[bookingKey],
        status: 'rejected'
      }
    }));
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('mentor');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('calendar');
  };

  const goBack = () => {
    if (currentView === 'timeslots') {
      setCurrentView('calendar');
      setSelectedDate(null);
    } else if (currentView === 'booking') {
      setCurrentView('timeslots');
      setSelectedTime(null);
    }
  };

  const goToMentorLogin = () => {
    setCurrentView('login');
  };

  const handleTryForFree = () => {
    setCurrentView('calendar');
  };

  const goToHome = () => {
    setCurrentView('home');
  };

  return (
    <div className="container">
      {/* Navigation - Only show when not on home page */}
      {currentView !== 'home' && (
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <button 
            className="btn btn-secondary" 
            onClick={goToHome}
            style={{ marginRight: '10px' }}
          >
            Home
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => setCurrentView('calendar')}
            style={{ marginRight: '10px' }}
          >
            Calendar
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={goToMentorLogin}
          >
            Mentor Login
          </button>
        </div>
      )}

      {currentView === 'home' && (
        <HomePage onTryForFree={handleTryForFree} />
      )}
      
      {currentView === 'calendar' && (
        <Calendar onDateSelect={handleDateSelect} />
      )}
      
      {currentView === 'timeslots' && (
        <>
          <button className="btn btn-secondary back-btn" onClick={goBack}>
            ← Back to Calendar
          </button>
          <TimeSlots 
            selectedDate={selectedDate}
            onTimeSelect={handleTimeSelect}
            bookings={bookings}
          />
        </>
      )}
      
      {currentView === 'booking' && (
        <>
          <button className="btn btn-secondary back-btn" onClick={goBack}>
            ← Back to Time Slots
          </button>
          <BookingForm 
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSubmit={handleBookingSubmit}
          />
        </>
      )}

      {currentView === 'login' && (
        <Login onLogin={handleLogin} />
      )}

      {currentView === 'mentor' && (
        <MentorView 
          bookings={bookings}
          onApprove={handleApprove}
          onReject={handleReject}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App; 