import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveTypeCardsComponent } from './leave-type-cards.component';

describe('LeaveTypeCardsComponent', () => {
  let component: LeaveTypeCardsComponent;
  let fixture: ComponentFixture<LeaveTypeCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveTypeCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveTypeCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
