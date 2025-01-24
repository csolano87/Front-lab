import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tiposervicio } from 'src/app/interfaces/cargarTiposervicio.interface';
import { Data } from 'src/app/models/cargaGnerica.module';

import { Marca } from 'src/app/models/marca.module';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-tiposervicio',

  templateUrl: './tiposervicio.component.html',
  styleUrl: './tiposervicio.component.css'
})
export class TiposervicioComponent implements OnInit {
  cargando = false;
  public page!: number;
  listaServicio: Tiposervicio[] = [];
  servicioForm!: FormGroup;
  listadoselecioandoservicio: Data;
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
      this.servicioForm?.get('nombre')!.invalid &&
      this.servicioForm?.get('nombre')!.touched
    );
  }
  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => this.editarServicio(id))
    this.getServicio();
  }

  crearFormulario() {
    this.servicioForm = this.fb.group({
      nombre: ['', [Validators.required]],
    });
  }

  crearServicio() {
    if (this.servicioForm.invalid) {
      this.servicioForm.markAllAsTouched();
      return;
    }
    if (this.listadoselecioandoservicio) {
      const data = {
        id: this.listadoselecioandoservicio.id,
        ...this.servicioForm.value
      }
      console.log(data)
      this.manteniemintoService.getUpdateServicio(data)
        .subscribe((resp: any) => {
          const { msg } = resp;
          Swal.fire('Actualizado', `${msg}`, 'success');
          $('#modal-info').modal('hide');
          this.getServicio();
          this.servicioForm.disable();
          this.servicioForm.reset();
          this.btnVal = 'Editar';
          this.listadoselecioandoservicio = undefined;
          this.router.navigateByUrl('/dashboard/servicio/Nuevo');
        })
    } else {



      this.manteniemintoService
        .postServicio(this.servicioForm.value)
        .subscribe(
          (resp: any) => {
            this.getServicio();
            const { msg } = resp;
            Swal.fire({
              icon: 'success',

              titleText: `${msg}`,
              timer: 1500,
            });
            $('#modal-info').modal('hide');
            this.servicioForm.reset({
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
  getServicio() {
    this.manteniemintoService.getServicio().subscribe((tiposervicio) => {
      console.log(tiposervicio);

      this.listaServicio = tiposervicio;
    });
  }
  borrarServicio(servicio: Tiposervicio) {
    console.log(servicio.id);

    Swal.fire({
      title: 'Eliminar Servicio?',
      text: `Esta seguro que desea eliminar la servicio  ${servicio.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.manteniemintoService
          .deleteServicio(servicio)
          .subscribe((resp: any) => {
            const { msg } = resp;
            this.getServicio();
            Swal.fire({
              title: 'servicio eliminada!',
              text: `${msg}`,
              icon: 'success',
            });
          });
      }
    });
  }

  editarServicio(id: string) {
    if (id === 'Nuevo') {
      this.servicioForm.reset();
      this.servicioForm.enable();
      this.btnVal = 'Guardar';
      return;
    }
    console.log(id)
    this.btnVal = 'Editar';
    this.servicioForm.disable();
    this.manteniemintoService.getByIdServicio(id).
      subscribe((estadoclienteId) => {
        console.log(estadoclienteId);
        !estadoclienteId
          ?
          this.router.navigateByUrl('/dashboard/servicio/Nuevo')
          :
          console.log(estadoclienteId);
        const { nombre } = estadoclienteId;

        this.servicioForm.setValue({
          nombre,
        });

        this.listadoselecioandoservicio = estadoclienteId;
      })

  }

  cambioestado() {
    if (this.btnVal != 'Editar') {
      this.crearServicio();
    }
    this.servicioForm.enable();
    this.btnVal = 'Guardar';


  }
}
