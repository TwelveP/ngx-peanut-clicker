import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrustedResourceUrlPipe } from './pipes/trusted-resource-url/trusted-resource-url.pipe';

@NgModule({
  declarations: [
    TrustedResourceUrlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TrustedResourceUrlPipe
  ]
})
export class SharedModule { }
