import { useEffect, useState } from 'react';

import Header from './Header.js';
import { Link, useNavigate } from 'react-router-dom';
import { getFolders } from '../http-requests/index.js';

function folders() {
  const [folders, setFolders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getFolders(setFolders);
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