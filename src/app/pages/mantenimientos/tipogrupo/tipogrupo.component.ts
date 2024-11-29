import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tipogrupo } from 'src/app/interfaces/cargarTipogrupo.interface';
import { Tiposervicio } from 'src/app/interfaces/cargarTiposervicio.interface';

import { Marca } from 'src/app/models/marca.module';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-tipogrupo',
  
  templateUrl: './tipogrupo.component.html',
  styleUrl: './tipogrupo.component.css'
})
export class TipogrupoComponent  implements OnInit{
  cargando = false;
  public page!: number;
  listagrupo:Tipogrupo[]=[];
  grupoForm!: FormGroup;
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
      this.grupoForm?.get('nombre')!.invalid &&
      this.grupoForm?.get('nombre')!.touched
    );
  }
  ngOnInit(): void {
    this.getGrupo();
  }

  crearFormulario() {
    this.grupoForm = this.fb.group({
      nombre: ['', [Validators.required]],
    });
  }

  crearGrupo() {
    if (this.grupoForm.invalid) {
      this.grupoForm.markAllAsTouched();
      return;
    }
    console.log(this.grupoForm.value);

    Swal.fire({
      allowOutsideClick: false,

      icon: 'info',
      text: 'Espere por favor ...',
    });
    Swal.showLoading(null);
    this.manteniemintoService
      .postGrupo(this.grupoForm.value)
      .subscribe(
        (resp: any) => {
          this.getGrupo();
          const { msg } = resp;
          Swal.fire({
            icon: 'success',

            titleText: `${msg}`,
            timer: 1500,
          });
          $('#modal-info').modal('hide');
          this.grupoForm.reset({
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
  getGrupo() {
    this.manteniemintoService.getGrupo().subscribe((tipogrupo) => {
      console.log(tipogrupo);

      this.listagrupo = tipogrupo;
    });
  }
  borrarGrupo(grupo: Tipogrupo) {
    console.log(grupo.id);

    Swal.fire({
      title: 'Eliminar Grupo?',
      text: `Esta seguro que desea eliminar la grupo  ${grupo.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.manteniemintoService
          .deleteGrupo(grupo)
          .subscribe((resp: any) => {
            const { msg } = resp;
            this.getGrupo();
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
