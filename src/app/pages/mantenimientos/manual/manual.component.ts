import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Lista } from 'src/app/models/doctor.module';
import { OrdenExt } from 'src/app/models/ordenext.module';
import { Origin } from 'src/app/models/origin.module';
import { AgendamientoService } from 'src/app/services/agendamiento.service';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-manual',

  templateUrl: './manual.component.html',
  styleUrl: './manual.component.css',
})
export class ManualComponent implements OnInit {
  OrdenAs400Form!: FormGroup;
  ordenExtseleccionada: OrdenExt;
  listaorigin: Origin[] = [];
  listaSala: Origin[] = [];
  listaservice: Origin[] = [];
  listadoctor: Lista[] = [];
  listaOperador: Origin[] = [];
  listaCentrosalud: Origin[] = [];
  listaFlebotomista: Origin[] = [];
  btnVal = 'Guardar';
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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private doctorservice: LlenarCombosService,
    public agendamientoService: AgendamientoService,
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.crearOrden(id));
    this.doctorservice.getOrigin().subscribe((resp) => {
      console.log(resp);
      this.listaorigin = resp;
    });
    //listaCentrosalud

    this.doctorservice.getDoctor().subscribe((resp) => {
      console.log(resp);
      this.listadoctor = resp;
    });

    this.doctorservice.getCentrosalud().subscribe((resp) => {
      console.log(resp);
      this.listaCentrosalud = resp;
    });
    this.doctorservice.getService().subscribe((resp) => {
      console.log(resp);
      this.listaservice = resp;
    });

    this.doctorservice.getSala().subscribe((resp) => {
      console.log(resp);
      this.listaSala = resp;
    });
    this.doctorservice.getFlebotomista().subscribe((resp) => {
      console.log(resp);
      this.listaFlebotomista = resp;
    });
    this.doctorservice.getOperador().subscribe((resp) => {
      console.log(resp);
      this.listaOperador = resp;
    });
  }
  crearFormulario() {
    this.OrdenAs400Form = this.fb.group({
      DLCBEN: ['', [Validators.required]],
      DLCACT: ['', [Validators.required]],
      DLCDEP: ['', [Validators.required]],
      DLCOTR: ['', [Validators.required]],
      DLCEDU: ['', [Validators.required]],
      DLCPRO: ['', [Validators.required]],
      DLCSER: ['', [Validators.required]],
      DLCMED: ['', [Validators.required]],
      DLNUOR: ['', [Validators.required]],
      DLAPEL: ['', [Validators.required]],

      DLSEXO: ['', [Validators.required]],
      DLFECN: ['', [Validators.required]],
      DLHIST: ['', [Validators.required]],
      DLTIDO: ['', [Validators.required]],

      DLCEXAS: this.fb.array([]),
    });
  }

  crearOrden(id: string) {
    console.log(id);
    if (id === 'Nuevo') {
      this.OrdenAs400Form.reset();
      this.DLCEXAS.clear();
      return;
    }
    this.btnVal = 'Editar';
    this.OrdenAs400Form.disable();
    this.agendamientoService.getOrdenByID(id).subscribe((ordenes) => {
      !ordenes
        ? this.router.navigateByUrl('/dashboard/manual')
        : console.log('cabeecera', ordenes);
      const {
        id,
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

        FECHA,
        CODIMPRESORA,
        NUMEROORDEN,
        FECHAORDEN,
        HORAORDEN,
        HORATOMA,
        FECHATOMA,
        USUARIO_ID,

        pruebas,
      } = ordenes;

      this.ordenExtseleccionada = ordenes;
      this.OrdenAs400Form.setValue({
        // DLCPRO,
        //DLCSER: Number(DLCSER),
        DLCMED, //13095586
        DLCBEN,
        DLCACT,
        DLCDEP,
        DLCOTR,
        DLCEDU,
        DLCPRO,
        DLCSER,
        //DLCDIS,
        DLNUOR,
        DLAPEL,
        DLSEXO,
        DLFECN:
          DLFECN.substring(0, 4) +
          '-' +
          DLFECN.substring(4, 6) +
          '-' +
          DLFECN.substring(6, 8),
        DLHIST,
        DLTIDO,

        DLCEXAS: pruebas.map((et) =>
          this.DLCEXAS.push(
            this.fb.group({
              ItemID: et['ItemID'],
              ItemName: et['ItemName'],
              ESTADO: et['ESTADO'] == null ? true : et['ESTADO'],
            }),
          ),
        ),
      });
    });

    if (this.OrdenAs400Form.invalid) {
      return Object.values(this.OrdenAs400Form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }
  guardarOrden() {
    if (this.OrdenAs400Form.invalid) {
      return Object.values(this.OrdenAs400Form.controls).forEach((control) => {
        control.markAsTouched();
        console.log(control);
      });
    }

    if (this.ordenExtseleccionada) {
      const data = {
        ...this.OrdenAs400Form.value,
        id: this.ordenExtseleccionada.id,
      };
      this.agendamientoService.updateExterna(data).subscribe((resp: any) => {
        const { msg } = resp;
        Swal.fire({
          icon: 'success',
          text: `${msg}`,
        });
      });
    } else {
      this.OrdenAs400Form.enable();
      this.agendamientoService
        .GuardarOrden(this.OrdenAs400Form.value)
        .subscribe(
          (resp: any) => {
            const { msg } = resp;
            Swal.fire({
              icon: 'success',
              text: `${msg}`,
            });
            /*  this.agendamientoService.emit('orden-generada', {
            mensaje: 'Se ha creado una nueva orden',
          }); */
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
  }

  borrarPasatiempo(i) {}

  buscarHis(orden: string) {

    console.log(orden)
    this.agendamientoService.ordenAs400(orden).subscribe((data) => {30.3
      // this.OrdenAs400Form.disable();
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
          DLCBEN: DLCBEN,
          DLCACT: DLCACT,
          DLCOTR: DLCOTR,
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
          DLCDEP: DLCDEP,
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
  }
  cambioestado() {
    if (this.btnVal != 'Editar') {
      this.guardarOrden();
    }
    this.OrdenAs400Form.enable();
    this.btnVal = 'Guardar';
  }
}
