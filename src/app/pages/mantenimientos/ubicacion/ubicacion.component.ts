import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Marca } from 'src/app/interfaces/cargaMarca.interface';
import { UbicacionID } from 'src/app/interfaces/cargarByIdUbicacion.interface';
import { cargaEstado } from 'src/app/models/cargarEstado.module';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-ubicacion',

  templateUrl: './ubicacion.component.html',
  styleUrl: './ubicacion.component.css',
})
export class UbicacionComponent {
  public btnVal = 'Guardar';
  ubicacionForm!: FormGroup;
  listadoselecioandoubicacion: UbicacionID;
  cargando: false;
  listaubicacion: Marca[] = [];
  ubicacionTemp: Marca[] = [];
  public page!: number;
  constructor(
    private manteniemintoService: MantenimientosService,
    private fb: FormBuilder,
    private router: Router,
    private llenarcomboService: LlenarCombosService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.crearFormulario();
  }
  get NOMBRE() {
    return (
      this.ubicacionForm?.get('NOMBRE')!.invalid &&
      this.ubicacionForm?.get('NOMBRE')!.touched
    );
  }

  get CATEGORIA() {
    return (
      this.ubicacionForm?.get('CATEGORIA')!.invalid &&
      this.ubicacionForm?.get('CATEGORIA')!.touched
    );
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.crearUbicaciones(id));
    this.getUbicacion();
  }
  crearUbicaciones(id: string) {
    console.log(id);
    if (id === 'Nuevo') {
      this.ubicacionForm.reset();
      this.ubicacionForm.enable();
      this.btnVal = 'Guardar';
      return;
    }
    this.btnVal = 'Editar';
    this.ubicacionForm.disable();
    this.manteniemintoService.getByIDubicacion(id).subscribe((ubicacionId) => {
      console.log(ubicacionId);
      !ubicacionId
        ? this.router.navigateByUrl('/dashboard/ubicacion/Nuevo')
        : console.log(ubicacionId);
      const { NOMBRE } = ubicacionId;

      this.ubicacionForm.patchValue({
        NOMBRE,
      });
      this.listadoselecioandoubicacion = ubicacionId;
    });
  }

  getUbicacion() {
    this.llenarcomboService.getUbicacion().subscribe((ubicacion) => {
      console.log(ubicacion);

      this.listaubicacion = ubicacion.sort((a, b) =>
        a.NOMBRE.localeCompare(b.NOMBRE),
      );
    });
  }

  crearFormulario() {
    this.ubicacionForm = this.fb.group({
      NOMBRE: ['', [Validators.required]],
    });
  }

  crearUbicacion() {
    if (this.ubicacionForm.invalid) {
      this.ubicacionForm.markAllAsTouched();
      return;
    }
    console.log(this.ubicacionForm.value);

    if (this.listadoselecioandoubicacion) {
      const data = {
        ...this.ubicacionForm.value,
        id: this.listadoselecioandoubicacion.id,
      };

      this.manteniemintoService
        .getUpdateUbicaion(data)
        .subscribe((resp: any) => {
          const { msg } = resp;
          Swal.fire('Actualizado', `${msg}`, 'success');
          $('#modal-info').modal('hide');
          this.getUbicacion();
          this.ubicacionForm.disable();
          this.ubicacionForm.reset();
          this.btnVal = 'Editar';
          this.listadoselecioandoubicacion = undefined;
          this.router.navigateByUrl('/dashboard/ubicacion/Nuevo');
        });
    } else {
      Swal.fire({
        allowOutsideClick: false,

        icon: 'info',
        text: 'Espere por favor ...',
      });
      Swal.showLoading(null);
      this.manteniemintoService
        .getCrearUbicacion(this.ubicacionForm.value)
        .subscribe(
          (resp: any) => {
            const { msg } = resp;
            this.getUbicacion();
            Swal.fire({
              icon: 'success',

              titleText: `${msg}`,
              timer: 1500,
            });
            $('#modal-info').modal('hide');
            this.ubicacionForm.reset({
              NOMBRE: '',
              CATEGORIA: '',
            });
            this.router.navigateByUrl('/dashboard/ubicacion/Nuevo');
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
  borrarMarca(ubicacion: Marca) {
    console.log(ubicacion);
    Swal.fire({
      title: 'Eliminar ubicacion?',
      text: `Esta seguro que desea eliminar la ubicacion  ${ubicacion.NOMBRE}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.manteniemintoService
          .getDeleteUbicacion(ubicacion.id)
          .subscribe((resp: any) => {
            const { msg } = resp;
            this.getUbicacion();
            Swal.fire({
              title: 'ubicacion eliminado!',
              text: `${msg}`,
              icon: 'success',
            });
          });
      }
    });
  }
  reset() {
    this.router.navigateByUrl('/dashboard/ubicacion/Nuevo');
    this.listadoselecioandoubicacion = undefined;
  }

  buscar(termino: string) {
    console.log(termino);
    if (termino.length === 0 || termino === '') {
      this.listaubicacion = this.ubicacionTemp;
    } else {
      this.manteniemintoService
        .buscarFiltroEstado(termino)
        .subscribe((ubicacion) => {
          this.listaubicacion = ubicacion;
        });
    }
  }
  cambioEstado() {
    if (this.btnVal != 'Editar') {
      this.crearUbicacion();
      this.ubicacionForm.enable();
      // this.panelform.reset();
    }
    this.ubicacionForm.enable();
    this.btnVal = 'Guardar';
  }
}
