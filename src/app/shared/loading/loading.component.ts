import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Used for set loading screen to pause application
 */
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {}
