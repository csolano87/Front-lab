import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tipoatencion } from 'src/app/interfaces/cargarTipoatencion.interface';
import { Tipogrupo } from 'src/app/interfaces/cargarTipogrupo.interface';
import { Tiposervicio } from 'src/app/interfaces/cargarTiposervicio.interface';

import { Marca } from 'src/app/models/marca.module';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-diagnostico',

  templateUrl: './diagnostico.component.html',
  styleUrl: './diagnostico.component.css',
})
export class DiagnosticoComponent {
  cargando = false;
  public page!: number;
  listaatencion: Tipoatencion[] = [];
  diagnosticoForm!: FormGroup;
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
      this.diagnosticoForm?.get('nombre')!.invalid &&
      this.diagnosticoForm?.get('nombre')!.touched
    );
  }
  ngOnInit(): void {
    this.getDiagnostico();
  }

  crearFormulario() {
    this.diagnosticoForm = this.fb.group({
      nombre: ['', [Validators.required]],
    });
  }

  crearAtencion() {
    if (this.diagnosticoForm.invalid) {
      this.diagnosticoForm.markAllAsTouched();
      return;
    }
    console.log(this.diagnosticoForm.value);

    Swal.fire({
      allowOutsideClick: false,

      icon: 'info',
      text: 'Espere por favor ...',
    });
    Swal.showLoading(null);
    this.manteniemintoService
      .postDiagnostico(this.diagnosticoForm.value)
      .subscribe(
        (resp: any) => {
          this.getDiagnostico();
          const { msg } = resp;
          Swal.fire({
            icon: 'success',

            titleText: `${msg}`,
            timer: 1500,
          });
          $('#modal-info').modal('hide');
          this.diagnosticoForm.reset({
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
  getDiagnostico() {
    this.manteniemintoService.getDiagnostico().subscribe((diagnostico) => {
      console.log(diagnostico);

      this.listaatencion = diagnostico;
    });
  }
  borrarAtencion(atencion: Tipoatencion) {
    console.log(atencion.id);

    Swal.fire({
      title: 'Eliminar Grupo?',
      text: `Esta seguro que desea eliminar la atencion  ${atencion.nombre}`,
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
            this.getDiagnostico();
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
