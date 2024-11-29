import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockmanoComponent } from './stockmano.component';

describe('StockmanoComponent', () => {
  let component: StockmanoComponent;
  let fixture: ComponentFixture<StockmanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockmanoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockmanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
