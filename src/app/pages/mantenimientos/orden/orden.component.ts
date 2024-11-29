import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { finalize, map } from 'rxjs';
import { Listaordene } from 'src/app/interfaces/orden.interface';

import { Lista } from 'src/app/models/doctor.module';

import { Orden } from 'src/app/models/orden.module';
import { Origin } from 'src/app/models/origin.module';
import { Paciente } from 'src/app/models/paciente.module';
import { Pacientes } from 'src/app/models/pacientes.module';
import { Provincia } from 'src/app/models/provincia.module';
import { Prueba } from 'src/app/models/pruebas.module';
import { Usuario } from 'src/app/models/usuario.module';
import { AgendamientoService } from 'src/app/services/agendamiento.service';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css'],
})
export class OrdenComponent implements OnInit {
  anio: number;
  dia: number;
  mes: number;
  public isLoading = false;
  public src: string;
  public data$: any;
  btnVal = 'Guardar';

  selectedItemsList = [];
  checkedIDs = [];

  OrdenForm!: FormGroup; /* agregar codigo a lado de ItemName */

  quimica = [
    { ItemName: '1001 GLUCOSA', ItemID: '1001-GLU' },
    { ItemName: '1021 GLUCOSA 2H POSTPRANDIAL', ItemID: '1021-GLUCPP' },
    { ItemName: '1033 UREA', isChecked: false, ItemID: '1033-UREA' },
    { ItemName: '1036 CREAATININA', isChecked: false, ItemID: '1036-CREA' },
    { ItemName: '504 BILIRRUBIN', isChecked: false, ItemID: '504-BILIRRUBIN' },
    { ItemName: '1072 ACIDO URICO', isChecked: false, ItemID: '1072-AURIC' },
    {
      ItemName: '1112 PROTEINAS TOTALES',
      isChecked: false,
      ItemID: '1112-PROTT',
    },
    { ItemName: '1114 ALBUMINA', isChecked: false, ItemID: '1114-ALB' },
    { ItemName: '1115 SERO-GLOBULINA', isChecked: false, ItemID: '1115-GLOB' },
    { ItemName: '1081 ALT/TGP', isChecked: false, ItemID: '1081-TGP' },
    { ItemName: '1078 AST/TGO', isChecked: false, ItemID: '1078-TGO' },
    {
      ItemName: '1096 FOSFTASA ALCALINA',
      isChecked: false,
      ItemID: '1096-FALK',
    },

    {
      ItemName: '1057 COLESTEROL TOTAL',
      isChecked: false,
      ItemID: '1057-COLT',
    },
    { ItemName: '1063 TRIGLICERIDOS', isChecked: false, ItemID: '1063-TG' },
    { ItemName: '1242 HIERRO', isChecked: false, ItemID: '1242-FE' },
    { ItemName: '4016 PCR', isChecked: false, ItemID: '4016-PCR' },
    {
      ItemName: '507 GASES ARTERIALES',
      isChecked: false,
      ItemID: '507-GASES ARTERIALES',
    },
    {
      ItemName: '519 ELECTROLITOS',
      isChecked: false,
      ItemID: '519-ELECTROLITOS',
    },
    { ItemName: '1130 LIPASA', isChecked: false, ItemID: '1130-LIPASA' },
    {
      ItemName: '1029 5 HB GLICOSILADA',
      isChecked: false,
      ItemID: '1029-HBA1C',
    },
    { ItemName: '1099 LDH', isChecked: false, ItemID: '1099-LDH' },
    { ItemName: '1109 CKMB', isChecked: false, ItemID: '1109-CKMB' },
    { ItemName: '1106 CK TOTAL', isChecked: false, ItemID: '1106-CK' },
    { ItemName: '1084 GAMMA G.T', isChecked: false, ItemID: '1084-GGT' },
    {
      ItemName: '598 DEPURACION CREATI',
      isChecked: false,
      ItemID: '598-DEPURACION DE CREATININA',
    },
    {
      ItemName: '4020 FACTOR REUMATOIDEO',
      isChecked: false,
      ItemID: '4020-FACTOR R',
    },
    { ItemName: '1145 CALCIO', isChecked: false, ItemID: '1145-CA' },
    { ItemName: '1154 FOSFORO', isChecked: false, ItemID: '1154-P' },
    { ItemName: '3470 TRF', isChecked: false, ItemID: '3470-TRF' },
  ];

  hema = [
    {
      ItemName: '500 BIOMETRIA HEMATICA',
      isChecked: false,
      ItemID: '500-BIOMETRIA HEMATICA',
    },
    { ItemName: '2003 PLAQUETAS', isChecked: false, ItemID: '2003-PLT' },
    {
      ItemName: '544 G.SANGUINEO FACTOR',
      isChecked: false,
      ItemID: '544-GRUPO SANGUINEO Y FACTOR RH',
    },
    {
      ItemName: '2066 TIEMPO COAGULACION',
      isChecked: false,
      ItemID: '2066-TCOAG',
    },
    {
      ItemName: '2069 TIEMPO PROTROMBINA',
      isChecked: false,
      ItemID: '2069-TP',
    },
    {
      ItemName: '2082 TIEMPO TROMBOPLASTINA',
      isChecked: false,
      ItemID: '2082-TPT',
    },
    {
      ItemName: '2048 TEST COOMBS DIRECTO',
      isChecked: false,
      ItemID: '2048-CDTO',
    },
    {
      ItemName: '2051 TEST COOMBS INDIRECTO',
      isChecked: false,
      ItemID: '2051-COMIND',
    },
    {
      ItemName: '2087 tiempo de sangria',
      isChecked: false,
      ItemID: '2087-TSANGR',
    },
    { ItemName: '2090 DIMER D', isChecked: false, ItemID: '2090-DIMER D' },
    {
      ItemName: '1004 GLUCOSA GLUCTEST',
      isChecked: false,
      ItemID: '1004-GLUCTEST',
    },
    {
      ItemName: '2050 PRUEBAS PRETRANSFUSIONALES',
      isChecked: false,
      ItemID: '2050-PPRETRAN',
    },
    {
      ItemName: '6410 PRUEBA COOMBS DIRECTO',
      isChecked: false,
      ItemID: '6410-PDCOOMBD',
    },
    {
      ItemName: '6412 PRUEBA COOMBS INDIRECTO',
      isChecked: false,
      ItemID: '6412-PCOOMBID',
    },
  ];

  /* HORMONAL */
  hormonal = [
    { ItemName: '3009 FT3', ItemID: '3009-FT3', isChecked: false },
    { ItemName: '3017 FT4', ItemID: '3017-FT4', isChecked: false },
    { ItemName: '3001 TSH', ItemID: '3001-TSH', isChecked: false },
    { ItemName: '3031 FSH', ItemID: '3031-FSH', isChecked: false },
    { ItemName: '3035 E2', ItemID: '3035-E2', isChecked: false },
    /*   { ItemName: '3035 E2', ItemID: '107', isChecked: false }, */
    { ItemName: '3027 PRL', ItemID: '3027-PRL', isChecked: false },
    { ItemName: '3033 PROG', ItemID: '3033-PROG', isChecked: false },
    { ItemName: '3081 INSULINA', ItemID: '3081-INSULINA', isChecked: false },
    { ItemName: '3201 HCG', ItemID: '3201-HCG', isChecked: false },
    { ItemName: '3203 TEST EMB', ItemID: '3203-TEST EMB', isChecked: false },
    { ItemName: '3029 LH', ItemID: '3029-LH', isChecked: false },
    { ItemName: '3250 NSE', ItemID: '3250-NSE', isChecked: false },
    { ItemName: '525 INDICE  R', ItemID: '525-INDICE  R', isChecked: false },
    { ItemName: '3052 TROP I', ItemID: '3052-TROP I', isChecked: false },
    { ItemName: '3706 IL6', ItemID: '3706-IL6', isChecked: false },
    { ItemName: '3087 INS 120', ItemID: '3087-INS 120', isChecked: false },
  ];

  sero = [
    {
      ItemName: '1191 PEPTIDO ANTI CUERPO CITRULINADO',
      ItemID: '1191-PEPT ANT',
      isChecked: false,
    },
    {
      ItemName: '518 AGLUTINACIONES',
      ItemID: '518-AGLUTINACIONES FEBRILES',
      isChecked: false,
    },
    {
      ItemName: '4025 ASTO  CUANTITATIVO',
      ItemID: '4025-ASTO',
      isChecked: false,
    },
    { ItemName: '3301 HIV AC-AG', ItemID: '3301-HIV RAPID', isChecked: false },
    {
      ItemName: '3304 HIV 1/2 AC-AG',
      ItemID: '3304-HIV 1/2',
      isChecked: false,
    },
    {
      ItemName: '3310 SIFILIS ANTICUERPOS',
      ItemID: '3310-SIF.ANT',
      isChecked: false,
    },
    { ItemName: '3352 HEPATITIS A', ItemID: '3352-HAVM', isChecked: false },
    { ItemName: '3355 HBSAG', ItemID: '3355-HBSAG', isChecked: false },
    { ItemName: '3373 HVC', ItemID: '3373-HVC', isChecked: false },
    { ItemName: '549 TORCH', ItemID: '549-TORCH', isChecked: false },
    { ItemName: '3419 NS1', ItemID: '3419-NS', isChecked: false },
    { ItemName: '3412 DENGM', ItemID: '3412-DENGM', isChecked: false },
    { ItemName: '3421 LEPTOS', ItemID: '3421-LEPTOS', isChecked: false },
    { ItemName: '4010 VDRL', ItemID: '4010-VDR', isChecked: false },
  ];

  /* marcadores tumorales */
  tumorales = [
    { ItemName: '3205 PSAT', ItemID: '3205-PSAT', isChecked: false },
    { ItemName: '3210 PSAL', ItemID: '3210-PSAL', isChecked: false },
    { ItemName: '3220 ACE', ItemID: '3220-ACE', isChecked: false },
    { ItemName: '3225 AFP', ItemID: '3225-AFP', isChecked: false },
    { ItemName: '3230 CA125', ItemID: '3230-CA125', isChecked: false },
    { ItemName: '3235 CA199', ItemID: '3235-CA199', isChecked: false },
    { ItemName: '3240 CA153', ItemID: '3240-CA153', isChecked: false },
    { ItemName: '3245 CA724', ItemID: '3245-CA724', isChecked: false },
  ];

  /* OTROS */
  otros = [
    {
      ItemName: '558 LABOR PARTO',
      ItemID: '558-LABOR PARTO',
      isChecked: false,
    },
    { ItemName: '557 NEONATOS', ItemID: '557-NEONATOS', isChecked: false },
    {
      ItemName: '545 PANEL DROGAS',
      ItemID: '545-PANEL DROGAS',
      isChecked: false,
    },
    {
      ItemName: '528 CITOQUIMICO DE LIQ.',
      ItemID: '528-CITOQUIMICO DE LIQ. CEFALORAQ.',
      isChecked: false,
    },
    { ItemName: '8501 TOXICOLO', ItemID: '8501-TOXICOLO', isChecked: false },
    { ItemName: '591 HANSEN', ItemID: '591-HANSEN', isChecked: false },
    { ItemName: '8001 BACILOS', ItemID: '8001-BACILOS', isChecked: false },
    { ItemName: '2046 COMPATIB', ItemID: '2046-COMPATIB', isChecked: false },
    { ItemName: '8215 LEISH', ItemID: '8215-LEISH', isChecked: false },
    { ItemName: '1091 C.TB', ItemID: '1091-C.TB', isChecked: false },
  ];
  /* PRUEBAS VIRALES */

  pruebasvirales = [
    {
      ItemName: '597 PRUEBAS VIRALES',
      ItemID: '597-PRUEBAS VIRALES',
      isChecked: false,
    },
    { ItemName: '3020 CD4', ItemID: '3020-CD4', isChecked: false },
    { ItemName: '3306 CV HIV', ItemID: '3306-CV HIV', isChecked: false },
  ];

  uro = [
    {
      ItemName: '513 ORINA EXAMEN GENERAL',
      ItemID: '513-ORINA EXAMEN GENERAL',
      isChecked: false,
    },
    {
      ItemName: '543 PROTEINAS EN ORINA 24H',
      ItemID: '543-PROTEINAS EN ORINA 24H',
      isChecked: false,
    },
    {
      ItemName: '502 ACLARAMIENTO CREATININA',
      ItemID: '502-ACLARAMIENTO CREATININA',
      isChecked: false,
    },
    {
      ItemName: '4001 LIPOARABINOMANANO',
      ItemID: '4001-LAM',
      isChecked: false,
    },
    {
      ItemName: '1054 DEPURACION CREATININA',
      ItemID: '1054-DEPURAC',
      isChecked: false,
    },
  ];

  copro = [
    {
      ItemName: '506 COPROPARASITARIO',
      ItemID: '506-COPROPARASITARIO',
      isChecked: false,
    },
    {
      ItemName: '536 COPROPARA. SERIADO',
      ItemID: '536-COPROPARASITARIO SERIADO',
      isChecked: false,
    },
    {
      ItemName: '6090 SANGRE OCULTA HECES',
      ItemID: '6090-SANGOCU',
      isChecked: false,
    },
    {
      ItemName: '8123 POLIMORFONUCLEARES',
      ItemID: '8123-POLINU',
      isChecked: false,
    },
    { ItemName: '6095 ROTAVIRUS', ItemID: '6095-ROTAVIRU', isChecked: false },
    {
      ItemName: '6115 HELICOBACTER PYLORI',
      ItemID: '6115-HELYHE',
      isChecked: false,
    },
  ];

  /* micro */

  prueba = [
    {
      ItemName: '9017 UROCULTIVO',
      ItemID: '9017-UROCULTIVO',
      isChecked: false,
    },
    { ItemName: '9088 HERIDA', ItemID: '9088-HERIDA', isChecked: false },
    {
      ItemName: '9040 EX FARINGEO',
      ItemID: '9040-EX FARINGEO',
      isChecked: false,
    },
    {
      ItemName: '9011 HEMOCULTIVO',
      ItemID: '9011-HEMOCULTIVO',
      isChecked: false,
    },
    { ItemName: '9061 CSVAGINAL', ItemID: '9061-CSVAGINAL', isChecked: false },
    {
      ItemName: '9031 SEC BONQUIAL',
      ItemID: '9031-SEC BONQUIAL',
      isChecked: false,
    },
    { ItemName: '9049 SEC OTICA', ItemID: '9049-SEC OTICA', isChecked: false },
    { ItemName: '9067 CATETER', ItemID: '9067-CATETER', isChecked: false },
    { ItemName: '9000 ROTAVIRUS', ItemID: '9000-ROTAVIRUS', isChecked: false },
    {
      ItemName: '6115 HELICOBACTER PYLORI',
      ItemID: '6115-HELICOBACTER PYLORI',
      isChecked: false,
    },
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
      ItemName: '9127 LIQ CEFALORAQUIDEO',
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
      ItemName: '9131 MICOBACTER-PCR XDR',
      ItemID: '9131-MICOBACTER-PCR XDR',
      isChecked: false,
    },
    {
      ItemName: '9130 MICOBACTER-PCR ULTR',
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
    return this.OrdenForm.get('pruebas') as UntypedFormArray;
  }
  public usuarios: Usuario[] = [];
  public listaordene: Listaordene[] = [];
  public page!: number;
  listaOperador: Origin[] = [];
  listaFlebotomista: Origin[] = [];
  listaSala: Origin[] = [];
  listaCentrosalud: Origin[] = [];
  listadoctor: Lista[] = [];
  listaprovincia: Provincia[] = [];
  ordenseleccionada: Orden;
  listaprueba: Prueba[] = [];
  listaorigin: Origin[] = [];
  listaservice: Origin[] = [];
  listapacientes: Pacientes[] = [];
  listanombre = [];
  usuarioLogueado: Usuario;
  cargando = false;
  isFormDisabled: boolean = false;
  public usuario: Usuario;
  constructor(
    private fb: UntypedFormBuilder,
    private doctorservice: LlenarCombosService,
    public agendamientoService: AgendamientoService,
    private ordenService: OrdenesService,
    private modalImagenService: ModalImagenService,
    private router: Router,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.anio = new Date().getFullYear();
    this.mes = new Date().getMonth();
    this.dia = new Date().getDay();
    this.crearformulario();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.crearOrden(id));
    this.doctorservice.getOperador().subscribe((resp) => {
      this.listaOperador = resp;
    });

    this.doctorservice.getFlebotomista().subscribe((resp) => {
      this.listaFlebotomista = resp;
    });

    this.doctorservice.getCentrosalud().subscribe((resp) => {
      this.listaCentrosalud = resp;
    });

    this.doctorservice.getDoctor().subscribe((resp) => {
      this.listadoctor = resp;
    });

    this.doctorservice.getOrigin().subscribe((resp) => {
      this.listaorigin = resp;
    });

    /*    this.usuarioLogueado = this.usuarioService.usuario;
   
       console.log(`*************LOGUEADO******`, this.usuarioLogueado)
       this.activatedRoute.params.subscribe(({ id }) => this.crearOrden(id));
   
       
   
       this.doctorservice.getDoctor()
         .subscribe(resp => {
   
           this.listadoctor = resp;
   
           console.log(`********************RT***`, this.listadoctor)
         })
       this.usuarioService.GetUsuarios()
         .subscribe(({ usuarios }) => {
           this.usuarios = usuarios;
           console.log(`********************RTUSUARIOS***`, this.usuarios)
         }
         )
   
   
       this.doctorservice.getOrigin()
         .subscribe(resp => {
           this.listaorigin = resp;
          
         })
   
      
   
    
       this.doctorservice.getSala()
         .subscribe(resp => {
           this.listaSala = resp;
        
         })
   
   
   
       this.doctorservice.getService()
         .subscribe(resp => {
           this.listaservice = resp;
       
         })
   
   
       this.doctorservice.getProvincia()
         .subscribe(resp => {
           this.listaprovincia = resp;
           
         }) */
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
    if (this.OrdenForm.invalid) {
      return Object.values(this.OrdenForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }

    this.ordenService.obtenerOrdenById(id).subscribe((orden) => {
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
        CODCENTROSALUD,

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
        SEXO: SEXO == '1' ? '' : SEXO,
        CODDOCTOR,
        EDAD,
        HIS,
        PRIORIDAD,
        CODCENTROSALUD,
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
        HIS: ['', [Validators.required]],
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
        CODCENTROSALUD: [],
        pruebas: this.fb.array([]),
      },
      { validators: this.validatePruebas },
    );

    this.changeValidators();

    this.OrdenForm.get('FECHANACIMIENTO').valueChanges.subscribe((value) => {
      if (value) {
        const fechaNacimiento = new Date(value);
        const hoy = new Date();
        const edad = Math.floor(
          (hoy.getTime() - fechaNacimiento.getTime()) /
            (1000 * 60 * 60 * 24 * 365.25),
        );
        this.OrdenForm.get('EDAD').setValue(edad);
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
  validatePruebas(formGroup: UntypedFormGroup) {
    const pruebasArray = formGroup.get('pruebas') as UntypedFormArray;
    if (pruebasArray.length === 0) {
      return { noPruebas: true };
    }
    return null;
  }

  changeValidators() {
    this.usuario = this.usuarioService.usuario;

    if (this.usuario.rol == 'OPERADOR') {
      this.OrdenForm.controls['OPERADOR'].setValidators([Validators.required]);
      this.OrdenForm.controls['CODFLEBOTOMISTA'].setValidators([
        Validators.required,
      ]);
      this.OrdenForm.controls['CODIMPRESORA'].setValidators([
        Validators.required,
      ]);
    } else {
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
    console.log('ESTADO DEL BOTON ', this.OrdenForm);
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
      this.ordenService.GuardarOrden(this.OrdenForm.value).subscribe(
        (resp: any) => {
          const { msg } = resp;
          Swal.fire({
            icon: 'success',
            text: `${msg}`,
          });
          this.pruebas.clear();
          this.clearFilters();
          this.OrdenForm.reset();
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

    console.log('ENVIANDO A INIFINITY', data);

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

  abrirModal() {
    this.modalImagenService.abrirModal();
  }

  buscarHis(HIS: string) {
    this.ordenService.buscarOrdenHis(HIS).subscribe((orden) => {
      const {
        IDENTIFICADOR,
        NOMBRES,
        APELLIDO,
        FECHACITA,
        FECHANACIMIENTO,
        SEXO,
        CODDOCTOR,
        HIS,
        CODTIPOORDEN,
        CODSALA,
        OPERADOR,
        CODFLEBOTOMISTA,
        CORRELATIVO,
        CODIMPRESORA,
        as400,
      } = orden;

      this.OrdenForm.setValue({
        IDENTIFICADOR,
        NOMBRES,
        APELLIDO,
        FECHACITA,
        HIS,
        FECHANACIMIENTO: FECHANACIMIENTO.slice(0, 10),
        SEXO,
        CODDOCTOR,
        CODTIPOORDEN,
        CODSALA,
        OPERADOR,
        CODFLEBOTOMISTA,
        CORRELATIVO,
        CODIMPRESORA,
        pruebas: as400.map((valor) =>
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
  buscarSais(CEDULA: string) {
    this.ordenService.buscarOrderSais(CEDULA).subscribe((orden) => {
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
        PRIORIDAD,
        HIS,
        CODEMBARAZADA,
        as400,
      } = orden;

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
    const pruebasArray = this.OrdenForm.get('pruebas') as UntypedFormArray;
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
      } else {
      }
    } else {
      const itemID = nombre['TestID'];
      const itemNombre = nombre['TestName'];

      const pruebaExistente = pruebasArray.value;
      const pruebaExistente2 = pruebaExistente.find(
        (control) => control.ItemID === itemID,
      );
      if (pruebaExistente2) {
      } else {
        this.pruebas.push(
          this.fb.group({
            ItemID: [itemID, Validators.required],
            ItemName: [itemNombre, Validators.required],
            ESTADO: ['1', Validators.required],
          }),
        );
      }
    }
  }

  onchange(e: any) {
    const checkedValue = e.target.value;
    const nombre = checkedValue.split('-');
    const checked = e.target.checked;
    if (checked) {
      this.seleccionarCategoria(nombre);
    } else {
      this.desmarcarCategoria(nombre);
    }
  }

  desmarcarCategoria(nombre) {
    const pruebasArray = this.OrdenForm.get('pruebas') as UntypedFormArray;
    const index = pruebasArray.controls.findIndex(
      (control) => control.value.ItemID === nombre[0],
    );
    if (index !== -1) {
      pruebasArray.removeAt(index);
    } else {
    }
  }

  removeItem(i: number) {
    const pruebasArray = this.OrdenForm.get('pruebas') as UntypedFormArray;
    pruebasArray.removeAt(i);
  }
  onreset() {
    this.OrdenForm.reset();
    this.pruebas.clear();
  }

  cambioestado() {
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
    return this.OrdenForm.disabled;
  }
}
