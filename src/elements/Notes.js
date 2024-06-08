import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

import './Notes.css';
import './Note.css';
import Header from './Header';
import { getNotes } from '../http-requests';

function  App() {
  const [notes, setNotes] = useState([]);

  const location = useLocation();

  useEffect(() => {
    getNotes(location.state.id, setNotes);
  }, []);

  return (
    <div>
      <Link to='/folders'>Folders</Link>
      <Header id='notes header' title={location.state.name}/>
      <div id='notes directory'>
        {notes.map(item => {
          return (
            <div>
            <div id='note'>
              <h1 id='note_title'>{item.name}</h1>
              <div id='note_content'>{item.content}</div>
            </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
