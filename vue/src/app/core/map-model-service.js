/** Maps userDto to User
 * @param {UserDto} userDto
 * @return {User}
 */
export function mapUser(userDto) {
  if (!userDto) return null;
  return {
    email: userDto.email,
  };
}


/** Maps filmDto to Film
 * @param {FilmDto} film
 * @return {Film}
*/
export function mapFilm(film) {
  return {
    name: film.title,
    director: film.director,
    description: film.opening_crawl,
    episodeId: film.episode_id,
    releaseDate: new Date(film.release_date),
    producedBy: film.producer,
    characters: film.characters,
    starships: film.starships,
    vehicles: film.vehicles,
    species: film.species,
    planets: film.planets,
    imageUrl: film.image_url,
  };
}
