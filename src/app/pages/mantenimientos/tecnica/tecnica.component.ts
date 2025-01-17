import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Tecnica } from 'src/app/interfaces/cargar-tecnica.interface';
//import { TipoTecnica } from 'src/app/interfaces/cargarTipoTecnica.interface';
import { Tipogrupo } from 'src/app/interfaces/cargarTipogrupo.interface';
import { Tiposervicio } from 'src/app/interfaces/cargarTiposervicio.interface';
import { Data } from 'src/app/models/cargaGnerica.module';

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
  listadoselecioandotecnica: Data;
  btnVal: string = 'guardar';
  constructor(
    private llenarcomboServices: LlenarCombosService,
    private manteniemintoService: MantenimientosService,
    private activatedRoute: ActivatedRoute,
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

    this.activatedRoute.params.subscribe(({ id }) => this.Creartecnicas(id));
    this.getTecnica();
  }

  crearFormulario() {
    this.TecnicaForm = this.fb.group({
      nombre: ['', [Validators.required]],
    });
  }
  Creartecnicas(id: string) {
    if (id === 'Nuevo') {
      this.TecnicaForm.reset();
      this.TecnicaForm.enable();
      this.btnVal = 'Guardar';
      return;
    }
    console.log(id)
    this.btnVal = 'Editar';
    this.TecnicaForm.disable();
    this.manteniemintoService.getByIDTecnica(id).
      subscribe((estadoclienteId) => {
        console.log(estadoclienteId);
        !estadoclienteId
          ?
          this.router.navigateByUrl('/dashboard/tecnica/Nuevo')
          :
          console.log(estadoclienteId);
        const { nombre } = estadoclienteId;

        this.TecnicaForm.setValue({
          nombre,
        });

        this.listadoselecioandotecnica = estadoclienteId;
      })


  }
  crearTecnica() {
    if (this.TecnicaForm.invalid) {
      this.TecnicaForm.markAllAsTouched();
      return;
    }
    if (this.listadoselecioandotecnica) {
      const data = {
        id: this.listadoselecioandotecnica.id,
        ...this.TecnicaForm.value
      }
this.manteniemintoService.getUpdateTecnica(data)
.subscribe((resp:any)=>{
  const {msg}=resp;
    Swal.fire('Actualizado', `${msg}`, 'success');
            $('#modal-info').modal('hide');
            this.getTecnica();
            this.TecnicaForm.disable();
            this.TecnicaForm.reset();
            this.btnVal = 'Editar';
            this.listadoselecioandotecnica = undefined;
            this.router.navigateByUrl('/dashboard/tecnica/Nuevo');
})


    } else {
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



  cambioestado() {
    if (this.btnVal != 'Editar') {
      this.crearTecnica();
    }
    this.TecnicaForm.enable();
    this.btnVal = 'Guardar';

  }
}
