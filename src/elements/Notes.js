import './Notes.css';
import Note from './Note';
import Header from './Header';
import { Link } from "react-router-dom";

function  App() {
  return (
    <div>
      <Link to='/'>Home</Link>
      <Header title="User's notes"/>
      <Note/>
    </div>
  );
}

export default App;
