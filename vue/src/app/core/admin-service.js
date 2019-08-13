import firebase from 'firebase/app';
import 'firebase/database';

/**
 * Gets characters in wrappers
 * @param {string} uid User ID
 * @return {Promise<Character[]>}
 */
export async function checkAdminRights(uid) {
  return firebase.database().ref(`special_users/${uid}`).once('value')
    .then((snapshot) => {
      const result = snapshot.val();
      return result && result.role === 'admin';
    });
}
