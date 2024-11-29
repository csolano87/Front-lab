import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tipoatencion } from 'src/app/interfaces/cargarTipoatencion.interface';
import { Tipogrupo } from 'src/app/interfaces/cargarTipogrupo.interface';
import { Tiposervicio } from 'src/app/interfaces/cargarTiposervicio.interface';
import { Tipofisiologico } from 'src/app/interfaces/cargatipofisiologico.interface';
import { Unidadedad } from 'src/app/interfaces/cargaunidadedad.interface';

import { Marca } from 'src/app/models/marca.module';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-unidadedad',
  
  templateUrl: './unidadedad.component.html',
  styleUrl: './unidadedad.component.css'
})
export class UnidadedadComponent  implements OnInit{
  cargando = false;
  public page!: number;
  listaunidadedad: Unidadedad[] = [];
  unidadedadForm!: FormGroup;
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
      this.unidadedadForm?.get('DESCRIPCION')!.invalid &&
      this.unidadedadForm?.get('DESCRIPCION')!.touched
    );
  }
  ngOnInit(): void {
    this.getunidadedad();
  }

  crearFormulario() {
    this.unidadedadForm = this.fb.group({
      DESCRIPCION: ['', [Validators.required]],
    });
  }

  crearAtencion() {
    if (this.unidadedadForm.invalid) {
      this.unidadedadForm.markAllAsTouched();
      return;
    }
    console.log(this.unidadedadForm.value);

    Swal.fire({
      allowOutsideClick: false,

      icon: 'info',
      text: 'Espere por favor ...',
    });
    Swal.showLoading(null);
    this.manteniemintoService.getpostUnidadedad(this.unidadedadForm.value).subscribe(
      (resp: any) => {
        this.getunidadedad();
        const { msg } = resp;
        Swal.fire({
          icon: 'success',

          titleText: `${msg}`,
          timer: 1500,
        });
        $('#modal-info').modal('hide');
        this.unidadedadForm.reset({
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
  getunidadedad() {
    this.manteniemintoService.getUnidadedad().subscribe((unidadedad) => {
      console.log(unidadedad);

      this.listaunidadedad = unidadedad;
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
            this.getunidadedad();
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
