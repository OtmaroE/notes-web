import { Tree } from "antd";
import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

import { getFolders, getNotes } from "../http-requests";
import './Folders-beta.css';
const { DirectoryTree } = Tree;

export default function FoldersBeta() {
  const [directory, setDirectory] = useState([]);
  const [noteContent, setNoteContent] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const setup = async () => {
      const folders = await getFolders();
      const newDirectory = [];
      folders.forEach(folder => {
        newDirectory.push({
          title: folder.name,
          type: 'folder',
          key: folder.id,
          children: [],
        });
      });
      setDirectory(newDirectory);
    }
    setup();
  }, []);

  const handleOnSelect = async (id, event) => {
    const { node } = event;
    if (node.expanded) return;
    if (node.type === 'note') {
      const note = notes.find(note => note.id === node.noteId);
      setNoteContent(note.content);
    } else {
      const notes = await getNotes(id);
      const newFolders = directory.map(folder => {
        if(folder.key === id[0]) {
          return {
            ...folder,
            children: notes.map(note => ({
              title: note.name,
              key: `note-${note.id}`,
              noteId: note.id,
              type: 'note',
              isLeaf: true,
            })),
          }
        }
        return folder;
      });
      setDirectory(newFolders);
      setNotes(notes);
    }
  }

  return (
    <div>
      <DirectoryTree className='tree'
        treeData={directory}
        onSelect={handleOnSelect}
      />
      <div data-color-mode="light">
        <MDEditor className='panel' value={noteContent} onChange={setNoteContent} height='99vh'/>
      </div>
    </div>
  )
}