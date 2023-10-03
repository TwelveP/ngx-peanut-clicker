import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClockStates, CLOCK_PAUSE_TOGGLING_STATES } from 'src/domain/clock';

@Injectable({
  providedIn: 'root'
})
export class ClockService {
  private _state: ClockStates = 'running';
  private readonly _stateSource = new BehaviorSubject(this._state);

  get currentState() {
    return this._state;
  }
  private set currentState(v: ClockStates) {
    this._state = v;
    this._stateSource.next(this._state);
  }

  readonly state$ = this._stateSource.asObservable();

  constructor() { }

  togglePause() {
    this.currentState = CLOCK_PAUSE_TOGGLING_STATES[this._state];
  }

}
