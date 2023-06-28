import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCounselorComponent } from './new-counselor.component';

describe('NewCounselorComponent', () => {
  let component: NewCounselorComponent;
  let fixture: ComponentFixture<NewCounselorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCounselorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCounselorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
