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
import { Bodega } from 'src/app/interfaces/cargaBodega.interface';
import { Correo } from 'src/app/interfaces/cargaCorreo.interface';
declare var $: any;
@Component({
  selector: 'app-stock-manual',

  templateUrl: './stock-manual.component.html',
  styleUrl: './stock-manual.component.css'
})
export class StockManualComponent {
  @ViewChild('inputRef') inputRef: ElementRef;
  selectedProductIndex: number | null = null;
  pedidosForm!: FormGroup;
  public isLoading = false;
  public src: string;
  page;
  public data$: any;
  filtroProducto: string = '';
  listaproductos: Producto[] = [];
  listamarca: Marca[] = [];
  listacliente: Cliente[] = [];
  importado: Pedido[] = [];
  importadoTemp: Pedido[] = [];
  pedidoseleccionado: PedidoStock;
  pedidoStockseleccionado: StockReserva;
  listacorreo: Correo[] = [];

  importForm!: FormGroup;
  listabodega: Bodega[] = [];

  btnVal = 'Guardar';
  constructor(
    private fb: FormBuilder,
    private inportService: ImportacionService,
    private stockService:StockService,
    private llenarcomboService: LlenarCombosService,
    private activatedRoute: ActivatedRoute,
    private manteniemintoService: MantenimientosService,
    private router: Router,
  ) {
    this.crearFormulario();
  }

  /* get productos() {
    return this.importForm.get('productos') as FormArray;
  } */
  get guia() {
    return (
      this.importForm?.get('guia')!.invalid &&
      this.importForm?.get('guia')!.touched
    );
  }

  get AREA() {
    return (
      this.importForm.get('AREA')!.invalid &&
      this.importForm?.get('AREA')!.touched
    );
  }

  get bodegaId() {
    return (
      this.importForm?.get('bodegaId')!.invalid &&
      this.importForm?.get('bodegaId  ')!.touched
    );
  }

  get correo() {
    return (
      this.importForm?.get('correo')!.invalid &&
      this.importForm?.get('correo')!.touched
    );
  }
  get productos() {
    return this.importForm.get('productos') as FormArray;
    // return ( this.importForm.get('PRODUCTOS') as FormArray).controls;
  }

  getBodega() {
    this.manteniemintoService.getBodega().subscribe((bodega) => {
      console.log(bodega);

      this.listabodega = bodega;
    });
  }
  getProveedor(){
    this.llenarcomboService.getCorreo().subscribe((correo) => {
      console.log(correo);

      this.listacorreo = correo;
    });
  }
  ngOnInit(): void {
    this.getAllProductos();
    this.getMarca();
    this.getCliente();
    this.getBodega();
this.getProveedor();

    //this.activatedRoute.params.subscribe(({ id }) => this.crearStock(id));
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
      guia: ['', [Validators.required]],
         bodegaId: ['', [Validators.required]], 
         correo:['', [Validators.required]], 
      productos: this.fb.array([]),
    });
  }
  crearItemProducto(): FormGroup {
    return this.fb.group({
      ID_PRODUCTO: ['', [Validators.required]],
      referencia: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      caducidad: ['', [Validators.required]],
      lote: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      cantidad_recibida: ['', [Validators.required]],
      fabricante: ['', [Validators.required]],
      sanitario: ['', [Validators.required]],
      comentario: [''],
    });
  }
  agregarproductos() {
    const add = this.importForm.get('productos') as FormArray;
    this.selectedProductIndex = add.length;

    add.push(this.crearItemProducto());
  }

  actualizarInputs(item: any, index: number | null) {
    console.log(item);
    const pruebasArray = this.importForm.get('productos') as FormArray;
    console.log(pruebasArray.length);
    const pruebaExistente = pruebasArray.value;
    console.log(pruebaExistente);
    const encontrar = pruebaExistente.find(
      (control) => control.ID_PRODUCTO === item.id,
    );
    console.log(encontrar);
    if (encontrar === 'undefined' || encontrar === undefined) {
      const filaSeleccionada = (
        this.importForm.get('productos') as FormArray
      ).at(index);
      filaSeleccionada.patchValue({
        ID_PRODUCTO: item.id,
        referencia: item.REFERENCIA,
        descripcion: item.NOMBRE,
       /*  CANTIDAD: null,
        ENTREGADO: null,
        LOTE: null, */
      });
      $('#modal-info').modal('hide');

      this.inputRef.nativeElement.value = '';
    }else{

    }
  }

  //  console.log(item);

  /*   const productoId = Number($event.target.value);
    const productoSeleccionado = this.listaproductos.find(
      (producto) => producto.id === productoId,
    );
    const filaSeleccionada = (this.importForm.get('PRODUCTOS') as FormArray).at(i,    );    
    if (productoSeleccionado) {
      filaSeleccionada.patchValue({
        NOMBRE: productoSeleccionado.NOMBRE,
        UNIDAD: productoSeleccionado.UNIDAD,
        CANTIDAD: null,
        ENTREGADO: null,
        LOTE: null,
      });
  } */

  onreset() {}
  borrarProducto(i: number) {
    this.productos.removeAt(i);
  }
/*   crearStock(id: string) {
    console.log(`ID`, id);
    if (id === 'Nuevo') {
      this.importForm.reset();
      this.PRODUCTOS.clear();

      return;
    }
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
        AREA,
        // MARCA,
        PRODUCTOS: itemstock.map((item) =>
          this.PRODUCTOS.push(
            this.fb.group({
              ID_PRODUCTO: item['ID_PRODUCTO'],
              NOMBRE: item['product'].NOMBRE,
              UNIDAD: item['product'].UNIDAD,
              CANTIDAD: item['CANTIDAD'],
              ENTREGADO: null,
              LOTE: null,
            }),
          ),
        ),
      });
    });
  } */
  guardar() {
    if (this.importForm.invalid) {
      return Object.values(this.importForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
    this.stockService.getCreateStock(this.importForm.value).subscribe(
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






    /*   if (this.importForm.invalid) {
        this.importForm.markAllAsTouched();
        return;
      } */
   /*  if (this.importForm.invalid) {
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
     
    } */
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

        // Iterar sobre cada producto y establecer el valor de ENTREGADO
        this.pedidoStockseleccionado.cantidadReservada.detalle.map(
          (item, index) => {
            productosFormArray
              .at(index)
              .get('ENTREGADO')
              .patchValue(item.cantidadReservada);
            productosFormArray.at(index).get('LOTE').patchValue(item.lote);
          },
        );
      });
  }

  searchReactivos(value: any): any {
    console.log(value);
    this.isLoading = true;

    this.data$ = this.llenarcomboService.pruebasreactivos({ q: value });
    //this.isLoading=false;
    /* .subscribe((productos) => {
        console.log(productos);

        this.listaproductos=productos;
      }); */
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
      //this.focusOnBarcodeInput();
    }
  }
}
