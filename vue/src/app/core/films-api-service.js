import firebase from 'firebase/app';
import 'firebase/database';
import { removeWrap } from './utils-service';
import { mapFilm } from './map-model-service';

/** Gets films in wrappers
 * @return {Promise<Film[]>}
 */
export async function getFilms() {
  return firebase.database().ref('swapi/films').once('value')
    .then((snapshot) => {
      const wraps = snapshot.val();
      if (wraps) {
        return wraps.map(removeWrap).map(mapFilm);
      }
      // TODO: make better notification
      alert('No films in DB');
      return [];
    });
}
