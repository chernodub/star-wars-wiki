import firebase from 'firebase/app';
import 'firebase/database';
import { removeWrap } from './utils-service';
import { mapCharacter } from './map-model-service';

/** Gets characters in wrappers
 * @return {Promise<Character[]>}
 */
export async function getCharacters() {
  return firebase.database().ref('swapi/people').once('value')
    .then((snapshot) => {
      const wraps = snapshot.val();
      if (wraps) {
        return wraps.map(removeWrap).map(mapCharacter);
      }
      // TODO: make better notification
      alert('No characters in DB');
      return [];
    });
}
