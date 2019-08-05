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
  public orbitalPeriod: string;
  /** Population */
  public population: string;
  /** Rotation period */
  public rotationPeriod: string;
  /** Surface water */
  public surfaceWater: string;
  /** Terrain type */
  public terrain: string;
  /** Number */
  public number: number;

  public constructor(planet: Partial<Planet>, idx?: number) {
    this.name = planet.name;
    this.climate = planet.climate;
    this.diameter = planet.diameter;
    this.gravity = planet.gravity;
    this.orbitalPeriod = planet.orbitalPeriod;
    this.population = planet.population;
    this.rotationPeriod = planet.rotationPeriod;
    this.surfaceWater = planet.surfaceWater;
    this.terrain = planet.terrain;
    this.number = idx;
  }
}
