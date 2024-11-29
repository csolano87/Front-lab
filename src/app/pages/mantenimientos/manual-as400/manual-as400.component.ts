import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AgendamientoService } from 'src/app/services/agendamiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manual-as400',
  

  templateUrl: './manual-as400.component.html',
  styleUrl: './manual-as400.component.css',
})
export class ManualAs400Component  {
 /*  OrdenAs400Form!: FormGroup;
  get DLCBEN() {
    return (
      this.OrdenAs400Form?.get('DLCBEN')!.invalid &&
      this.OrdenAs400Form?.get('DLCBEN')!.touched
    );
  }

  get DLCACT() {
    return (
      this.OrdenAs400Form?.get('DLCACT')!.invalid &&
      this.OrdenAs400Form?.get('DLCACT')!.touched
    );
  }
  get DLCDEP() {
    return (
      this.OrdenAs400Form?.get('DLCDEP')!.invalid &&
      this.OrdenAs400Form?.get('DLCDEP')!.touched
    );
  }
  get DLCOTR() {
    return (
      this.OrdenAs400Form?.get('DLCOTR')!.invalid &&
      this.OrdenAs400Form?.get('DLCOTR')!.touched
    );
  }
  get DLCEDU() {
    return (
      this.OrdenAs400Form?.get('DLCEDU')!.invalid &&
      this.OrdenAs400Form?.get('DLCEDU')!.touched
    );
  }
  get DLCPRO() {
    return (
      this.OrdenAs400Form?.get('DLCPRO')!.invalid &&
      this.OrdenAs400Form?.get('DLCPRO')!.touched
    );
  }
  get DLCSER() {
    return (
      this.OrdenAs400Form?.get('DLCSER')!.invalid &&
      this.OrdenAs400Form?.get('DLCSER')!.touched
    );
  }
  get DLCMED() {
    return (
      this.OrdenAs400Form?.get('DLCMED')!.invalid &&
      this.OrdenAs400Form?.get('DLCMED')!.touched
    );
  }
  get DLCDIS() {
    return (
      this.OrdenAs400Form?.get('DLCDIS')!.invalid &&
      this.OrdenAs400Form?.get('DLCDIS')!.touched
    );
  }

  get DLNUOR() {
    return (
      this.OrdenAs400Form?.get('DLNUOR')!.invalid &&
      this.OrdenAs400Form?.get('DLNUOR')!.touched
    );
  }

  get DLAPEL() {
    return (
      this.OrdenAs400Form?.get('DLAPEL')!.invalid &&
      this.OrdenAs400Form?.get('DLAPEL')!.touched
    );
  }
  get DLNOMB() {
    return (
      this.OrdenAs400Form?.get('DLNOMB')!.invalid &&
      this.OrdenAs400Form?.get('DLNOMB')!.touched
    );
  }
  get DLSEXO() {
    return (
      this.OrdenAs400Form?.get('DLSEXO')!.invalid &&
      this.OrdenAs400Form?.get('DLSEXO')!.touched
    );
  }

  get DLFECN() {
    return (
      this.OrdenAs400Form?.get('DLFECN')!.invalid &&
      this.OrdenAs400Form?.get('DLFECN')!.touched
    );
  }
  get DLHIST() {
    return (
      this.OrdenAs400Form?.get('DLHIST')!.invalid &&
      this.OrdenAs400Form?.get('DLHIST')!.touched
    );
  }
  get DLTIDO() {
    return (
      this.OrdenAs400Form?.get('DLTIDO')!.invalid &&
      this.OrdenAs400Form?.get('DLTIDO')!.touched
    );
  }
  get FECHA() {
    return (
      this.OrdenAs400Form?.get('FECHA')!.invalid &&
      this.OrdenAs400Form?.get('FECHA')!.touched
    );
  }

  get DLCEXAS() {
    return this.OrdenAs400Form.get('DLCEXAS') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private activatedRoute:ActivatedRoute,
    public agendamientoService: AgendamientoService,
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((id)=>console.log(id))
  }
  crearFormulario() {
    this.OrdenAs400Form = this.fb.group({
      DLNUOR: ['', [Validators.required]],
      DLHIST: ['', [Validators.required]],
      DLAPEL: ['', [Validators.required]],
      DLCEDU: ['', [Validators.required]],
      DLFECN: ['', [Validators.required]],
      DLSEXO: ['', [Validators.required]],
   
      DLTIDO: ['', [Validators.required]],
      DLCPRO: ['', [Validators.required]],
      DLCSER: ['', [Validators.required]],
      DLCMED: ['', [Validators.required]],
      DLCEXAS: this.fb.array([]),
    });
  }
  guardarOrden() {
    if (this.OrdenAs400Form.invalid) {
      return Object.values(this.OrdenAs400Form.controls).forEach((control) => {
        control.markAsTouched();
        console.log(control);
      });
    }
    this.OrdenAs400Form.enable();
    this.agendamientoService.GuardarOrden(this.OrdenAs400Form.value).subscribe(
      (resp: any) => {
        const { msg } = resp;
        Swal.fire({
          icon: 'success',
          text: `${msg}`,
        });
     
        this.OrdenAs400Form.reset();
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

  borrarPasatiempo(i) {}

  buscarHis(orden: string) {
    this.agendamientoService.ordenAs400(orden).subscribe((data) => {
      this.OrdenAs400Form.disable();
      console.log(data);
      if (data.DLCBEN) {
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

        this.OrdenAs400Form.setValue({
         
          DLCEDU: DLCEDU,
          DLCPRO: DLCPRO,
          DLCSER: DLCSER,
          DLCMED: DLCMED,
       
          DLNUOR: DLNUOR,
    
          DLAPEL: DLAPEL,
          DLSEXO: DLSEXO,
          DLFECN:
            DLFECN.substring(0, 4) +
            '-' +
            DLFECN.substring(4, 6) +
            '-' +
            DLFECN.substring(6, 8),
          DLHIST: DLHIST,
          DLTIDO: DLTIDO,
          DLCEXAS: DLCEXAS.map((valor) =>
            this.DLCEXAS.push(
              this.fb.group({
                ItemID: valor['ItemID'],
                ESTADO: [true],
                ItemName: valor['ItemName'],
              }),
            ),
          ),
        });
      } else {
        Swal.fire({
          icon: 'success',
          text: `${data}`,
        });
        this.OrdenAs400Form.reset();
        this.OrdenAs400Form.enable();
        this.DLCEXAS.clear();
      }
    });
  }

  reset() {
    this.OrdenAs400Form.reset();
    this.OrdenAs400Form.enable();
    this.DLCEXAS.clear();
  } */
}
