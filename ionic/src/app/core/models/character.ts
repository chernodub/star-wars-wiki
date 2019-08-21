/**
 * Model for character
 */
export class Character {
  /** Eye color */
  public eyeColor: string;

  /** Homeworld id */
  public homeworldId: number;

  /** Gender */
  public gender: string;

  /** Height */
  public height: string;

  /** Mass */
  public mass: string;

  /** Name */
  public name: string;

  /** Skin color */
  public skinColor: string;

  /** Birth year */
  public birthYear: string;

  /** Number */
  public number: number;

  public constructor(char: Partial<Character>, idx?: number) {
    this.name = char.name;
    this.birthYear = char.birthYear;
    this.eyeColor = char.eyeColor;
    this.homeworldId = char.homeworldId;
    this.gender = char.gender;
    this.height = char.height;
    this.mass = char.mass;
    this.skinColor = char.skinColor;
    this.number = idx;
  }
}
