import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPruebasEspecialesComponent } from './consulta-pruebas-especiales.component';

describe('ConsultaPruebasEspecialesComponent', () => {
  let component: ConsultaPruebasEspecialesComponent;
  let fixture: ComponentFixture<ConsultaPruebasEspecialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaPruebasEspecialesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaPruebasEspecialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
