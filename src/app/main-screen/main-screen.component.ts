import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, take } from 'rxjs/operators';
import { ClockStates } from 'src/domain/clock';
import { BagOfPeanuts, SinglePeanut } from 'src/domain/peanuts';
import { Task } from 'src/domain/tasks';
import { ClockService } from '../clock.service';
import { ResourcesService } from '../resources.service';
import { FinanceService } from '../finance.service';

const CLOCK_STATE_ICONS: { [key in ClockStates]: string } = {
  stopped: '⏹',
  running: '⏯',
  paused: '⏸',
  resumed: '⏯',
  other: '⏩'
};

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html'
})
export class MainScreenComponent implements OnInit {
  readonly peanutStock$: Observable<number>;
  readonly totalMoney$: Observable<number>;
  readonly clockState$: Observable<string>;

  moneySpritePath$?: Observable<string>;
  tasks$?: Observable<Task[]>;
  clockStateIcon$?: Observable<string>;

  readonly moneyLimits = [5000, 25000, 100000, 500000, 10000000];

  constructor(
    private readonly resourcesService: ResourcesService,
    private readonly clockService: ClockService,
    private readonly financeService: FinanceService
  ) {
    this.peanutStock$ = this.resourcesService.peanutStock$.pipe();
    this.totalMoney$ = this.financeService.money$.pipe();
    this.clockState$ = this.clockService.state$.pipe();
  }

  ngOnInit(): void {
    this.moneySpritePath$ = this.totalMoney$.pipe(
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
  }

  sellPeanut(): void {
    const single = new SinglePeanut();
    this.resourcesService.sell(single);
  }

  sellBagOfPeanuts(): void {
    const bag = new BagOfPeanuts();
    this.resourcesService.sell(bag);
  }
}
