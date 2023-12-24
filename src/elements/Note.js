import './Note.css';
import data from'../note-data.json';
function Note() {
  return (
    <div>
      {data.map(item => {
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