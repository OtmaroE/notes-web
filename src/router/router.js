import React from 'react';
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import reportWebVitals from '../reportWebVitals';
import Protected from '../security/Protected';

import Notes from '../elements/Notes.js';
import Folders from '../elements/Folders.js'
import Home from '../elements/Home.js';
import Login from '../elements/Login.js';
import Logout from '../elements/Logout.js';
import FoldersBeta from '../elements/Folders-beta.js';
import './router.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/logout',
    element: <Logout/>
  },
  {
    path: '/notes',
    element: <Protected> <Notes/> </Protected>,
  },
  {
    path: '/folders',
    element: <Protected> <Folders/> </Protected>
  },
  {
    path: '/folders-beta',
    element: <Protected> <FoldersBeta/> </Protected>
  }
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
