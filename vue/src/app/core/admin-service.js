import firebase from 'firebase/app';
import 'firebase/database';

/** Gets characters in wrappers
 * @param {string} uid User ID
 * @return {Promise<Character[]>}
 */
export async function checkAdminRights(uid) {
  return firebase.database().ref(`special_users/${uid}`).once('value')
    .then((snapshot) => {
      const result = snapshot.val();
      if (result && result.role === 'admin') {
        return true;
      }
      return false;
    });
}
