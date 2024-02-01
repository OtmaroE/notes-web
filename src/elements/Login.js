import { useState } from 'react';

import './Login.css';
import { isLoggedIn } from '../security/Protected';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [loginError, setLoginError] = useState(false); 

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = document.forms[0];
    const loginResponse = await fetch(`http://localhost:3030/users/login?email=${username.value}&password=${password.value}`, {
      method: 'POST',
    });
    if(loginResponse.status !== 200) {
      setLoginError(true);
    } else {
      setLoginError(false);
      localStorage.setItem('token', loginResponse.text());
      navigate('/');
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