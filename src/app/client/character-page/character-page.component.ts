import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, switchMap, shareReplay } from 'rxjs/operators';

import { Character } from '../../core/models/character';
import { Planet } from '../../core/models/planet';
import { AppStateService } from '../../core/services/app-state.service';
import { CharactersService } from '../../core/services/characters.service';
import { FilmsService } from '../../core/services/films.service';
import { PlanetsService } from '../../core/services/planets.service';

/**
 * Component for character page
 */
@Component({
  selector: 'app-character-page',
  templateUrl: './character-page.component.html',
  styleUrls: ['./character-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterPageComponent {
  /** Character to render in template */
  public character$: Observable<Character>;

  /** Planet where the character lives on */
  public planet$: Observable<Planet>;
  public constructor(
    private filmsService: FilmsService,
    private route: ActivatedRoute,
    private appStateService: AppStateService,
    private charactersService: CharactersService,
    private planetsService: PlanetsService,
  ) {
    this.character$ = this.charactersService
      .getCharacterById(+this.route.snapshot.paramMap.get('id'))
      .pipe(
        shareReplay({
          bufferSize: 1,
          refCount: true,
        }),
      );
    this.planet$ = this.character$.pipe(
      switchMap((character) =>
        this.planetsService
          .getPlanetById(character.homeworldId)
          .pipe(tap(() => this.appStateService.stopLoading())),
      ),
    );
  }
}
