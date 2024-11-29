import { TAB } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from 'src/app/interfaces/carga-equipos.interfaces';
import { Producto } from 'src/app/interfaces/carga-productosImport.interfaces';

//import { subscribeOn } from 'rxjs';
import { Modalidad } from 'src/app/interfaces/cargaModalidad.interface';
import { Modelo } from 'src/app/interfaces/cargaModelo.interface';
import { Proceso } from 'src/app/interfaces/cargaProceso.interface';
import { TipoContrato } from 'src/app/interfaces/cargarcontrato.interface';
//import { Equipo } from 'src/app/models/equipo.module';
import { ProcesoS } from 'src/app/models/proceao.module';
import { ImportacionService } from 'src/app/services/importacion.service';

import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { RegistroService } from 'src/app/services/registro.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-consulta-compras',
  templateUrl: './consulta-compras.component.html',
  styleUrls: ['./consulta-compras.component.css'],
})
export class ConsultaComprasComponent implements OnInit {
  get AREA() {
    return (
      this.importForm.get('AREA')!.invalid &&
      this.importForm?.get('AREA')!.touched
    );
  }

  get CODIGO() {
    return (
      this.importForm.get('CODIGO')!.invalid &&
      this.importForm?.get('CODIGO')!.touched
    );
  }
  get PRODUCTOS() {
    return this.importForm.get('PRODUCTOS') as FormArray;
    // return ( this.importForm.get('PRODUCTOS') as FormArray).controls;
  }
  get EQUIPO_ID() {
    return this.solicitudEquipoForm.get('EQUIPO_ID') as FormArray;
    // return ( this.importForm.get('PRODUCTOS') as FormArray).controls;
  }
  get NOMBRE() {
    return (
      this.solicitudEquipoForm?.get('NOMBRE')!.invalid &&
      this.solicitudEquipoForm?.get('NOMBRE')!.touched
    );
  }
  get MODALIDAD_ID() {
    return (
      this.solicitudEquipoForm?.get('MODALIDAD_ID')!.invalid &&
      this.solicitudEquipoForm?.get('MODALIDAD_ID')!.touched
    );
  }
  get FECHAENTREGA() {
    return (
      this.solicitudEquipoForm?.get('FECHAENTREGA')!.invalid &&
      this.solicitudEquipoForm?.get('FECHAENTREGA')!.touched
    );
  }
  constructor(
    private registro: RegistroService,
    private activateRoute: ActivatedRoute,
    private llenarcomboService: LlenarCombosService,
    private inportService: ImportacionService,
    private registroServices: RegistroService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.crearFormulario();
    this.crearFormularioEstado();
  }
  solicitudEquipoForm!: FormGroup;
  importForm!: FormGroup;
  cargando = false;
  public listaproceso: Proceso[] = [];
  itemsPerPage: number = 1; // Número de elementos por página
  currentPage: number = 1; // Página actual
  totalPages: number = 1; // Total de páginas
  public page!: number;
  public proceso: Proceso[] = [];
  public procesoTemp: Proceso[] = [];
  selectedFile: File | null = null;
  listamodalidad: Modalidad[] = [];
  listaequipos: Equipo[] = [];
  equipos: Equipo[] = [];
  listamodelo: Modelo[] = [];
  //listatipocontrato: Modelo[] = [];
  listatipocontrato;
  listaproductos: Producto[] = [];
  openCoverages = false;
  indexSelectedCoverage = 1;
  listaseleccionadoR: ProcesoS;
  listaestadoproceso: Proceso;
  listaseleccionado: ProcesoS;
  listacontrato: TipoContrato[] = [];
  selectedModelo: any;
  ngOnInit(): void {
    /* y */
    this.getModelo();
    this.getModalidad();
    this.getAllProductos();
    this.getProcesos();
    this.getAllParticipacion();
    this.getContrato();
  }

  getModalidad() {
    this.llenarcomboService.getModalidad().subscribe((modalidad) => {
      console.log(modalidad);
      this.listamodalidad = modalidad;
    });
  }
  getContrato() {
    this.llenarcomboService.getContrato().subscribe((contrato) => {
      console.log(contrato);

      this.listacontrato = contrato;
    });
  }
  getAllParticipacion() {
    this.llenarcomboService.getParticipacion().subscribe((tipocontrato) => {
      console.log(tipocontrato);
      this.listatipocontrato = tipocontrato;
      //this.listaproductos = productos.slice(0, 5);
    });
  }
  getAllProductos() {
    let array = 'hola';
    this.inportService.getProductos().subscribe((productos) => {
      this.listaproductos = productos;
      //this.listaproductos = productos.slice(0, 5);
    });
  }
  crearFormulario() {
    this.solicitudEquipoForm = this.fb.group({
      FECHAENTREGA: ['', [Validators.required]],
      MODALIDAD_ID: ['', [Validators.required]],
      OBSERVACIONES: [''],
      EQUIPO_ID: this.fb.array([]),
    });
  }

  crearItemFecha(): FormGroup {
    return this.fb.group({
      FECHAENTREGA: ['', [Validators.required]],
      NOMBRE_ID: ['', [Validators.required]],
    });
  }
  getProcesos() {
    this.cargando = true;
    this.registro.getConsultaRegistro().subscribe(({ proceso }) => {
      console.log(proceso);
      this.proceso = proceso;
      this.procesoTemp = this.listaproceso;
      this.cargando = false;
    });
  }

  getModelo() {
    this.llenarcomboService.getModelo().subscribe((modelo) => {
      console.log(modelo);

      this.listamodelo = modelo;
    });
  }

  onSelectModelo(event: any) {
    const selectedId = +event.target.value;
    console.log(selectedId);

    this.selectedModelo = this.listamodelo.find(
      (m) => Number(m.id) === selectedId,
    );

    console.log(this.selectedModelo);
    this.equipos = this.selectedModelo ? this.selectedModelo.equipos : [];
  }

  onSelectEquipo(event: any) {
    const equipoId = +event.target.value;
    console.log(equipoId);
    const selectedEquipo = this.equipos.find((e) => Number(e.id) === equipoId);
    console.log(selectedEquipo);
    if (selectedEquipo) {
      //const EQUIPO_ID = this.solicitudEquipoForm.get('EQUIPO_ID') as FormArray;
      this.EQUIPO_ID.push(
        this.fb.group({
          Itemequipo: selectedEquipo.id,
          nombre: selectedEquipo.NOMBRE,
          CANTIDAD: '',
        }),
      );
    }
  }
  async EnvioCorreo(proceso: Proceso) {
    const id = proceso.id;
    Swal.fire({
      title: 'Select Excel file',
      html:
        '<input type="file" id="file-input" accept=".xls,.xlsx">' +
        '<textarea id="text-input" placeholder="Ingrese un correo "style="width: 100%; height: 100px; resize: vertical; margin-bottom: 10px; padding: 5px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;"></textarea>',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancel',
      customClass: {
        container: 'custom-swal-container',
        confirmButton: 'custom-swal-confirm-button',
        cancelButton: 'custom-swal-cancel-button',
      },
      preConfirm: () => {
        const fileInput = document.getElementById(
          'file-input',
        ) as HTMLInputElement;
        const textInput = document.getElementById(
          'text-input',
        ) as HTMLTextAreaElement;

        console.log(`text area`, textInput);
        const file = fileInput.files[0];
        const text = textInput.value;

        // Aquí puedes manejar la lógica de carga del archivo y el texto adicional
        this.uploadFile(file, text, id);
      },
    });
  }
  uploadFile(file: File, text: string, id: any) {
    console.log(`TEXT `, text);
    /*   if (!file) {
      console.log('No file selected');
      return;
    } */

    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', text);
    formData.append('id', id);
    this.registro.getEnvioCorreo(formData).subscribe((res: any) => {
      console.log('File uploaded successfully');
      const { msg } = res;
      Swal.fire('Success', `${msg}`, 'success');
    });
  }
  actualizarInputs(i: number, $event: any) {
    // console.log(i);
    const productoId = Number($event.target.value);

    const productoSeleccionado = this.listaproductos.find(
      (producto) => producto.id === productoId,
    );

    const filaSeleccionada = (this.importForm.get('PRODUCTOS') as FormArray).at(
      i,
    );
    // console.log(filaSeleccionada);
    if (productoSeleccionado) {
      filaSeleccionada.patchValue({
        NOMBRE: productoSeleccionado.NOMBRE,
        UNIDAD: productoSeleccionado.UNIDAD,
        CANTIDAD: null,
        ENTREGADO: null,
        LOTE: null,
      });
    }
  }
  crearFormularioEstado() {
    this.importForm = this.fb.group({
      PARTICIPACION: ['', [Validators.required]],
       CODIGO: ['', [Validators.required]],
      PRODUCTOS: this.fb.array([]), 
    });
  }
  crearItemProducto(): FormGroup {
    return this.fb.group({
      ID_PRODUCTO: ['', [Validators.required]],
      NOMBRE: ['', [Validators.required]],
      UNIDAD: ['', [Validators.required]],
      CANTIDAD: ['', [Validators.required]],
      ENTREGADO: [''],
      LOTE: [''],
    });
  }
  agregarproductos() {
    //const add = this.importForm.get('PRODUCTOS') as FormArray;

    this.PRODUCTOS.push(this.crearItemFecha());
  }
  pdf2(proceso: Proceso) {
    this.registro.getReportePdf(proceso).subscribe((blob: Blob) => {
      //console.log(resp)
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'archivo.pdf';
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

  ObtnerById(proceso: Proceso) {
    const data = {
      PROCESO_ID: proceso.id,
      ...this.solicitudEquipoForm.value,
    };
    this.listaseleccionado = data;
    console.log(this.listaseleccionado);
    // this.guardarData(data);
  }

  guardarData() {
    if (this.listaseleccionado) {
      const data = {
        PROCESO_ID: this.listaseleccionado.PROCESO_ID,
        ...this.solicitudEquipoForm.value,
      };

      console.log(data);
      if (this.solicitudEquipoForm.invalid) {
        this.solicitudEquipoForm.markAllAsTouched();
        return;
      }
      this.registro.getRequerimientoEquipo(data).subscribe((resp: any) => {
        const { msg } = resp;
        this.getProcesos();
       
        Swal.fire({
          icon: 'success',
          text: `${msg}`,
        });
        $('#modal-info').modal('hide');
      });
    }
  }
  buscar(termino: string) {
    console.log(termino);
    return termino.length === 0
      ? (this.proceso = this.procesoTemp)
      : this.registro.buscarFiltroProceso(termino).subscribe((resultados) => {
          console.log(resultados);

          this.proceso = resultados;
        });
  }
  onreset() {}
  Reactivos(proces: Proceso) {
    const data = {
      id: proces.id,
      ...this.importForm.value,
    };
    this.importForm.patchValue({
      AREA: proces.institucion.trim(),
      CODIGO: proces.codigo.trim(),
      PRODUCTOS: '',
    });

    this.listaseleccionadoR = data;
    console.log(this.listaseleccionadoR);
  }
  aprobarProceso(proceso: Proceso) {
    console.log(`//////************`, proceso);
    if (!proceso.aprobar) {
      Swal.fire({
        title: 'Seleccione una opcion',
        input: 'select',
        inputOptions: {
          Option: {
            1: 'Rentable',
            0: 'No Rentable',
          },
        },

        inputPlaceholder: '--Seleccione--',
        showCancelButton: true,

        inputAttributes: {
          style: 'font-size: 16px; margin: 10px auto;width:90%;',
        },
        preConfirm: (selectedValue) => {
          const data = {
            PROCESO_ID: proceso.id,
            ESTADOBI: selectedValue,
          };
          console.log(`******agregar impre***`, data);
          this.registro.getAprobarProceso(data).subscribe((resp: any) => {
            const { msg } = resp;
            this.getProcesos();
            Swal.fire('sucess', `${msg}`, 'success');
          });
        },
      });
    } else {
      if (proceso.aprobar.ESTADOBI != 1) {
        console.log(`PERRO TRUE`, proceso);
        Swal.fire({
          title: 'Seleccione una opcion',
          input: 'select',
          inputOptions: {
            Option: {
              1: 'Rentable',
              // 0: 'No Rentable',
            },
          },

          inputPlaceholder: '--Seleccione--',
          showCancelButton: true,

          inputAttributes: {
            style: 'font-size: 16px; margin: 10px auto;width:90%;',
          },
          preConfirm: (selectedValue) => {
            const data = {
              PROCESO_ID: proceso.id,
              ESTADOBI: selectedValue,
            };
            console.log(data);
            this.registro.getUpdateProceso(data).subscribe(
              (resp: any) => {
                const { msg } = resp;
                this.getProcesos();
                Swal.fire('sucess', `${msg}`, 'success');
              },
              (err) => {
                Swal.fire({
                  icon: 'error',
                  text: err.error.msg,
                });
              },
            );
          },
        });
      }
    }
    /*   */
  }
  borrarProducto(i: number) {
    this.PRODUCTOS.removeAt(i);
  }
  guardarEstado() {
    /*     if (this.importForm.invalid) {
      this.importForm.markAllAsTouched();
      return;
    } */
    console.log(this.listaestadoproceso.id);
    if (this.listaestadoproceso && !this.listaestadoproceso.status) {
      const data = {
        PROCESO_ID: this.listaestadoproceso.id,
        ...this.importForm.value,
      };
      this.registro.getEstadoProceso(data).subscribe((resp: any) => {
        const { msg } = resp;
        this.getProcesos();//declare var $: any;

        Swal.fire({
          icon: 'success',
          title: `${msg}`,
          showConfirmButton: false,
        });
        $('#modal-default').modal('hide');

        this.router.navigateByUrl('/dashboard/consulta-compras');
        this.importForm.reset();
        //this.importForm.disable();
      });
    } else {
      const data = {
        PROCESO_ID: this.listaestadoproceso.id,
        ...this.importForm.value,
      };
      console.log(`ERES EL MEJOR >>>>`, data);
      this.registro.getUpdateEstadoProceso(data).subscribe((resp: any) => {
        const { msg } = resp;
        this.getProcesos();
        Swal.fire({
          icon: 'success',
          title: `${msg}`,
          showConfirmButton: false,
        });
      });
    }
  }

  CambioEstado(proceso: Proceso) {
    console.log(proceso.id);

    this.registroServices
      .getByIdRegistro(proceso.id.toString())
      .subscribe((proceso) => {
        !proceso
          ? this.router.navigateByUrl('/dashboard/compras')
          : console.log(proceso.id);
        this.listaestadoproceso = proceso;
      });
  }
}
