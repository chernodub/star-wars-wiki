import { Component } from '@angular/core';
import { AppStateService } from './core/services/app-state.service';

/**
 * Core component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   * Is application paused
   */
  public loading$ = this.appStateService.isLoading$;
  public constructor(private appStateService: AppStateService) {}
}
