/**
 * DTO model for film
 */
export interface FilmDTO {
  /**
   * Characters
   */
  characters: number[];

  /**
   * Date of creation
   */
  created: string;
  /**
   * Director
   */
  director: string;
  /**
   * Date of edition
   */
  edited: string;
  /**
   * id of episode
   */
  episode_id: number;
  /**
   * description
   */
  opening_crawl: string;
  /**
   * planets ids
   */
  planets: number[];
  /**
   * producer
   */
  producer: string;
  /**
   * date of release
   */
  release_date: string;
  /**
   * species ids
   */
  species: number[];
  /**
   * starships ids
   */
  starships: number[];
  /**
   * name of film
   */
  title: string;
  /**
   * vehicle ids
   */
  vehicles: number[];
}

/**
 * DTO model for character
 */
export interface CharacterDTO {
  /** Eye color */
  eye_color: string;

  /** Homeworld id */
  homeworld: number;

  /** Gender */
  gender: string;

  /** Height */
  height: string;

  /** Mass */
  mass: string;

  /** Name */
  name: string;

  /** Skin color */
  skin_color: string;

  /** Birth year */
  birth_year: string;
}

/** DTO model for planet */
export interface PlanetDTO {
  /** Climate */
  climate: string;
  /** Diameter */
  diameter: string;
  /** Gravity */
  gravity: string;
  /** Name */
  name: string;
  /** Orbital period */
  orbital_period: string;
  /** Population */
  population: string;
  /** Rotation period */
  rotation_period: string;
  /** Surface water */
  surface_water: string;
  /** Terrain type */
  terrain: string;
  /** Created */
  created: string;
  /** Edited */
  edited: string;
}
