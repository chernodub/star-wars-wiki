import { Injectable } from '@angular/core';
import { AppStateService } from './app-state.service';
import { HttpClient } from '@angular/common/http';
import { first, map } from 'rxjs/operators';

const API_URL = 'https://starwarswiki.firebaseio.com';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private appStateService: AppStateService,
    private http: HttpClient
  ) {}

  getFilms(): any {
    const url = new URL(`${API_URL}/swapi/films.json`);
    url.searchParams.append('auth', this.appStateService.idToken);
    return this.http.get(url.toString()).pipe(first());
  }
}
