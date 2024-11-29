import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Listaprueba } from 'src/app/interfaces/cargaListapruebas.interface';
import { cargaProductos } from 'src/app/models/cargaProducto.module';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { Modelo } from 'src/app/interfaces/cargaModelo.interface';

import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
import { Listapruebas } from 'src/app/models/cargaIdPruebas.module';
import { Tecnica } from 'src/app/interfaces/cargar-tecnica.interface';
import { Tipomuestra } from 'src/app/interfaces/cargarTipomuestras.interface';
import { Muestra, Muestras } from 'src/app/interfaces/carga-muestras.interface';

declare var $: any;
@Component({
  selector: 'app-panel-pruebas',
  templateUrl: './panel-pruebas.component.html',
  styleUrls: ['./panel-pruebas.component.css'],
})
export class PanelPruebasComponent implements OnInit {
  panelform!: UntypedFormGroup;
  cargando: boolean = false;
  listacategoria: Modelo[] = [];
  listatecnica: Tecnica[] = [];
  listaseccion: Modelo[] = [];

  listatipomuestra: Muestra[] = [];
  listapruebas: Listaprueba[] = [];
  selectedCategoria: number;
  page;
  pruebaseleccionada: Listapruebas;
  public btnVal = 'Guardar';
  search:string='';
  constructor(
    private manteniemintoService: MantenimientosService,
    private fb: UntypedFormBuilder,
    private llenarcomboServices: LlenarCombosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
   
  ) {
    this.crearFormulario();
  }
  get CODIGO() {
    return (
      this.panelform?.get('CODIGO')!.invalid &&
      this.panelform?.get('CODIGO')!.touched
    );
  }
  get NOMBRE() {
    return (
      this.panelform?.get('NOMBRE')!.invalid &&
      this.panelform?.get('NOMBRE')!.touched
    );
  }
  get modeloId() {
    return (
      this.panelform?.get('modeloId')!.invalid &&
      this.panelform?.get('modeloId')!.touched
    );
  }

  get seccionId() {
    return (
      this.panelform?.get('seccionId')!.invalid &&
      this.panelform?.get('seccionId')!.touched
    );
  }

  get tecnicaId() {
    return (
      this.panelform?.get('tecnicaId')!.invalid &&
      this.panelform?.get('tecnicaId')!.touched
    );
  }
  get muestraId() {
    return (
      this.panelform?.get('muestraId')!.invalid &&
      this.panelform?.get('muestraId')!.touched
    );
  }

  get TIEMPO() {
    //ABREV
    return (
      this.panelform?.get('TIEMPO')!.invalid &&
      this.panelform?.get('TIEMPO')!.touched
    );
  }

  get ABREV() {
    //ABREV
    return (
      this.panelform?.get('ABREV')!.invalid &&
      this.panelform?.get('ABREV')!.touched
    );
  }

  get ORDEN() {
    //ABREV
    return (
      this.panelform?.get('ORDEN')!.invalid &&
      this.panelform?.get('ORDEN')!.touched
    );
  }
  get VALOR() {
    return (
      this.panelform?.get('VALOR')!.invalid &&
      this.panelform?.get('VALOR')!.touched
    );
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.crearPruebas(id));

    this.getPruebas();
    this.getCategoria();
    this.getTecnicas();
    this.getTipomuestras();
  }
  getCategoria() {
    this.llenarcomboServices.getModelo().subscribe((modelo) => {
      console.log(modelo);

      this.listacategoria = modelo;
    });
  }
  crearFormulario() {
    this.panelform = this.fb.group({
      CODIGO: ['', [Validators.required]],
      NOMBRE: ['', [Validators.required]],
      ABREV: ['', [Validators.required]],
      ORDEN: ['', [Validators.required]],

      tecnicaId: ['', [Validators.required]],
      muestraId: ['', [Validators.required]],
      modeloId: ['', [Validators.required]],
      TIEMPO: ['', [Validators.required]],
      VALOR: ['', [Validators.required]],
      CODEXTERNO: [''],
      favorite: [''],
    });
  }

  getPruebas() {
    this.manteniemintoService.getPanelPruebas().subscribe((listapruebas) => {
      console.log(listapruebas);
      this.listapruebas = listapruebas;
    });
  }

  getTecnicas() {
    this.manteniemintoService.getTecnica().subscribe((tecnica) => {
      console.log(tecnica);
      this.listatecnica = tecnica;
    });
  }

  /*   getSeccion() {
    this.manteniemintoService.getPanelPruebas().subscribe((listapruebas) => {
      console.log(listapruebas);
      this.listapruebas = listapruebas;
    });
  } */

  getTipomuestras() {
    this.manteniemintoService.getMuestras().subscribe((muestra) => {
      console.log(muestra);

      this.listatipomuestra = muestra;
    });
  }

  crearPruebas(id: string) {
    console.log(id);
    if (id === 'Nuevo') {
      this.panelform.reset();
      this.panelform.enable();
      this.btnVal = 'Guardar';
      return;
    }
    this.btnVal = 'Editar';
    this.panelform.disable();
    this.manteniemintoService
      .getIdPanelPruebas(id)
      .subscribe((listapruebas) => {
        !listapruebas
          ? this.router.navigateByUrl('/dashboard/panelPruebas')
          : console.log(listapruebas);
        const {
          CODIGO,
          ABREV,
          NOMBRE,
          CATEGORIA,
          TIEMPO,
          VALOR,
          ORDEN,
          modeloId,
          tecnicaId,
          muestraId,
        } = listapruebas;

        this.panelform.patchValue({
          CODIGO,
          ABREV,
          NOMBRE,
          CATEGORIA,
          TIEMPO,
          VALOR,
          ORDEN,
          modeloId,
          tecnicaId,
          muestraId,
        });
        this.pruebaseleccionada = listapruebas;
      });
  }
  crearPanel() {
    if (this.panelform.invalid) {
      this.panelform.markAllAsTouched();
      return;
    }
    console.log(this.panelform.value);

    if (this.pruebaseleccionada) {
      const data = {
        ...this.panelform.value,
        id: this.pruebaseleccionada.id,
      };

      this.manteniemintoService
        .updatePanelPruebas(data)
        .subscribe((resp: any) => {
          const { msg } = resp;

          Swal.fire('Actualizado', `${msg}`, 'success');
          $('#modal-info').modal('hide');
          this.getPruebas();
          this.panelform.disable();
          this.panelform.reset();
          this.btnVal = 'Editar';

          this.router.navigateByUrl('/dashboard/panelPruebas');
        });
    } else {
      Swal.fire({
        allowOutsideClick: false,

        icon: 'info',
        text: 'Espere por favor ...',
      });
      Swal.showLoading(null);
      this.manteniemintoService
        .getyCrearpanelPruebas(this.panelform.value)
        .subscribe(
          (resp: any) => {
            this.getPruebas();
            const { msg } = resp;
            Swal.fire({
              icon: 'success',

              titleText: `${msg}`,
              timer: 1500,
            });
            $('#modal-info').modal('hide');
            this.panelform.reset({
              CODIGO: '',
              NOMBRE: '',
              CATEGORIA: '',
            });
          },
          (err) => {
            console.log('error', err.error.msg);
            Swal.fire({
              icon: 'error',
              title: 'Error al autenticar',
              text: err.error.msg,
            });
          },
        );
    }
  }

  borrarequipo(pruebas: Listaprueba) {
    console.log(pruebas);

    Swal.fire({
      title: 'Eliminar prueba?',
      text: `Esta seguro que desea eliminar la prueba  ${pruebas.NOMBRE}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.manteniemintoService
          .deletePanelPruebas(pruebas)
          .subscribe((resp: any) => {
            this.getPruebas();
            const { msg } = resp;

            Swal.fire({
              title: 'Prueba eliminada!',
              text: `${msg}`,
              icon: 'success',
            });
          });
      }
    });
  }

  toggleExpand() {}
  borrarPruebas() {
    this.panelform.reset();
    this.router.navigateByUrl('/dashboard/panelPruebas/Nuevo');
  }
  cambioEstado() {
    if (this.btnVal != 'Editar') {
      this.crearPanel();
      this.panelform.enable();
      // this.panelform.reset();
    }
    this.panelform.enable();
    this.btnVal = 'Guardar';
  }

  favorite(pruebas: Listaprueba) {
    console.log(pruebas);
    this.manteniemintoService
      .updatePanelPruebasFavorite(pruebas)
      .subscribe((resp: any) => {
        const { msg } = resp;
        console.log(msg);

        Swal.fire({
          text: `${msg}`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getPruebas();
      });
  }
  onSearchExam(textSearch: string) {
    console.log(textSearch);
    this.search =textSearch;
  }
}
