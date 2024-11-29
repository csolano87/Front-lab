import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { finalize, map } from 'rxjs';

import { Listaordene } from 'src/app/interfaces/orden.interface';
import { Lista } from 'src/app/models/doctor.module';
import { Impresora } from 'src/app/models/impresora.module';
import { Pacientes } from 'src/app/models/muestra.module';
import { Orden } from 'src/app/models/orden.module';
import { Origin } from 'src/app/models/origin.module';
import { panelPrueba } from 'src/app/models/panelPruebas.module';
import { Provincia } from 'src/app/models/provincia.module';
import { Prueba } from 'src/app/models/pruebas.module';
import { Usuario } from 'src/app/models/usuario.module';
import { AgendamientoService } from 'src/app/services/agendamiento.service';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-orden-manual',
  templateUrl: './orden-manual.component.html',
  styleUrls: ['./orden-manual.component.css'],
})
export class OrdenManualComponent implements OnInit {
  @ViewChild('inputRef') inputRef: ElementRef;
  anio: number;
  dia: number;
  mes: number;
  public isLoading = false;
  public src: string;
  public data$: any;
  btnVal = 'Guardar';

  selectedItemsList = [];
  checkedIDs = [];

  OrdenForm!: FormGroup;

  prueba = [
    {
      ItemName: '900-9017 UROCULTIVO',
      ItemID: '9017-UROCULTIVO',
      isChecked: false,
    },
    { ItemName: '900-9088 HERIDA', ItemID: '9088-HERIDA', isChecked: false },
    {
      ItemName: '900-9040 EX FARINGEO',
      ItemID: '9040-EX FARINGEO',
      isChecked: false,
    },
    {
      ItemName: '900-9011 HEMOCULT',
      ItemID: '9011-HEMOCULTIVO',
      isChecked: false,
    },
    {
      ItemName: '900-9061 CSVAGINAL',
      ItemID: '9061-CSVAGINAL',
      isChecked: false,
    },
    {
      ItemName: '900-9031 SEC BONQU',
      ItemID: '9031-SEC BONQUIAL',
      isChecked: false,
    },
    {
      ItemName: '900-9049 SEC OTICA',
      ItemID: '9049-SEC OTICA',
      isChecked: false,
    },
    { ItemName: '900-9067 CATETER', ItemID: '9067-CATETER', isChecked: false },
    { ItemName: '900-9000 ESPUTO', ItemID: '9000-ESPUTO', isChecked: false },
    { ItemName: '900-9019 COPROCU ', ItemID: '9019-COPROCU', isChecked: false },
  ];

  seasons: string[] = ['1', '2'];

  liquido = [
    {
      ItemName: '9091 LIQ ASCITICO',
      ItemID: '9091-LIQ ASCITICO',
      isChecked: false,
    },
    {
      ItemName: '9083 LIQ PLEURAL',
      ItemID: '9083-LIQ PLEURAL',
      isChecked: false,
    },
    {
      ItemName: '9127 LIQ CEFALORAQ',
      ItemID: '9127-LIQ CEFALORAQUIDE',
      isChecked: false,
    },
    {
      ItemName: '9084 LIQ PERITONEAL',
      ItemID: '9084-LIQ PERITONEAL',
      isChecked: false,
    },
  ];

  microbacterias = [
    {
      ItemName: '9131 MICOBAC-PCR XDR',
      ItemID: '9131-MICOBACTER-PCR XDR',
      isChecked: false,
    },
    {
      ItemName: '9130 MICOBAC-PCR ULT',
      ItemID: '9130-MICOBACTER-PCR ULTR',
      isChecked: false,
    },
  ];

  showAge;
  showFecha;

  get IDENTIFICADOR() {
    return (
      this.OrdenForm?.get('IDENTIFICADOR')!.invalid &&
      this.OrdenForm?.get('IDENTIFICADOR')!.touched
    );
  }
  get NOMBRETIPOORDEN() {
    return (
      this.OrdenForm?.get('NOMBRETIPOORDEN')!.invalid &&
      this.OrdenForm?.get('NOMBRETIPOORDEN')!.touched
    );
  }
  get NOMBRES() {
    return (
      this.OrdenForm?.get('NOMBRES')!.invalid &&
      this.OrdenForm?.get('NOMBRES')!.touched
    );
  }
  get APELLIDO() {
    return (
      this.OrdenForm?.get('APELLIDO')!.invalid &&
      this.OrdenForm?.get('APELLIDO')!.touched
    );
  }

  get CODPROVINCIA() {
    return (
      this.OrdenForm?.get('CODPROVINCIA')!.invalid &&
      this.OrdenForm?.get('CODPROVINCIA')!.touched
    );
  }

  get TELEFONO() {
    return (
      this.OrdenForm?.get('TELEFONO')!.invalid &&
      this.OrdenForm?.get('TELEFONO')!.touched
    );
  }

  get DIRECCION() {
    return (
      this.OrdenForm?.get('DIRECCION')!.invalid &&
      this.OrdenForm?.get('DIRECCION')!.touched
    );
  }

  get EMAIL() {
    return (
      this.OrdenForm?.get('EMAIL')!.invalid &&
      this.OrdenForm?.get('EMAIL')!.touched
    );
  }

  get EDAD() {
    return (
      this.OrdenForm?.get('EDAD')!.invalid &&
      this.OrdenForm?.get('EDAD')!.touched
    );
  }
  get FECHANACIMIENTO() {
    return (
      this.OrdenForm?.get('FECHANACIMIENTO')!.invalid &&
      this.OrdenForm?.get('FECHANACIMIENTO')!.touched
    );
  }

  get CODIMPRESORA() {
    return (
      this.OrdenForm?.get('CODIMPRESORA')!.invalid &&
      this.OrdenForm?.get('CODIMPRESORA')!.touched
    );
  }

  get SEXO() {
    return (
      this.OrdenForm?.get('SEXO')!.invalid &&
      this.OrdenForm?.get('SEXO')!.touched
    );
  }
  get HIS() {
    return (
      this.OrdenForm?.get('HIS')!.invalid && this.OrdenForm?.get('HIS')!.touched
    );
  }

  get CODDOCTOR() {
    return (
      this.OrdenForm?.get('CODDOCTOR')!.invalid &&
      this.OrdenForm?.get('CODDOCTOR')!.touched
    );
  }
  get CODTIPOORDEN() {
    return (
      this.OrdenForm?.get('CODTIPOORDEN')!.invalid &&
      this.OrdenForm?.get('CODTIPOORDEN')!.touched
    );
  }
  get PRIORIDAD() {
    return (
      this.OrdenForm?.get('PRIORIDAD')!.invalid &&
      this.OrdenForm?.get('PRIORIDAD')!.touched
    );
  }
  get CODCENTROSALUD() {
    return (
      this.OrdenForm?.get('CODCENTROSALUD')!.invalid &&
      this.OrdenForm?.get('CODCENTROSALUD')!.touched
    );
  }

  get OPERADOR() {
    return (
      this.OrdenForm?.get('OPERADOR')!.invalid &&
      this.OrdenForm?.get('OPERADOR')!.touched
    );
  }
  get CODFLEBOTOMISTA() {
    return (
      this.OrdenForm?.get('CODFLEBOTOMISTA')!.invalid &&
      this.OrdenForm?.get('CODFLEBOTOMISTA')!.touched
    );
  }
  get CORRELATIVO() {
    return (
      this.OrdenForm?.get('CORRELATIVO')!.invalid &&
      this.OrdenForm?.get('CORRELATIVO')!.touched
    );
  }

  get pruebas() {
    return this.OrdenForm.get('pruebas') as FormArray;
  }
  public usuarios: Usuario[] = [];
  public listaordene: Listaordene[] = [];
  public page!: number;
  listaOperador: Origin[] = [];
  listaPanelpruebas: panelPrueba[] = [];
  listaFlebotomista: Origin[] = [];
  listaSala: Origin[] = [];
  listaImpresora: Impresora[] = [];
  listaCentrosalud: Origin[] = [];
  listadoctor: Lista[] = [];
  listaprovincia: Provincia[] = [];
  ordenseleccionada: Orden;
  listaprueba: Prueba[] = [];
  listaorigin: Origin[] = [];
  listaservice: Origin[] = [];
  listapacientes: Pacientes[] = [];
  listanombre = [];

  listahematologia: any[] = [];
  listauroanalisis: any[] = [];
  listaquimica: any[] = [];
  listacoprologia: any[] = [];

  listaserologia: any[] = [];

  listahormonal: any[] = [];
  listatumorales: any[] = [];
  listaotros: any[] = [];

  listapruebasVirales: any[] = [];

  usuarioLogueado: Usuario;
  public cargando: boolean = true;
  isFormDisabled: boolean = false;
  public usuario: Usuario;
  constructor(
    private fb: FormBuilder,

    private doctorservice: LlenarCombosService,
    public agendamientoService: AgendamientoService,
    private el: ElementRef,
    private ordenService: OrdenesService,
    private modalImagenService: ModalImagenService,
    private router: Router,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private rolService: RolService,
  ) {
    this.anio = new Date().getFullYear();
    this.mes = new Date().getMonth();
    this.dia = new Date().getDay();
    this.crearformulario();
  }

  ngOnInit(): void {
    const valorAlmacenado = localStorage.getItem('IMPRESORA');

    if (valorAlmacenado) {
      this.OrdenForm.patchValue({ CODIMPRESORA: valorAlmacenado });
    }

    this.doctorservice.getDoctor().subscribe((resp) => {
      this.listadoctor = resp;
    });

    this.doctorservice.getOperador().subscribe((resp) => {
      this.listaOperador = resp;
    });

    this.doctorservice.getCentrosalud().subscribe((resp) => {
      this.listaCentrosalud = resp;
    });

    this.doctorservice.getFlebotomista().subscribe((resp) => {
      this.listaFlebotomista = resp;
    });

    this.doctorservice.getOrigin().subscribe((resp) => {
      this.listaorigin = resp;
    });

    this.doctorservice.getImpresora().subscribe((resp) => {
      this.listaImpresora = resp;
    });
    this.doctorservice.getPanelPruebas().subscribe((resp) => {
      this.listaquimica = resp.filter(
        (prueba) => prueba.CATEGORIA === 'QUIMICA',
      );
      this.listauroanalisis = resp.filter(
        (prueba) => prueba.CATEGORIA === 'UROANALISIS',
      );
      this.listahematologia = resp.filter(
        (prueba) => prueba.CATEGORIA === 'HEMATOLOGIA',
      );
      console.log(`pruebas panel`, this.listauroanalisis);
      this.listahormonal = resp.filter(
        (prueba) => prueba.CATEGORIA === 'HORMONAL',
      );
      this.listapruebasVirales = resp.filter(
        (prueba) => prueba.CATEGORIA === 'PRUEBAS VIRALES',
      );

      this.listaserologia = resp.filter(
        (prueba) => prueba.CATEGORIA === 'SEROLOGIA',
      );

      this.listaotros = resp.filter((prueba) => prueba.CATEGORIA === 'OTROS');
      this.listatumorales = resp.filter(
        (prueba) => prueba.CATEGORIA === 'TUMORALES',
      );
      this.listacoprologia = resp.filter(
        (prueba) => prueba.CATEGORIA === 'COPROLOGIA',
      );
    });
  }

  crearOrden(id: string) {
    if (id === 'Nuevo') {
      this.OrdenForm.reset();
      this.pruebas.clear();
      this.clearFilters();
      this.OrdenForm.enable();
      this.btnVal = 'Guardar';

      return;
    }

    this.btnVal = 'Editar';
    this.OrdenForm.disable();

    this.ordenService
      .obtenerOrdenById(id)
      .subscribe((orden) => {
        !orden
          ? this.router.navigateByUrl('/dashboard/ordenes')
          : console.log('cabeecera', orden);
        const {
          IDENTIFICADOR,
          NOMBRES,
          APELLIDO,
          CODPROVINCIA,
          DIRECCION,
          TELEFONO,
          EMAIL,
          EDAD,
          FECHANACIMIENTO,
          SEXO,
          CODTIPOORDEN,
          CODDOCTOR,
          NOMBRETIPOORDEN,
          PRIORIDAD,
          HIS,
          OPERADOR,
          CODFLEBOTOMISTA,
          CORRELATIVO,
          CODIMPRESORA,
          CODEMBARAZADA,
          as400,
        } = orden;

        this.ordenseleccionada = orden;
        console.log(this.ordenseleccionada);
        this.OrdenForm.setValue({
          IDENTIFICADOR,
          NOMBRES,
          APELLIDO,
          CODPROVINCIA,
          DIRECCION,
          TELEFONO,
          EMAIL,
          FECHANACIMIENTO: FECHANACIMIENTO.slice(0, 10),
          SEXO,
          CODDOCTOR,
          EDAD,
          HIS,
          PRIORIDAD,
          CODTIPOORDEN: CODTIPOORDEN,
          OPERADOR,
          CODFLEBOTOMISTA,
          CORRELATIVO,
          CODEMBARAZADA,
          CODIMPRESORA:
            localStorage.getItem('IMPRESORA') == null
              ? CODIMPRESORA
              : localStorage.getItem('IMPRESORA'),
          pruebas: orden.as400.map((valor) =>
            this.pruebas.push(
              this.fb.group({
                ItemID: valor['ItemID'],
                ItemName: valor['ItemName'],
                ESTADO: valor['ESTADO'],
              }),
            ),
          ),
        });
      });
  }

  CalculateAge() {
    if (this.OrdenForm.value.FECHANACIMIENTO) {
      console.log(this.OrdenForm.value.FECHANACIMIENTO);
      const convertAge = new Date(this.OrdenForm.value.FECHANACIMIENTO);

      const timeDiff = Math.abs(Date.now() - convertAge.getTime());

      return (this.showAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365));
    } else {
      return null;
    }
  }
  crearformulario() {
    this.OrdenForm = this.fb.group(
      {
        IDENTIFICADOR: ['', [Validators.required]],
        NOMBRES: ['', [Validators.required]],
        APELLIDO: ['', [Validators.required]],
        FECHANACIMIENTO: ['', [Validators.required]],
        SEXO: ['', [Validators.required]],
        CODTIPOORDEN: ['', [Validators.required]],
        PRIORIDAD: ['', [Validators.required]],
        CODDOCTOR: ['', [Validators.required]],
        HIS: ['Manual'],
        TELEFONO: ['', [Validators.required]],
        EMAIL: [''],
        CODEMBARAZADA: [],
        CODPROVINCIA: [''],
        DIRECCION: [''],
        OPERADOR: ['', [Validators.required]],
        CODFLEBOTOMISTA: ['', [Validators.required]],
        CORRELATIVO: [],
        CODIMPRESORA: ['', [Validators.required]],
        EDAD: [],
        CODCENTROSALUD: ['', [Validators.required]],
        pruebas: this.fb.array([]),
      },
      { validators: this.validatePruebas },
    );

    this.changeValidators();

    this.OrdenForm.get('FECHANACIMIENTO').valueChanges.subscribe((value) => {
      if (value) {
        const parts = value.split('/');
        if (parts.length === 3) {
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10);
          const year = parseInt(parts[2], 10);
          const fechaNacimiento = new Date(year, month - 1, day); // Resta 1 al mes porque los meses en JavaScript son de 0 a 11
          const hoy = new Date();
          const edad = Math.floor(
            (Number(hoy) - Number(fechaNacimiento)) /
              (365.25 * 24 * 60 * 60 * 1000),
          );
          console.log(edad); // Puedes mostrar la edad en la consola o asignarla a otra propiedad
        }
      }
    });

    this.OrdenForm.get('EDAD').valueChanges.subscribe((value) => {
      if (value) {
        const hoy = new Date();
        const fechaNacimiento = new Date(
          hoy.getFullYear() - value,
          hoy.getMonth(),
          hoy.getDate(),
        );
        this.OrdenForm.get('FECHANACIMIENTO').setValue(
          fechaNacimiento.toISOString().split('T')[0],
        );
      }
    });
  }
  validatePruebas(formGroup: FormGroup) {
    const pruebasArray = formGroup.get('pruebas') as FormArray;
    if (pruebasArray.length === 0) {
      return { noPruebas: true }; // Devuelve un error si no hay pruebas
    }
    return null; // Devuelve null si las pruebas son válidas
  }

  changeValidators() {
    this.usuario = this.usuarioService.usuario;

    if (this.usuario.rol == 'OPERADOR' || this.usuario.rol == 'ADMIN') {
      this.OrdenForm.controls['OPERADOR'].setValidators([Validators.required]);
      this.OrdenForm.controls['CODFLEBOTOMISTA'].setValidators([
        Validators.required,
      ]);
      this.OrdenForm.controls['CODIMPRESORA'].setValidators([
        Validators.required,
      ]);
    } else {
      //this.OrdenForm.controls['OPERADOR'].clearValidators();
    }

    this.OrdenForm.get('OPERADOR').updateValueAndValidity();
  }

  isFormValid(): boolean {
    return this.OrdenForm.valid;
  }
  guardarOrden() {
    if (this.OrdenForm.invalid) {
      return Object.values(this.OrdenForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }

    if (this.ordenseleccionada) {
      const data = {
        ...this.OrdenForm.value,
        id: this.ordenseleccionada.id,
      };

      this.ordenService.actualizarOrden(data).subscribe((resp: any) => {
        const { msg } = resp;
        Swal.fire('Actualizado', `${msg}`, 'success');

        localStorage.setItem('IMPRESORA', this.OrdenForm.value.CODIMPRESORA);

        this.OrdenForm.disable();
        this.btnVal = 'Editar';
      });
    } else {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor ...',
      });
      Swal.showLoading(null);
      console.log(this.OrdenForm.value);
      this.ordenService
        .GuardarManualOrden(this.OrdenForm.value)

        .subscribe(
          (resp: any) => {
            const { msg } = resp;

            Swal.fire({
              icon: 'success',
              text: `${msg}`,
            });
            this.pruebas.clear();
            this.clearFilters();
            this.OrdenForm.reset({
              IDENTIFICADOR: '',
              NOMBRES: '',
              APELLIDO: '',
              CODPROVINCIA: '',
              DIRECCION: '',
              TELEFONO: '',
              EMAIL: '',
              HIS: 'Manual',
              FECHANACIMIENTO: '',
              CODEMBARAZADA: '',
              SEXO: '',
              CODDOCTOR: '',
              CODTIPOORDEN: '',
              CODSALA: '',
              OPERADOR: '',
              CODFLEBOTOMISTA: '',
              CORRELATIVO: '',
              CODIMPRESORA: '',
              pruebas: '',
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

  enviarorden() {
    if (this.OrdenForm.invalid) {
      return Object.values(this.OrdenForm.controls).forEach((control) => {
        control.markAsTouched();
        console.log(control);
      });
    }
    const data = {
      ...this.OrdenForm.getRawValue(),
      id: this.ordenseleccionada.id,
    };

    this.ordenService.EnviarOrden(data).subscribe((resp: any) => {
      const { msg } = resp;

      Swal.fire('Archivo', `${msg}`, 'success');
      this.router.navigateByUrl('/dashboard/ordenes');
    });
  }
  borrarPasatiempo(i: number) {
    this.pruebas.removeAt(i);
  }

  seleccionarPaciente(paciente) {
    let fecha = paciente.PA_BIRTHDATE.slice(0, 10);
    let feha = fecha.split('/');

    $('#modal-info').modal('hide');
    this.OrdenForm.setValue({
      IDENTIFICADOR: paciente.PA_ID1,
      NOMBRES: paciente.PA_FIRSTNAME,
      APELLIDO: paciente.PA_LASTNAME + ' ' + paciente.PA_SESURNAME,
      EDAD: '',
      HIS: '',
      FECHANACIMIENTO: feha[2] + '-' + feha[1] + '-' + feha[0],
      FECHACITA: '',
      HORACITA: '',
      SEXO: paciente.PA_SEX,
      CODPROVINCIA: '',
      DIRECCION: '',
      TELEFONO: '',
      EMAIL: '',
      CODEMBARAZADA: '',

      CODDOCTOR: this.usuarioLogueado.id,
      CODTIPOORDEN: '',
      CODSALA: '',
      OPERADOR: '',
      CODFLEBOTOMISTA: '',
      CORRELATIVO: '',
      CODIMPRESORA: '',
      CODCENTROSALUD: '',
      pruebas: '',
    });
  }

  buscar(NOMBRE: string, CEDULA: string) {
    this.cargando = true;

    this.doctorservice
      .getpacientes(NOMBRE, CEDULA)
      .subscribe(({ listaordenes }) => {
        this.listaordene = listaordenes;

        this.cargando = false;
      });
  }

  abrirModal() {
    this.modalImagenService.abrirModal();
  }

  buscarHis(cedula: string) {
    this.cargando = true;
    this.ordenService.buscarOrdenHis(cedula).subscribe((orden) => {
      this.OrdenForm.setValue({
        HIS: 'Manual',
        IDENTIFICADOR: orden.IDENTIFICADOR,
        NOMBRES: orden.NOMBRES,
        APELLIDO: orden.APELLIDO,

        FECHANACIMIENTO: orden.FECHANACIMIENTO,
        EDAD: '',
        SEXO: orden.SEXO,
        CODPROVINCIA: '',
        DIRECCION: orden.DIRECCION,
        CODEMBARAZADA: '',
        CODDOCTOR: '',
        CODTIPOORDEN: '',
        PRIORIDAD: '',
        EMAIL: orden.EMAIL,
        TELEFONO: orden.TELEFONO,
        OPERADOR: '',
        CODFLEBOTOMISTA: '',
        CODCENTROSALUD: '',
        CORRELATIVO: '',
        CODIMPRESORA: '',
        pruebas: '',
      });
      this.cargando = false;
    });
  }
  buscarSais(CEDULA: string) {
    console.log(CEDULA);
    this.ordenService.buscarOrderSais(CEDULA).subscribe((orden) => {
      this.OrdenForm.setValue({
        HIS: orden[0].HIS,
        IDENTIFICADOR: orden[0].IDENTIFICADOR,
        NOMBRES: orden[0].NOMBRES,
        APELLIDO: orden[0].APELLIDO,

        FECHANACIMIENTO: orden[0].FECHANACIMIENTO,
        EDAD: '',
        SEXO: orden[0].SEXO,
        CODPROVINCIA: '',
        DIRECCION: '',
        CODEMBARAZADA: '',
        CODDOCTOR: orden[0].CODDOCTOR,
        CODTIPOORDEN: orden[0].CODTIPOORDEN,
        PRIORIDAD: orden[0].PRIORIDAD,
        EMAIL: orden[0].EMAIL,
        TELEFONO: orden[0].TELEFONO,
        OPERADOR: '',
        CODFLEBOTOMISTA: '',
        CODCENTROSALUD: '',
        CORRELATIVO: '',
        CODIMPRESORA: '',

        pruebas: orden[0].as400.map((valor) =>
          this.pruebas.push(
            this.fb.group({
              ItemID: valor['ItemID'],
              ItemName: valor['ItemName'],
              ESTADO: '1',
            }),
          ),
        ),
      });
    });
  }
  search(value: any): any {
    this.isLoading = true;

    this.data$ = this.doctorservice.searchTrack({ q: value }).pipe(
      map(({ prueba }) => prueba),

      finalize(() => (this.isLoading = false)),
    );
  }
  searchMicro(value: any): any {
    this.isLoading = true;

    this.data$ = this.doctorservice.pruebasMicro({ q: value }).pipe(
      map(({ prueba }) => prueba),

      finalize(() => (this.isLoading = false)),
    );
  }

  seleccionarCategoria(nombre: any) {
    const pruebasArray = this.OrdenForm.get('pruebas') as FormArray;
    if (Array.isArray(nombre)) {
      const pruebaExistente = pruebasArray.value;
      const pruebaExistente2 = pruebaExistente.find(
        (control) => control.ItemID === nombre[0],
      );

      if (!pruebaExistente2) {
        this.pruebas.push(
          this.fb.group({
            ItemID: nombre[0],
            ItemName: nombre[1],
            ESTADO: ['1', [Validators.required]],
          }),
        );
        this.inputRef.nativeElement.value = '';
      } else {
        console.log('Ya existe una prueba con el ItemID:', nombre);
      }
    } else {
      const itemID = nombre['TestID'];
      const itemNombre = nombre['TestName'];
      //const pruebasArray = this.OrdenForm.get('pruebas') as FormArray;
      const pruebaExistente = pruebasArray.value;
      const pruebaExistente2 = pruebaExistente.find(
        (control) => control.ItemID === itemID,
      );
      if (pruebaExistente2) {
        // Si ya existe una prueba con el mismo ItemID, no se agrega una nueva
        console.log('Ya existe una prueba con el ItemID:', itemID);
      } else {
        this.pruebas.push(
          this.fb.group({
            ItemID: [itemID, Validators.required],
            ItemName: [itemNombre, Validators.required],
            ESTADO: ['1', Validators.required],
          }),
        );
        console.log('Prueba agregada adicional:', itemID);
      }
    }
  }

  onchange(e: any) {
    const checkedValue = e.target.value;
    console.log(`*********************ONCHANGE*******`, checkedValue);
    const nombre = checkedValue.split('-');
    const checked = e.target.checked;

    if (checked) {
      this.seleccionarCategoria(nombre);
    } else {
      this.desmarcarCategoria(nombre);
    }
  }

  desmarcarCategoria(nombre) {
    const pruebasArray = this.OrdenForm.get('pruebas') as FormArray;
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
    const pruebasArray = this.OrdenForm.get('pruebas') as FormArray;
    pruebasArray.removeAt(i);
  }
  onreset() {
    this.OrdenForm.reset({ HIS: 'Manual' });
    this.pruebas.clear();
  }

  cambioestado() {
    //this.form.get('credentials').at(index).get('label').enable();

    console.log('ESTADO DEL BOTON', this.btnVal);
    if (this.btnVal != 'Editar') {
      this.guardarOrden();
    }
    this.OrdenForm.enable();
    this.btnVal = 'Guardar';
  }

  clearFilters() {
    const inputs = document.getElementsByName('checkbox');
    inputs.forEach((i) => (i['checked'] = false));
  }
  isPruebaDisabled(index: number): boolean {
    return this.OrdenForm.disabled; // Devuelve true si el formulario está desactivado, de lo contrario, devuelve false
  }
}
