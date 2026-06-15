import { useState } from 'react';
import './App.css';
import Register from './Register';

const API_URL = 'http://localhost:5000';

function App() {
  // Use a 'view' state to toggle cleanly between 'login' and 'register'
  const [view, setView] = useState<'login' | 'register'>('login');
  const [isStudent, setIsStudent] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
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

  return (
    <>
      {view === 'register' ? (
        <Register onNavigateToLogin={() => setView('login')} />
      ) : (
        /* Intern 2's Login UI replacing the old placeholder */
        <div className="login-page">
          <div className="login-card">
            <h2>Login</h2>

            {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

            <form onSubmit={handleLogin}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />

              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />

              <div className="role-row">
                <span>Role: {isStudent ? "Student" : "Teacher"}</span>
                <label className="switch" htmlFor="role-switch">
                  <span className="sr-only">Role switch</span>
                  <input
                    id="role-switch"
                    type="checkbox"
                    checked={isStudent}
                    onChange={() => setIsStudent(!isStudent)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>

              <p className="register-link">
                Don't have an account?{' '}
                <button 
                  type="button"
                  onClick={() => setView('register')}
                  style={{ background: 'none', border: 'none', color: '#007bff', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
                >
                  Register
                </button>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;