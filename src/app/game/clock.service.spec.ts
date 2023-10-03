import { TestBed } from '@angular/core/testing';
import { skip, take, tap } from 'rxjs/operators';
import { CLOCK_PAUSE_TOGGLING_STATES, ClockStates } from 'src/domain/clock';
import { ClockService } from './clock.service';

describe('ClockService', () => {
  let service: ClockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle states', () => {
    const tries = 3;
    let currentState = service.currentState;
    let previousState: ClockStates;
    service.state$.pipe(
      skip(1), // current state is set
      take(tries),
      tap(state => {
        previousState = currentState;
        currentState = state;
        expect(currentState).toEqual(CLOCK_PAUSE_TOGGLING_STATES[previousState]);
      })
    ).subscribe();
    for (let i = 0; i < tries; i++) {
      service.togglePause();
    }
  });
});
