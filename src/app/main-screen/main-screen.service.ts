import { Injectable } from '@angular/core';
import { BagOfPeanuts, SinglePeanut } from 'src/domain/peanuts';
import { ResourcesService } from '../resources.service';

@Injectable({
  providedIn: 'root'
})
export class MainScreenService {

  constructor(
    private readonly resourcesService: ResourcesService
  ) { }

  sellPeanut(): void {
    const single = new SinglePeanut();
    this.resourcesService.sell(single);
  }

  sellBagOfPeanuts(): void {
    const bag = new BagOfPeanuts();
    this.resourcesService.sell(bag);
  }
}
