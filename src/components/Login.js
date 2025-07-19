import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username === 'test' && password === '1234') {
      onLogin();
    } else {
      setError('Invalid credentials. Use test/1234');
    }
  };

  return (
    <div className="login-form">
      <h2>Mentor Login</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <strong>Test Credentials:</strong><br />
        Username: test<br />
        Password: 1234
      </div>
    </div>
  );
}

export default Login; 