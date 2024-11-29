import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { MuestrasService } from 'src/app/services/muestras.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-muestras',
  templateUrl: './muestras.component.html',
  styleUrls: ['./muestras.component.css'],
})
export class MuestrasComponent implements OnInit {
  /*  usuario={
     numeroorden:''
   } */

  forma!: UntypedFormGroup;
  get numeroorden() {
    return (
      this.forma?.get('numeroorden')!.invalid &&
      this.forma?.get('numeroorden')!.touched
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
      estado: '1',
    });
  }
  guardar() {
    console.log(this.forma);

    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach((control) => {
        control.markAsTouched();
      });

      return;
    }

    console.log(this.forma.value);

    this.muestras
      .guardarMuestras(this.forma.value)

      .subscribe(
        (resp) => {
          console.log(
            `****************VALIDAR TUBITOO******************`,
            resp,
          );
          Swal.fire({
            icon: 'success',

            titleText: 'Se a completado con exito el registro de tubo',
            showConfirmButton: false,
            timer: 1000,
          });

          this.forma.reset({
            numeroorden: '',
            estado: '1',
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
