import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfflineReportPage } from './offline-report.page';

describe('OfflineReportPage', () => {
  let component: OfflineReportPage;
  let fixture: ComponentFixture<OfflineReportPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
