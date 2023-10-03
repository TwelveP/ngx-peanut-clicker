import { Component, OnInit } from '@angular/core';
import { PeanutsService } from './peanuts.service';
import { SinglePeanut } from 'src/domain/peanuts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-peanuts',
  templateUrl: './peanuts.component.html',
  styleUrls: ['./peanuts.component.css']
})
export class PeanutsComponent implements OnInit {
  totalPeanutsSold$?: Observable<number>;
  totalMoney$?: Observable<number>;

  constructor(
    private service: PeanutsService
  ) { }

  ngOnInit(): void {
    this.totalPeanutsSold$ = this.service.totalProducedPeanuts$.pipe();
    this.totalMoney$ = this.service.money$.pipe();
  }

  sellPeanut(): void {
    const single = new SinglePeanut();
    this.service.sellPeanut(single);
  }
}
