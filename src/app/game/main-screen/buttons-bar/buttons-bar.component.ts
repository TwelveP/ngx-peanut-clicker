import { Component } from '@angular/core';
import { MainScreenService } from '../main-screen.service';

@Component({
  selector: 'app-buttons-bar',
  templateUrl: './buttons-bar.component.html',
  styleUrls: ['./buttons-bar.component.css']
})
export class ButtonsBarComponent {

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
