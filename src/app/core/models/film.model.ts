import { Planet } from './planet.model';
import { Species } from './species.model';
import { Starship } from './starship.model';
import { Vehicle } from './vehicle.model';
import { Person } from './person.model';

export class Film {
  characters: Person[];
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  opening_crawl: string;
  planets: Planet[];
  producer: string;
  release_date: string;
  species: Species[];
  starships: Starship[];
  title: string;
  vehicles: Vehicle[];
}
