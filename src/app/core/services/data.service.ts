import { Injectable } from '@angular/core';
import { AppStateService } from './app-state.service';
import { HttpClient } from '@angular/common/http';
import { first, map } from 'rxjs/operators';
import { Film } from '../models/film.model';
import { Observable } from 'rxjs';

const API_URL = 'https://starwarswiki.firebaseio.com';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private appStateService: AppStateService,
    private http: HttpClient
  ) {}

  getFilms(): Observable<Film[]> {
    const url = new URL(`${API_URL}/swapi/films.json`);
    url.searchParams.append('auth', this.appStateService.idToken);
    return this.http.get<any[]>(url.toString()).pipe(
      first(),
      map((dataWrapArray) => dataWrapArray.map((row) => new Film(row.fields)))
    );
  }
}
