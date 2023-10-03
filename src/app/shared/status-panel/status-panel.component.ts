import { Component } from '@angular/core';
import { Observable, from } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, take } from 'rxjs/operators';
import { ClockService } from 'src/app/clock.service';
import { FinanceService } from 'src/app/finance.service';
import { ResourcesService } from 'src/app/resources.service';
import { ClockStates } from 'src/domain/clock';

const CLOCK_STATE_ICONS: { [key in ClockStates]: string } = {
  stopped: '⏹',
  running: '⏯',
  paused: '⏸',
  resumed: '⏯',
  other: '⏩'
};

@Component({
  selector: 'app-status-panel',
  templateUrl: './status-panel.component.html'
})
export class StatusPanelComponent {
  readonly peanutStock$: Observable<number>;
  readonly totalMoney$: Observable<number>;
  readonly clockState$: Observable<string>;
  readonly moneySpritePath$: Observable<string>;
  readonly clockStateIcon$: Observable<string>;
  readonly moneyLimits = [5000, 25000, 100000, 500000, 10000000];

  constructor(
    private readonly resourcesService: ResourcesService,
    private readonly clockService: ClockService,
    private readonly financeService: FinanceService
  ) {
    this.peanutStock$ = this.resourcesService.peanutStock$.pipe();
    this.totalMoney$ = this.financeService.money$.pipe();
    this.clockState$ = this.clockService.state$.pipe();
    this.moneySpritePath$ = this.financeService.money$.pipe(
      switchMap(money => from(this.moneyLimits).pipe(
        filter(limit => (money < limit)),
        take(1)
      )),
      distinctUntilChanged(),
      map(limit => this.moneyLimits.findIndex(n => (n === limit))),
      map(index => `assets/money${index}.png`)
    );
    this.clockStateIcon$ = this.clockService.state$.pipe(
      map(state => CLOCK_STATE_ICONS[state])
    );
  }

  toggleClockState(): void {
    this.clockService.togglePause();
  };
}
