import { useEffect, useState } from 'react';

import Header from './Header.js';
import { getToken } from '../security/Protected.js';
import { Link, useNavigate } from 'react-router-dom';

function folders() {
  const [folders, setFolders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getFolders = async () => {
      const token = getToken(); 
      try {
        const foldersResponse = await fetch('http://localhost:3030/users/me/folders', {
          headers: {
            Authorization: `bearer ${token}`,
          }
        });
        if (foldersResponse.status !== 200) {
          console.log('unable to load folders');
        } else {
          const folders = await foldersResponse.json();
          setFolders(folders);
        }
      } catch (error) {
        console.error('unable to load folders');
      }  
    }
    getFolders();
  }, []);

  const handleClick = (item) => {
    return navigate('/notes', { state:  item });
  };

  return (
    <div>
      <Link to='/'>Home</Link>
      <Header title='Select a folder to continue'></Header>
      <div id='folder_directory'>
        {folders.map(item => {
          return (
            <div id='folder_wrapper'>
              <div id='folder_content' onClick={() => handleClick(item)}>{item.name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default folders;