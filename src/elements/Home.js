import { Link } from "react-router-dom";

import './Folders.css';
import { isLoggedIn } from "../security/Protected";

export default function Home() {
  const homePage = (
    <div>
      <ul>
        <li>
          <Link to='/folders'>See my folders</Link>
        </li>
        <li>
          <Link to='/logout'>Logout</Link>
        </li>
        <li>
          <Link to="/folders-beta">New Folders</Link>
        </li>
      </ul>
    </div>
  )
  return (
    <div>
      {isLoggedIn() ? homePage : <Link to='/login'>Login</Link>}
    </div>
  )
}