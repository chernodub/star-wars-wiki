import firebase from 'firebase/app';
import 'firebase/database';
import { removeWrap } from '@/app/core/utils-service';
import { mapPlanet } from '@/app/core/map-model-service';

/** 
 * Gets planets in wrappers
 * @return {Promise<Character[]>}
 */
export async function getPlanets() {
  return firebase.database().ref('swapi/planets').once('value')
    .then((snapshot) => {
      const wraps = snapshot.val();
      if (wraps) {
        return wraps.map(removeWrap).map(mapPlanet);
      }
      // TODO: make better notification
      alert('No planets in DB');
      return [];
    });
}
