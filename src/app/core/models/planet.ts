/** Planet model */
export class Planet {
  /** Climate */
  public climate: string;
  /** Diameter */
  public diameter: string;
  /** Gravity */
  public gravity: string;
  /** Name */
  public name: string;
  /** Orbital period */
  public orbital_period: string;
  /** Population */
  public population: string;
  /** Rotation period */
  public rotation_period: string;
  /** Surface water */
  public surface_water: string;
  /** Terrain type */
  public terrain: string;
  /** Number */
  public number: number;

  public constructor(planet: Partial<Planet>, idx?: number) {
    this.name = planet.name;
    this.climate = planet.climate;
    this.diameter = planet.diameter;
    this.gravity = planet.gravity;
    this.orbital_period = planet.orbital_period;
    this.population = planet.population;
    this.rotation_period = planet.rotation_period;
    this.surface_water = planet.surface_water;
    this.terrain = planet.terrain;
    this.number = idx;
  }
}
