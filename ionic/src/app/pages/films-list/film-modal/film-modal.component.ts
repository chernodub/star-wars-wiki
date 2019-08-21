import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { Character } from '../../../core/models/character';
import { Film } from '../../../core/models/film';
import { CacheStorageService } from '../../../core/services/cache-storage.service';

/** Film modal */
@Component({
  selector: 'app-film-modal',
  templateUrl: './film-modal.component.html',
  styleUrls: ['./film-modal.component.scss'],
})
export class FilmModalComponent {
  /** Film to present */
  @Input() public film: Film;

  /** Characters */
  public characters$: Observable<Character[]>;

  constructor(
    private modalCtrl: ModalController,
    private storage: CacheStorageService,
  ) {
    this.characters$ = this.storage.getCharacters();
  }

  /** Dismiss modal */
  public dismiss(): void {
    this.modalCtrl.dismiss();
  }
}
