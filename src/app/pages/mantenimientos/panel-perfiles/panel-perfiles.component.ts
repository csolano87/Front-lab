import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Listaprueba } from 'src/app/interfaces/cargaListapruebas.interface';
import { Listaperfile } from 'src/app/interfaces/cargarGrupoExam.interface';
import { Tipogrupo } from 'src/app/interfaces/cargarTipogrupo.interface';
import { cargaProductos } from 'src/app/models/cargaProducto.module';

import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-panel-perfiles',
  
  templateUrl: './panel-perfiles.component.html',
  styleUrl: './panel-perfiles.component.css'
})
export class PanelPerfilesComponent {
  panelform!: UntypedFormGroup;
  cargando: boolean = false;
  
  listapruebas: Listaprueba[] = [];
  listagrupo: Listaperfile[]=[];
  page;
  pruebaseleccionada: cargaProductos;
  public btnVal = 'Guardar';
  constructor(
    private manteniemintoService: MantenimientosService,
    private fb: UntypedFormBuilder,
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
  get CATEGORIA() {
    return (
      this.panelform?.get('CATEGORIA')!.invalid &&
      this.panelform?.get('CATEGORIA')!.touched
    );
  }

  get TIEMPO() {
    return (
      this.panelform?.get('TIEMPO')!.invalid &&
      this.panelform?.get('TIEMPO')!.touched
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

    this.getPerfil();
  }

  crearFormulario() {
    this.panelform = this.fb.group({
      CODIGO: ['', [Validators.required]],
      NOMBRE: ['', [Validators.required]],
      CATEGORIA: ['', [Validators.required]],
      TIEMPO: ['', [Validators.required]],
      VALOR: ['', [Validators.required]],
      favorite: [''],
    });
  }

  getPruebas() {
    this.manteniemintoService.getPanelPruebas().subscribe((listapruebas) => {
      console.log(listapruebas);
      this.listapruebas = listapruebas;
    });
  }

  getPerfil() {
    this.manteniemintoService.getPerfile().subscribe((listaperfiles) => {
      console.log(listaperfiles);
      this.listagrupo = listaperfiles;
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
        const { CODIGO, NOMBRE, CATEGORIA, TIEMPO, VALOR } = listapruebas;

        this.panelform.patchValue({
          CODIGO,
          NOMBRE,
          CATEGORIA,
          TIEMPO,
          VALOR,
        });
     //   this.pruebaseleccionada = listapruebas;
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

  borrarequipo(grupo: Listaperfile) {
    console.log(grupo);

    Swal.fire({
      title: 'Eliminar prueba?',
      text: `Esta seguro que desea eliminar la Grupo  ${grupo.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.manteniemintoService
          .deleteGrupo(grupo)
          .subscribe((resp: any) => {
            this.getPruebas();
            const { msg } = resp;

            Swal.fire({
              title: 'Grupo eliminada!',
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
    this.manteniemintoService
      .updatePanelPruebas(pruebas)
      .subscribe((resp: any) => {
        const { msg } = resp;
        console.log(msg);
        //  Swal.fire('Actualizado', `${msg}`, 'success');
      });
  }
}
