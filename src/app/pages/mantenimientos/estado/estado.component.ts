import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Marca } from 'src/app/interfaces/cargaMarca.interface';
import {
  EstadoByID,
  EstadoID,
} from 'src/app/interfaces/cargarByIdEstado.interface';
import { cargaEstado } from 'src/app/models/cargarEstado.module';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-estado',

  templateUrl: './estado.component.html',
  styleUrl: './estado.component.css',
})
export class EstadoComponent {
  public btnVal = 'Guardar';
  estadoForm!: FormGroup;
  cargando: false;
  listadoselecioandoestado: EstadoID;
  listaestado: Marca[] = [];
  estadoTemp: Marca[] = [];
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
      this.estadoForm?.get('NOMBRE')!.invalid &&
      this.estadoForm?.get('NOMBRE')!.touched
    );
  }
  get color() {
    return (
      this.estadoForm?.get('color')!.invalid &&
      this.estadoForm?.get('color')!.touched
    );
  }
  get CATEGORIA() {
    return (
      this.estadoForm?.get('CATEGORIA')!.invalid &&
      this.estadoForm?.get('CATEGORIA')!.touched
    );
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.crearEstado(id));

    this.getEstado();
  }

  crearEstado(id: string) {
    console.log(id);
    if (id === 'Nuevo') {
      this.estadoForm.reset();
      this.estadoForm.enable();
      this.btnVal = 'Guardar';
      return;
    }
    this.btnVal = 'Editar';
    this.estadoForm.disable();
    this.manteniemintoService.getByIDEstado(id).subscribe((estadoId) => {
      console.log(estadoId);
      !estadoId
        ? this.router.navigateByUrl('/dashboard/estado/Nuevo')
        : console.log(estadoId);
      const { NOMBRE, color } = estadoId;

      this.estadoForm.patchValue({
        NOMBRE,
        color
      });
      this.listadoselecioandoestado = estadoId;
    });
  }

  getEstado() {
    this.llenarcomboService.getEstado().subscribe((estado) => {
      console.log(estado);

      this.listaestado = estado.sort((a,b)=>a.NOMBRE.localeCompare( b.NOMBRE));
    });
  }

  crearFormulario() {
    this.estadoForm = this.fb.group({
      NOMBRE: ['', [Validators.required]],
      color: ['', [Validators.required]],
    });
  }

  crearMarca() {
    if (this.estadoForm.invalid) {
      this.estadoForm.markAllAsTouched();
      return;
    }
    console.log(this.estadoForm.value);

    if (this.listadoselecioandoestado) {
      const data = {
        ...this.estadoForm.value,
        id: this.listadoselecioandoestado.id,
      };
      this.manteniemintoService.getUpdateEstado(data).subscribe((resp: any) => {
        const { msg } = resp;
        Swal.fire('Actualizado', `${msg}`, 'success');
        $('#modal-info').modal('hide');
        this.getEstado();
        this.estadoForm.disable();
        this.estadoForm.reset();
        this.btnVal = 'Editar';
        this.listadoselecioandoestado=undefined;
        this.router.navigateByUrl('/dashboard/estado/Nuevo');
      });
    } else {
      Swal.fire({
        allowOutsideClick: false,

        icon: 'info',
        text: 'Espere por favor ...',
      });
      Swal.showLoading(null);
      this.manteniemintoService.getCrearEstado(this.estadoForm.value).subscribe(
        (resp: any) => {
          const { msg } = resp;
          this.getEstado();
          Swal.fire({
            icon: 'success',

            titleText: `${msg}`,
            timer: 1500,
          });
          $('#modal-info').modal('hide');
          this.estadoForm.reset({
            NOMBRE: '',
            CATEGORIA: '',
            color:''
          });
          this.router.navigateByUrl('/dashboard/estado/Nuevo');
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
  borrarMarca(estado: Marca) {
    console.log(estado);
    Swal.fire({
      title: 'Eliminar estado?',
      text: `Esta seguro que desea eliminar el estado  ${estado.NOMBRE}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.manteniemintoService
          .getDeleteEstado(estado.id)
          .subscribe((resp: any) => {
            const { msg } = resp;
            this.getEstado();
            Swal.fire({
              title: 'Estado eliminado!',
              text: `${msg}`,
              icon: 'success',
            });
          });
      }
    });
  }

  cambioEstado() {
    if (this.btnVal != 'Editar') {
      this.crearMarca();
      this.estadoForm.enable();
      // this.panelform.reset();
    }
    this.estadoForm.enable();
    this.btnVal = 'Guardar';
  }

  reset() {
    this.router.navigateByUrl('/dashboard/estado/Nuevo');
    this.listadoselecioandoestado=undefined;
  }

  buscar(termino: string) {
    console.log(termino);
    if (termino.length === 0 || termino === '') {
      this.listaestado = this.estadoTemp;
    } else {
      this.manteniemintoService
        .buscarFiltroEstado(termino)
        .subscribe((estado) => {
          this.listaestado = estado;
        });
    }
  }
}
