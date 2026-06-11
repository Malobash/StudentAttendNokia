import { useState } from "react";
import "./App.css";

function App() {
  const [isStudent, setIsStudent] = useState(false);
  return (
    <div className="login-page">
      <div className="login-card">
       
        <h2>Login</h2>

        <form>
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
            Don't have an account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default App;