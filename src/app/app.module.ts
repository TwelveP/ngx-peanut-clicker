import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeanutsComponent } from './peanuts/peanuts.component';
import { SharedModule } from './shared/shared.module';
import { TasksComponent } from './peanuts/tasks/tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    PeanutsComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
