import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaMicroComponent } from './estadistica-micro.component';

describe('EstadisticaMicroComponent', () => {
  let component: EstadisticaMicroComponent;
  let fixture: ComponentFixture<EstadisticaMicroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstadisticaMicroComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticaMicroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
