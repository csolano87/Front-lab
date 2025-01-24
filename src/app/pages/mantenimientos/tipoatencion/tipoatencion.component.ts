import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tipoatencion } from 'src/app/interfaces/cargarTipoatencion.interface';
import { Tipogrupo } from 'src/app/interfaces/cargarTipogrupo.interface';
import { Tiposervicio } from 'src/app/interfaces/cargarTiposervicio.interface';

import { Marca } from 'src/app/models/marca.module';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
import { Modelo } from 'src/app/interfaces/cargaModelo.interface';
import { Data } from 'src/app/models/cargaGnerica.module';
declare var $: any;
@Component({
  selector: 'app-tipoatencion',

  templateUrl: './tipoatencion.component.html',
  styleUrl: './tipoatencion.component.css',
})
export class TipoatencionComponent implements OnInit {
  cargando = false;
  public page!: number;
  listaatencion: Tipoatencion[] = [];
   listacategoria: Modelo[] = [];
  atencionForm!: FormGroup;
  btnVal: string = 'guardar';
  listadoselecioandoatencion:Data;
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
      this.atencionForm?.get('nombre')!.invalid &&
      this.atencionForm?.get('nombre')!.touched
    );
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id})=>this.editarAtencion(id))
    this.getAtencion();
    this.getCategoria();
  }

  crearFormulario() {
    this.atencionForm = this.fb.group({
      nombre: ['', [Validators.required]],
    });
  }

  crearAtencion() {
    if (this.atencionForm.invalid) {
      this.atencionForm.markAllAsTouched();
      return;
    }





    console.log(this.atencionForm.value);

if (this.listadoselecioandoatencion) {
   const data = {
          id: this.listadoselecioandoatencion.id,
          ...this.atencionForm.value
        }
        console.log(data)
  this.manteniemintoService.getUpdateAtencion(data)
  .subscribe((resp:any)=>{
    const {msg}=resp;
      Swal.fire('Actualizado', `${msg}`, 'success');
              $('#modal-info').modal('hide');
              this.getAtencion();
              this.atencionForm.disable();
              this.atencionForm.reset();
              this.btnVal = 'Editar';
              this.listadoselecioandoatencion = undefined;
              this.router.navigateByUrl('/dashboard/atencion/Nuevo');
  })
} else {
  this.manteniemintoService.postAtencion(this.atencionForm.value).subscribe(
    (resp: any) => {
      this.getAtencion();
      const { msg } = resp;
      Swal.fire({
        icon: 'success',

        titleText: `${msg}`,
        timer: 1500,
      });
      $('#modal-info').modal('hide');
      this.atencionForm.reset({
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
  getAtencion() {
    this.manteniemintoService.getAtencion().subscribe((tipoatencion) => {
      console.log(tipoatencion);

      this.listaatencion = tipoatencion;
    });
  }


  getCategoria() {
    this.llenarcomboServices.getModelo().subscribe((modelo) => {
      console.log(modelo);

      this.listacategoria = modelo.sort((a,b)=>a.NOMBRE.localeCompare( b.NOMBRE));
    });
  }
  borrarAtencion(atencion: Tipoatencion) {
    console.log(atencion.id);

    Swal.fire({
      title: 'Eliminar tipo atencion?',
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
            this.getAtencion();
            Swal.fire({
              title: 'Tipo atencion  eliminado!',
              text: `${msg}`,
              icon: 'success',
            });
          });
      }
    });
  }

  editarAtencion(id: string) {
    if(id === 'Nuevo') {
      this.atencionForm.reset();
      this.atencionForm.enable();
      this.btnVal = 'Guardar';
      return;
    }
    console.log(id)
    this.btnVal = 'Editar';
    this.atencionForm.disable();
    this.manteniemintoService.getByIdatencion(id).
      subscribe((estadoclienteId) => {
        console.log(estadoclienteId);
        !estadoclienteId
          ?
          this.router.navigateByUrl('/dashboard/atencion/Nuevo')
          :
          console.log(estadoclienteId);
        const { nombre } = estadoclienteId;

        this.atencionForm.setValue({
          nombre,
        });

        this.listadoselecioandoatencion = estadoclienteId;
      })


  }

  cambioestado() {
    if (this.btnVal != 'Editar') {
      this.crearAtencion();
    }
    this.atencionForm.enable();
    this.btnVal = 'Guardar';

  }
}
