import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { StatusPanelComponent } from './main-screen/status-panel/status-panel.component';
import { TaskQueueComponent } from './main-screen/task-queue/task-queue.component';
import { GameRoutingModule } from './game-routing.module';
import { TaskQueueItemComponent } from './main-screen/task-queue/task-queue-item/task-queue-item.component';

@NgModule({
  declarations: [
    MainScreenComponent,
    TaskQueueComponent,
    TaskQueueItemComponent,
    StatusPanelComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    SharedModule
  ]
})
export class GameModule { }
