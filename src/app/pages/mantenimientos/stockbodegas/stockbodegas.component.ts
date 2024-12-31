import { Component, OnInit, ViewChild } from '@angular/core';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import { Bodega } from 'src/app/interfaces/cargaBodega.interface';
import { StockService } from 'src/app/services/stock.service';
import { StockBodega } from 'src/app/interfaces/cargarStockBodegas.interface';
import {
  NgxScannerQrcodeService,
  ScannerQRCodeConfig,
  ScannerQRCodeSelectedFiles,
} from 'ngx-scanner-qrcode';
import { Subject } from 'rxjs';
import { FormArray } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-stockbodegas',

  templateUrl: './stockbodegas.component.html',
  styleUrl: './stockbodegas.component.css',
})
export class StockbodegasComponent implements OnInit {
  listaSotck: StockBodega[] = [];
  listabodega: Bodega[] = [];
  page;
  dataStore = [];

  cargando: boolean = false;
  public isScanning = false;
  private barcodeSubject = new Subject<string>();
  @ViewChild('barcodeInput') barcodeInput;
  constructor(
    private manteniemintoService: MantenimientosService,
    private stockService: StockService,
  ) {}
  ngOnInit(): void {
    this.getBodega();
  }
  getBodega() {
    this.manteniemintoService.getBodega().subscribe((bodega) => {
      console.log(bodega);

      this.listabodega = bodega;
    });
  }
  onBarcodeInput(event: Event): void {
    const inputBarcode = event.target as HTMLInputElement;
    const barcodeFragment = inputBarcode.value.trim();
    if (barcodeFragment) {
      this.barcodeSubject.next(barcodeFragment);
    }
    console.log(barcodeFragment);

    if (barcodeFragment.length === 68) {
      this.actualizarCantidad(barcodeFragment);

      setTimeout(() => {
        inputBarcode.value = '';
        inputBarcode.focus(); // Re-enfocar el campo de entrada
      }, 300);
    }
  }

  actualizarCantidad(barcodeS) {
    const barcode = barcodeS.split('<gs>');

    const lote = barcode[1] || '';
    const ven = barcode[2] || '';
    const ref = barcode[2] || '';
    const elb = barcode[3] || '';
    const loteFinal = lote.slice(-8);
    const venFinal = ven.slice(2, 8);
    const refFinal = ref.slice(-11);
    const elbFinal = elb.slice(2);
    const item = this.dataStore.find(
      (entry) => entry.lote === loteFinal && entry.ref === refFinal,
    );
    if (item) {
      item.cant++;
      this.dataStore.forEach((it) => {
        if (it.lote === item.lote && it.ref === item.ref) {
          console.log(item.cant);
          it.cant = item.cant;
        }
      });
    } else {
      this.dataStore.push({ lote: loteFinal, ref: refFinal, cant: 1 });
    }
    this.updateTable();
  }

  updateTable() {
    /*  const data = this.stockForm.get('productos') as FormArray;
    const pruebaExistente = data.value;
    console.log(pruebaExistente);

    pruebaExistente.forEach((item, i) => {
      const encontrar = this.dataStore.find((ot) => item.referencia === ot.ref);

      console.log(encontrar);
      if (encontrar) {
        console.log(encontrar);
        data.at(i).patchValue({
          cantidad_recibida: encontrar.cant,
        });
      }
    }); */
  }
  buscar(bodegaId: string) {
    console.log(bodegaId);
    this.stockService.getFiltroBodegas(bodegaId).subscribe((stock) => {
      console.log(stock);
      this.listaSotck = stock.filter(item=>item.CANTIDAD == '1');
    });
  }

  DescargoStock(i: any, numero: string) {
    console.log(i)
    Swal.fire({
      title: 'Descargar producto?',
      html: `Esta seguro que desea realizar la descargar el producto <strong>${i.product.NOMBRE}</strong>  con  lote # 
      <strong>${i.lote}</strong>  `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si descargar ',
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          ...i,
          descargo: numero,
        };
        this.stockService.getdescargoStock(data).subscribe((resp: any) => {
          const { msg } = resp;
        this.buscar(i.bodegaId);
          Swal.fire({
            title: 'Producto descargado!',
            text: `${msg}`,
            icon: 'success',
          });
        
        });
      
      }
    });
    /* 
    console.log(i);
    const data = {
      ...i,
      descargo: numero,
    }; */
    /*    console.log(data);
    this.stockService.getdescargoStock(data).subscribe((msg) => {
      console.log(msg);
    }); */
  }
}
