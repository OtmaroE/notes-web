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