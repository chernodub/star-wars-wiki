/**
 * Model for Film
 */
export class Film {
  /** Name */
  public name: string;
  /** Director */
  public director: string;
  /** Short description*/
  public description: string;

  /** Release date */
  public releaseDate: Date;

  /** Edited */
  public edited: Date;

  /** Release date */
  public created: Date;

  /** Id */
  public episodeId: number;

  /** Number in db */
  public number: number;

  /** Name of producer */
  public producedBy: string;

  public constructor(film: Partial<Film>, idx?: number) {
    this.name = film.name;
    this.director = film.director;
    this.description = film.description;
    this.episodeId = film.episodeId;
    this.releaseDate = film.releaseDate;
    this.producedBy = film.producedBy;
    this.created = film.created;
    this.edited = film.edited;
    this.number = idx;
  }
}
