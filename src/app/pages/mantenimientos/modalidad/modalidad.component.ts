import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Marca } from 'src/app/interfaces/cargaMarca.interface';
import { Modalidad } from 'src/app/interfaces/cargaModalidad.interface';

import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-modalidad',

  templateUrl: './modalidad.component.html',
  styleUrl: './modalidad.component.css'
})
export class ModalidadComponent {

  modalidadForm!: FormGroup;
  cargando: false;
  listamodalidad: Modalidad[] = [];
  public page!: number;
  constructor(
    private manteniemintoService: MantenimientosService,
    private fb: FormBuilder,
    private router: Router,
    private llenarcomboService: LlenarCombosService,
    private activatedRoute: ActivatedRoute,) { this.crearFormulario(); }
  get NOMBRE() {
    return (
      this.modalidadForm?.get('NOMBRE')!.invalid &&
      this.modalidadForm?.get('NOMBRE')!.touched
    );
  }

  get CATEGORIA() {
    return (
      this.modalidadForm?.get('CATEGORIA')!.invalid &&
      this.modalidadForm?.get('CATEGORIA')!.touched
    );
  }
  ngOnInit(): void {

    this.getModalidad();
  }
  getModalidad() {
    this.llenarcomboService.getModalidad().subscribe((modalidad) => {
      console.log(modalidad);

      this.listamodalidad = modalidad;
    });
  }

  crearFormulario() {
    this.modalidadForm = this.fb.group(
      {

        NOMBRE: ['', [Validators.required]],

      },

    );
  }


  crearModalidad() {

    if (this.modalidadForm.invalid) {
      this.modalidadForm.markAllAsTouched();
      return;
    }
    console.log(this.modalidadForm.value);

    Swal.fire({
      allowOutsideClick: false,

      icon: 'info',
      text: 'Espere por favor ...',
    });
    Swal.showLoading(null);
    this.manteniemintoService.getCrearModalidad(this.modalidadForm.value).subscribe(
      (resp: any) => {

        this.getModalidad();
        const { msg } = resp
        Swal.fire({
          icon: 'success',

          titleText: `${msg}`,
          timer: 1500
        });
        $('#modal-info').modal('hide');
        this.modalidadForm.reset({

          NOMBRE: '',
        //  CATEGORIA: '',

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
  borrarMarca() {

  }
}
