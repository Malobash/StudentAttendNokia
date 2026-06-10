import { useState } from 'react'
import './App.css'
import Register from './Register'

function App() {
  const [view, setView] = useState<'login' | 'register'>('register')

  return (
    <>
      {view === 'register' ? (
        <Register onNavigateToLogin={() => setView('login')} />
      ) : (
        <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'sans-serif', textAlign: 'center' }}>
          <h2>Login Page Placeholder</h2>
          <p>This is where your login UI lives.</p>
          <button 
            onClick={() => setView('register')} 
            style={{ background: 'none', border: 'none', color: '#007bff', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Don't have an account? Register
          </button>
        </div>
      )}
    </>
  )
}

export default App