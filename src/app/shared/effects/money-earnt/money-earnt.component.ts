import { Component, Input } from '@angular/core';
import { PricedElement } from 'src/domain/base';

@Component({
  selector: 'app-money-earnt',
  templateUrl: './money-earnt.component.html'
})
export class MoneyEarntComponent {
  @Input() product!: PricedElement;
  private readonly moneyLimits = [5000, 25000, 100000, 500000, 10000000];

  get money() {
    return this.product.initialProductionCost;
  }
  get moneySprite() {
    const currentMoney = this.product.initialProductionCost;
    const index = this.moneyLimits.findIndex(n => (n <= currentMoney));
    return `assets/money${index}.png`;
  }

  constructor() { }
}
