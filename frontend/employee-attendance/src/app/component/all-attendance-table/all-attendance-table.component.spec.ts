import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAttendanceTableComponent } from './all-attendance-table.component';

describe('AllAttendanceTableComponent', () => {
  let component: AllAttendanceTableComponent;
  let fixture: ComponentFixture<AllAttendanceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllAttendanceTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAttendanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
