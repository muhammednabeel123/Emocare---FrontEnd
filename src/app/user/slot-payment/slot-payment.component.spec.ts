import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotPaymentComponent } from './slot-payment.component';

describe('SlotPaymentComponent', () => {
  let component: SlotPaymentComponent;
  let fixture: ComponentFixture<SlotPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlotPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
