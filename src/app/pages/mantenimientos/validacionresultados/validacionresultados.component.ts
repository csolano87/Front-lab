import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdenID } from 'src/app/interfaces/carga-IngresordenId.interface';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import * as moment from 'moment';
import { IngresoService } from 'src/app/services/ingreso.service';
import Swal from 'sweetalert2';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormatDateOptions } from 'date-fns';

@Component({
  selector: 'app-validacionresultados',

  templateUrl: './validacionresultados.component.html',
  styleUrl: './validacionresultados.component.css',
})
export class ValidacionresultadosComponent implements OnInit {
  listaordenesid: OrdenID = {};
  showAge;
  validarfrom!: FormGroup;
  agrupadas: any[] = [];
  isResultadoValido: boolean = false;

  get pruebas() {
    return this.validarfrom.get('pruebas') as FormArray;
  }
  constructor(
    private manteniminetoService: MantenimientosService,
    private ingresoService: IngresoService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(({ id }) => this.orden(id));
  }

  crearFormulario() {
    this.validarfrom = this.fb.group({
      id: ['', [Validators.required]],
      pruebas: this.fb.array([]),
    });
  }

  addPruebas(): FormGroup {
    return this.fb.group({
      ordenId: [['', Validators.required]],
      rangoId: ['', [Validators.required]],
      resultado: ['', [Validators.required]],
      comentario: [],
    });
  }

  orden(id: string) {
    console.log(id);
    if (id === 'Nuevo') {
      return;
    }

    this.manteniminetoService.getIngresoOrdenId(id).subscribe((ordenId) => {
      console.log(ordenId);
      this.listaordenesid = ordenId;
      this.isResultadoValido = this.listaordenesid.prueba.some(
        (item) => item.resultado === null || item.resultado === '',
      );
      //   this.isResultadoValido = ordenId.prueba((orden) => orden.resultado && orden.resultado.trim() !== '');
      const agrupada = this.listaordenesid.prueba.reduce((acc, prueba) => {
        const modeloNombre = prueba.panelprueba.modelo.NOMBRE;
        console.log(modeloNombre);

        if (!acc[modeloNombre]) {
          acc[modeloNombre] = {
            total: 0,
            pruebas: [],
          };
        }

        acc[modeloNombre].pruebas.push(prueba);

        acc[modeloNombre].total += 1;

        return acc;
      }, {});
      console.log(agrupada);
      this.agrupadas = Object.keys(agrupada).map((item) => {
        return {
          categoria: item,
          item: agrupada[item],
        };
      });
      console.log(this.listaordenesid);
      const { id, prueba } = this.listaordenesid;

      this.validarfrom.patchValue({
        id,

        pruebas: prueba.map((item) => {
          console.log(item);
          if (item.panelprueba.rango) {
            const rangoId = this.Validarrangos(item);
            console.log(rangoId);
            item.panelprueba.rango = rangoId;
          }
          this.pruebas.push(
            this.fb.group({
              ordenId: item.panelprueba.id,
              nombre: item.panelprueba.NOMBRE,
              rangoId: item.panelprueba?.rango?.['id'],
              resultado: item.resultado,
            }),
          );
        }),
      });
    });
  }
  CalculateAge() {
    const date1 = new Date(); // Fecha actual
    date1.setDate(date1.getDate() - 1); // Restar un día a la fecha actual

    const date2 = new Date(this.listaordenesid.paciente.fechanac); // Fecha de nacimiento

    // Definimos milisegundos en un día
    const dayDefinition = 1000 * 60 * 60 * 24;

    // Calculamos la diferencia en días
    const daysDiff = Math.ceil(
      Math.abs(date1.getTime() - date2.getTime()) / dayDefinition,
    );

    // Calculamos los años
    const years = date1.getFullYear() - date2.getFullYear();

    // Calculamos la diferencia de meses
    let months = date1.getMonth() - date2.getMonth();
    if (months < 0) {
      months += 12;
    }

    // Calculamos los días restantes
    let days = date1.getDate() - date2.getDate();
    if (days < 0) {
      // Restamos un mes y ajustamos los días
      months--;
      const lastMonth = new Date(
        date1.getFullYear(),
        date1.getMonth(),
        0,
      ).getDate();
      days += lastMonth;
    }

    // Aseguramos que los meses no sean negativos
    if (months < 0) {
      months += 12;
    }

    return `${years} año${years == 1 ? '' : 's'}, ${months} mes${months == 1 ? '' : 'es'}, ${days} día${days == 1 ? '' : 's'}`;
  }

  Validarrangos(item) {
    const date1 = new Date(); // Fecha actual
    date1.setDate(date1.getDate() - 1); // Restar un día a la fecha actual
    const date2 = new Date(this.listaordenesid.paciente.fechanac); // Fecha de nacimiento

    // Calculamos años, meses y días
    const years = date1.getFullYear() - date2.getFullYear();
    let months = date1.getMonth() - date2.getMonth();
    let days = date1.getDate() - date2.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(
        date1.getFullYear(),
        date1.getMonth(),
        0,
      ).getDate();
      days += lastMonth;
    }

    if (months < 0) {
      months += 12;
    }

    let matchedRango = null;

    if (item.panelprueba.rango) {
      console.log(item.panelprueba.rango);
      matchedRango = item.panelprueba.rango.find((rango) => {
        if (
          years === 0 &&
          months === 0 &&
          rango.unidadedad.DESCRIPCION === 'DIAS'
        ) {
          return true;
        }
        if (
          years === 0 &&
          months > 0 &&
          rango.unidadedad.DESCRIPCION === 'MESES'
        ) {
          return true;
        }
        if (years > 0 && rango.unidadedad.DESCRIPCION === 'AÑOS') {
          return true;
        }
        return false; // Retornar falso si ninguna condición coincide
      });
    }
    console.log(matchedRango);
    return matchedRango || null; // Retorna el rango coincidente o null si no se encuentra ninguno
  }
  agregarPrueba() {
    this.pruebas.push(this.addPruebas());
  }
  GuadarResultados() {
    console.log(this.validarfrom.value);

    this.ingresoService
      .getValidacionOrden(this.validarfrom.value)
      .subscribe((resp: any) => {
        console.log(resp);
        const { msg } = resp;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${msg}`,
          showConfirmButton: false,
          timer: 1500,
        });

        this.orden(this.validarfrom.value.id);
      });
  }
  resultados(event: KeyboardEvent, modelo: any) {
    const arrPruebas = this.validarfrom.get('pruebas') as FormArray;
    const input = event.target as HTMLInputElement;
    const valor = input.value;

    console.log(modelo.panelprueba.id);
    const valorResultado = parseFloat(valor);

    const resultadoFinal = isNaN(valorResultado) ? null : valorResultado;

    console.log(arrPruebas.value);

    const encontrado = arrPruebas.value.find(
      (control) => control.ordenId === modelo.panelprueba.id,
    );
    if (encontrado) {
      const formGroup = this.pruebas.controls.find(
        (item) => item.value.ordenId === modelo.panelprueba.id,
      ) as FormGroup;
      if (formGroup) {
        formGroup.patchValue({ resultado: resultadoFinal });
      }
    }

    // Actualizar el control 'resultado' usando patchValue
    //this.pruebas.patchValue({ resultado: resultadoFinal });
  }
  validarResultadoConRango(prueba: any) {
    console.log(prueba);
    const date1 = new Date(); // Fecha actual
    date1.setDate(date1.getDate() - 1); // Restar un día a la fecha actual
    const date2 = new Date(this.listaordenesid.paciente.fechanac); // Fecha de nacimiento
    const resultado = prueba.resultado;
    // Calculamos años, meses y días
    const years = date1.getFullYear() - date2.getFullYear();
    let months = date1.getMonth() - date2.getMonth();
    let days = date1.getDate() - date2.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(
        date1.getFullYear(),
        date1.getMonth(),
        0,
      ).getDate();
      days += lastMonth;
    }

    if (months < 0) {
      months += 12;
    }

    console.log(prueba.panelprueba.rango);

    if (prueba.panelprueba.rango) {
      const [rangoMin, rangoMax] = prueba.panelprueba.rango.rangos
        .split('-')
        .map(Number);

      //console.log(rangoMin)
      if (resultado < rangoMin) {
        return 'bajo';
      } else if (resultado > rangoMax) {
        return 'alto';
      } else {
        return 'normal';
      }
    }
    return '';
    /*  const rango = this.Validarrangos(prueba);
    console.log(rango);
    const resultado = prueba.resultado;
    if (rango && resultado !== null) {
      const [rangoMin, rangoMax] = rango.rangos.split('-').map(Number);

      if (resultado < rangoMin) {
        return 'bajo';
      } else if (resultado > rangoMax) {
        return 'alto';
      } else {
        return 'normal';
      }
    }
    return ''; */
  }

  /*   validarBotonResultado() {
    return this.listaordenesid.prueba.some(
      (item) => item.resultado === null || item.resultado === '',
    );
  } */
  validarOrden(listaordenesid: OrdenID) {
    console.log(listaordenesid.id);

    const data = {
      id: listaordenesid.id,
      estado: 3,
    };
    this.ingresoService.getValidarIngresoOrden(data).subscribe((resp: any) => {
      const { msg } = resp;
      console.log(msg);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${msg}`,
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }
}
