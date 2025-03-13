import { getToken } from '../security/Protected.js';

const { REACT_APP_API_HOST_URL: HOST } = process.env;

/**
 * @param {String} username 
 * @param {String} password 
 * @returns 
 */
export async function login(username, password) {
  return fetch(`${HOST}/users/login?email=${username}&password=${password}`, {
    method: 'POST',
  });
}
/**
 * Gets the folders from logged user and push it to next
 * @param {Function} next Callback, usually the setState func
 */
export async function getFolders(next) {
  const token = getToken(); 
    try {
      const foldersResponse = await fetch(`${HOST}/users/me/folders`, {
        headers: {
          Authorization: `bearer ${token}`,
        }
      });
      if (foldersResponse.status !== 200) {
        console.log('unable to load folders');
      } else {
        const folders = await foldersResponse.json();
        if (next) {
          next(folders);
        } else {
          return folders;
        }
      }
    } catch (error) {
      console.error('unable to load folders');
    }
}
/**
 * Fetches notes given the folderId and push it to next
 * @param {Number} folderId
 * @param {Function} next 
 */
export async function getNotes(folderId, next) {
  const token = getToken();
  try {
    const notesResponse = await fetch(`${HOST}/users/me/folders/${folderId}/notes`, {
      headers: {
        Authorization: `bearer ${token}`,
      }
    });
    if (notesResponse.status !== 200) {
      console.log('unable to load notes');
    } else {
      const notes = await notesResponse.json();
      if (next) {
        next(notes);
      } else {
        return notes;
      }
    }
  } catch (error) {
    console.log('unable to load notes');
  }
}

/**
 * Fetches a note with its full body
 * @param {Number} noteId 
 */
export async function getNote(folderId, noteId) {
  const token = getToken();
  try {
    const noteResponse = await fetch(`${HOST}/users/me/folders/${folderId}/notes/${noteId}`, {
      headers: {
        Authorization: `bearer ${token}`,
      }
    });
    if (noteResponse.status !== 200) {
      console.log('unable to fetch notes');
    } else {
      return noteResponse.json();
    }

  } catch (error) {
    console.log('unable to fetch note');
  }
}

/**
 * Sends a PUT request to update the note with object note
 * @param {Number} folderId 
 * @param {Number} noteId 
 * @param {Object} note 
 * @returns 
 */
export async function updateNote(folderId, noteId, note) {
  const token = getToken();
  try {
    const noteResponse = await fetch(`${HOST}/users/me/folders/${folderId}/notes/${noteId}`, {
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(note),
    });
    if (noteResponse.status !== 201) {
      console.log('unable to fetch notes');
    } else {
      return noteResponse.json();
    }
  } catch (error) {
    console.error('unable to update note');
  }
}

/**
 * Sends a POST request to create a folder with folder object
 * @param {Object} folder 
 */
export async function addFolder(folder) {
  const token = getToken();
  try {
    const folderResponse = await fetch(`${HOST}/users/me/folders/`, {
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(folder),
    });
    if (folderResponse.status !== 201) {
      console.error('unable to add folder');
    } else {
      return folderResponse.json();
    }
  } catch (error) {
    console.error('unable to add folder');
  }
}

/**
 * Sends a POST request to create a folder with note object
 * @param {Number} folderId containing folder
 * @param {Object} note payload
 */
export async function addNote(folderId, note) {
  const token = getToken();
  try {
    const noteResponse = await fetch(`${HOST}/users/me/folders/${folderId}/notes/`, {
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(note),
    });
    if (noteResponse.status !== 201) {
      console.error('unable to add note');
    } else {
      return noteResponse.json();
    }
  } catch (error) {
    console.error('Unable to add note')
  }
}
/**
 * Sends a DELETE request to remove the given note id
 * @param {Number} folderId forlder that contains the note
 * @param {Number} noteId note attempted to be deleted
 * @returns 
 */
export async function deleteNote(folderId, noteId) {
  const token = getToken();
  try {
    const noteResponse = await fetch(`${HOST}/users/me/folders/${folderId}/notes/${noteId}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
      method: 'DELETE',
    });
    if (noteResponse.status !== 201) {
      console.error('unable to delete note');
    } else {
      return noteResponse.json();
    }
  } catch (error) {
    console.log('Unable to delete note');
  }
}