import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisitSummaryDetailsPage } from './visit-summary-details.page';

describe('VisitSummaryDetailsPage', () => {
  let component: VisitSummaryDetailsPage;
  let fixture: ComponentFixture<VisitSummaryDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitSummaryDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
