import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, take } from 'rxjs/operators';
import { ClockStates } from 'src/domain/clock';
import { BagOfPeanuts, SinglePeanut } from 'src/domain/peanuts';
import { Task } from 'src/domain/tasks';
import { ClockService } from '../clock.service';
import { ResourcesService } from '../resources.service';

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
  peanutStock$?: Observable<number>;
  totalMoney$?: Observable<number>;
  moneySpritePath$?: Observable<string>;
  tasks$?: Observable<Task[]>;
  clockState$?: Observable<string>;
  clockStateIcon$?: Observable<string>;

  moneyLimits = [5000, 25000, 100000, 500000, 10000000];

  constructor(
    private readonly resourcesService: ResourcesService,
    private readonly clockService: ClockService
  ) { }

  ngOnInit(): void {
    this.peanutStock$ = this.resourcesService.peanutStock$.pipe();
    this.totalMoney$ = this.resourcesService.money$.pipe();
    this.moneySpritePath$ = this.totalMoney$.pipe(
      switchMap(money => from(this.moneyLimits).pipe(
        filter(limit => (money < limit)),
        take(1)
      )),
      distinctUntilChanged(),
      map(limit => this.moneyLimits.findIndex(n => (n === limit))),
      map(index => `assets/money${index}.png`)
    );
    this.clockState$ = this.clockService.state$.pipe();
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
