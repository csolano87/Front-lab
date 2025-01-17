import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Muestra, Muestras } from 'src/app/interfaces/carga-muestras.interface';
import { EstadoByID } from 'src/app/interfaces/cargarByIdEstado.interface';
import { EstadoByIdcliente } from 'src/app/interfaces/cargarByIdEstadoClilenteinterface';

//import { TipoMuestra } from 'src/app/interfaces/cargarTipoMuestra.interface';
import { Tipogrupo } from 'src/app/interfaces/cargarTipogrupo.interface';
import { Tiposervicio } from 'src/app/interfaces/cargarTiposervicio.interface';
import { Data } from 'src/app/models/cargaGnerica.module';

import { Marca } from 'src/app/models/marca.module';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-muestraspruebas',

  templateUrl: './muestraspruebas.component.html',
  styleUrl: './muestraspruebas.component.css'
})
export class MuestraspruebasComponent implements OnInit {

  cargando = false;
  public page!: number;
  listaMuestra: Muestra[] = [];
  MuestraForm!: FormGroup;
  listadoselecioandomuestra: Data;
  btnVal: string = 'guardar';
  constructor(
    private llenarcomboServices: LlenarCombosService,
    private manteniemintoService: MantenimientosService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {
    this.crearFormulario();
  }
  get nombre() {
    return (
      this.MuestraForm?.get('nombre')!.invalid &&
      this.MuestraForm?.get('nombre')!.touched
    );
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.crearMuestras(id));
    this.getMuestra();
  }
  crearMuestras(id: string) {
    console.log(id);
    if (id === 'Nuevo') {
      this.MuestraForm.reset();
      this.MuestraForm.enable();
      this.btnVal = 'Guardar';
      return;
    }
    this.btnVal = 'Editar';
    this.MuestraForm.disable();
    this.manteniemintoService.getByIDMuestras(id).
    subscribe((estadoclienteId) => {
      console.log(estadoclienteId);
      !estadoclienteId
        ? this.router.navigateByUrl('/dashboard/ubicacion/Nuevo')
        : console.log(estadoclienteId.nombre);
      const { nombre } = estadoclienteId;

      this.MuestraForm.setValue({
        nombre,
      });
      this.listadoselecioandomuestra = estadoclienteId;
    });
  }
  crearFormulario() {
    this.MuestraForm = this.fb.group({
      nombre: ['', [Validators.required]],
    });
  }

  crearMuestra() {
    if (this.MuestraForm.invalid) {
      this.MuestraForm.markAllAsTouched();
      return;
    }
    console.log(this.MuestraForm.value);

    Swal.fire({
      allowOutsideClick: false,

      icon: 'info',
      text: 'Espere por favor ...',
    });
    Swal.showLoading(null);
    if (this.listadoselecioandomuestra) {
      const data = {
        ...this.MuestraForm.value,
        id: this.listadoselecioandomuestra.id,
      };
console.log(data)
      this.manteniemintoService
        .UpdateMuestras(data)
        .subscribe((resp: any) => {
          const { msg } = resp;
          Swal.fire('Actualizado', `${msg}`, 'success');
          $('#modal-info').modal('hide');
          this.getMuestra();
          this.MuestraForm.disable();
          this.MuestraForm.reset();
          this.btnVal = 'Editar';
          this.listadoselecioandomuestra = undefined;
          this.router.navigateByUrl('/dashboard/muestra/Nuevo');
        });
    } else {
      this.manteniemintoService.getCrearMuestras(this.MuestraForm.value).subscribe(
        (resp: any) => {
          this.getMuestra();
          const { msg } = resp;
          Swal.fire({
            icon: 'success',

            titleText: `${msg}`,
            timer: 1500,
          });
          $('#modal-info').modal('hide');
          this.MuestraForm.reset({
            nombre: '',
          });
          //this.router.navigateByUrl('/dashboard/usuarios');
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
  getMuestra() {
    this.manteniemintoService.getMuestras().subscribe((muestra) => {
      console.log(muestra);

      this.listaMuestra = muestra;
    });
  }
  borrarMuestra(Muestra: Muestra) {
    console.log(Muestra.id);

    Swal.fire({
      title: 'Eliminar muestra?',
      text: `Esta seguro que desea eliminar la muestra  ${Muestra.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.manteniemintoService
          .getDeleteMuestras(Muestra.id)
          .subscribe((resp: any) => {
            const { msg } = resp;
            this.getMuestra();
            Swal.fire({
              title: 'Grupo eliminada!',
              text: `${msg}`,
              icon: 'success',
            });
          });
      }
    });
  }

  editarServicio(servicio: any) {
    console.log(servicio);
  }


  cambioestado() {
    if (this.btnVal != 'Editar') {
      this.crearMuestra();
    }
    this.MuestraForm.enable();
    this.btnVal = 'Guardar';

  }
}
