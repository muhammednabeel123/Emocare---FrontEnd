import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UservideocallComponent } from './uservideocall.component';

describe('UservideocallComponent', () => {
  let component: UservideocallComponent;
  let fixture: ComponentFixture<UservideocallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UservideocallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UservideocallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
