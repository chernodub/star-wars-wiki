import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

/** Loading service */
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingModal: HTMLIonLoadingElement;

  constructor(public loadingController: LoadingController) {}

  /** Start loading */
  public async startLoading(message: string = 'Loading...'): Promise<void> {
    if (!this.loadingModal) {
      this.loadingModal = await this.loadingController.create({ message });
      this.loadingModal.present();
    }
  }

  /** Stop loading */
  public stopLoading(): void {
    if (this.loadingModal) {
      this.loadingModal.dismiss().then(() => (this.loadingModal = null));
    }
  }
}
