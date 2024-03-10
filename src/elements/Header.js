import './Header.css';

export default function NotesHeader(props) {

  return (
    <div id='note-header'>{props.title || 'Title'}</div>
  )
}