import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamientoManualComponent } from './agendamiento-manual.component';

describe('AgendamientoManualComponent', () => {
  let component: AgendamientoManualComponent;
  let fixture: ComponentFixture<AgendamientoManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgendamientoManualComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamientoManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
