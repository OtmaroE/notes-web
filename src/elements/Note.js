import './Note.css';
import data from'../note-data.json';
import { useEffect, useState } from 'react';

function Note() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    setNotes(data);
  })
  return (
    <div>
      {notes.map(item => {
        return (
          <div>
          <div id='note'>
            <h1 id='note_title'>{item.title}</h1>
            <div id='note_content'>{item.content}</div>
          </div>
          </div>
        )
       } )
      }
      </div>
  )
}

export default Note;