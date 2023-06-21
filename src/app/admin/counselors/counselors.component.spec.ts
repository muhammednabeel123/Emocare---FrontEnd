import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounselorsComponent } from './counselors.component';

describe('CounselorsComponent', () => {
  let component: CounselorsComponent;
  let fixture: ComponentFixture<CounselorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounselorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounselorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
