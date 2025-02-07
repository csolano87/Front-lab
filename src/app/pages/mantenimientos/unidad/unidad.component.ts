import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tipoatencion } from 'src/app/interfaces/cargarTipoatencion.interface';
import { Tipogrupo } from 'src/app/interfaces/cargarTipogrupo.interface';
import { Tiposervicio } from 'src/app/interfaces/cargarTiposervicio.interface';
import { Tipofisiologico } from 'src/app/interfaces/cargatipofisiologico.interface';
import { Unidad } from 'src/app/models/cargaUnidad.module';


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
  btnVal: string = 'Guardar';
    listadoselecioandounidad:Unidad ;
  constructor(
    private llenarcomboServices: LlenarCombosService,
    private manteniemintoService: MantenimientosService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
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
    this.activatedRoute.params.subscribe(({ id }) => this.crearUnidad(id))
  }

  crearFormulario() {
    this.unidadForm = this.fb.group({
      DESCRIPCION: ['', [Validators.required]],
    });
  }

  Unidad() {
    if (this.unidadForm.invalid) {
      this.unidadForm.markAllAsTouched();
      return;
    }
if (this.listadoselecioandounidad) {
  const data = {
    id: this.listadoselecioandounidad.id,
    ...this.unidadForm.value
  }
  console.log(data)
this.manteniemintoService.UpdateUnidad(data)
.subscribe((resp:any)=>{
  const {msg}=resp;
  Swal.fire('Actualizado', `${msg}`, 'success');
            $('#modal-info').modal('hide');
            this.getUnidad();
            this.unidadForm.disable();
            this.unidadForm.reset();
            this.btnVal = 'Editar';
            this.listadoselecioandounidad = undefined;
            this.router.navigateByUrl('/dashboard/unidad/Nuevo');
})


} else {
  
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




  }
  getUnidad() {
    this.manteniemintoService.getUnidad().subscribe((unidad) => {
      console.log(unidad);

      this.listaunidad = unidad;
    });
  }
  borrarUnidad(unidad: Unidad) {
    console.log(unidad);

    Swal.fire({
      title: 'Eliminar Unidad?',
      text: `Esta seguro que desea eliminar la unidad  ${unidad.DESCRIPCION}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.manteniemintoService
          .deleteAtencion(unidad)
          .subscribe((resp: any) => {
            const { msg } = resp;
            this.getUnidad();
            Swal.fire({
              title: 'Unidad eliminada!',
              text: `${msg}`,
              icon: 'success',
            });
          });
      }
    });
  }

  crearUnidad(id: string) {
    console.log(id);
    if (id == 'Nuevo') {
      this.unidadForm.reset();
      this.unidadForm.enable();
      this.btnVal = 'Guardar'
      return;
    }
    this.btnVal = 'Editar';
    this.unidadForm.disable();
    this.manteniemintoService.geByIDtUnidad(id).subscribe((unidadId) => {
      !unidadId ?
        this.router.navigateByUrl("/dashboard/unidad/Nuevo")
        : console.log(unidadId)

      const { DESCRIPCION } = unidadId
      this.unidadForm.setValue({
        DESCRIPCION
      });
this.listadoselecioandounidad=unidadId;
    })

  }

  cambioEstado() {
    if (this.btnVal != 'Editar') {
      this.Unidad();
    }
    this.unidadForm.enable();
    this.btnVal = 'Guardar'
  }
}
