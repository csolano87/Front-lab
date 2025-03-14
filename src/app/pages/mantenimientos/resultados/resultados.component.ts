import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdenID, Panelprueba, Prueba } from 'src/app/interfaces/carga-IngresordenId.interface';
import { Resultado } from 'src/app/interfaces/cargarResultadoAs400.interface';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
import { Tipoatencion } from 'src/app/interfaces/cargarTipoatencion.interface';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { Modelo } from 'src/app/interfaces/cargaModelo.interface';
import { IngresoService } from 'src/app/services/ingreso.service';
import { Marca } from 'src/app/interfaces/cargaMarca.interface';
import { Ordene } from 'src/app/interfaces/cargaIngresoordenes.interface';
@Component({
  selector: 'app-resultados',

  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css',
})
export class ResultadosComponent implements OnInit {
  resultadoForm!: FormGroup;
  historicoresultados: any = [];
  isResultadoValido: boolean = false;
  page;
  listaordenesid: OrdenID = {};
  selectedFile: File | null = null;
  listaproductos;
  listaresultados;
  agrupadas: any[] = [];
  validarfrom!: FormGroup;
  listacategoria: Modelo[] = [];
  listaatencion: Tipoatencion[] = [];
  cargando: boolean = false;
  showDetails: boolean[] = [];
  showPruebasHeader: boolean = false;
  listamarca: Marca[] = [];
  filtradaOrden: number | null;

  filtroOrden: string = '';
  filtroIdentificacion: string = '';
  filtroModeloId: string = '';
  filtroFechaIn: string = '';
  filtroFechaOut: string = '';
  public listaordenesingresdas: Ordene[] = [];
  get pruebas() {
    return this.validarfrom.get('pruebas') as FormArray;
  }
  constructor(private mantenimientoService: MantenimientosService,
    private llenarcomboServices: LlenarCombosService,
    private ingresoService: IngresoService,
    private fb: FormBuilder,
  ) {
    this.crearFormulario();
  }
  ngOnInit(): void {

    this.getAtencion();
    this.getCategoria();


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
  getMarca() {
    this.llenarcomboServices.getMarca().subscribe((marcas) => {
      console.log(marcas);
      this.listamarca = marcas.filter((item) => item.ESTADO === 1).sort((a, b) => a.NOMBRE.localeCompare(b.NOMBRE));

      //this.listamarca = marcas;
    });
  }
  getAtencion() {
    this.mantenimientoService.getAtencion().subscribe((tipoatencion) => {
      console.log(tipoatencion);

      this.listaatencion = tipoatencion;
    });
  }

  getCategoria() {
    this.llenarcomboServices.getModelo().subscribe((modelo) => {
      console.log(modelo);

      this.listacategoria = modelo.sort((a, b) => a.NOMBRE.localeCompare(b.NOMBRE));
    });
  }


  buscarOrden(orden: string, identificacion: string, modeloId: string, fechaIn: string, fechaOut: string) {
    console.log(orden, identificacion, modeloId, fechaIn, fechaOut)
    this.filtroOrden = orden;
    this.filtroIdentificacion = identificacion;
    this.filtroModeloId = modeloId;
    this.filtroFechaIn = fechaIn;
    this.filtroFechaOut = fechaOut;

    this.ingresoService.getFiltrosResultadosIngresoOrden(orden,
      identificacion, modeloId, fechaIn, fechaOut)
      .subscribe((ordenes) => {

        this.listaordenesingresdas = ordenes.filter(item => item.estado != 0);
        console.log(this.listaordenesingresdas);
        this.ordenRefrescar(this.listaordenesingresdas);
      })

  }

  getOrdenId(ordenId: OrdenID) {
    console.log(ordenId.id);

    this.pruebas.clear();
    console.log(this.pruebas.value);
    this.filtradaOrden = ordenId.id;
    this.listaordenesid = ordenId;
    this.isResultadoValido = this.listaordenesid.prueba.some(
      (item) => item.resultado === null || item.resultado === '',
    );
    const agrupada = this.listaordenesid.prueba.reduce((acc, prueba) => {
      const modeloNombre = prueba.panelprueba.modelo.NOMBRE;
      const estadoNombre = prueba.estado;
      const id = ordenId.id;


      if (!acc[modeloNombre]) {
        acc[modeloNombre] = {
          total: 0,
          id: id,
          estado: estadoNombre,
          pruebas: [],
        };
      }

      acc[modeloNombre].pruebas.push(prueba);

      acc[modeloNombre].total += 1;

      return acc;
    }, {});
    /*   console.log(agrupada); */
    this.agrupadas = Object.keys(agrupada).map((item) => {
      return {
        categoria: item,
        item: agrupada[item],
      };

    });
      console.log(this.agrupadas) 
    const { id, prueba } = this.listaordenesid;
    this.validarfrom.patchValue({
      id,

      pruebas: prueba.map((item) => {
        /*   console.log(item); */
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
    const date1 = new Date();
    date1.setDate(date1.getDate() - 1);
    const date2 = new Date(this.listaordenesid.paciente.fechanac);


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
        return false;
      });
    }

    return matchedRango || null;
  }
  resultados(event: KeyboardEvent, modelo: any) {


    const arrPruebas = this.validarfrom.get('pruebas') as FormArray;
    const input = event.target as HTMLInputElement;
    const valor = input.value;

    /*  console.log(modelo.panelprueba.id); */
    const valorResultado = valor;
/*  (valorResultado) ? null : */
    const resultadoFinal = valorResultado;

    /*     console.log(arrPruebas.value); */

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


    const date1 = new Date();
    date1.setDate(date1.getDate() - 1);
    const date2 = new Date(this.listaordenesid.paciente.fechanac);
    const resultado = prueba.resultado;

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

  }
  guardarResultados(prueba: any) {


    console.log(prueba)
    const [id] = prueba
      .map(item => item.ordenId)
      .filter((valor, indice, self) => self.indexOf(valor) === indice);
    console.log(id)
    /*    console.log(this.pruebas.value) */
    const data = this.pruebas.value.filter(
      (item) => prueba.some(da => da.panelpruebaId === item.ordenId)

    )
    console.log(data)
    this.ingresoService
      .getValidacionOrden(id, data)
      .subscribe((resp: any) => {
        /*  console.log(resp); */
        const { msg } = resp;
        /*  this.listaordenesingresdas=null; */
        this.buscarOrden(this.filtroOrden,
          this.filtroIdentificacion,
          this.filtroModeloId,
          this.filtroFechaIn,
          this.filtroFechaOut);



        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${msg}`,
          showConfirmButton: false,
          timer: 1500,
        });

        /*    this.orden(this.validarfrom.value.id); */
      });



  }

  ordenRefrescar(lista: any) {
console.log(lista)
    const itemSeleccioando = lista.find(item => item.id === this.filtradaOrden)
    console.log(itemSeleccioando)
    this.getOrdenId(itemSeleccioando)

  }
  ValidarParcial(modelo: any) {
    console.log(modelo.item.pruebas)
    const itemId = modelo.item.pruebas.map(item => item.panelpruebaId)
    const data = {
      id: modelo.item.id,
      estado: 5,
      panelpruebaId: itemId
    }
    console.log(data);

    this.ingresoService.getValidarIngresoOrden(data).subscribe((resp: any) => {
      const { msg } = resp;
    /*   this.getOrdenId(this.listaordenesid) */
      console.log(msg);


      this.buscarOrden(this.filtroOrden,
        this.filtroIdentificacion,
        this.filtroModeloId,
        this.filtroFechaIn,
        this.filtroFechaOut);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${msg}`,
        showConfirmButton: false,
        timer: 1500,
      });
    });

  }

  borrarFiltros(txtorden:any, txtidentificacion:any, txtmodeloId:any, txtfechaIn:any, txtfechaOut:any) {
    console.log(txtorden, txtidentificacion, txtmodeloId, txtfechaIn, txtfechaOut)
    txtorden.value = '',

      txtidentificacion.value= '',
      txtmodeloId.value = '',
      txtfechaIn.value = '',
      txtfechaOut.value= '',
    console.log(txtorden, txtidentificacion, txtmodeloId, txtfechaIn, txtfechaOut)
  }

  validarPruebasValor(pruebas: any) {
    console.log(pruebas);
    return pruebas.some(item =>
      item.resultado != null && item.estado != 5)
      ? true
      : null



  }
  historicoResultados(prueba: any) {
    console.log(prueba.historioresultado);
    this.historicoresultados = prueba.historioresultado;
  }
}
