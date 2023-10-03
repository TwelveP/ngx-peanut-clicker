import { Component } from '@angular/core';
import { MainScreenService } from './main-screen.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html'
})
export class MainScreenComponent {

  constructor(
    private readonly service: MainScreenService
  ) { }

  sellPeanut(): void {
    this.service.sellPeanut();
  }

  sellBagOfPeanuts(): void {
    this.service.sellBagOfPeanuts();
  }
}
