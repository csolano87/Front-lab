import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tecnica } from 'src/app/interfaces/cargar-tecnica.interface';
//import { TipoTecnica } from 'src/app/interfaces/cargarTipoTecnica.interface';
import { Tipogrupo } from 'src/app/interfaces/cargarTipogrupo.interface';
import { Tiposervicio } from 'src/app/interfaces/cargarTiposervicio.interface';

import { Marca } from 'src/app/models/marca.module';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-tecnica',

  templateUrl: './tecnica.component.html',
  styleUrl: './tecnica.component.css',
})
export class TecnicaComponent implements OnInit {
  cargando = false;
  public page!: number;
  listaTecnica: Tecnica[] = [];
  TecnicaForm!: FormGroup;
  constructor(
    private llenarcomboServices: LlenarCombosService,
    private manteniemintoService: MantenimientosService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.crearFormulario();
  }
  get nombre() {
    return (
      this.TecnicaForm?.get('nombre')!.invalid &&
      this.TecnicaForm?.get('nombre')!.touched
    );
  }
  ngOnInit(): void {
    this.getTecnica();
  }

  crearFormulario() {
    this.TecnicaForm = this.fb.group({
      nombre: ['', [Validators.required]],
    });
  }

  crearTecnica() {
    if (this.TecnicaForm.invalid) {
      this.TecnicaForm.markAllAsTouched();
      return;
    }
    console.log(this.TecnicaForm.value);

    Swal.fire({
      allowOutsideClick: false,

      icon: 'info',
      text: 'Espere por favor ...',
    });
    Swal.showLoading(null);
    this.manteniemintoService.getCrearTecnica(this.TecnicaForm.value).subscribe(
      (resp: any) => {
        this.getTecnica();
        const { msg } = resp;
        Swal.fire({
          icon: 'success',

          titleText: `${msg}`,
          timer: 1500,
        });
        $('#modal-info').modal('hide');
        this.TecnicaForm.reset({
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
  getTecnica() {
    this.manteniemintoService.getTecnica().subscribe((tipoTecnica) => {
      console.log(tipoTecnica);

      this.listaTecnica = tipoTecnica;
    });
  }
  borrarTecnica(tecnica: Tecnica) {
    console.log(tecnica.id);

    Swal.fire({
      title: 'Eliminar Grupo?',
      text: `Esta seguro que desea eliminar la Tecnica  ${tecnica.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.manteniemintoService
          .getDeleteTecnica(tecnica.id)
          .subscribe((resp: any) => {
            const { msg } = resp;
            this.getTecnica();
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
}