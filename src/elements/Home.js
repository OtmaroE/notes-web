import { Link } from "react-router-dom";
import { isLoggedIn } from "../security/Protected";

export default function Home() {
  const homePage = (
    <div>
      <ul>
        <li>
          <Link to='/notes'>See my notes</Link>
        </li>
        <li>
          <Link to='/logout'>Logout</Link>
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