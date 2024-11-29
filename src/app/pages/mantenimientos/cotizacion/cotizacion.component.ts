import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Marca } from 'src/app/interfaces/cargaMarca.interface';
import { groupBy } from 'rxjs';
import { Accesorio } from 'src/app/interfaces/cargaAccCotizacion.interface';
import { Modelo } from 'src/app/interfaces/cargaModelo.interface';

import { Equipo } from 'src/app/models/equipo.module';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import Swal from 'sweetalert2';
import { Modalidad } from 'src/app/interfaces/cargaModalidad.interface';

@Component({
  selector: 'app-cotizacion',

  templateUrl: './cotizacion.component.html',
  styleUrl: './cotizacion.component.css',
})
export class CotizacionComponent implements OnInit {
  cotizacionForm!: FormGroup;
  listamodalidad: Modalidad[] = [];
  constructor(
    private fb: FormBuilder,
    private llenarcomboService: LlenarCombosService,
    private cotizacionService: CotizacionService,
    private router: Router,
  ) {
    this.crearFormulario();
  }

  get RAZONSOCIAL() {
    return (
      this.cotizacionForm?.get('RAZONSOCIAL')!.invalid &&
      this.cotizacionForm?.get('RAZONSOCIAL')!.touched
    );
  }
  get RUC() {
    return (
      this.cotizacionForm?.get('RUC')!.invalid &&
      this.cotizacionForm?.get('RUC')!.touched
    );
  }
  get CORREO() {
    return (
      this.cotizacionForm?.get('CORREO')!.invalid &&
      this.cotizacionForm?.get('CORREO')!.touched
    );
  }
  get MODALIDAD() {
    return (
      this.cotizacionForm?.get('MODALIDAD')!.invalid &&
      this.cotizacionForm?.get('MODALIDAD')!.touched
    );
  }
  get ESTADISTICA() {
    return (
      this.cotizacionForm?.get('ESTADISTICA')!.invalid &&
      this.cotizacionForm?.get('ESTADISTICA')!.touched
    );
  }
  get file() {
    return (
      this.cotizacionForm?.get('file')!.invalid &&
      this.cotizacionForm?.get('file')!.touched
    );
  }
  get COMENTARIOS() {
    return (
      this.cotizacionForm?.get('COMENTARIOS')!.invalid &&
      this.cotizacionForm?.get('COMENTARIOS')!.touched
    );
  }

  get acc() {
    return this.cotizacionForm.get('acc') as FormArray;
  }

  get EQUIPO_ID() {
    return this.cotizacionForm.get('EQUIPO_ID') as FormArray;
  }

  listamodelo: Modelo[] = [];
  listaAcccotizacion: Accesorio[] = [];
  selectedModelo: any;
  equipos: Equipo[] = [];
  files;
  btnVal = 'Guardar';

  ngOnInit(): void {
    this.getModelo();
    this.getModalidad();
    /*  this.llenarcomboService.getAccCotizacion().subscribe((accesorio) => {
      this.listaAcccotizacion = accesorio;
      const ctrls = this.listaAcccotizacion.map((control) =>
        this.fb.control(false),
      );
      console.log(ctrls);
    });
    console.log(this.listaAcccotizacion); */
  }

  getModelo() {
    this.llenarcomboService.getModelo().subscribe((modelo) => {
      console.log(modelo);

      this.listamodelo = modelo;
    });
  }

  getModalidad() {
    this.llenarcomboService.getModalidad().subscribe((modalidad) => {
      console.log(modalidad);

      this.listamodalidad = modalidad;
    });
  }
  crearFormulario() {
    this.cotizacionForm = this.fb.group(
      {
        RAZONSOCIAL: '',
        RUC: '',
        CORREO: '',
        MODALIDAD: '',
        ESTADISTICA: '',
        COMENTARIOS: '',
        EQUIPO_ID: this.fb.array([]),
      },
      /* { validators: this.validatePruebas }, */
    );
  }
  getSelectedRoles() {
    return this.cotizacionForm.value.areas
      .map((checked, i) => (checked ? this.listaAcccotizacion[i].CODIGO : null))
      .filter((CODIGO) => CODIGO !== 'null');
  }

  /*  validatePruebas(formGroup: FormGroup) {
    const pruebasArray = formGroup.get('acc') as FormArray;
    if (pruebasArray.length === 0) {
      return { noPruebas: true };
    }
    return null;
  } */

  guardar() {
    if (this.cotizacionForm.invalid) {
      this.cotizacionForm.markAllAsTouched();
      return;
    }

    console.log(this.files);

    const formData = new FormData();

    Object.keys(this.cotizacionForm.value).forEach((key) => {
      console.log(key, this.cotizacionForm.value[key]);
      formData.append(key, JSON.stringify(this.cotizacionForm.value[key]));
      formData.append('file', this.files);
    });

    if (this.files) {
      // Assuming this.files is a FileList
      for (let i = 0; i < this.files.length; i++) {
        formData.append('file', this.files[i]);
      }
    }
    console.log(formData);
    this.cotizacionService.postCotizacion(formData).subscribe((resp: any) => {
      const { msg } = resp;
      Swal.fire({
        icon: 'success',

        titleText: `${msg}`,
        timer: 1500,
      });

      this.cotizacionForm.reset({
        RAZONSOCIAL: '',
        RUC: '',
        CORREO: '',
        MODALIDAD: '',
        ESTADISTICA: '',
        COMENTARIOS: '',
        EQUIPO_ID: this.fb.array([]),
      });

      this.router.navigateByUrl('/dashboard/cotizaciones/Nuevo');
    });
  }
  onSelectModelo(event: any) {
    const selectedId = +event.target.value;
    console.log(selectedId);

    this.selectedModelo = this.listamodelo.find(
      (m) => Number(m.id) === selectedId,
    );

    console.log(this.selectedModelo);
    this.equipos = this.selectedModelo ? this.selectedModelo.instrumento : [];

    console.log(this.equipos);
  }

  onSelectEquipo(event: any) {
    const equipoId = +event.target.value;
    console.log(equipoId);
    const selectedEquipo = this.equipos.find((e) => Number(e.id) === equipoId);
    console.log(selectedEquipo);
    if (selectedEquipo) {
      //const EQUIPO_ID = this.cotizacionForm.get('EQUIPO_ID') as FormArray;
      this.EQUIPO_ID.push(
        this.fb.group({
          instrumentoId: selectedEquipo.id,
          nombreAnalizador: selectedEquipo.NOMBRE,
          idEquipo: this.selectedModelo.id,
          nombreEquipo: this.selectedModelo.NOMBRE,

          CANTIDAD: '',
        }),
      );
    }
  }
  select(value: string): boolean {
    console.log(value);
    return this.cotizacionForm.get('acc')?.value.includes(value);
  }
  onFileSelected(event: any) {
    const file = event.target.files;
    console.log(file);
    this.files = file;
  }

  enviarArchivo() {}

  cambioEstado() {
    if (this.btnVal != 'Editar') {
      console.log(this.btnVal);
      this.guardar();
    }
    this.cotizacionForm.enable();
    this.btnVal = 'Guardar';
  }
}
