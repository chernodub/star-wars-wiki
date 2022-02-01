/**
 * Maps userDto to User
 * @param {UserDto} userDto
 * @return {User}
 */
export function mapUser(userDto) {
  if (!userDto) return null;
  return {
    email: userDto.email,
    uid: userDto.uid,
  };
}

/**
 * Maps filmDto to Film
 * @param {FilmDto} film
 * @return {Film}
*/
export function mapFilm(film, idx) {
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
    number: idx,
  };
}

/**
 * Maps characterDto to Character
 * @param {CharacterDto} character
 * @return {Character}
 */
export function mapCharacter(character, idx) {
  return {
    birthYear: character.birth_year,
    eyeColor: character.eye_color,
    gender: character.gender,
    height: character.height,
    homeworldId: character.homeworld,
    mass: character.mass,
    name: character.name,
    skinColor: character.skin_color,
    id: idx,
  };
}

/** 
 * Maps planetDto to Planet
 * @param {PlanetDto} planet
 * @return {Planet}
 */
export function mapPlanet(planet, idx) {
  return {
    climate: planet.climate,
    population: planet.population,
    diameter: planet.diameter,
    gravity: planet.gravity,
    name: planet.name,
    orbitalPeriod: planet.orbital_period,
    rotationPeriod: planet.rotation_period,
    surfaceWater: planet.surface_water,
    terrain: planet.terrain,
    id: idx,
  };
}
