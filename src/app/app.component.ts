import { Component } from '@angular/core';
import { AppStateService } from './core/services/app-state.service';
import { skip } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   * Is application paused
   */
  loading: boolean;
  constructor(private appStateService: AppStateService) {
    this.appStateService.isLoading.pipe(skip(1)).subscribe((isLoading) => {
      this.loading = isLoading;
    });
  }
}
