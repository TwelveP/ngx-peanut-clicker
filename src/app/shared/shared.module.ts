import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrustedResourceUrlPipe } from './pipes/trusted-resource-url/trusted-resource-url.pipe';
import { TaskQueueItemComponent } from './task-queue-item/task-queue-item.component';
import { StatusPanelComponent } from './status-panel/status-panel.component';

@NgModule({
  declarations: [
    TrustedResourceUrlPipe,
    TaskQueueItemComponent,
    StatusPanelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TrustedResourceUrlPipe,
    TaskQueueItemComponent,
    StatusPanelComponent
  ]
})
export class SharedModule { }
