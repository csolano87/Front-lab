import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoatencionComponent } from './tipoatencion.component';

describe('TipoatencionComponent', () => {
  let component: TipoatencionComponent;
  let fixture: ComponentFixture<TipoatencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoatencionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoatencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
