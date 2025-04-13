import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpDashboardCardsComponent } from './emp-dashboard-cards.component';

describe('EmpDashboardCardsComponent', () => {
  let component: EmpDashboardCardsComponent;
  let fixture: ComponentFixture<EmpDashboardCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpDashboardCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpDashboardCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
