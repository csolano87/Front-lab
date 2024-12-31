import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaInternaComponent } from './carga-interna.component';

describe('CargaInternaComponent', () => {
  let component: CargaInternaComponent;
  let fixture: ComponentFixture<CargaInternaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargaInternaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargaInternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
