import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Character } from '../../models/character';
import { CacheStorageService } from '../../services/cache-storage.service';

/** Characters list */
@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.page.html',
  styleUrls: ['./characters-list.page.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class CharactersListPage {
  /** Characters */
  public characters$: Observable<Character[]>;

  constructor(private storage: CacheStorageService) {
    this.characters$ = this.storage.getCharacters();
  }
}
