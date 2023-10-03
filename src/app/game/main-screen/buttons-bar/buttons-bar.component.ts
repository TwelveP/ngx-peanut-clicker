import { Component } from '@angular/core';
import { MainScreenService } from '../main-screen.service';
import { ActionsService } from '../../actions.service';

@Component({
  selector: 'app-buttons-bar',
  templateUrl: './buttons-bar.component.html',
  styleUrls: ['./buttons-bar.component.css']
})
export class ButtonsBarComponent {

  constructor(
    private readonly service: ActionsService
  ) { }

  sellPeanut(): void {
    this.service.sellPeanut().subscribe();
  }

  sellBagOfPeanuts(): void {
    this.service.sellBagOfPeanuts().subscribe();
  }
}
