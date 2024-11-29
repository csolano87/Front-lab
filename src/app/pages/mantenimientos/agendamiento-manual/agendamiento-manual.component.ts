import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AgendamientoService } from 'src/app/services/agendamiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agendamiento-manual',
  templateUrl: './agendamiento-manual.component.html',
  styleUrls: ['./agendamiento-manual.component.css'],
})
export class AgendamientoManualComponent implements OnInit {
  ManualForm: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    public agendamientoService: AgendamientoService,
  ) {
    this.crearformulario();
  }
  get DLCBEN() {
    return (
      this.ManualForm?.get('DLCBEN')!.invalid &&
      this.ManualForm?.get('DLCBEN')!.touched
    );
  }

  get DLCACT() {
    return (
      this.ManualForm?.get('DLCACT')!.invalid &&
      this.ManualForm?.get('DLCACT')!.touched
    );
  }
  get DLCDEP() {
    return (
      this.ManualForm?.get('DLCDEP')!.invalid &&
      this.ManualForm?.get('DLCDEP')!.touched
    );
  }
  get DLCOTR() {
    return (
      this.ManualForm?.get('DLCOTR')!.invalid &&
      this.ManualForm?.get('DLCOTR')!.touched
    );
  }
  get DLCEDU() {
    return (
      this.ManualForm?.get('DLCEDU')!.invalid &&
      this.ManualForm?.get('DLCEDU')!.touched
    );
  }
  get DLCPRO() {
    return (
      this.ManualForm?.get('DLCPRO')!.invalid &&
      this.ManualForm?.get('DLCPRO')!.touched
    );
  }
  get DLCSER() {
    return (
      this.ManualForm?.get('DLCSER')!.invalid &&
      this.ManualForm?.get('DLCSER')!.touched
    );
  }
  get DLCMED() {
    return (
      this.ManualForm?.get('DLCMED')!.invalid &&
      this.ManualForm?.get('DLCMED')!.touched
    );
  }
  get DLCDIS() {
    return (
      this.ManualForm?.get('DLCDIS')!.invalid &&
      this.ManualForm?.get('DLCDIS')!.touched
    );
  }

  get DLNUOR() {
    return (
      this.ManualForm?.get('DLNUOR')!.invalid &&
      this.ManualForm?.get('DLNUOR')!.touched
    );
  }

  get DLAPEL() {
    return (
      this.ManualForm?.get('DLAPEL')!.invalid &&
      this.ManualForm?.get('DLAPEL')!.touched
    );
  }
  get DLNOMB() {
    return (
      this.ManualForm?.get('DLNOMB')!.invalid &&
      this.ManualForm?.get('DLNOMB')!.touched
    );
  }
  get DLSEXO() {
    return (
      this.ManualForm?.get('DLSEXO')!.invalid &&
      this.ManualForm?.get('DLSEXO')!.touched
    );
  }

  get DLFECN() {
    return (
      this.ManualForm?.get('DLFECN')!.invalid &&
      this.ManualForm?.get('DLFECN')!.touched
    );
  }
  get DLHIST() {
    return (
      this.ManualForm?.get('DLHIST')!.invalid &&
      this.ManualForm?.get('DLHIST')!.touched
    );
  }
  get DLTIDO() {
    return (
      this.ManualForm?.get('DLTIDO')!.invalid &&
      this.ManualForm?.get('DLTIDO')!.touched
    );
  }
  get FECHA() {
    return (
      this.ManualForm?.get('FECHA')!.invalid &&
      this.ManualForm?.get('FECHA')!.touched
    );
  }

  get DLCEXAS() {
    return this.ManualForm.get('DLCEXAS') as UntypedFormArray;
  }
  ngOnInit(): void {}
  crearformulario() {
    this.ManualForm = this.fb.group({
      DLCBEN: ['', [Validators.required]],
      DLCACT: ['', [Validators.required]],
      DLCDEP: ['', [Validators.required]],
      DLCOTR: ['', [Validators.required]],
      DLCEDU: ['', [Validators.required]],
      DLCPRO: ['', [Validators.required]],
      DLCSER: ['', [Validators.required]],
      DLCMED: ['', [Validators.required]],
      DLCDIS: ['', [Validators.required]],
      DLNUOR: ['', [Validators.required]],
      DLAPEL: ['', [Validators.required]],
      DLNOMB: ['', [Validators.required]],
      DLSEXO: ['', [Validators.required]],
      DLFECN: ['', [Validators.required]],
      DLHIST: ['', [Validators.required]],
      DLTIDO: ['', [Validators.required]],
      FECHA: [''],

      DLCEXAS: this.fb.array([]),
    });
  }
  guardarOrden() {
    if (this.ManualForm.invalid) {
      return Object.values(this.ManualForm.controls).forEach((control) => {
        control.markAsTouched();
        console.log(control);
      });
    }
    this.agendamientoService.GuardarOrden(this.ManualForm.value).subscribe(
      (resp: any) => {
        const { msg } = resp;
        Swal.fire({
          icon: 'success',
          text: `${msg}`,
        });
        //   this.agendamientoService.emit('orden-generada', { mensaje: 'Se ha creado una nueva orden' });
        this.ManualForm.reset();
        this.DLCEXAS.clear();
      },
      (err) => {
        console.log(`***error**`, err);
        Swal.fire({
          icon: 'info',

          text: err.error.msg,
        });
      },
    );
  }
  buscarAs400(orden: string) {
    this.agendamientoService.ordenAs400(orden).subscribe((data) => {
      //this.dataseleccionada=data;

      const {
        DLCBEN,
        DLCACT,
        DLCDEP,
        DLCOTR,
        DLCEDU,
        DLCPRO,
        DLCSER,
        DLCMED,
        DLCDIS,
        DLNUOR,
        DLAPEL,
        DLNOMB,
        DLSEXO,
        DLFECN,
        DLHIST,
        DLTIDO,

        DLCEXAS,
      } = data;
      console.log(data.DLCBEN);
      console.log(DLCBEN);
      // this.dataseleccionada=data
      this.ManualForm.setValue({
        DLCBEN: DLCBEN,
        DLCACT: DLCACT,
        DLCDEP: DLCDEP,
        DLCOTR: DLCOTR,
        DLCEDU: DLCEDU,
        DLCPRO: DLCPRO,
        DLCSER: DLCSER,
        DLCMED: DLCMED,
        DLCDIS: DLCDIS,
        DLNUOR: DLNUOR,
        DLAPEL: DLAPEL,
        DLNOMB: DLNOMB,
        DLSEXO: DLSEXO,
        DLFECN: DLFECN,
        DLHIST: DLHIST,
        DLTIDO: DLTIDO,
        FECHA: '',
        DLCEXAS: DLCEXAS.map((valor) =>
          this.DLCEXAS.push(
            this.fb.group({
              ItemID: valor['ItemID'],
              ItemName: valor['ItemName'],
            }),
          ),
        ),
      });
    });
  }
}
