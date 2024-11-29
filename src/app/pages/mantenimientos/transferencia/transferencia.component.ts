import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormGroup,
  UntypedFormArray,
  UntypedFormBuilder,
  FormBuilder,
  UntypedFormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/carga-productosImport.interfaces';
import { Cliente } from 'src/app/interfaces/cargaCliente.interface';
import { Marca, Marcas } from 'src/app/interfaces/cargaMarca.interface';
import { Pedidos } from 'src/app/models/cargaPedido.module';

import { Pedido } from 'src/app/interfaces/cargar-pedido.interface';

import { ImportacionService } from 'src/app/services/importacion.service';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import Swal from 'sweetalert2';
import { PedidoStock } from 'src/app/models/cargaPedidoStock.module';
import { pedidoStock } from 'src/app/interfaces/pedidos-stocks.interface';
import { StockReserva } from 'src/app/interfaces/cargarStockReserva.interface';
import { StockService } from 'src/app/services/stock.service';
import { finalize, map } from 'rxjs';
import { event } from 'jquery';
import { Bodega } from 'src/app/interfaces/cargaBodega.interface';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
declare var $: any;
@Component({
  selector: 'app-transferencia',

  templateUrl: './transferencia.component.html',
  styleUrl: './transferencia.component.css',
})
export class TransferenciaComponent {
  @ViewChild('inputRef') inputRef: ElementRef;
  selectedProductIndex: number | null = null;
  pedidosForm!: FormGroup;
  public isLoading = false;
  public src: string;
  public data$: any;
  filtroProducto: string = '';
  listaproductos: Producto[] = [];
  listamarca: Marca[] = [];
  listacliente: Cliente[] = [];
  importado: Pedido[] = [];
  importadoTemp: Pedido[] = [];
  pedidoseleccionado: PedidoStock;
  pedidoStockseleccionado: StockReserva;
  importForm!: FormGroup;
  listabodega: Bodega[] = [];
  btnVal = 'Guardar';
  tittle = 'Solicitud';
  constructor(
    private fb: FormBuilder,
    private inportService: ImportacionService,
    private llenarcomboService: LlenarCombosService,
    private manteniemintoService: MantenimientosService,

    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.crearFormulario();
  }

  get AREA() {
    return (
      this.importForm.get('AREA')!.invalid &&
      this.importForm?.get('AREA')!.touched
    );
  }
  getBodega() {
    this.manteniemintoService.getBodega().subscribe((bodega) => {
      console.log(bodega);

      this.listabodega = bodega;
    });
  }

  get PRODUCTOS() {
    return this.importForm.get('PRODUCTOS') as FormArray;
  }
  ngOnInit(): void {
    this.getAllProductos();
    this.getMarca();
    this.getCliente();
    this.getBodega();
  }
  getAllProductos() {
    let array = 'hola';
    this.inportService.getProductos().subscribe((productos) => {
      console.log(productos);
      this.listaproductos = productos;
    });
  }
  crearFormulario() {
    this.importForm = this.fb.group({
      BODEGA_ORIGEN_ID: ['', [Validators.required]],
      BODEGA_DESTINO_ID: ['', [Validators.required]],
      PRODUCTOS: this.fb.array([]),
    });
  }
  crearItemProducto(): FormGroup {
    return this.fb.group({
      PRODUCTO_ID: ['', [Validators.required]],
      NOMBRE: ['', [Validators.required]],
      UNIDAD: [''],
      CANTIDAD: ['', [Validators.required]],
      /*  ENTREGADO: [''],
      LOTE: [''], */
    });
  }
  agregarproductos() {
    const add = this.importForm.get('PRODUCTOS') as FormArray;
    this.selectedProductIndex = add.length;

    add.push(this.crearItemProducto());
  }

  actualizarInputs(item: any, index: number | null) {
    console.log(item);
    this.selectedProductIndex = index;

    const pruebasArray = this.importForm.get('PRODUCTOS') as FormArray;
    const filaSeleccionada = pruebasArray.at(index) as FormGroup;
    const pruebaExistente = pruebasArray.value;
    const encontrar = pruebaExistente.find(
      (control) => control.ID_PRODUCTO === item.id,
    );
    if (encontrar === 'undefined' || encontrar === undefined) {
      const filaSeleccionada = (
        this.importForm.get('PRODUCTOS') as FormArray
      ).at(index);

      filaSeleccionada.patchValue({
        PRODUCTO_ID: item.REFERENCIA,
        NOMBRE: item.NOMBRE,
        UNIDAD: item.UNIDAD,
        CANTIDAD: null,
        /*  ENTREGADO: null,
        LOTE: null, */
      });
      $('#modal-info').modal('hide');

      this.inputRef.nativeElement.value = '';
    } else {
    }
    // filaSeleccionada.setControl('DETALLES', new FormControl(item.detalles));
  }

  onreset() {}
  borrarProducto(i: number) {
    this.PRODUCTOS.removeAt(i);
  }

  guardar() {
    if (this.importForm.invalid) {
      this.importForm.markAllAsTouched();
      return;
    }

    if (this.pedidoseleccionado) {
      const data = {
        ...this.importForm.value,
        id: this.pedidoseleccionado.id,
      };

      console.log(data);
      this.inportService.getUpdateStock(data).subscribe((resp: any) => {
        const { msg } = resp;
        Swal.fire('Actualizado', `${msg}`, 'success');

        this.importForm.disable();
        this.btnVal = 'Editar';
      });
    } else {
      this.inportService
        .getPedidoStock(this.importForm.value)
        .subscribe((resp: any) => {
          const { msg } = resp;
          Swal.fire({
            icon: 'success',
            title: `${msg}`,
            showConfirmButton: false,
          });
          this.router.navigateByUrl('/dashboard/solicitud-pedidos');
          this.importForm.reset();
          this.importForm.disable();
        });
    }
  }
  getMarca() {
    this.llenarcomboService.getMarca().subscribe((marcas) => {
      // console.log(marcas);
      this.listamarca = marcas;
    });
  }

  getCliente() {
    this.llenarcomboService.getCliente().subscribe((clientes) => {
      this.listacliente = clientes;
    });
  }

  cambioEstado() {
    if (this.btnVal != 'Editar') {
      this.guardar();
    }
    this.importForm.enable();
    this.btnVal = 'Guardar';
  }

  searchReactivos(value: any): any {
    console.log(value);
    this.isLoading = true;
    this.data$ = this.llenarcomboService.pruebasreactivos({ q: value });
    console.log(this.data$);
  }
}
