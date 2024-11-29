import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { saveAs } from 'file-saver';
import {
  NgxScannerQrcodeService,
  ScannerQRCodeConfig,
  ScannerQRCodeSelectedFiles,
} from 'ngx-scanner-qrcode';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { Router } from '@angular/router';
import { error } from 'console';
import {
  NgxScannerQrcodeComponent,
  ScannerQRCodeResult,
} from 'ngx-scanner-qrcode';
import { Subject, Subscriber, Subscription } from 'rxjs';
import { Product } from 'src/app/models/cargaPedido.module';
import { StockService } from 'src/app/services/stock.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
type AOA = any[][];
@Component({
  selector: 'app-stockmano',

  templateUrl: './stockmano.component.html',
  styleUrl: './stockmano.component.css',
})
export class StockmanoComponent {
  barcodeValue: string;
  dataStore = [];
  cantidad: number = 0;
  cargando = false;
  jsonData: any[];
  page: number;
  private barcodeSubject = new Subject<string>();
  stockForm!: FormGroup;
  selectedFile: [] = [];
  inputsBloqueados: boolean = false;
  subscription?: Subscription;
  public isScanning = false;
  @ViewChild('barcodeInput') barcodeInput;

  get productos() {
    return this.stockForm.get('productos') as FormArray;
  }
  get guia() {
    return (
      this.stockForm?.get('guia')!.invalid &&
      this.stockForm?.get('guia')!.touched
    );
  }
  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private router: Router,
    private qrcode: NgxScannerQrcodeService,
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    // this.focusOnBarcodeInput();
    console.log(this.page);
  }
  onBarcodeInput(event: KeyboardEvent): void {
    const inputBarcode = event.target as HTMLInputElement;

    if (event.key === 'Enter') {
      const barcodeFragment = inputBarcode.value.trim();
      if (barcodeFragment) {
        this.barcodeSubject.next(barcodeFragment);
      }
      console.log(barcodeFragment.length);
      if (barcodeFragment.length >= 48 && barcodeFragment.length <= 56) {
        this.actualizarCantidad(barcodeFragment);
        setTimeout(() => {
          inputBarcode.value = '';
          inputBarcode.focus();
        }, 400);
      }
    }
  }
  actualizarCantidad(barcode) {
    console.log(barcode.length);
    let lote = '';
    let ven = '';
    let ref = '';
    let elb = '';
    if (barcode.length === 56) {
      ven = barcode.slice(28, 34);
      lote = barcode.slice(18, 26);
      ref = barcode.slice(37, 48);
      elb = barcode.slice(-5);
    } else if (barcode.length === 48) {
      ven = barcode.slice(18, 24);
      lote = barcode.slice(26, 35);
      ref = barcode.slice(38);
      elb = barcode.slice(-5);
    } else {
      console.log('otro valor');
    }
    console.log(
      `lote: ${lote} --referencia:${ref}--elb: ${elb} --venfinal:${ven}`,
    );
    const item = this.dataStore.find(
      (entry) => entry.lote === lote && entry.ref === ref,
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
      this.dataStore.push({
        lote: lote,
        ref: ref,
        fecha:
          20 +
          '' +
          ven.slice(0, 2) +
          '/' +
          ven.slice(2, 4) +
          '/' +
          ven.slice(4),
        cant: 1,
      });
    }
    this.updateTable();

    // console.log(`ok`, this.dataStore);01069471455115861724120710292230111240130656002M
  }

  updateTable() {
    const data = this.stockForm.get('productos') as FormArray;
    const pruebaExistente = data.value;
    console.log(pruebaExistente);

    pruebaExistente.forEach((item, i) => {
      console.log(i);
      const encontrar = this.dataStore.find((ot) => item.referencia === ot.ref);

      console.log(encontrar);
      if (encontrar) {
        console.log(encontrar);
        data.at(i).patchValue({
          cantidad_recibida: encontrar.cant,
        });
      }
    });
  }

  focusOnBarcodeInput() {
    if (this.barcodeInput) {
      this.barcodeInput.nativeElement.focus();
    }
  }

  crearFormulario() {
    this.stockForm = this.fb.group({
      guia: ['', [Validators.required]],
      productos: this.fb.array([]),
    });
  }
  crearProductos(): FormGroup {
    return this.fb.group({
      referencia: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      /*  ubicacion: ['', [Validators.required]], */
      caducidad: ['', [Validators.required]],
      lote: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      /*      reserva: ['', [Validators.required]],
      cantidad_recibida: ['', [Validators.required]], */
      /*     fabricante: ['', [Validators.required]],
      sanitario: ['', [Validators.required]],
      comentario: [''], */
    });
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (even: any) => {
      const data = new Uint8Array(even.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      this.jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      console.log(this.jsonData);
      if (this.jsonData && this.jsonData.length > 0) {
        this.jsonData.forEach((item) => {
          if (item['Lote/Nº de serie/Fecha caducidad']) {
            const fechaExcel = item['Lote/Nº de serie/Fecha caducidad'];
            const fecha = this.convertirAFecha(fechaExcel);
            item['Lote/Nº de serie/Fecha caducidad'] = fecha;
          }
        });
      }
      console.log(this.jsonData);
      this.productos.clear();
      this.stockForm.get('guia').setValue(this.jsonData[0]['Documento origen']);
      this.jsonData.forEach((item) => {
        this.productos.push(
          this.fb.group({
            referencia: item['Producto/Referencia Interna'],
            descripcion: item['Producto/Nombre'],
            ubicacion: item['Ubicación/Nombre mostrado'],
            lote: item['Lote/Nº de serie/Lote/Nº de serie'],
            caducidad: item['Lote/Nº de serie/Fecha caducidad'],
            cantidad: item['Cantidad'],
            reserva: item['Reserved Quantity'],
            cantidad_recibida: '',
            /*    fabricante: item['Operaciones/Producto/Fabricante'],
            sanitario: item['Operaciones/Producto/Registro Sanitario'],
            comentario: '', */
          }),
        );
      });
      this.focusOnBarcodeInput();
    };
    reader.readAsArrayBuffer(file);
  }

  exportTable() {
    const dataToExport = this.dataStore.map((orden) => {
      return {
        referencia: orden.ref,

        lote: orden.lote,
        caducidad: orden.fecha,
        cantidad: orden.cant,
      };
    });
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, 'Reporte.xlsx');
  }

  guardar() {
    console.log(this.stockForm.value);
    if (this.stockForm.invalid) {
      return Object.values(this.stockForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
    this.stockService.getCreateStock(this.stockForm.value).subscribe(
      (resp: any) => {
        const { msg } = resp;
        Swal.fire({
          icon: 'success',

          title: `${msg}`,
          showConfirmButton: false,
        });
        this.router.navigateByUrl('/dashboard/stocks');
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error ',
          text: err.error.msg,
        });
      },
    );
  }

  convertirAFecha(fechaExcel: number) {
    const d1 = new Date((fechaExcel - 25567 - 2) * 86400 * 1000);
    console.log(d1);
    const fechacorta = JSON.stringify(d1);

    console.log(fechacorta.slice(0, 11));
    return fechacorta.slice(1, 11);
  }
  onSubmit() {
    // this.productos.disable();
  }

  borrarStock(i: number) {
    this.productos.removeAt(i);
  }
  async comments(index: number) {
    const currentComment =
      this.productos.at(index).get('comentario')?.value || '';
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Comentario',
      inputPlaceholder: 'Comentario...',
      inputValue: currentComment,
      inputAttributes: {
        'aria-label': 'Type your message here',
      },
      showCancelButton: true,
    });
    if (text) {
      console.log(`text`, text);
      this.productos.at(index).get('comentario')?.setValue(text);
      this.focusOnBarcodeInput();
    }
  }
}
