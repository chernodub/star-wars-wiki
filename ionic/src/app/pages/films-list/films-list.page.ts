import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { Film } from '../../core/models/film';
import { CacheStorageService } from '../../core/services/cache-storage.service';

import { FilmModalComponent } from './film-modal/film-modal.component';

/** Films list */
@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.page.html',
  styleUrls: ['./films-list.page.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class FilmsListPage {
  /** Films to show in list */
  public films$: Observable<Film[]>;

  constructor(
    private storage: CacheStorageService,
    private modalController: ModalController,
  ) {
    this.films$ = this.storage.getFilms();
  }

  /**
   * Show modal with film
   * @param film
   */
  public async presentModal(film: Film): Promise<void> {
    const modal = await this.modalController.create({
      component: FilmModalComponent,
      componentProps: { film },
    });
    return await modal.present();
  }

  /** Track by film episode id */
  public trackByFilm(film: Film): number {
    return film.episodeId;
  }
}
