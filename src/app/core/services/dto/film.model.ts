import { PlanetDTO } from './planet.model';
import { SpeciesDTO } from './species.model';
import { StarshipDTO } from './starship.model';
import { VehicleDTO } from './vehicle.model';
import { PersonDTO } from './person.model';

export class FilmDTO {
  characters: PersonDTO[];
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  opening_crawl: string;
  planets: PlanetDTO[];
  producer: string;
  release_date: string;
  species: SpeciesDTO[];
  starships: StarshipDTO[];
  title: string;
  vehicles: VehicleDTO[];
}
