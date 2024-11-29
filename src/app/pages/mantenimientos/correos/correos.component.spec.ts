import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorreosComponent } from './correos.component';

describe('CorreosComponent', () => {
  let component: CorreosComponent;
  let fixture: ComponentFixture<CorreosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorreosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CorreosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
