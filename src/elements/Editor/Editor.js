import {
  Tree,
  Button,
  Input,
  Modal,
  notification
} from "antd";
import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import {
  DeleteOutlined,
  FolderAddOutlined,
  FileAddOutlined,
  LogoutOutlined,
 } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import {
  getFolders,
  getNotes,
  getNote,
  updateNote,
  addFolder,
  addNote,
  deleteNote,
  deleteFolder,
} from "../../http-requests";
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
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const initialState = async () => {
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

  useEffect(() => {
    initialState();
  }, []);

  const openNotification = ({ message, description }) => {
    api.success({
      message,
      description,
      placement: 'topRight',
    });
  };

  const handleOnSelect = async (id, event) => {
    const { node } = event;
    if (node.type === 'note') {
      const note = await getNote(node.folderId, node.noteId);
      setNoteContent(note.content);
      setIsNoteSelected(true);
      setSelectedNote(note);
    } else {
      const folderId = id[0];
      setIsNoteSelected(false);
      setSelectedFolder({ id: folderId, name: node.title });
      await updateDirectoryForFolder(folderId);
    }
  };

  const handleNewResourceName = (event) => {
    const { target: { value = '' } = {} } = event;
    setNewElementName(value)
  };

  const handleBackButton = () => {
    return navigate('/logout');
  };

  const handleSave = async () => {
    const { id, folderId } = selectedNote;
    const updatedNote = { content: noteContent};
    await updateNote(folderId, id, updatedNote);
    openNotification({ message: 'Saved', description: 'Note saved successfully' });
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
      const folderId = selectedFolder.id;
      await addNote(folderId, { name: newElementName, folderId });
      await updateDirectoryForFolder(folderId);
    }
  };

  const handleOnClick = (_, data) => {
    // corrects for issue when selecting a folder that is open
    if (data.type === 'folder' && isNoteSelected) {
      setIsNoteSelected(false);
      setSelectedFolder({ id: data.key });
    }
  }
  const handleAddElementFromLeftMenu = () => {
    // case when nothing has been selected
    const notFolderSelected = Object.keys(selectedFolder).length === 0;
    if (!isNoteSelected && notFolderSelected) {
      return;
    }
    setConfirmDeleteOpen(true);
  }
  
  const handleDeleteElement = async () => {
    if(!isNoteSelected) {
      await deleteFolder(selectedFolder.id);
      await initialState();

    } else {
      await deleteNote(selectedNote.folderId, selectedNote.id);
      setSelectedNote(false);
      await updateDirectoryForFolder(selectedNote.folderId);
    }
    setConfirmDeleteOpen(false);
    openNotification({ message: 'Deleted', description: 'Item deleted successfully' });
    setIsNoteSelected(false);
  };

  const updateDirectoryForFolder = async (folderId) => {
    const notes = await getNotes(folderId);
    const newFolders = directory.map(folder => {
      if(folder.key === folderId) {
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

  return (
    <div>
      {contextHolder}
      <Modal
        title='Are you sure?'
        open={confirmDeleteOpen}
        onOk={handleDeleteElement}
        onCancel={() => setConfirmDeleteOpen(false)}
        forceRender={true}
      >
          <p>Please confirm that you want to delete the following item:</p>
          <p>{ isNoteSelected ? selectedNote.name : selectedFolder.name }</p>
      </Modal>
      <div className='tree'>
        <div className='control-buttons'>
          <LogoutOutlined className='menu-icon' onClick={() => handleBackButton()}/>
          <FolderAddOutlined className='menu-icon' type='primary' onClick={() => { setAddElement(true); setAdding('folder'); }}/>
          <FileAddOutlined className='menu-icon' type='primary' onClick={() => { setAddElement(true); setAdding('note'); }}/>
          <DeleteOutlined className='menu-icon' onClick={() => handleAddElementFromLeftMenu()} />
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
          <Button danger='true' type='primary' onClick={() => setConfirmDeleteOpen(true)}>Delete</Button>
        </div>
      }
    </div>
  )
}