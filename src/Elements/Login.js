import { useState } from 'react';
import './Login.css';

export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  return (
    <div>
      <div>
        <div>Username:</div>
        <input type="text" onChange={e => setUserName(e.target.value)}/>
      </div>
      <div>
        <div>Password:</div>
        <input type="password" onChange={e => setPassword(e.target.value)}/>
      </div>
      <div id="submit-button">
        <button type="submit">Submit</button>
      </div>
    </div>
  )
}