import './Notes.css';
import Note from './Note';
import NotesHeader from './Notes-Header';
import { Link } from "react-router-dom";

function  App() {
  return (
    <div>
      <Link to='/'>Home</Link>
      <NotesHeader/>
      <Note/>
    </div>
  );
}

export default App;
