import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Film } from '../../../models/film';

/** Film modal */
@Component({
  selector: 'app-film-modal',
  templateUrl: './film-modal.component.html',
  styleUrls: ['./film-modal.component.scss'],
})
export class FilmModalComponent {
  /** Film to present */
  @Input() public film: Film;
  constructor(private modalCtrl: ModalController) {}

  /** Dismiss modal */
  public dismiss(): void {
    this.modalCtrl.dismiss();
  }
}
