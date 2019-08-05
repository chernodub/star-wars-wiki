import { Inject, Injectable, InjectionToken } from '@angular/core';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage,
});

/** Injectable localStorage */
@Injectable({
  providedIn: 'root',
})
export class BrowserStorageService {
  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) {}

  /** Get item from localStorage */
  public getItem(key: string): string {
    return this.storage.getItem(key);
  }

  /** Add to local storage */
  public setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  /** Remove from localStorage */
  public removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  /** Clear localStorage */
  public clear(): void {
    this.storage.clear();
  }
}
