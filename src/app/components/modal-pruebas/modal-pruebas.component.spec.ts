import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPruebasComponent } from './modal-pruebas.component';

describe('ModalPruebasComponent', () => {
  let component: ModalPruebasComponent;
  let fixture: ComponentFixture<ModalPruebasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPruebasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalPruebasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
