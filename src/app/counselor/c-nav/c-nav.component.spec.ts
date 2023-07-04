import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CNavComponent } from './c-nav.component';

describe('CNavComponent', () => {
  let component: CNavComponent;
  let fixture: ComponentFixture<CNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
