import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeanutsComponent } from './peanuts.component';

describe('PeanutsComponent', () => {
  let component: PeanutsComponent;
  let fixture: ComponentFixture<PeanutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeanutsComponent]
    });
    fixture = TestBed.createComponent(PeanutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
