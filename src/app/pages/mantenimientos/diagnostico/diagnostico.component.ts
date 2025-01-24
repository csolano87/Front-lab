import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tipoatencion } from 'src/app/interfaces/cargarTipoatencion.interface';
import { Tipogrupo } from 'src/app/interfaces/cargarTipogrupo.interface';
import { Tiposervicio } from 'src/app/interfaces/cargarTiposervicio.interface';
import { Data } from 'src/app/models/cargaGnerica.module';

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
  listadoselecioandodiagnostico: Data;
  btnVal = 'Guardar';
  constructor(
    private llenarcomboServices: LlenarCombosService,
    private manteniemintoService: MantenimientosService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
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

    this.activatedRoute.params.subscribe(({ id }) => this.editarDiagnostico(id))
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

    if (this.listadoselecioandodiagnostico) {
      const data = {
        id: this.listadoselecioandodiagnostico.id,
        ...this.diagnosticoForm.value
      }
      console.log(data)
      this.manteniemintoService.UpdateDiagnostico(data)
        .subscribe((resp: any) => {
          const { msg } = resp;
          Swal.fire('Actualizado', `${msg}`, 'success');
          $('#modal-info').modal('hide');
          this.getDiagnostico();
          this.diagnosticoForm.disable();
          this.diagnosticoForm.reset();
          this.btnVal = 'Editar';
          this.listadoselecioandodiagnostico = undefined;
          this.router.navigateByUrl('/dashboard/diagnostico/Nuevo');
        })
    } else {
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
  }
  getDiagnostico() {
    this.manteniemintoService.getDiagnostico().subscribe((diagnostico) => {
      console.log(diagnostico);

      this.listaatencion = diagnostico;
    });
  }
  borrarAtencion(servicio: Tipoatencion) {
    console.log(servicio.id);

    Swal.fire({
      title: 'Eliminar servicio?',
      text: `Esta seguro que desea eliminar el servicio  ${servicio.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.manteniemintoService
          .deleteDiagnosticos(servicio.id)
          .subscribe((resp: any) => {
            const { msg } = resp;
            this.getDiagnostico();
            Swal.fire({
              title: 'Servicio eliminada!',
              text: `${msg}`,
              icon: 'success',
            });
          });
      }
    });
  }

  editarDiagnostico(id: string) {
    if (id === 'Nuevo') {
      this.diagnosticoForm.reset();
      this.diagnosticoForm.enable();
      this.btnVal = 'Guardar';
      return;
    }
    console.log(id)
    this.btnVal = 'Editar';
    this.diagnosticoForm.disable();
    this.manteniemintoService.getByIDDiagnostico(id).
      subscribe((estadoclienteId) => {
        console.log(estadoclienteId);
        !estadoclienteId
          ?
          this.router.navigateByUrl('/dashboard/diagnostico/Nuevo')
          :
          console.log(estadoclienteId);
        const { nombre } = estadoclienteId;

        this.diagnosticoForm.setValue({
          nombre,
        });

        this.listadoselecioandodiagnostico = estadoclienteId;
      })
  }


  cambioestado() {
    if (this.btnVal != 'Editar') {
      this.crearAtencion();
    }
    this.diagnosticoForm.enable();
    this.btnVal = 'Guardar';


  }
}
