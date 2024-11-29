import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportProduccionComponent } from './report-produccion.component';

describe('ReportProduccionComponent', () => {
  let component: ReportProduccionComponent;
  let fixture: ComponentFixture<ReportProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportProduccionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
