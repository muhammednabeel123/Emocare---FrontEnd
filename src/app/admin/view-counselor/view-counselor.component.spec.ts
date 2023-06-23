import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCounselorComponent } from './view-counselor.component';

describe('ViewCounselorComponent', () => {
  let component: ViewCounselorComponent;
  let fixture: ComponentFixture<ViewCounselorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCounselorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCounselorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
