import { Component, OnInit } from '@angular/core';
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
import { RegistroService } from 'src/app/services/registro.service';
import { Proceso } from 'src/app/interfaces/cargaProceso.interface';
declare var $: any;
@Component({
  selector: 'app-reactivos',

  templateUrl: './reactivos.component.html',
  styleUrl: './reactivos.component.css',
})
export class ReactivosComponent {
  pedidosForm!: FormGroup;

  filtroProducto: string = '';
  listaproductos: Producto[] = [];
  listamarca: Marca[] = [];
  listacliente: Cliente[] = [];
  importado: Pedido[] = [];
  importadoTemp: Pedido[] = [];
  pedidoSseleccionado: Proceso;
  pedidoStockseleccionado: StockReserva;
  importForm!: FormGroup;
  btnVal = 'Guardar';
  constructor(
    private fb: FormBuilder,
    private inportService: ImportacionService,
    private llenarcomboService: LlenarCombosService,
    private activatedRoute: ActivatedRoute,
    private registroService: RegistroService,
    private router: Router,
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.getAllProductos();
    this.getMarca();
    this.getCliente();

    this.activatedRoute.params.subscribe(({ id }) => this.crearStock(id));
    //this.activatedRoute.params.subscribe((resp) =>       console.log(`PARAMS`,resp));
  }

  get AREA() {
    return (
      this.importForm.get('AREA')!.invalid &&
      this.importForm?.get('AREA')!.touched
    );
  }

  get CODIGO() {
    return (
      this.importForm.get('CODIGO')!.invalid &&
      this.importForm?.get('CODIGO')!.touched
    );
  }
  get PRODUCTOS() {
    return this.importForm.get('PRODUCTOS') as FormArray;
    // return ( this.importForm.get('PRODUCTOS') as FormArray).controls;
  }

  getAllProductos() {
    let array = 'hola';
    this.inportService.getProductos().subscribe((productos) => {
      this.listaproductos = productos;
      //this.listaproductos = productos.slice(0, 5);
    });
  }
  crearFormulario() {
    this.importForm = this.fb.group({
      AREA: ['', [Validators.required]],
      CODIGO: ['', [Validators.required]],
      PRODUCTOS: this.fb.array([]),
    });
  }
  crearItemProducto(): FormGroup {
    return this.fb.group({
      ID_PRODUCTO: ['', [Validators.required]],
      NOMBRE: ['', [Validators.required]],
      UNIDAD: ['', [Validators.required]],
      CANTIDAD: ['', [Validators.required]],
      ENTREGADO: [''],
      LOTE: [''],
    });
  }
  agregarproductos() {
    const add = this.importForm.get('PRODUCTOS') as FormArray;

    this.PRODUCTOS.push(this.crearItemProducto());

    /* console.log(`add`, add.pristine);
    console.log(`add`, add.status); */
  }

  actualizarInputs(i: number, $event: any) {
    // console.log(i);
    const productoId = Number($event.target.value);

    const productoSeleccionado = this.listaproductos.find(
      (producto) => producto.id === productoId,
    );

    const filaSeleccionada = (this.importForm.get('PRODUCTOS') as FormArray).at(
      i,
    );
    // console.log(filaSeleccionada);
    if (productoSeleccionado) {
      filaSeleccionada.patchValue({
        NOMBRE: productoSeleccionado.NOMBRE,
        UNIDAD: productoSeleccionado.UNIDAD,
        CANTIDAD: null,
        ENTREGADO: null,
        LOTE: null,
      });
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
    this.btnVal = 'Guardar';
    /* this.importForm.disable();
    this.PRODUCTOS.disable(); */

    this.registroService.getByIdRegistro(id).subscribe((proceso) => {
      !proceso
        ? this.router.navigateByUrl('/dashboard/consulta-procesos')
        : console.log(`data BD`, proceso);

      const { institucion, codigo } = proceso;
      this.pedidoSseleccionado = proceso;
      console.log(institucion);

      this.importForm.setValue({
        AREA: institucion,
        CODIGO: codigo,
        PRODUCTOS: '',
      });
    });
  }
  guardar() {
    if (this.importForm.invalid) {
      this.importForm.markAllAsTouched();
      return;
    }
    if (this.pedidoSseleccionado) {
      const data = {
        id: this.pedidoSseleccionado.id,
        ...this.importForm.value,
      };
      this.inportService.getRegistroImport(data).subscribe((resp: any) => {
        const { msg } = resp;
        $('#modal-info').modal('hide');
        Swal.fire({
          icon: 'success',
          title: `${msg}`,
          showConfirmButton: false,
        });
        this.router.navigateByUrl('/dashboard/consulta-compras');
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
}
