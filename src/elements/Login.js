import { useState } from 'react';

import './Login.css';
import { isLoggedIn } from '../security/Protected';
import { useNavigate } from 'react-router-dom';
import { login } from '../http-requests';

export default function Login() {
  const [loginError, setLoginError] = useState(false); 

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = document.forms[0];
    try {
      const response = await login(username.value, password.value);
      if(loginResponse.status !== 200) {
        setLoginError(true);
      } else {
        setLoginError(false);
        const token = await loginResponse.text();
        localStorage.setItem('token', token);
        navigate('/');
      }
    } catch (error) {
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