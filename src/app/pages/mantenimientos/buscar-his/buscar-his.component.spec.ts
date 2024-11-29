import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarHisComponent } from './buscar-his.component';

describe('BuscarHisComponent', () => {
  let component: BuscarHisComponent;
  let fixture: ComponentFixture<BuscarHisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuscarHisComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarHisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
