import firebase from 'firebase/app';
import 'firebase/database';
import { removeWrap } from '@/app/core/utils-service';
import { mapFilm } from '@/app/core/map-model-service';

/**
 * Gets films in wrappers
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

export const formatDate = date => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

/**
 * Saves new film
 * @param {Film} film
 * @return {Promise}
 */
export async function saveFilm(film) {
  return firebase.database().ref(`swapi/films/${film.number}/fields`).update({
    characters: film.characters,
    director: film.director,
    episode_id: film.episodeId,
    opening_crawl: film.description,
    planets: film.planets,
    producer: film.producedBy,
    release_date: formatDate(film.releaseDate),
    species: film.species,
    starships: film.starships,
    title: film.name,
    vehicles: film.vehicles,
    edited: '',
    created: '',
  });
}
