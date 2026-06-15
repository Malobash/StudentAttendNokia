import React, { useState } from 'react';
import './App.css';
import Register from './Register.jsx';

const API_URL = 'http://localhost:5000';

function App() {
  const [view, setView] = useState('login');
  const [isStudent, setIsStudent] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('email', data.email);
        alert('Login successful!');
        setEmail('');
        setPassword('');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return React.createElement(
    React.Fragment,
    null,
    view === 'register'
      ? React.createElement(Register, { onNavigateToLogin: () => setView('login') })
      : React.createElement(
          'div',
          { className: 'login-page' },
          React.createElement(
            'div',
            { className: 'login-card' },
            React.createElement('h2', null, 'Login'),
            error && React.createElement('p', { style: { color: 'red', fontSize: '14px' } }, error),
            React.createElement(
              'form',
              { onSubmit: handleLogin },
              React.createElement('label', { htmlFor: 'email' }, 'Email'),
              React.createElement('input', {
                id: 'email',
                type: 'email',
                placeholder: 'Enter your email',
                value: email,
                onChange: (e) => setEmail(e.target.value),
                required: true,
              }),
              React.createElement('label', { htmlFor: 'password' }, 'Password'),
              React.createElement('input', {
                id: 'password',
                type: 'password',
                placeholder: 'Enter your password',
                value: password,
                onChange: (e) => setPassword(e.target.value),
                required: true,
              }),
              React.createElement(
                'div',
                { className: 'role-row' },
                React.createElement('span', null, `Role: ${isStudent ? 'Student' : 'Teacher'}`),
                React.createElement(
                  'label',
                  { className: 'switch', htmlFor: 'role-switch' },
                  React.createElement('span', { className: 'sr-only' }, 'Role switch'),
                  React.createElement('input', {
                    id: 'role-switch',
                    type: 'checkbox',
                    checked: isStudent,
                    onChange: () => setIsStudent(!isStudent),
                  }),
                  React.createElement('span', { className: 'slider' })
                )
              ),
              React.createElement(
                'button',
                { type: 'submit', disabled: loading },
                loading ? 'Logging in...' : 'Login'
              ),
              React.createElement(
                'p',
                { className: 'register-link' },
                "Don't have an account? ",
                React.createElement(
                  'button',
                  {
                    type: 'button',
                    onClick: () => setView('register'),
                    style: {
                      background: 'none',
                      border: 'none',
                      color: '#007bff',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      padding: 0,
                    },
                  },
                  'Register'
                )
              )
            )
          )
        )
  );
}

export default App;
