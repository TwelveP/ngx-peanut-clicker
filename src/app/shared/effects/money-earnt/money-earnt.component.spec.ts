import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyEarntComponent } from './money-earnt.component';

describe('MoneyEarntComponent', () => {
  let component: MoneyEarntComponent;
  let fixture: ComponentFixture<MoneyEarntComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoneyEarntComponent]
    });
    fixture = TestBed.createComponent(MoneyEarntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
