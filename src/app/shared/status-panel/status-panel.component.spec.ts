import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusPanelComponent } from './status-panel.component';

describe('StatusPanelComponent', () => {
  let component: StatusPanelComponent;
  let fixture: ComponentFixture<StatusPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusPanelComponent]
    });
    fixture = TestBed.createComponent(StatusPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
