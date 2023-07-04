import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotTimeComponent } from './slot-time.component';

describe('SlotTimeComponent', () => {
  let component: SlotTimeComponent;
  let fixture: ComponentFixture<SlotTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlotTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
