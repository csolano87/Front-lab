import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresordenesComponent } from './ingresordenes.component';

describe('IngresordenesComponent', () => {
  let component: IngresordenesComponent;
  let fixture: ComponentFixture<IngresordenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresordenesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngresordenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
