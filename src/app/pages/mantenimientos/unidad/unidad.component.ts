import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tipoatencion } from 'src/app/interfaces/cargarTipoatencion.interface';
import { Tipogrupo } from 'src/app/interfaces/cargarTipogrupo.interface';
import { Tiposervicio } from 'src/app/interfaces/cargarTiposervicio.interface';
import { Tipofisiologico } from 'src/app/interfaces/cargatipofisiologico.interface';
import { Unidad } from 'src/app/interfaces/cargaUnidad.interface';

import { Marca } from 'src/app/models/marca.module';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-unidad',
 
  templateUrl: './unidad.component.html',
  styleUrl: './unidad.component.css'
})
export class UnidadComponent implements OnInit {
  cargando = false;
  public page!: number;
  listaunidad: Unidad[] = [];
  unidadForm!: FormGroup;
  constructor(
    private llenarcomboServices: LlenarCombosService,
    private manteniemintoService: MantenimientosService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.crearFormulario();
  }
  get DESCRIPCION() {
    return (
      this.unidadForm?.get('DESCRIPCION')!.invalid &&
      this.unidadForm?.get('DESCRIPCION')!.touched
    );
  }
  ngOnInit(): void {
    this.getUnidad();
  }

  crearFormulario() {
    this.unidadForm = this.fb.group({
      DESCRIPCION: ['', [Validators.required]],
    });
  }

  crearAtencion() {
    if (this.unidadForm.invalid) {
      this.unidadForm.markAllAsTouched();
      return;
    }
    console.log(this.unidadForm.value);

    Swal.fire({
      allowOutsideClick: false,

      icon: 'info',
      text: 'Espere por favor ...',
    });
    Swal.showLoading(null);
    this.manteniemintoService.getpostUnidad(this.unidadForm.value).subscribe(
      (resp: any) => {
        this.getUnidad();
        const { msg } = resp;
        Swal.fire({
          icon: 'success',

          titleText: `${msg}`,
          timer: 1500,
        });
        $('#modal-info').modal('hide');
        this.unidadForm.reset({
          DESCRIPCION: '',
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
  getUnidad() {
    this.manteniemintoService.getUnidad().subscribe((unidad) => {
      console.log(unidad);

      this.listaunidad = unidad;
    });
  }
  /* borrarAtencion(atencion: Tipofisiologico) {
    console.log(atencion.id);

    Swal.fire({
      title: 'Eliminar Grupo?',
      text: `Esta seguro que desea eliminar la atencion  ${atencion.DESCRIPCION}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.manteniemintoService
          .deleteAtencion(atencion)
          .subscribe((resp: any) => {
            const { msg } = resp;
            this.getUnidad();
            Swal.fire({
              title: 'Grupo eliminada!',
              text: `${msg}`,
              icon: 'success',
            });
          });
      }
    });
  } */

  editarServicio(servicio: any) {
    console.log(servicio);
  }
}
