import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, take } from 'rxjs/operators';
import { BagOfPeanuts, SinglePeanut } from 'src/domain/peanuts';
import { Task } from 'src/domain/tasks';
import { PeanutsService } from './peanuts.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  peanutStock$?: Observable<number>;
  totalMoney$?: Observable<number>;
  moneySpritePath$?: Observable<string>;
  tasks$?: Observable<Task[]>;
  moneyLimits = [5000, 25000, 100000, 500000, 10000000];

  constructor(
    private service: PeanutsService
  ) { }

  ngOnInit(): void {
    this.peanutStock$ = this.service.peanutStock$.pipe();
    this.totalMoney$ = this.service.money$.pipe();
    this.moneySpritePath$ = this.totalMoney$.pipe(
      switchMap(money => from(this.moneyLimits).pipe(
        filter(limit => (money < limit)),
        take(1)
      )),
      distinctUntilChanged(),
      map(limit => this.moneyLimits.findIndex(n => (n === limit))),
      map(index => `assets/money${index}.png`)
    );
  }

  sellPeanut(): void {
    const single = new SinglePeanut();
    this.service.sell(single);
  }

  sellBagOfPeanuts(): void {
    const bag = new BagOfPeanuts();
    this.service.sell(bag);
  }
}
