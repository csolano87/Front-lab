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
import { ImPedido } from 'src/app/interfaces/cargar-pedidoImport.interface';
declare var $: any;

@Component({
  selector: 'app-importacion',
  templateUrl: './importacion.component.html',
  styleUrls: ['./importacion.component.css'],
})
export class ImportacionComponent implements OnInit {
  @ViewChild('inputRef') inputRef: ElementRef;
  selectedProductIndex: number | null = null;
  public isLoading = false;
  public src: string;
  public data$: any;
  filtroProducto: string = '';
  listaproductos: Producto[] = [];
  listamarca: Marca[] = [];
  listacliente: Cliente[] = [];
  importado: Pedido[] = [];
  importadoTemp: Pedido[] = [];
  pedidoseleccionado: Pedidos;
  importForm!: FormGroup;
  btnVal = 'Guardar';
  constructor(
    private fb: FormBuilder,
    private inportService: ImportacionService,
    private llenarcomboService: LlenarCombosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.getAllProductos();
    this.getMarca();
    this.getCliente();

    this.activatedRoute.params.subscribe(({ id }) => this.crearImport(id));
    //this.activatedRoute.params.subscribe((resp) => console.log(`PARAMS`,resp));
  }

  get ID_PROVEEDOR() {
    return (
      this.importForm.get('ID_PROVEEDOR')!.invalid &&
      this.importForm?.get('ID_PROVEEDOR')!.touched
    );
  }

  get MARCA() {
    return (
      this.importForm.get('MARCA')!.invalid &&
      this.importForm?.get('MARCA')!.touched
    );
  }
  get PRODUCTOS() {
    return this.importForm.get('PRODUCTOS') as UntypedFormArray;
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
      ID_PROVEEDOR: ['', [Validators.required]],
      MARCA: ['', [Validators.required]],
      PRODUCTOS: this.fb.array([]),
    });
  }
  crearItemProducto(): UntypedFormGroup {
    return this.fb.group({
      ID_PRODUCTO: ['', [Validators.required]],
      NOMBRE: ['', [Validators.required]],
      UNIDAD: ['', [Validators.required]],
      CANTIDAD: ['', [Validators.required]],
    });
  }
  agregarproductos() {
    const add = this.importForm.get('PRODUCTOS') as FormArray;

  //  this.PRODUCTOS.push(this.crearItemProducto());

    /* console.log(`add`, add.pristine);
    console.log(`add`, add.status); */

    this.selectedProductIndex = add.length;

    add.push(this.crearItemProducto());
  }

 /*  actualizarInputs(i: number, $event: any) {
    // console.log(i);
    const productoId = Number($event.target.value);

    const productoSeleccionado = this.listaproductos.find(
      (producto) => producto.id === productoId,
    );

    const filaSeleccionada = (
      this.importForm.get('PRODUCTOS') as UntypedFormArray
    ).at(i);
    // console.log(filaSeleccionada);
    if (productoSeleccionado) {
      filaSeleccionada.patchValue({
        NOMBRE: productoSeleccionado.NOMBRE,
        UNIDAD: productoSeleccionado.UNIDAD,
        CANTIDAD: null,
      });
    }
  } */
  onreset() {}
  borrarProducto(i: number) {
    this.PRODUCTOS.removeAt(i);
  }
  crearImport(id: string) {
    console.log(`ID`, id);
    if (id === 'Nuevo') {
      this.importForm.reset();
      this.PRODUCTOS.clear();

      return;
    }
    this.btnVal = 'Editar';
    this.importForm.disable();
    this.PRODUCTOS.disable();
    /*  if (this.importForm.invalid) {
      return Object.values(this.importForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } */
    this.inportService.obtenerImportById(id).subscribe((pedido) => {
      !pedido
        ? this.router.navigateByUrl('/dashboard/pedido')
        : console.log(`data BD`, pedido);

      const { ID_PROVEEDOR, MARCA, items } = pedido;

      this.pedidoseleccionado = pedido;

      this.importForm.setValue({
        ID_PROVEEDOR,
        MARCA,
        PRODUCTOS: items.map((item) =>
          this.PRODUCTOS.push(
            this.fb.group({
              ID_PRODUCTO: item['ID_PRODUCTO'],
              NOMBRE: item['product'].NOMBRE,
              UNIDAD: item['product'].UNIDAD,
              CANTIDAD: item['CANTIDAD'],
            }),
          ),
        ),
      });

      //this.pedidoseleccionada = pedido;
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
      this.inportService.getUpdateImport(data).subscribe((resp: any) => {
        const { msg } = resp;
        Swal.fire('Actualizado', `${msg}`, 'success');

        this.importForm.disable();
        this.btnVal = 'Editar';
      });
    } else {
      this.inportService
        .getRegistroImport(this.importForm.value)
        .subscribe((resp: any) => {
          const { msg } = resp;
          Swal.fire({
            icon: 'success',
            title: `${msg}`,
            showConfirmButton: false,
          });
          this.router.navigateByUrl('/dashboard/pedidos');
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

  /*  getByImport(termino:string){
    console.log(termino);
    return termino.length === 0
      ? (this.importado = this.importadoTemp)
      : this.inportService.getByImport(termino).subscribe((pedidos) => {
          console.log(pedidos);

          this.importado = pedidos;
        });
  
  } */

  cambioEstado() {
    if (this.btnVal != 'Editar') {
      this.guardar();
    }
    this.importForm.enable();
    this.btnVal = 'Guardar';
  }
  actualizarInputs(item: any, index: number | null) {
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
        NOMBRE: item.NOMBRE,
        UNIDAD: item.REFERENCIA,
        CANTIDAD: null,
        ENTREGADO: null,
        LOTE: null,
      });
      $('#modal-info').modal('hide');

      this.inputRef.nativeElement.value = '';
    } else {
    }
  }

  searchReactivos(value: any): any {
    console.log(value);
    this.isLoading = true;

    this.data$ = this.llenarcomboService.pruebasreactivos({ q: value });
  }
}
