import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionresultadosComponent } from './validacionresultados.component';

describe('ValidacionresultadosComponent', () => {
  let component: ValidacionresultadosComponent;
  let fixture: ComponentFixture<ValidacionresultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidacionresultadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidacionresultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
