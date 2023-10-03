import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { TaskQueueComponent } from './main-screen/task-queue/task-queue.component';
import { SharedModule } from './shared/shared.module';
import { StatusPanelComponent } from './main-screen/status-panel/status-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    TaskQueueComponent,
    StatusPanelComponent
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
