import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuestrasRechazoComponent } from './muestras-rechazo.component';

describe('MuestrasRechazoComponent', () => {
  let component: MuestrasRechazoComponent;
  let fixture: ComponentFixture<MuestrasRechazoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MuestrasRechazoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuestrasRechazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
