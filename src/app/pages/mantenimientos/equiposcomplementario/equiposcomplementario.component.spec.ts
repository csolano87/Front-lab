import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposcomplementarioComponent } from './equiposcomplementario.component';

describe('EquiposcomplementarioComponent', () => {
  let component: EquiposcomplementarioComponent;
  let fixture: ComponentFixture<EquiposcomplementarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquiposcomplementarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquiposcomplementarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
