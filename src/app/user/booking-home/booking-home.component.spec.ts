import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingHomeComponent } from './booking-home.component';

describe('BookingHomeComponent', () => {
  let component: BookingHomeComponent;
  let fixture: ComponentFixture<BookingHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
