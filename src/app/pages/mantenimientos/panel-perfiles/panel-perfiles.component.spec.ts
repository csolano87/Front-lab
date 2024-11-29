import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPerfilesComponent } from './panel-perfiles.component';

describe('PanelPerfilesComponent', () => {
  let component: PanelPerfilesComponent;
  let fixture: ComponentFixture<PanelPerfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelPerfilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelPerfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
