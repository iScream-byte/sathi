import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DailyVisitSummaryPage } from './daily-visit-summary.page';

describe('DailyVisitSummaryPage', () => {
  let component: DailyVisitSummaryPage;
  let fixture: ComponentFixture<DailyVisitSummaryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyVisitSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
