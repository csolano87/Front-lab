import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuestraspruebasComponent } from './muestraspruebas.component';

describe('MuestraspruebasComponent', () => {
  let component: MuestraspruebasComponent;
  let fixture: ComponentFixture<MuestraspruebasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuestraspruebasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MuestraspruebasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
