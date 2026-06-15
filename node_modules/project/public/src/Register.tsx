import React, { useState } from 'react';

interface RegisterProps {
  onNavigateToLogin: () => void;
}

const API_URL = 'http://localhost:5000';

const Register: React.FC<RegisterProps> = ({ onNavigateToLogin }) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
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

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'sans-serif', backgroundColor: '#fff', color: '#333' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>
      {error && <p style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}
      {success && <p style={{ color: 'green', fontSize: '14px', marginBottom: '10px' }}>{success}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Date of Birth:</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Student ID:</label>
          <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Class:</label>
          <input type="text" name="className" value={formData.className} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '8px 0' }}>
          <label style={{ fontWeight: 'bold' }}>Teacher (if turned on):</label>
          <input type="checkbox" name="isTeacher" checked={formData.isTeacher} onChange={handleChange} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
        </div>

        <button type="submit" disabled={loading} style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold', marginTop: '10px', opacity: loading ? 0.6 : 1 }}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <button onClick={onNavigateToLogin} style={{ background: 'none', border: 'none', color: '#007bff', textDecoration: 'underline', cursor: 'pointer', fontSize: '14px' }}>
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default Register;