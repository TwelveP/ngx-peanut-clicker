import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MoneyEarntComponent } from './effects/money-earnt/money-earnt.component';
import { TrustedResourceUrlPipe } from './pipes/trusted-resource-url/trusted-resource-url.pipe';

@NgModule({
  declarations: [
    TrustedResourceUrlPipe,
    MoneyEarntComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TrustedResourceUrlPipe,
    MoneyEarntComponent
  ]
})
export class SharedModule { }
