import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-qrcode',

  templateUrl: './qrcode.component.html',
  styleUrl: './qrcode.component.css',
})
export class QRCODEComponent {
  public myAngularxQrCode: string = null;
  public obtenertamano: number;
  public qrCodeDownloadLink: SafeUrl = '';

  constructor() {
    // assign a value
    // this.myAngularxQrCode = 'Your QR code data string';
  }
  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  guardar(forma: NgForm) {
    console.log(forma);

    if (forma.invalid) {
      Object.values(forma.controls).forEach((control) => {
        control.markAsTouched();
      });

      return;
    }

    /* this.obtenertamano = forma.value.tamano;
    console.log(this.obtenertamano); */
    console.log(forma.value);
    this.myAngularxQrCode =
      +'240' +
      forma.value.referencia +
      '10' +
      forma.value.lote +
      '17' +
      forma.value.fecha.replaceAll('-', '');
  }
  enviarValor(valor: number): void {
    console.log('El valor enviado es:', valor);
    this.obtenertamano = valor;
  }
}
