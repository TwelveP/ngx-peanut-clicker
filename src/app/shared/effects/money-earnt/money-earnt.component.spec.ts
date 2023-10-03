import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoneyEarntComponent } from './money-earnt.component';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trustedResourceUrl'
})
class StubTrustedResourceUrlPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return '';
  }
}

describe('MoneyEarntComponent', () => {
  let component: MoneyEarntComponent;
  let fixture: ComponentFixture<MoneyEarntComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MoneyEarntComponent,
        StubTrustedResourceUrlPipe
      ]
    });
    fixture = TestBed.createComponent(MoneyEarntComponent);
    component = fixture.componentInstance;
    component.product = { initialProductionCost: 1 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
