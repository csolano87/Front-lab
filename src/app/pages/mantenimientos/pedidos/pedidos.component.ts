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
import { Usuario } from 'src/app/models/usuario.module';
import { UsuarioService } from 'src/app/services/usuario.service';
import { validate } from 'json-schema';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent implements OnInit {
  @ViewChild('inputRef') inputRef: ElementRef;
  selectedProductIndex: number | null = null;
  pedidosForm!: FormGroup;
  public usuario: Usuario;
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
  btnValC = '1';
  tittle = 'Solicitud';
  isChecking: boolean = false;
  isEditing: boolean = false;
  isCheckingComprobar: boolean = false;
  constructor(
    private fb: FormBuilder,
    private inportService: ImportacionService,
    private llenarcomboService: LlenarCombosService,
    private activatedRoute: ActivatedRoute,
    private manteniemintoService: MantenimientosService,
    private router: Router,
    private usuarioservice: UsuarioService,
    private toastr: ToastrService,
  ) {
    (this.usuario = usuarioservice.usuario), this.crearFormulario();
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
  get PRODUCTOS(): FormArray {
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
      console.log(productos.filter((prod) => prod.ESTADO === 1));
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
      total: [''],
      ENTREGADO: [''],
      LOTE: [''],
    });
  }
  agregarproductos() {
    const add = this.importForm.get('PRODUCTOS') as FormArray;
    console.log(add.value);
    this.selectedProductIndex = add.length;
    console.log(this.selectedProductIndex);
    add.push(this.crearItemProducto());
    this.toastr.success('Prueba  agregada');
  }

  actualizarInputs(item: any, index: number | null) {
    console.log(item);
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

      this.PRODUCTOS.push(
        this.fb.group({
          ID_PRODUCTO: item.id,
          REFERENCIA: item.REFERENCIA,
          NOMBRE: item.NOMBRE,
          UNIDAD: item.UNIDAD,
          CANTIDAD: null,
          ENTREGADO: null,
          LOTE: null,
        }),
      );
      /*
        filaSeleccionada.patchValue({
          ID_PRODUCTO: item.id,
          REFERENCIA: item.REFERENCIA,
          NOMBRE: item.NOMBRE,
          UNIDAD: item.UNIDAD,
          CANTIDAD: null,
          ENTREGADO: null,
          LOTE: null,
        }); */
      $('#modal-info').modal('hide');
      this.toastr.success(`Se agrego el item ${item.NOMBRE} `);

      this.inputRef.nativeElement.value = '';
    } else {
      this.toastr.warning(`El item ${item.NOMBRE} ya esta agregado...`);
    }
  }

  onreset() {
    /*  this.importForm.reset();
     this.PRODUCTOS.clear(); */
    this.router.navigateByUrl('/dashboard/solicitud-pedidos');
  }
  borrarProducto(i: number) {
    this.PRODUCTOS.removeAt(i);
    this.toastr.error('Item ya a sido eliminado...');
    /*  this.router.navigateByUrl('/dashboard/solicitud-pedidos'); */
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

    this.inportService.obtenerStockById(id).subscribe((pedidoStock) => {
      console.log(`data BD`, pedidoStock);
      !pedidoStock
        ? this.router.navigateByUrl('/dashboard/solicitudes-pedidos')
        : console.log(`data BD`, pedidoStock);

      const { AREA, itemstock } = pedidoStock;

      this.pedidoseleccionado = pedidoStock;

      this.importForm.patchValue({
        AREA: AREA,
        // MARCA,
        PRODUCTOS: itemstock.map((item) =>
          this.PRODUCTOS.push(
            this.fb.group({
              ID_PRODUCTO: item['ID_PRODUCTO'],
              NOMBRE: item['product'].NOMBRE,
              REFERENCIA: item['product'].REFERENCIA,
              UNIDAD: item['product'].CATEGORIA,
              CANTIDAD: item['CANTIDAD'],
              total: item['total_stock'],
              ENTREGADO: null,
              LOTE: null,
            }),
          ),
        ),
      });
      this.PRODUCTOS.controls.forEach((control) =>
        control.get('CANTIDAD').disable(),
      );
    });
  }
  guardar() {
    if (this.importForm.invalid) {
      this.importForm.markAllAsTouched();
      return;
    }
    console.log(this.pedidoseleccionado);
    if (this.pedidoseleccionado) {
      const data = {
        ...this.importForm.value,
        id: this.pedidoseleccionado.id,
      };

      console.log(data);
      this.inportService.getUpdateStock(data).subscribe((resp: any) => {
        const { msg } = resp;
        Swal.fire('Actualizado', `${msg}`, 'success');
        this.router.navigateByUrl('/dashboard/solicitudes-pedidos');
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
          this.router.navigateByUrl('/dashboard/solicitudes-pedidos');
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

  cambioVlidar() {
    if (this.btnValC == '1') {
    }
  }

  /*   comprobarCantidad(pedido: any) {
      console.log(this.btnValC);

      if (this.btnValC == '1') {
        if (this.isChecking) return;
        this.isChecking = true;
        console.log(pedido);

        const validarEntregado = pedido.itemstock.forEach(
          (element) => element.ENTREGADO,
        );

        console.log(validarEntregado);

        const itemstockString = JSON.stringify(pedido);
        const encodedItemstock = encodeURIComponent(itemstockString);
        this.inportService
          .obtenerReservaTotal(encodedItemstock)
          .subscribe((resp) => {
            this.isChecking = false;
            this.pedidoStockseleccionado = resp;
            console.log(resp);
            this.btnValC = '2';
            const productosFormArray = this.importForm.get(
              'PRODUCTOS',
            ) as FormArray;

            this.pedidoStockseleccionado.cantidadReservada.detalle.forEach(
              (item) => {
                console.log(item);
                const indices = productosFormArray.controls
                  .map((control, index) =>
                    control.value.ID_PRODUCTO === item.productId ? index : -1,
                  )
                  .filter((index) => index !== -1); // Filtrar para obtener solo los índices válidos
                console.log(indices);
                if (indices.length > 0) {
                  // Si se encuentra al menos un índice
                  indices.forEach((index2) => {
                    const control = productosFormArray.at(index2);

                    // Obtener los valores actuales en el control y concatenarlos con los nuevos valores
                    const cantidadActual = control.get('ENTREGADO').value;
                    const loteActual = control.get('LOTE').value;
                    console.log(cantidadActual);
                    // Concatenar los nuevos valores de cantidad y lote, separados por coma
                    const nuevaCantidad = cantidadActual
                      ? `${cantidadActual}, ${item.cantidadReservada}`
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
      } else {
        console.log(pedido.id);
        console.log(`t`, this.importForm.value);
        const data = {
          id: pedido.id,
          ...this.importForm.value,
        };
        console.log(data)
       /*  this.inportService.getvalidarcantidad(data).subscribe((resp: any) => {
          const { msg } = resp;
          Swal.fire({
            icon: 'success',
            title: `${msg}`,
            showConfirmButton: false,
          });
          this.router.navigateByUrl('/dashboard/solicitud-pedidos');
          //this.router.navigateByUrl('/dashboard/solicitudes-pedidos/');
        });
      }
    } */
  searchReactivos(value: any): any {
    console.log(value);
    this.isLoading = true;

    this.data$ = this.llenarcomboService.pruebasreactivos({ q: value });
    console.log(this.data$);
  }
  getProductos(): FormArray {
    return this.importForm.get('PRODUCTOS') as FormArray;
  }
}
