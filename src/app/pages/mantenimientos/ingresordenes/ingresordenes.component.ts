import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { finalize, map } from 'rxjs';

import { Listaordene } from 'src/app/interfaces/orden.interface';
import { Lista } from 'src/app/models/doctor.module';
import { Impresora } from 'src/app/models/impresora.module';
import { Paciente } from 'src/app/interfaces/cargarPaciente.interface';
import { Orden } from 'src/app/models/orden.module';
import { Origin } from 'src/app/models/origin.module';
import { panelPrueba } from 'src/app/models/panelPruebas.module';

import { Prueba } from 'src/app/models/pruebas.module';
import { Usuario } from 'src/app/models/usuario.module';
import { AgendamientoService } from 'src/app/services/agendamiento.service';
import { IngresordenesService } from 'src/app/services/ingresordenes.service';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { Medico } from 'src/app/interfaces/cargaMedico.interface';
import { Pacientes } from 'src/app/models/pacientes.module';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import { group } from 'console';
import { isPrimitive } from 'util';
import { F } from '@angular/cdk/keycodes';
import { Tiposervicio } from 'src/app/interfaces/cargarTiposervicio.interface';
import { Diagnostico } from 'src/app/interfaces/cargarDiagnostico.interface';
import { Tipoatencion } from 'src/app/interfaces/cargarTipoatencion.interface';
import { Listaperfile } from 'src/app/interfaces/cargarGrupoExam.interface';
import { Listaprueba } from 'src/app/interfaces/cargaListapruebas.interface';
import { Provincia } from 'src/app/interfaces/cargarProvincias.interface';
import { IngresoService } from 'src/app/services/ingreso.service';
import { OrdenID } from 'src/app/interfaces/carga-IngresordenId.interface';
import { isatty } from 'tty';
declare var $: any;
@Component({
  selector: 'app-ingresordenes',

  templateUrl: './ingresordenes.component.html',
  styleUrl: './ingresordenes.component.css',
})
export class IngresordenesComponent implements OnInit {
  @ViewChild('inputRef') inputRef: ElementRef;
  anio: number;
  dia: number;
  mes: number;
  public isLoading = false;
  public src: string;
  public data$: any;
  btnVal = 'Guardar';
  nomPerfil: string = '';
  selectedItemsList = [];
  checkedIDs = [];

  ingresoForm!: FormGroup;
  medicoForm!: FormGroup;
  cantones: any[] = [];
  etiqueta: string = '';
  parroquia: any[] = [];
  /* datos orden */
  get pacienteId() {
    return (
      this.ingresoForm?.get('pacienteId')!.invalid &&
      this.ingresoForm?.get('pacienteId')!.touched
    );
  }

  get tipoatencionId() {
    return (
      this.ingresoForm?.get('tipoatencionId')!.invalid &&
      this.ingresoForm?.get('tipoatencionId')!.touched
    );
  }

  get tiposervicioId() {
    return (
      this.ingresoForm?.get('tiposervicioId')!.invalid &&
      this.ingresoForm?.get('tiposervicioId')!.touched
    );
  }

  get medicoId() {
    return (
      this.ingresoForm?.get('medicoId')!.invalid &&
      this.ingresoForm?.get('medicoId')!.touched
    );
  }

  /* pacientes */

  get tipo() {
    return (
      this.pacienteForm?.get('tipo')!.invalid &&
      this.pacienteForm?.get('tipo')!.touched
    );
  }
  get numero() {
    return (
      this.pacienteForm?.get('numero')!.invalid &&
      this.pacienteForm?.get('numero')!.touched
    );
  }
  get nombres() {
    return (
      this.pacienteForm?.get('nombres')!.invalid &&
      this.pacienteForm?.get('nombres')!.touched
    );
  }
  get apellidos() {
    return (
      this.pacienteForm?.get('apellidos')!.invalid &&
      this.pacienteForm?.get('apellidos')!.touched
    );
  }
  get fechanac() {
    return (
      this.pacienteForm?.get('fechanac')!.invalid &&
      this.pacienteForm?.get('fechanac')!.touched
    );
  }

  get edad() {
    return (
      this.pacienteForm?.get('edad')!.invalid &&
      this.pacienteForm?.get('edad')!.touched
    );
  }
  get email() {
    return (
      this.pacienteForm?.get('email')!.invalid &&
      this.pacienteForm?.get('email')!.touched
    );
  }
  get sexo() {
    return (
      this.pacienteForm?.get('sexo')!.invalid &&
      this.pacienteForm?.get('sexo')!.touched
    );
  }
  get convencional() {
    return (
      this.pacienteForm?.get('convencional')!.invalid &&
      this.pacienteForm?.get('convencional')!.touched
    );
  }

  get celular() {
    return (
      this.pacienteForm?.get('celular')!.invalid &&
      this.pacienteForm?.get('celular')!.touched
    );
  }

  get provinciaId() {
    return (
      this.pacienteForm?.get('provinciaId')!.invalid &&
      this.pacienteForm?.get('provinciaId')!.touched
    );
  }
  get cantonId() {
    return (
      this.pacienteForm?.get('cantonId')!.invalid &&
      this.pacienteForm?.get('cantonId')!.touched
    );
  }

  get parroquiaId() {
    return (
      this.pacienteForm?.get('parroquiaId')!.invalid &&
      this.pacienteForm?.get('parroquiaId')!.touched
    );
  }

  get SEXO() {
    return (
      this.ingresoForm?.get('SEXO')!.invalid &&
      this.ingresoForm?.get('SEXO')!.touched
    );
  }
  get HIS() {
    return (
      this.ingresoForm?.get('HIS')!.invalid &&
      this.ingresoForm?.get('HIS')!.touched
    );
  }

  get CODDOCTOR() {
    return (
      this.ingresoForm?.get('CODDOCTOR')!.invalid &&
      this.ingresoForm?.get('CODDOCTOR')!.touched
    );
  }
  get CODTIPOORDEN() {
    return (
      this.ingresoForm?.get('CODTIPOORDEN')!.invalid &&
      this.ingresoForm?.get('CODTIPOORDEN')!.touched
    );
  }
  get PRIORIDAD() {
    return (
      this.ingresoForm?.get('PRIORIDAD')!.invalid &&
      this.ingresoForm?.get('PRIORIDAD')!.touched
    );
  }
  get CODCENTROSALUD() {
    return (
      this.ingresoForm?.get('CODCENTROSALUD')!.invalid &&
      this.ingresoForm?.get('CODCENTROSALUD')!.touched
    );
  }

  get OPERADOR() {
    return (
      this.ingresoForm?.get('OPERADOR')!.invalid &&
      this.ingresoForm?.get('OPERADOR')!.touched
    );
  }
  get CODFLEBOTOMISTA() {
    return (
      this.ingresoForm?.get('CODFLEBOTOMISTA')!.invalid &&
      this.ingresoForm?.get('CODFLEBOTOMISTA')!.touched
    );
  }
  get CORRELATIVO() {
    return (
      this.ingresoForm?.get('CORRELATIVO')!.invalid &&
      this.ingresoForm?.get('CORRELATIVO')!.touched
    );
  }

  get pruebas() {
    return this.ingresoForm.get('pruebas') as FormArray;
  }
  pacienteForm!: FormGroup;
  public usuarios: Usuario[] = [];
  public listaordene: Listaordene[] = [];
  public page!: number;
  totalT: any;
  ordenseleccionada: Orden;
  ingresoSeleccionado: OrdenID;
  listapacientes: Paciente[] = [];
  listadoctores: Medico[] = [];
  public pacientes: Pacientes;
  listatiposervicio: Tiposervicio[] = [];
  listatipoatencion: Tipoatencion[] = [];
  listatipodiagnostico: Diagnostico[] = [];
  listgrupoperfil: any[] = [];
  listprovincia: Provincia[] = [];
  lista: Listaprueba[] = [];
  listaquimica: any[] = [];
  selecteProvincia: any;
  selecteCanton: any;
  usuarioLogueado: Usuario;
  public cargando: boolean = true;
  isFormDisabled: boolean = false;
  public usuario: Usuario;
  constructor(
    private fb: FormBuilder,

    public agendamientoService: AgendamientoService,

    private ordenService: OrdenesService,
    private modalImagenService: ModalImagenService,
    private router: Router,

    private ingresordenService: IngresordenesService,
    private manteniminetoService: MantenimientosService,
    private ingresoService: IngresoService,
    private activateRoute: ActivatedRoute,
  ) {
    this.anio = new Date().getFullYear();
    this.mes = new Date().getMonth();
    this.dia = new Date().getDay();
    this.crearformulario();
    this.crearformularioPaciente();
    this.crearformularioMedico();
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(({ id }) => this.cargaIngresoOrden(id));
    this.getPacientes();
    this.getDoctor();

    this.getTipoatencion();
    this.getTiposervicio();
    this.getDiagnostico();
    this.getTipoGrupo();
    this.getPanelPruebas();
    this.getprovincia();

    this.totalTotal();
    //  this.getOrdenes();
    const valorAlmacenado = localStorage.getItem('IMPRESORA');

    if (valorAlmacenado) {
      this.ingresoForm.patchValue({ CODIMPRESORA: valorAlmacenado });
    }
  }
  cargaIngresoOrden(id: string) {
    console.log(id);
    if (id === 'Nuevo') {
      this.ingresoForm.reset();
      this.pruebas.clear();
      this.clearFilters();
      this.ingresoForm.enable();
      this.btnVal = 'Guardar';

      return;
    }

    this.btnVal = 'Editar';
    this.ingresoForm.disable();
    if (this.ingresoForm.invalid) {
      return Object.values(this.ingresoForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
    this.manteniminetoService.getIngresoOrdenId(id).subscribe((ordenId) => {
      !ordenId
        ? this.router.navigateByUrl('/dashboard/ordenes')
        : console.log(ordenId);

      const {
        id,
        paciente,
        pacienteId,
        medico,
        numeroorden,
        embarazada,
        fum,
        observaciones,
        fechaorden,
        horaorden,
        estado,
        medicoId,
        diagnostico,
        diagnosticoId,
        tiposervicioId,
        tipoatencionId,
        prueba,
      } = ordenId;
      this.pacientes = ordenId.paciente;
      this.ingresoSeleccionado = ordenId;
      this.ingresoForm.setValue({
        numero: paciente.numero,
        doctor: medico.nombres,
        diagnostico: diagnostico.nombre,
        pacienteId,
        embarazada,
        fum: `${fum}`.slice(0, 10),
        observaciones,
        medicoId,
        diagnosticoId,
        tiposervicioId,
        tipoatencionId,
        pruebas: prueba.map((item) =>
          this.pruebas.push(
            this.fb.group({
              //  this.etiqueta:item.panelprueba.ABREV,
              codigoId: item.panelprueba.id,
              codigo: item.panelprueba.CODIGO,
              nomExam: item.panelprueba.NOMBRE,
              tiempo: item.panelprueba.TIEMPO,
              muestra: item.panelprueba.muestra.nombre,
              etq: item.panelprueba.ORDEN == '2' ? item.panelprueba.ORDEN : '',

              estado: item.estado.toString(),
            }),
          ),
        ),
      });
    });
  }
  getprovincia() {
    this.manteniminetoService.getProvincia().subscribe((provincia) => {
      this.listprovincia = provincia;
    });
  }
  marcarTodasPendientes() {
    this.pruebas.controls.forEach((control) => {
      control.get('estado')?.setValue(1); // Set all to "Pendiente" (value 1)
    });
  }
  getPanelPruebas() {
    this.manteniminetoService.getPanelPruebas().subscribe((listapruebas) => {
      console.log(listapruebas);
      this.lista = listapruebas;
      const listafavorite = this.lista.filter((item) => item.favorite === true);

      const grouped = listafavorite.reduce((curr, CATEGORIA) => {
        if (!curr[CATEGORIA.modelo.NOMBRE]) {
          curr[CATEGORIA.modelo.NOMBRE] = [CATEGORIA];
        } else {
          curr[CATEGORIA.modelo.NOMBRE].push(CATEGORIA);
        }
        return curr;
      }, {});
      console.log(grouped);

      this.listaquimica = Object.keys(grouped).map((item) => {
        return {
          CATEGORIA: item,
          CODIGO: grouped[item],
        };
      });
      // this.listaquimica = listaquimicas.filter((item) => item.favorite === true);

      console.log(this.listaquimica);
      //this.listaquimica = listapruebas;
    });
  }

  getTipoatencion() {
    this.manteniminetoService.getAtencion().subscribe((tipoatencion) => {
      this.listatipoatencion = tipoatencion;
    });
  }
  getTiposervicio() {
    this.manteniminetoService.getServicio().subscribe((tiposervicio) => {
      this.listatiposervicio = tiposervicio;
    });
  }
  getDiagnostico() {
    this.manteniminetoService.getDiagnostico().subscribe((diagnostico) => {
      console.log(diagnostico);
      this.listatipodiagnostico = diagnostico;
    });
  }
  getPacientes() {
    this.ingresordenService.getPaciente().subscribe((pacientes) => {
      console.log(pacientes);

      this.listapacientes = pacientes;
    });
  }

  getPerfiles() {
    this.manteniminetoService.consultaGrupo().subscribe((listaperfiles) => {
      console.log(listaperfiles);
      this.listgrupoperfil = listaperfiles;
    });
  }

  getDoctor() {
    this.ingresordenService.getMedico().subscribe((medicos) => {
      console.log(medicos);

      this.listadoctores = medicos;
    });
  }

  crearformulario() {
    this.ingresoForm = this.fb.group({
      pacienteId: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      tipoatencionId: ['', [Validators.required]],
      tiposervicioId: ['', [Validators.required]],
      medicoId: ['', [Validators.required]],
      doctor: ['', [Validators.required]],
      embarazada: [],
      fum: [''],
      diagnostico: [''],
      diagnosticoId: [''],
      observaciones: ['', [Validators.required]],

      pruebas: this.fb.array([]),
    });
  }

  addPruebas(): FormGroup {
    return this.fb.group({
      codigoId: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      tiempo: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      muestra: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    });
  }

  agregarPrueba() {
    const add = this.ingresoForm.get('pruebas') as FormArray;
    add.push(this.addPruebas());
  }

  guardarOrden() {
    if (this.ingresoForm.invalid) {
      return Object.values(this.ingresoForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }

    if (this.ingresoSeleccionado) {
      const data = {
        ...this.ingresoForm.value,
        id: this.ingresoSeleccionado.id,
      };

      this.manteniminetoService
        .getUpdateIngresoOrden(data)
        .subscribe((resp: any) => {
          const { msg } = resp;
          Swal.fire({
            icon: 'success',
            text: `${msg}`,
          });
          this.ingresoForm.reset();
          this.router.navigateByUrl('/dashboard/ordenes');
        });
    } else {
      this.manteniminetoService
        .getCreateIngresoOrden(this.ingresoForm.value)
        .subscribe((resp: any) => {
          const { msg } = resp;

          Swal.fire({
            icon: 'success',
            text: `${msg}`,
          });
          this.ingresoForm.reset({
            pacienteId: '',
            numero: '',
            tipoatencionId: '',
            tiposervicioId: '',
            medicoId: '',
            doctor: '',
            embarazada: '',
            fum: '',
            diagnostico: '',
            diagnosticoId: '',
            observaciones: '',
            pruebas: '',
          });
          this.pruebas.clear();
          this.listapacientes = undefined;
          this.pacientes = undefined;
          this.listadoctores = undefined;
          this.router.navigateByUrl('/dashboard/ordenes');
        });
    }
  }

  desmarcarCategoria(nombre) {
    const pruebasArray = this.ingresoForm.get('pruebas') as FormArray;
    const index = pruebasArray.controls.findIndex(
      (control) => control.value.ItemID === nombre[0],
    );
    if (index !== -1) {
      // Elimina la prueba del FormArray usando el índice
      pruebasArray.removeAt(index);
      console.log('Prueba eliminada:', nombre[0]);
    } else {
      console.log('No se encontró la prueba con el ItemID:', nombre[0]);
    }
  }

  removeItem(i: number) {
    console.log(i);
    const pruebasArray = this.ingresoForm.get('pruebas') as FormArray;
    pruebasArray.removeAt(i);
  }
  onreset() {
    this.ingresoForm.reset();

    this.pruebas.clear();
    this.listapacientes = undefined;
    this.pacientes = undefined;
    this.listadoctores = undefined;
  }

  cambioestado() {
    if (this.btnVal != 'Editar') {
      this.guardarOrden();
    }
    this.ingresoForm.enable();
    this.btnVal = 'Guardar';
  }

  clearFilters() {
    const inputs = document.getElementsByName('checkbox');
    inputs.forEach((i) => (i['checked'] = false));
  }

  /* nuevoingreso */
  crearformularioPaciente() {
    this.pacienteForm = this.fb.group({
      tipo: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      fechanac: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      email: [''],
      sexo: ['', [Validators.required]],
      convencional: [''],
      celular: [''],
      provinciaId: ['', [Validators.required]],
      cantonId: ['', [Validators.required]],
      parroquiaId: ['', [Validators.required]],
      barrio: [''],
      numeracion: [''],
    });
  }
  crearformularioMedico() {
    this.medicoForm = this.fb.group({
      numero: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],

      edad: ['', [Validators.required]],
      especialidadId: ['', [Validators.required]],
      email: [''],
      sexo: ['', [Validators.required]],
      convencional: [''],
      celular: [''],
      provinciaId: ['', [Validators.required]],
      cantonId: ['', [Validators.required]],
      parroquiaId: ['', [Validators.required]],
      barrio: [''],
      numeracion: [''],
    });
  }
  buscarPaciente(numero: any) {
    console.log(numero);
  }

  onSelectProvincia(event: any) {
    const selectedId = +event.target.value;
    console.log(selectedId);

    this.selecteProvincia = this.listprovincia.find(
      (m) => Number(m.id) === selectedId,
    );

    console.log(this.selecteProvincia);
    this.cantones = this.selecteProvincia ? this.selecteProvincia.cantones : [];

    console.log(this.cantones);
  }

  onSelectCanton(event: any) {
    const selectedId = +event.target.value;
    console.log(selectedId);

    this.selecteCanton = this.cantones.find((m) => Number(m.id) === selectedId);

    console.log(this.selecteCanton);
    this.parroquia = this.selecteProvincia ? this.selecteCanton.parroquias : [];

    console.log(this.parroquia);
  }

  totalTotal() {
    const array = this.ingresoForm.get('pruebas') as FormArray;
    console.log(array.value);
    this.totalT = array.value.reduce((acc, obj) => acc(obj.VALOR), 0);
    console.log(this.totalT);
  }

  pacienteseleccionado(paciente: Paciente) {
    console.log(paciente);
    const {
      tipo,
      numero,
      apellidos,
      nombres,
      fechanac,
      edad,
      email,
      sexo,
      convencional,
      celular,
      provincia,
      canton,
      parroquia,
      barrio,
      numeracion,
    } = paciente;

    this.pacientes = new Pacientes(
      tipo,
      numero,
      apellidos,
      nombres,
      sexo,
      fechanac,
      edad,
      email,
      convencional,
      celular,
      provincia,
      canton,
      parroquia,
      barrio,
      numeracion,
    );

    this.ingresoForm.patchValue({
      pacienteId: paciente.id,
      numero: paciente.numero,
    });

    this.pacienteForm.patchValue({
      tipo,
      numero,
      apellidos,
      nombres,
      fechanac,
      edad,
      email,
      sexo,
      convencional,
      celular,
      provincia,
      canton,
      parroquia,
      barrio,
      numeracion,
    });
    $('#modal-paciente').modal('hide');
    this.inputRef.nativeElement.value = '';
  }

  doctorseleccionado(event: any) {
    console.log(event);

    this.ingresoForm.patchValue({
      doctor: event.nombres + '' + event.apellidos,
      medicoId: event.id,
    });
    const {
      numero,
      apellidos,
      nombres,

      email,
      especialidadId,
      sexo,
      convencional,
      celular,
      provincia,
      canton,
      parroquia,
      barrio,
      numeracion,
    } = event;
    this.medicoForm.patchValue({
      numero,
      apellidos,
      nombres,

      email,
      especialidadId,
      sexo,
      convencional,
      celular,
      provincia,
      canton,
      parroquia,
      barrio,
      numeracion,
    });

    $('#modal-medico').modal('hide');
    this.inputRef.nativeElement.value = '';
  }

  diagnosticoseleccionado(diagnostico: Diagnostico) {
    console.log(diagnostico);

    this.ingresoForm.patchValue({
      diagnostico: diagnostico.nombre,
      diagnosticoId: diagnostico.id,
    });

    $('#modal-diagnostico').modal('hide');
    this.inputRef.nativeElement.value = '';
  }
  borrarPasatiempo(i: number) {
   
    const isArray = this.ingresoForm.get('pruebas') as FormArray;
    console.log(this.listgrupoperfil);
    const nombrePrueba = isArray.value.at(i).nomExam;
    console.log(nombrePrueba);
    if (isArray.value.at(i).etq === 3) {
      console.log(this.listgrupoperfil);
      const perfilseleccionado = this.listgrupoperfil.filter(
             (it) => it.nombre === nombrePrueba,
      );
      console.log(perfilseleccionado);
      if (perfilseleccionado) {
        perfilseleccionado.isChecked = false;
        /*  for (const perfil of perfilseleccionado) {
          console.log(isArray.value.at(i).codigo); */

        console.log(perfilseleccionado);

        const index = isArray.value.map((item) =>
          perfilseleccionado.itempruebas.findIndex(
            (p) => p.panelprueba.CODIGO === item.codigo,
          ),
        );

        console.log(index);
        index.reverse().forEach((i) => {
          if (i !== -1) {
            this.pruebas.removeAt(i);
          }
        });
      }
      // }
    }

    const isPruebaseleccionada = isArray.value.at(i);
    console.log(isPruebaseleccionada);

    for (let categoria of this.listaquimica) {
      for (let item of categoria.CODIGO) {
        if (item.CODIGO === isPruebaseleccionada.codigo) {
          item.isChecked = false;
          break;
        }
      }
    }
    this.pruebas.removeAt(i);
  }

  getTipoGrupo() {
    this.manteniminetoService.consultaGrupo().subscribe((listaperfiles) => {
      console.log(listaperfiles);
      this.listgrupoperfil = listaperfiles;
    });
  }
  onchangePerfil(event: any, item: Listaperfile) {
    console.log(item);
    const isChecked = event.target.checked;
    let isCheckedValue = item;
    const pruebasArray = this.ingresoForm.get('pruebas') as FormArray;
    console.log(pruebasArray.value);
    const isPrueba = pruebasArray.value.find(
      (itemarray) => itemarray.ItemID === item,
    );
    console.log(isPrueba);
    if (isPrueba == undefined || isPrueba == 'undefined') {
      this.nomPerfil = item.nombre;
      console.log(this.nomPerfil.length);
      item.itempruebas.map((cod) => {
        this.pruebas.push(
          this.fb.group({
            //  nombre: [item.nombre],
            codigoId: [cod.panelprueba.id, Validators.required],
            codigo: [cod.panelprueba.CODIGO, Validators.required],
            nomExam: [cod.panelprueba.NOMBRE, Validators.required],
            valor: [], //cod.panelprueba.id
            tiempo: [cod.panelprueba.TIEMPO, Validators.required],
            muestra: [cod.panelprueba.muestra.nombre, Validators.required],
            estado: ['1', Validators.required],
            etq: [cod.panelprueba.ORDEN],
          }),
        );
      });
    } else {
      const index = pruebasArray.value.findIndex((x) => console.log(x));

      this.pruebas.removeAt(index);
    }
  }
  onchangePruebas(e: any, item: Listaprueba) {
    const isChecked = e.target.checked;
    let isCheckedValue = item;
    console.log(item);
    const pruebasArray = this.ingresoForm.get('pruebas') as FormArray;

    const isPrueba = pruebasArray.value.find(
      (items) => items.ItemID === item.CODIGO,
    );
    console.log(isPrueba);

    if (isChecked == true) {
      this.pruebas.push(
        this.fb.group({
          codigoId: [item.id, Validators.required],
          codigo: [item.CODIGO, Validators.required],
          nomExam: [item.NOMBRE, Validators.required],
          tiempo: [item.TIEMPO, Validators.required],
          valor: [item.VALOR, Validators.required],
          muestra: [item.muestra.nombre, Validators.required],
          estado: ['1', Validators.required],
          etq: [],
        }),
      );
    } else {
      const index = pruebasArray.value.findIndex(
        (x) => x.ItemID === item.CODIGO,
      );

      this.pruebas.removeAt(index);
    }
  }
  guardarPaciente() {
    this.ingresoService
      .getPostPaciente(this.pacienteForm.value)
      .subscribe((resp: any) => {
        const { msg } = resp;
        Swal.fire({
          icon: 'success',
          text: `${msg}`,
        });
        $('#modal-info').modal('hide');
        this.getPacientes();
        this.pacienteForm.reset({
          tipo: '',
          numero: '',
          apellidos: '',
          nombres: '',
          fechanac: '',
          edad: '',
          email: '',
          sexo: '',
          convencional: '',
          celular: '',
          provincia: '',
          canton: '',
          parroquia: '',
          barrio: '',
          numeracion: '',
        });
      });
  }
  guardarMedico() {
    this.ingresoService
      .getPostMedico(this.medicoForm.value)
      .subscribe((resp: any) => {
        const { msg } = resp;
        $('#modal-info').modal('hide');
        Swal.fire({
          icon: 'success',
          text: `${msg}`,
        });

        this.getDoctor();
        this.medicoForm.reset({
          numero: '',
          apellidos: '',
          nombres: '',
          especialidadId: '',

          email: '',
          sexo: '',
          convencional: '',
          celular: '',
          provincia: '',
          canton: '',
          parroquia: '',
          barrio: '',
          numeracion: '',
        });
      });
  }
}
