import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Film } from '../models/film';
import { Observable } from 'rxjs';
import { AppConfig } from './environment';

/**
 * Used to get data about films and other things
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient, private config: AppConfig) {}

  /**
   * Used to get Film[]
   */
  getFilms(): Observable<Film[]> {
    const url = new URL(this.config.filmsUrl);
    url.searchParams.append('auth', localStorage.idToken);
    return this.http
      .get<any[]>(url.toString())
      .pipe(
        map((dataWrapArray) => dataWrapArray.map((row) => new Film(row.fields)))
      );
  }
}
