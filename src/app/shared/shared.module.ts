import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrustedResourceUrlPipe } from './pipes/trusted-resource-url/trusted-resource-url.pipe';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@NgModule({
  declarations: [
    TrustedResourceUrlPipe,
    ProgressBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TrustedResourceUrlPipe,
    ProgressBarComponent
  ]
})
export class SharedModule { }
