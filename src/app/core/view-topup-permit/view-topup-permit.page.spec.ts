import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewTopupPermitPage } from './view-topup-permit.page';

describe('ViewTopupPermitPage', () => {
  let component: ViewTopupPermitPage;
  let fixture: ComponentFixture<ViewTopupPermitPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTopupPermitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
