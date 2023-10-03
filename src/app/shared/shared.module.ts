import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrustedResourceUrlPipe } from './pipes/trusted-resource-url/trusted-resource-url.pipe';
import { TaskQueueItemComponent } from './task-queue-item/task-queue-item.component';

@NgModule({
  declarations: [
    TrustedResourceUrlPipe,
    TaskQueueItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TrustedResourceUrlPipe,
    TaskQueueItemComponent
  ]
})
export class SharedModule { }
