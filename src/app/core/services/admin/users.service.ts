import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppConfig } from '../app-config';
import { AppStateService } from '../app-state.service';
import { SpecialUser } from '../dto/special-user-dto';

/** Users service */
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private appStateService: AppStateService,
    private config: AppConfig,
  ) {}

  /** Checks if user is admin */
  public isUserAdmin(): Observable<boolean> {
    const uid = localStorage.uid;
    this.appStateService.startLoading();
    return this.http
      .get<SpecialUser>(`${this.config.usersURL}/${uid}.json`)
      .pipe(map((user) => user && user.role === 'admin'));
  }
}
