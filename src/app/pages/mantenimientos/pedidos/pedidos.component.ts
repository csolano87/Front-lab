import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormGroup,
  UntypedFormArray,
  UntypedFormBuilder,
  FormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/carga-productosImport.interfaces';
import { Cliente } from 'src/app/interfaces/cargaCliente.interface';
import { Marca, Marcas } from 'src/app/interfaces/cargaMarca.interface';
import { Pedidos } from 'src/app/models/cargaPedido.module';
import { Bodega } from 'src/app/interfaces/cargaBodega.interface';
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
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
declare var $: any;
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent {
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
    private activatedRoute: ActivatedRoute,
    private manteniemintoService: MantenimientosService,
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
    // return ( this.importForm.get('PRODUCTOS') as FormArray).controls;
  }
  ngOnInit(): void {
    this.getAllProductos();
    this.getMarca();
    this.getCliente();
    this.getBodega();
    this.activatedRoute.params.subscribe(({ id }) => this.crearStock(id));
    //this.activatedRoute.params.subscribe((resp) => console.log(`PARAMS`, resp));
  }
  getAllProductos() {
    let array = 'hola';
    this.inportService.getProductos().subscribe((productos) => {
      console.log(productos);
      this.listaproductos = productos;
      //this.listaproductos = productos.slice(0, 5);
    });
  }
  crearFormulario() {
    this.importForm = this.fb.group({
      AREA: ['', [Validators.required]],
      /*   MARCA: ['', [Validators.required]], */
      PRODUCTOS: this.fb.array([]),
    });
  }
  crearItemProducto(): FormGroup {
    return this.fb.group({
      ID_PRODUCTO: ['', [Validators.required]],
      NOMBRE: ['', [Validators.required]],
      REFERENCIA: ['', [Validators.required]],
      UNIDAD: [''],
      CANTIDAD: ['', [Validators.required]],
      ENTREGADO: [''],
      LOTE: [''],
    });
  }
  agregarproductos() {
    const add = this.importForm.get('PRODUCTOS') as FormArray;
    this.selectedProductIndex = add.length;

    add.push(this.crearItemProducto());
  }

  actualizarInputs(item: any, index: number | null) {
    console.log(item)
    console.log(index);
    const pruebasArray = this.importForm.get('PRODUCTOS') as FormArray;
    console.log(pruebasArray.length);
    const pruebaExistente = pruebasArray.value;
    console.log(pruebaExistente);
    const encontrar = pruebaExistente.find(
      (control) => control.ID_PRODUCTO === item.id,
    );
    console.log(encontrar);
    if (encontrar === 'undefined' || encontrar === undefined) {
      const filaSeleccionada = (
        this.importForm.get('PRODUCTOS') as FormArray
      ).at(index);
      filaSeleccionada.patchValue({
        ID_PRODUCTO: item.id,
        REFERENCIA:item.REFERENCIA,
        NOMBRE: item.NOMBRE,
        UNIDAD: item.UNIDAD,
        CANTIDAD: null,
        ENTREGADO: null,
        LOTE: null,
      });
      $('#modal-info').modal('hide');

      this.inputRef.nativeElement.value = '';
    } else {
    }
  }

  onreset() {}
  borrarProducto(i: number) {
    this.PRODUCTOS.removeAt(i);
  }
  crearStock(id: string) {
    console.log(`ID`, id);
    if (id === 'Nuevo') {
      this.importForm.reset();
      this.PRODUCTOS.clear();

      return;
    }
    this.tittle = 'Despacho';
    this.btnVal = 'Editar';
    this.importForm.disable();
    this.PRODUCTOS.disable();

    this.inportService.obtenerStockById(id).subscribe((pedidoStock) => {
      console.log(`data BD`, pedidoStock);
      !pedidoStock
        ? this.router.navigateByUrl('/dashboard/solicitudes-pedidos')
        : console.log(`data BD`, pedidoStock);

      const { AREA, itemstock } = pedidoStock;

      this.pedidoseleccionado = pedidoStock;

      this.importForm.setValue({
        AREA: AREA,
        // MARCA,
        PRODUCTOS: itemstock.map((item) =>
          this.PRODUCTOS.push(
            this.fb.group({
              ID_PRODUCTO: item['ID_PRODUCTO'],
              NOMBRE: item['product'].NOMBRE,
              REFERENCIA:item['product'].REFERENCIA,
              UNIDAD: item['product'].UNIDAD,
              CANTIDAD: item['CANTIDAD'],
              ENTREGADO: null,
              LOTE: null,
            }),
          ),
        ),
      });
    });
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

  comprobarCantidad(pedido: any) {
    console.log(pedido)
    const itemstockString = JSON.stringify(pedido);
    const encodedItemstock = encodeURIComponent(itemstockString);
    this.inportService
      .obtenerReservaTotal(encodedItemstock)
      .subscribe((resp) => {
        this.pedidoStockseleccionado = resp;
        console.log(resp);

        const productosFormArray = this.importForm.get(
          'PRODUCTOS',
        ) as FormArray;

        this.pedidoStockseleccionado.cantidadReservada.detalle.forEach(
          (item) => {
            const indices = productosFormArray.controls
              .map((control, index) =>
                control.value.ID_PRODUCTO === item.productId ? index : -1,
              )
              .filter((index) => index !== -1); // Filtrar para obtener solo los índices válidos

            if (indices.length > 0) {
              // Si se encuentra al menos un índice
              indices.forEach((index2) => {
                const control = productosFormArray.at(index2);

                // Obtener los valores actuales en el control y concatenarlos con los nuevos valores
                const cantidadActual = control.get('ENTREGADO').value || '0';
                const loteActual = control.get('LOTE').value || '0';

                // Concatenar los nuevos valores de cantidad y lote, separados por coma
                const nuevaCantidad = cantidadActual
                  ? `${cantidadActual}, ${item.cantidadReservada || '0'}`
                  : `${item.cantidadReservada || '0'}`;
                const nuevoLote = loteActual
                  ? `${loteActual}, ${item.lote || '0'}`
                  : `${item.lote || '0'}`;

                // Asignar los valores concatenados al control
                control.get('ENTREGADO').patchValue(nuevaCantidad);
                control.get('LOTE').patchValue(nuevoLote);
              });
            } else {
            }
          },
        );
      });
  }

  searchReactivos(value: any): any {
    console.log(value);
    this.isLoading = true;

    this.data$ = this.llenarcomboService.pruebasreactivos({ q: value });
    console.log(this.data$)
  }
}
