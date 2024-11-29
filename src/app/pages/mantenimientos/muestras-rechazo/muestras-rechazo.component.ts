import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { MuestrasService } from 'src/app/services/muestras.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-muestras-rechazo',
  templateUrl: './muestras-rechazo.component.html',
  styleUrls: ['./muestras-rechazo.component.css'],
})
export class MuestrasRechazoComponent implements OnInit {
  /* usuario={
    numeroorden:'',
    estado:'2'
  } */

  rechazo = [
    {
      id: '1',
      isChecked: false,
      descripcion: 'Muestra Hemolizada',
    },
    { id: '2', isChecked: false, descripcion: 'Muestra Insuficiente' },
    { id: '3', isChecked: false, descripcion: 'Muestra Coagulada' },
    { id: '4', isChecked: false, descripcion: 'Muestra mal rotulada' },
    /*  {id:'5' ,isChecked: false,descripcion:'Muestra '}, */
    { id: '6', isChecked: false, descripcion: 'Otros motivos' },
  ];
  forma!: UntypedFormGroup;
  get numeroorden() {
    return (
      this.forma?.get('numeroorden')!.invalid &&
      this.forma?.get('numeroorden')!.touched
    );
  }
  get comentario() {
    return (
      this.forma?.get('comentario')!.invalid &&
      this.forma?.get('comentario')!.touched
    );
  }
  constructor(
    private fb: UntypedFormBuilder,
    private muestras: MuestrasService,
  ) {
    this.crearformulario();
  }

  ngOnInit(): void {}

  crearformulario() {
    this.forma = this.fb.group({
      numeroorden: ['', [Validators.required]],
      comentario: ['', [Validators.required]],
      estado: '2',
    });
  }
  guardar() {
    //  console.log( 'estadoooooo',forma.value );

    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach((control) => {
        control.markAsTouched();
      });

      return;
    }

    console.log(this.forma.value);

    this.muestras
      .guardarMuestrasRechazo(this.forma.value)

      .subscribe(
        (resp) => {
          Swal.fire({
            icon: 'success',

            titleText: 'Se a completado con exito el registro de tubo',
            showConfirmButton: false,
            timer: 1000,
          });

          this.forma.reset({
            numeroorden: '',
            comentario: '',
            estado: '2',
          });
        },
        (err) => {
          console.log('error', err);
          Swal.fire({
            icon: 'error',
            title: 'Error al autenticar',
            text: err.error.msg,
          });
        },
      );
  }
}
