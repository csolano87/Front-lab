import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import { Bodega } from 'src/app/interfaces/cargaBodega.interface';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { Correo } from 'src/app/interfaces/cargaCorreo.interface';
type AOA = any[][];
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent implements OnInit {
  barcodeValue: string;
  @ViewChild('fileInput') fileInput!: ElementRef;
  dataStore = [];
  cantidad: number = 0;
  cargando = false;
  page: number = 1;
  count: number = 10;
  jsonData: any[];

  private barcodeSubject = new Subject<string>();
  stockForm!: FormGroup;
  listabodega: Bodega[] = [];
  selectedFile: [] = [];
  inputsBloqueados: boolean = false;
  subscription?: Subscription;
  listacorreo: Correo[] = [];

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
  get proveedor() {
    return (
      this.stockForm?.get('proveedor')!.invalid &&
      this.stockForm?.get('proveedor')!.touched
    );
  }
  get bodegaId() {
    return (
      this.stockForm?.get('bodegaId')!.invalid &&
      this.stockForm?.get('bodegaId')!.touched
    );
  }

  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private router: Router,
    private manteniemintoService: MantenimientosService,
    private llenarcomboService: LlenarCombosService,
    private qrcode: NgxScannerQrcodeService,
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    // this.focusOnBarcodeInput();
    this.getBodega();
    this.getProveedor();
  }

  getProveedor() {
    this.llenarcomboService.getCorreo().subscribe((correo) => {
      console.log(correo);

      this.listacorreo = correo.filter(
        (objeto, index, self) =>
          self.findIndex((o) => o.empresa === objeto.empresa) === index,
      );
    });
  }
  getBodega() {
    this.manteniemintoService.getBodega().subscribe((bodega) => {
      console.log(bodega);

      this.listabodega = bodega.filter((item) => item.ESTADO == 1);
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
    const data = this.stockForm.get('productos') as FormArray;
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
      bodegaId: ['', [Validators.required]],
      proveedor: ['', [Validators.required]],
      productos: this.fb.array([]),
    });
  }
  crearProductos(): FormGroup {
    return this.fb.group({
      referencia: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      caducidad: ['', [Validators.required]],
      lote: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      cantidad_recibida: ['', [Validators.required]],
      fabricante: [''],
      sanitario: [''],
      comentario: [''],
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
          if (item['Operaciones/Lote/Fecha caducidad']) {
            const fechaExcel = item['Operaciones/Lote/Fecha caducidad'];
            const fecha = this.convertirAFecha(fechaExcel);
            item['Operaciones/Lote/Fecha caducidad'] = fecha;
          }
        });
      }
      console.log(this.jsonData);
      this.productos.clear();
      this.stockForm.get('guia').setValue(this.jsonData[0]['Documento origen']);
      this.jsonData.forEach((item) => {
        this.productos.push(
          this.fb.group({
            referencia: item['Operaciones/Producto/Referencia Interna'],
            descripcion: item['Operaciones/Producto/Nombre'],
            lote: item['Operaciones/Lote/Lote/Nº de serie'],
            caducidad: item['Operaciones/Lote/Fecha caducidad'],
            cantidad: item['Operaciones/Cantidad Pedida'],
            cantidad_recibida: '',
            fabricante: item['Operaciones/Producto/Fabricante'],
            sanitario: item['Operaciones/Producto/Registro Sanitario'],
            comentario: '',
            //bodegaId:'',
          }),
        );
      });
      this.focusOnBarcodeInput();
    };
    reader.readAsArrayBuffer(file);
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
        console.log(err.error.msg);
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

  borrarStock():void {
     this.stockForm.reset()
    this.productos.clear(); 
    
   // window.location.reload();
    /* console.log(this.productos.controls); */
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

  /*  async bodega(index: number) {
    const currentComment =
      this.productos.at(index).get('bodegaId')?.value || '';

  } */
}
