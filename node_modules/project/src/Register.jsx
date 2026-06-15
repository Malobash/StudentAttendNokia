import React, { useState } from 'react';

const API_URL = 'http://localhost:5000';

function Register({ onNavigateToLogin }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dob: '',
    studentId: '',
    className: '',
    password: '',
    confirmPassword: '',
    isTeacher: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          studentId: formData.studentId,
          className: formData.className,
          isTeacher: formData.isTeacher,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Registration successful! Redirecting to login...');
        setFormData({
          fullName: '',
          email: '',
          dob: '',
          studentId: '',
          className: '',
          password: '',
          confirmPassword: '',
          isTeacher: false,
        });
        setTimeout(() => onNavigateToLogin(), 2000);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return React.createElement(
    'div',
    {
      style: {
        maxWidth: '400px',
        margin: '40px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        fontFamily: 'sans-serif',
        backgroundColor: '#fff',
        color: '#333',
      },
    },
    React.createElement('h2', { style: { textAlign: 'center', marginBottom: '20px' } }, 'Register'),
    error && React.createElement('p', { style: { color: 'red', fontSize: '14px', marginBottom: '10px' } }, error),
    success && React.createElement('p', { style: { color: 'green', fontSize: '14px', marginBottom: '10px' } }, success),
    React.createElement(
      'form',
      { onSubmit: handleSubmit, style: { display: 'flex', flexDirection: 'column', gap: '12px' } },
      ['fullName', 'email', 'dob', 'studentId', 'className', 'password', 'confirmPassword'].map((field) =>
        React.createElement(
          'div',
          { key: field },
          React.createElement('label', { style: { display: 'block', marginBottom: '4px', fontWeight: 'bold' } }, 
            field.replace(/([A-Z])/g, ' $1').trim()
          ),
          React.createElement('input', {
            type: field === 'dob' ? 'date' : field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text',
            name: field,
            value: formData[field],
            onChange: handleChange,
            required: true,
            style: { width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' },
          })
        )
      ),
      React.createElement(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: '10px', margin: '8px 0' } },
        React.createElement('label', { style: { fontWeight: 'bold' } }, 'Teacher (if turned on):'),
        React.createElement('input', {
          type: 'checkbox',
          name: 'isTeacher',
          checked: formData.isTeacher,
          onChange: handleChange,
          style: { width: '18px', height: '18px', cursor: 'pointer' },
        })
      ),
      React.createElement(
        'button',
        {
          type: 'submit',
          disabled: loading,
          style: {
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            marginTop: '10px',
            opacity: loading ? 0.6 : 1,
          },
        },
        loading ? 'Registering...' : 'Register'
      )
    ),
    React.createElement(
      'div',
      { style: { marginTop: '16px', textAlign: 'center' } },
      React.createElement(
        'button',
        {
          onClick: onNavigateToLogin,
          style: {
            background: 'none',
            border: 'none',
            color: '#007bff',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: '14px',
          },
        },
        'Already have an account? Login'
      )
    )
  );
}

export default Register;
