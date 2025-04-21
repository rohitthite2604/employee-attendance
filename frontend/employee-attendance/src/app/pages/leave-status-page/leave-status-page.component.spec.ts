import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveStatusPageComponent } from './leave-status-page.component';

describe('LeaveStatusPageComponent', () => {
  let component: LeaveStatusPageComponent;
  let fixture: ComponentFixture<LeaveStatusPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveStatusPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveStatusPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
