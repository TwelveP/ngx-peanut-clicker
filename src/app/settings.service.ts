import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export const DEFAULT_SETTINGS = {
  initialMoney: 10000,
  initialPeanuts: 1500
};
type Settings = typeof DEFAULT_SETTINGS;

const SETTINGS_STORAGE_NAME = `peanut-clicker:settings`;

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _settings?: Settings;
  private readonly _settingsSource = new ReplaySubject<Settings>(1);

  readonly settings$ = this._settingsSource.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  set(params: Readonly<Partial<Settings>>): void {
    this._settings = {
      ...this._settings,
      ...params
    } as Settings;
    localStorage.setItem(SETTINGS_STORAGE_NAME, JSON.stringify(this._settings));
    this._settingsSource.next(this._settings!);
  }

  resetAll(): void {
    this._settings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
    this._settingsSource.next(this._settings!);
  }

  private loadFromLocalStorage() {
    const storedValue = localStorage.getItem(SETTINGS_STORAGE_NAME);
    if (storedValue !== null) {
      this._settings = JSON.parse(storedValue);
    } else {
      this._settings = DEFAULT_SETTINGS;
    }
    this._settingsSource.next(this._settings!);
  }
}
