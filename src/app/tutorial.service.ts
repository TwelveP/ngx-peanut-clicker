import { Injectable } from '@angular/core';

/** Mapped string literal type representing all tutorial names. */
export const TUTORIAL_NAMES = ['story'] as const;
type TutorialNames = typeof TUTORIAL_NAMES[number];
/** A type containing a boolean state for every tutorial that the player has gone through. */
export type Tutorials = { [name in TutorialNames]: boolean }

function _getTutorialStorageName(name: TutorialNames) {
  return `peanut-clicker-tutorial:${name}`;
}

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  tutorials = {} as Tutorials;

  constructor() {
    this.loadFromLocalStorage();
  }

  resetAll(): void {
    for (const name of TUTORIAL_NAMES) {
      const lsName = _getTutorialStorageName(name);
      localStorage.removeItem(lsName);
      this.tutorials[name] = false;
    }
  }

  private loadFromLocalStorage() {
    for (const name of TUTORIAL_NAMES) {
      const lsName = _getTutorialStorageName(name);
      const storedValue = localStorage.getItem(lsName);
      if (storedValue !== null) {
        this.tutorials[name] = Boolean(storedValue);
      } else {
        this.tutorials[name] = false;
      }
    }
  }
}
