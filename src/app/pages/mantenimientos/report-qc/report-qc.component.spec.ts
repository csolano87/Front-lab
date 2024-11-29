import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportQCComponent } from './report-qc.component';

describe('ReportQCComponent', () => {
  let component: ReportQCComponent;
  let fixture: ComponentFixture<ReportQCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportQCComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportQCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
