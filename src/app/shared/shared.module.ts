import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrustedResourceUrlPipe } from './pipes/trusted-resource-url/trusted-resource-url.pipe';
import { TaskQueueItemComponent } from './task-queue-item/task-queue-item.component';
import { MoneyEarntComponent } from './effects/money-earnt/money-earnt.component';

@NgModule({
  declarations: [
    TrustedResourceUrlPipe,
    TaskQueueItemComponent,
    MoneyEarntComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TrustedResourceUrlPipe,
    TaskQueueItemComponent,
    MoneyEarntComponent
  ]
})
export class SharedModule { }
