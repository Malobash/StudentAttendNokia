import { useState } from 'react';
import './App.css';
import Register from './Register';

function App() {
  // Use a 'view' state to toggle cleanly between 'login' and 'register'
  const [view, setView] = useState<'login' | 'register'>('login');
  const [isStudent, setIsStudent] = useState(false);

  return (
    <>
      {view === 'register' ? (
        <Register onNavigateToLogin={() => setView('login')} />
      ) : (
        /* Intern 2's Login UI replacing the old placeholder */
        <div className="login-page">
          <div className="login-card">
            <h2>Login</h2>

            <form onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="Enter your email" />

              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="Enter your password" />

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

              <button type="submit">Login</button>

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