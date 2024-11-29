import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaWebComponent } from './consulta-web.component';

describe('ConsultaWebComponent', () => {
  let component: ConsultaWebComponent;
  let fixture: ComponentFixture<ConsultaWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultaWebComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
