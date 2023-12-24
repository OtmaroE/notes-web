import { useState } from 'react';

import './Login.css';
import { isLoggedIn } from '../security/Protected';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const [loginError, setLoginError] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = document.forms[0];
    if (password.value === 'test' && username.value === 'test') {
      setLoginError(false);
      localStorage.setItem('token', 'ey');
      return <Navigate to='/' />
    } else {
      setLoginError(true);
    }
  }
  const loginForm = (
      <form onSubmit={handleSubmit}>
        <div>
          <div>Username:</div>
          <input type='text' name='username'/>
        </div>
        <div>
          <div>Password:</div>
          <input type='password' name='password'/>
        </div>
        <div id="error-message">
          { loginError ? 'Invalid username or password' : '' }
        </div>
        <div id="submit-button">
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  return (
    <div>
      { isLoggedIn() ? <Navigate to='/' /> : loginForm }
    </div>
  )
}