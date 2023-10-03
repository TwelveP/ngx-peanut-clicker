import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainScreenComponent } from './main-screen.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-status-panel'
})
class StubStatusPanelComponent { }

@Component({
  selector: 'app-task-queue'
})
class StubTasksComponent { }

@Component({
  selector: 'app-buttons-bar'
})
class StubButtonsBarComponent { }

describe('MainScreenComponent', () => {
  let component: MainScreenComponent;
  let fixture: ComponentFixture<MainScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainScreenComponent,
        StubStatusPanelComponent,
        StubTasksComponent,
        StubButtonsBarComponent
      ]
    });
    fixture = TestBed.createComponent(MainScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
