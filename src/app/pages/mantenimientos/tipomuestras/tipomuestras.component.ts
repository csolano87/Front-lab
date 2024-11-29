import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Listaprueba } from 'src/app/interfaces/cargaListapruebas.interface';
import { Tipomuestra } from 'src/app/interfaces/cargarTipomuestras.interface';

import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-tipomuestras',
 
  templateUrl: './tipomuestras.component.html',
  styleUrl: './tipomuestras.component.css'
})
export class TipomuestrasComponent implements OnInit {
  muestraform!: UntypedFormGroup;
  cargando: boolean = false;
  listatipomuestra: Tipomuestra[] = [];
  page;
  constructor(
    private manteniemintoService: MantenimientosService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.crearFormulario();
  }
  get codigo() {
    return (
      this.muestraform?.get('codigo')!.invalid &&
      this.muestraform?.get('codigo')!.touched
    );
  }
  get nombre() {
    return (
      this.muestraform?.get('nombre')!.invalid &&
      this.muestraform?.get('nombre')!.touched
    );
  }
  get abreviatura() {
    return (
      this.muestraform?.get('abreviatura')!.invalid &&
      this.muestraform?.get('abreviatura')!.touched
    );
  }

/*   get TIEMPO() {
    return (
      this.muestraform?.get('TIEMPO')!.invalid &&
      this.muestraform?.get('TIEMPO')!.touched
    );
  }

  get VALOR() {
    return (
      this.muestraform?.get('VALOR')!.invalid &&
      this.muestraform?.get('VALOR')!.touched
    );
  } */
  ngOnInit(): void {
    this.getTipomuestra();
  }

  crearFormulario() {
    this.muestraform = this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      abreviatura:  ['', [Validators.required]],
      /* TIEMPO: ['', [Validators.required]],
      VALOR: ['', [Validators.required]], */
    });
  }

  getTipomuestra() {
    this.manteniemintoService.getTipomiuestra().subscribe((tipomuestra) => {
      console.log(tipomuestra);
      this.listatipomuestra = tipomuestra;
    });
  }
  crearPanel() {
    if (this.muestraform.invalid) {
      this.muestraform.markAllAsTouched();
      return;
    }
    console.log(this.muestraform.value);

    Swal.fire({
      allowOutsideClick: false,

      icon: 'info',
      text: 'Espere por favor ...',
    });
    Swal.showLoading(null);
    this.manteniemintoService
      .postTipomuestra(this.muestraform.value)
      .subscribe(
        (resp: any) => {
          this.getTipomuestra();
          const { msg } = resp;
          Swal.fire({
            icon: 'success',

            titleText: `${msg}`,
            timer: 1500,
          });
          $('#modal-info').modal('hide');
          this.muestraform.reset({
            codigo: '',
            nombre: '',
            abreviatura: '',
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

  borrarequipo(muestra: Tipomuestra) {

    console.log(muestra);

    Swal.fire({
      title: 'Eliminar prueba?',
      text: `Esta seguro que desea eliminar la tipo de muestra  ${muestra.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.manteniemintoService
          .deleteTipomuestra(muestra)
          .subscribe((resp: any) => {
            this.getTipomuestra();
            const { msg } = resp;

            Swal.fire({
              title: 'Tipo de muestra eliminada!',
              text: `${msg}`,
              icon: 'success',
            });
          });
      }
    });
  }

}
