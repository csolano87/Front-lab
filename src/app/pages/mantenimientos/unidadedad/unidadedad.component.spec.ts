import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadedadComponent } from './unidadedad.component';

describe('UnidadedadComponent', () => {
  let component: UnidadedadComponent;
  let fixture: ComponentFixture<UnidadedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnidadedadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnidadedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
