import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core';

/**
 * Used for set loading screen to pause application
 */
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('enterAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(200, style({ opacity: 1 })),
      ]),
      transition('* => void', [animate(200, style({ opacity: 0 }))]),
    ]),
  ],
})
export class LoadingComponent {
  /** Animation host binding */
  @HostBinding('@enterAnimation') get animation(): string {
    return '';
  }
}
