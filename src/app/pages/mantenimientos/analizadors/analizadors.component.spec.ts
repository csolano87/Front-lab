import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalizadorsComponent } from './analizadors.component';

describe('AnalizadorsComponent', () => {
  let component: AnalizadorsComponent;
  let fixture: ComponentFixture<AnalizadorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalizadorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalizadorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
