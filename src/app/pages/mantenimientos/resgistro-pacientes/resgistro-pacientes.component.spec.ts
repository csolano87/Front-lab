import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResgistroPacientesComponent } from './resgistro-pacientes.component';

describe('ResgistroPacientesComponent', () => {
  let component: ResgistroPacientesComponent;
  let fixture: ComponentFixture<ResgistroPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResgistroPacientesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResgistroPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
