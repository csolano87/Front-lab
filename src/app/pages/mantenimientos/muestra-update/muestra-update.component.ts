import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MuestrasService } from 'src/app/services/muestras.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-muestra-update',
  templateUrl: './muestra-update.component.html',
  styleUrls: ['./muestra-update.component.css'],
})
export class MuestraUpdateComponent implements OnInit {
  ngOnInit(): void {}
  forma!: UntypedFormGroup;
  get numeroorden() {
    return (
      this.forma?.get('numeroorden')!.invalid &&
      this.forma?.get('numeroorden')!.touched
    );
  }
  get comentarioUpdate() {
    return (
      this.forma?.get('comentarioUpdate')!.invalid &&
      this.forma?.get('comentarioUpdate')!.touched
    );
  }
  constructor(
    private fb: UntypedFormBuilder,
    private muestras: MuestrasService,
  ) {
    this.crearformulario();
  }

  crearformulario() {
    this.forma = this.fb.group({
      numeroorden: ['', [Validators.required]],
      comentarioUpdate: ['', [Validators.required]],
      estado: '1',
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
      .guardarMuestrasUpdate(this.forma.value)

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
            comentarioUpdate: '',
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
