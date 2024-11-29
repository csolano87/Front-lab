import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRCODEComponent } from './qrcode.component';

describe('QRCODEComponent', () => {
  let component: QRCODEComponent;
  let fixture: ComponentFixture<QRCODEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QRCODEComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QRCODEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
