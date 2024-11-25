import { Tree, Button, Input } from "antd";
import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import {
  DeleteTwoTone,
  FolderAddTwoTone,
  FileAddTwoTone,
  LeftCircleTwoTone,
 } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { getFolders, getNotes, getNote, updateNote, addFolder } from "../../http-requests";
import './Editor.css';

const { DirectoryTree } = Tree;

export default function Editor() {
  const [directory, setDirectory] = useState([]);
  const [noteContent, setNoteContent] = useState('');
  const [selectedNote, setSelectedNote] = useState({});
  const [selectedFolder, setSelectedFolder] = useState({});
  const [isNoteSelected, setIsNoteSelected] = useState(false);
  const [addElement, setAddElement] = useState(false);
  const [adding, setAdding] = useState('');
  const [newElementName, setNewElementName] = useState('');

  const navigate = useNavigate();

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
      const note = await getNote(node.folderId, node.noteId);
      setNoteContent(note.content);
      setIsNoteSelected(true);
      setSelectedNote(note);
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
              folderId: note.folderId,
              type: 'note',
              isLeaf: true,
            })),
          }
        }
        return folder;
      });
      setDirectory(newFolders);
    }
  };

  const handleNewResourceName = (event) => {
    const { target: { value = '' } = {} } = event;
    setNewElementName(value)
  };

  const handleClick = () => {
    return navigate('/');
  };

  const handleSave = async () => {
    const { id, folderId } = selectedNote;
    const updatedNote = { content: noteContent};
    await updateNote(folderId, id, updatedNote);
  };

  const handleAddElement = async () => {
    if (adding === 'folder') {
      const folder = await addFolder({ name: newElementName });
      const newFolder = {
        title: folder.name,
        type: 'folder',
        key: folder.id,
        children: [],
      };
      const newDirectory = [...directory, newFolder];
      setDirectory(newDirectory);
    } else if (adding === 'note' ) {

    }
  };

  const handleOnClick = (_, data) => {
    // corrects for issue when selecting a folder that is open
    if (data.type === 'folder' && isNoteSelected) {
      setIsNoteSelected(false);
      setSelectedFolder({ id: data.key });
    }
  }
  
  const handleDeleteElement = async () => {
    if(!isNoteSelected) {
      console.log('delete ', selectedFolder);
    }
  };

  return (
    <div>
      <div className='tree'>
        <div className='control-buttons'>
          <LeftCircleTwoTone className='menu-icon' onClick={() => handleClick()}>Back</LeftCircleTwoTone>
          <FolderAddTwoTone className='menu-icon' type='primary' onClick={() => { setAddElement(true); setAdding('folder'); }}>Add Folder</FolderAddTwoTone>
          <FileAddTwoTone className='menu-icon' type='primary' onClick={() => { setAddElement(true); setAdding('note'); }}></FileAddTwoTone>
          <DeleteTwoTone className='menu-icon' onClick={handleDeleteElement} />
        </div>
        {
          addElement &&
          <div className='add-folder'>
            <Input placeholder={ `Add ${adding} name` } onChange={handleNewResourceName} ></Input>
            <Button type='primary' onClick={() => { handleAddElement(); setAddElement(false); }}>Add</Button>
            <Button danger='true' onClick={() => { setAddElement(false); }}>Cancel</Button>
          </div>
        }
        <DirectoryTree
          treeData={directory}
          onSelect={handleOnSelect}
          onFocus={handleOnClick}
          className='navigator'
        />
      </div>
      <div data-color-mode="light">
        {
          isNoteSelected ?
            <MDEditor
            className='panel'
            value={noteContent}
            onChange={setNoteContent}
            height='94vh'
            />
          :
          <div>Please select a note to edit</div>
        }
      </div>
      {
        isNoteSelected &&
        <div className='control-buttons'>
          <Button type='primary' onClick={handleSave}>Save</Button>
          <Button danger='true' type='primary'>Delete</Button>
        </div>
      }
    </div>
  )
}