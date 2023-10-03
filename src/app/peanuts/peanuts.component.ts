import { Component, OnInit } from '@angular/core';
import { PeanutsService } from './peanuts.service';
import { BagOfPeanuts, SinglePeanut } from 'src/domain/peanuts';
import { Observable, filter, first, from, last, map, switchMap, take, takeWhile, tap } from 'rxjs';

@Component({
  selector: 'app-peanuts',
  templateUrl: './peanuts.component.html',
  styleUrls: ['./peanuts.component.css']
})
export class PeanutsComponent implements OnInit {
  peanutStock$?: Observable<number>;
  totalMoney$?: Observable<number>;
  moneySpritePath$?: Observable<string>;
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
        take(1),
        map(limit => this.moneyLimits.findIndex(n => (n === limit))),
        map(index => `assets/money${index}.png`),
        tap(console.log)
      ))
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
