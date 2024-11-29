import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tipoatencion } from 'src/app/interfaces/cargarTipoatencion.interface';
import { Tipogrupo } from 'src/app/interfaces/cargarTipogrupo.interface';
import { Tiposervicio } from 'src/app/interfaces/cargarTiposervicio.interface';
import { Tipofisiologico } from 'src/app/interfaces/cargatipofisiologico.interface';

import { Marca } from 'src/app/models/marca.module';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-tipofisiologico',
 
  templateUrl: './tipofisiologico.component.html',
  styleUrl: './tipofisiologico.component.css'
})
export class TipofisiologicoComponent implements OnInit{
  cargando = false;
  public page!: number;
  listatipofisiologico: Tipofisiologico[] = [];
  tipofisiologicoForm!: FormGroup;
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
      this.tipofisiologicoForm?.get('DESCRIPCION')!.invalid &&
      this.tipofisiologicoForm?.get('DESCRIPCION')!.touched
    );
  }
  ngOnInit(): void {
    this.getTipofisiologico();
  }

  crearFormulario() {
    this.tipofisiologicoForm = this.fb.group({
      DESCRIPCION: ['', [Validators.required]],
    });
  }

  crearAtencion() {
    if (this.tipofisiologicoForm.invalid) {
      this.tipofisiologicoForm.markAllAsTouched();
      return;
    }
    console.log(this.tipofisiologicoForm.value);

    Swal.fire({
      allowOutsideClick: false,

      icon: 'info',
      text: 'Espere por favor ...',
    });
    Swal.showLoading(null);
    this.manteniemintoService.postTipoFisiologico(this.tipofisiologicoForm.value).subscribe(
      (resp: any) => {
        this.getTipofisiologico();
        const { msg } = resp;
        Swal.fire({
          icon: 'success',

          titleText: `${msg}`,
          timer: 1500,
        });
        $('#modal-info').modal('hide');
        this.tipofisiologicoForm.reset({
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
  getTipofisiologico() {
    this.manteniemintoService.getTipofisiologico().subscribe((tipofisiologico) => {
      console.log(tipofisiologico);

      this.listatipofisiologico = tipofisiologico;
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
            this.getTipofisiologico();
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
