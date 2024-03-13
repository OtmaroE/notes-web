import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

import './Notes.css';
import './Note.css';
import Header from './Header';
import { getToken } from '../security/Protected';

function  App() {
  const [notes, setNotes] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const getNotes = async () => {
      const token = getToken();
      try {
        const notesResponse = await fetch(`http://localhost:3030/users/me/folders/${location.state.id}/notes`, {
          headers: {
            Authorization: `bearer ${token}`,
          }
        });
        if (notesResponse.status !== 200) {
          console.log('unable to load notes');
        } else {
          const notes = await notesResponse.json();
          setNotes(notes);
        }
      } catch (error) {
        console.log('unable to load notes');
      }
    }
    getNotes();
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
