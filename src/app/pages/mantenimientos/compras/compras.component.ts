import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  UntypedFormBuilder,
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Equipo } from 'src/app/interfaces/carga-equipos.interfaces';
import { Proceso } from 'src/app/interfaces/cargaProceso.interface';
import { Usuario } from 'src/app/models/usuario.module';
import { RegistroService } from 'src/app/services/registro.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
})
export class ComprasComponent implements OnInit {
  title = 'formulario-Compras';
  private tempFile: any;
  listaequiposquimica: Equipo[] = [];
  listaequiposinmunologia: Equipo[] = [];
  listaequiposhematologia: Equipo[] = [];
  listaequiposcoagulacion: Equipo[] = [];
  listaequiposgasometria: Equipo[] = [];
  listaequiposinsumos: Equipo[] = [];
  listaequiposelectrolitros: Equipo[] = [];
  listaequiposmicrobiologia: Equipo[] = [];
  listaequiposuroanalisis: Equipo[] = [];
  listaequiposrapidas: Equipo[] = [];
  public usuarios: Usuario[] = [];
  listaproceso: Proceso;
  btnVal = 'Guardar';
  licencia = [
    {
      ItemName: 'Parametros reportables modo fluido corporal',
      value: 'Parametros reportables modo fluido corporal',
    },
    {
      ItemName: 'Parametros reportables canal reticulocitos',
      value: 'Parametros reportables canal reticulocitos',
    },
    {
      ItemName: 'Parametros investigacion canal reticulocitos',
      value: 'Parametros investigacion canal reticulocitos',
    },
  ];
  equipos = [
    { ItemName: 'QUIMICA', value: 'QUIMICA' },
    { ItemName: 'INMUNOLOGIA', value: 'INMUNOLOGIA' },
    { ItemName: 'HEMATOLOGIA', value: 'HEMATOLOGIA' },
    { ItemName: 'COAGULACION', value: 'COAGULACION' },
    { ItemName: 'GASOMETRIA', value: 'GASOMETRIA' },
    { ItemName: 'INSUMOS', value: 'INSUMOS' },
    { ItemName: 'ELECTROLITOS', value: 'ELECTROLITOS' },
    { ItemName: 'MICROBIOLOGIA', value: 'MICROBIOLOGIA' },
    { ItemName: 'UROANALISIS', value: 'UROANALISIS' },
    { ItemName: 'PRUEBAS RAPIDAS', value: 'PRUEBAS RAPIDAS' },
  ];

  get institucion() {
    return (
      this.RegistroForm?.get('institucion')!.invalid &&
      this.RegistroForm?.get('institucion')!.touched
    );
  }

  get codigo() {
    return (
      this.RegistroForm?.get('codigo')!.invalid &&
      this.RegistroForm?.get('codigo')!.touched
    );
  }
  get ASIGNADO() {
    return (
      this.RegistroForm?.get('ASIGNADO')!.invalid &&
      this.RegistroForm?.get('ASIGNADO')!.touched
    );
  }
  get linkproceso() {
    return (
      this.RegistroForm?.get('linkproceso')!.invalid &&
      this.RegistroForm?.get('linkproceso')!.touched
    );
  }

  get tiempoconsumo() {
    return (
      this.RegistroForm?.get('tiempoconsumo')!.invalid &&
      this.RegistroForm?.get('tiempoconsumo')!.touched
    );
  }

  get determinacion() {
    return (
      this.RegistroForm?.get('determinacion')!.invalid &&
      this.RegistroForm?.get('determinacion')!.touched
    );
  }

  get presupuesto() {
    return (
      this.RegistroForm?.get('presupuesto')!.invalid &&
      this.RegistroForm?.get('presupuesto')!.touched
    );
  }

  get entregacarpeta() {
    return (
      this.RegistroForm?.get('entregacarpeta')!.invalid &&
      this.RegistroForm?.get('entregacarpeta')!.touched
    );
  }
  get terceraopcion() {
    return (
      this.RegistroForm?.get('terceraopcion')!.invalid &&
      this.RegistroForm?.get('terceraopcion')!.touched
    );
  }

  get sistema() {
    return (
      this.RegistroForm?.get('sistema')!.invalid &&
      this.RegistroForm?.get('sistema')!.touched
    );
  }
  get observacion() {
    return (
      this.RegistroForm?.get('observacion')!.invalid &&
      this.RegistroForm?.get('observacion')!.touched
    );
  }
  get areas() {
    return this.RegistroForm.get('areas') as FormArray;
  }
  get licenciaEquiposHematologicos() {
    return this.RegistroForm.get('licenciaEquiposHematologicos') as FormArray;
  }
  get adjunto() {
    return this.RegistroForm.get('adjunto') as FormArray;
  }
  get licenciaEquiposHematologico() {
    return (
      this.RegistroForm?.get('licenciaEquiposHematologicos')!.invalid &&
      this.RegistroForm?.get('licenciaEquiposHematologicos')!.touched
    );
  }
  get quimica() {
    return (
      this.RegistroForm?.get('equipoprincipal.eqquimica')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqquimica')!.touched
    );
  }
  get inmunologia() {
    return (
      this.RegistroForm?.get('equipoprincipal.eqinmunologia')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqinmunologia')!.touched
    );
  }
  get hematologia() {
    return (
      this.RegistroForm?.get('equipoprincipal.eqhematologia')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqhematologia')!.touched
    );
  }
  get coagulacion() {
    return (
      this.RegistroForm?.get('equipoprincipal.eqcoagulacion')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqcoagulacion')!.touched
    );
  }
  get gasometria() {
    return (
      this.RegistroForm?.get('equipoprincipal.eqgasometria')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqgasometria')!.touched
    );
  }

  get electrolitros() {
    return (
      this.RegistroForm?.get('equipoprincipal.eqelectrolitros')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqelectrolitros')!.touched
    );
  }
  get uroanalisis() {
    return (
      this.RegistroForm?.get('equipoprincipal.equroanalisis')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.equroanalisis')!.touched
    );
  }
  get microbiologia() {
    return (
      this.RegistroForm?.get('equipoprincipal.eqmicrobiologia')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqmicrobiologia')!.touched
    );
  }

  get poc() {
    return (
      this.RegistroForm?.get('equipoprincipal.eqpoc')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqpoc')!.touched
    );
  }

  get bkquimica() {
    return (
      this.RegistroForm?.get('equipobackup.bkquimica')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqquimica')!.touched
    );
  }
  get bkinmunologia() {
    return (
      this.RegistroForm?.get('equipobackup.bkinmunologia')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqinmunologia')!.touched
    );
  }
  get bkhematologia() {
    return (
      this.RegistroForm?.get('equipobackup.bkhematologia')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqhematologia')!.touched
    );
  }
  get bkcoagulacion() {
    return (
      this.RegistroForm?.get('equipobackup.bkcoagulacion')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqcoagulacion')!.touched
    );
  }
  get bkgasometria() {
    return (
      this.RegistroForm?.get('equipobackup.bkgasometria')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqgasometria')!.touched
    );
  }

  get bkelectrolitros() {
    return (
      this.RegistroForm?.get('equipobackup.bkelectrolitros')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqelectrolitros')!.touched
    );
  }
  get bkuroanalisis() {
    return (
      this.RegistroForm?.get('equipobackup.bkuroanalisis')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.equroanalisis')!.touched
    );
  }
  get bkmicrobiologia() {
    return (
      this.RegistroForm?.get('equipobackup.bkmicrobiologia')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqmicrobiologia')!.touched
    );
  }

  get bkpoc() {
    return (
      this.RegistroForm?.get('equipobackup.bkpoc')!.invalid &&
      this.RegistroForm?.get('equipoprincipal.eqpoc')!.touched
    );
  }

  ngOnInit(): void {
    this.Getusuarios();
    this.activateRoute.params.subscribe(({ id }) => this.crearCompras(id));

    const equipoprincipalGroup = this.RegistroForm.get(
      'equipoprincipal',
    ) as FormGroup;
    const equipobackupGroup = this.RegistroForm.get(
      'equipobackup',
    ) as FormGroup;

    Object.keys(equipoprincipalGroup.controls).forEach((controlName) => {
      equipoprincipalGroup.get(controlName)?.valueChanges.subscribe((value) => {
        console.log(`equipo principal`, value);
        this.toggleValorControl(value, equipoprincipalGroup, controlName);
      });
    });

    Object.keys(equipobackupGroup.controls).forEach((controlName) => {
      equipobackupGroup.get(controlName)?.valueChanges.subscribe((value) => {
        console.log(`equipo bk`, value);
        this.toggleValorControl(value, equipobackupGroup, controlName);
      });
    });

    this.getEquipos();
  }

  toggleValorControl(value: any, group: FormGroup, controlName: string) {
    const valorCampo = group.get(controlName)?.value;

    if (valorCampo === 'NO APLICA') {
      group.get(`val${controlName.slice(2)}`)?.patchValue(0);
      group.get(`valbk${controlName.slice(2)}`)?.patchValue(0);
    } /* else {
      group.get(`val${controlName.slice(2)}`)?.enable();
      group.get(`valbk${controlName.slice(2)}`)?.enable();
    } */
  }

  RegistroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registroServices: RegistroService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private usuarioservice: UsuarioService,
  ) {
    this.crearformulario();
  }
  Getusuarios() {
    // this.cargando = true;
    this.usuarioservice.GetUsuarios().subscribe(({ total, usuarios }) => {
      //   this.totalUsuarios = total;
      console.log(usuarios);
      this.usuarios = usuarios;
      //   this.usuariosTemp = usuarios;
      // this.cargando = false;
    });
  }
  //console.log(ctrls)
  crearformulario() {
    const ctrls = this.equipos.map((control) => this.fb.control(false));
    console.log(ctrls);
    this.RegistroForm = this.fb.group(
      {
        institucion: ['', [Validators.required]],
        codigo: ['', [Validators.required]], //ASIGNADO
        // ASIGNADO: ['', [Validators.required]], //ASIGNADO
        linkproceso: ['', [Validators.required]],
        tiempoconsumo: ['', [Validators.required]],
        determinacion: ['', [Validators.required]],
        presupuesto: ['', [Validators.required]],
        entregacarpeta: ['', [Validators.required]],
        //areas: this.fb.array([]),
        areas: this.fb.array(ctrls),
        terceraopcion: ['', [Validators.required]],
        sistema: ['', [Validators.required]],
        equipoprincipal: this.fb.group({
          eqquimica: ['', [Validators.required]],
          valquimica: ['', [Validators.required]],
          eqinmunologia: ['', [Validators.required]],
          valinmunologia: ['', [Validators.required]],
          eqhematologia: ['', [Validators.required]],
          valhematologia: ['', [Validators.required]],
          eqcoagulacion: ['', [Validators.required]],
          valcoagulacion: ['', [Validators.required]],
          eqgasometria: ['', [Validators.required]],
          valgasometria: ['', [Validators.required]],
          eqelectrolitros: ['', [Validators.required]],
          valelectrolitros: ['', [Validators.required]],
          equroanalisis: ['', [Validators.required]],
          valuroanalisis: ['', [Validators.required]],
          eqmicrobiologia: ['', [Validators.required]],
          valmicrobiologia: ['', [Validators.required]],
          eqpoc: ['', [Validators.required]],
          valpoc: ['', [Validators.required]],
        }),
        equipobackup: this.fb.group({
          bkquimica: ['', [Validators.required]],
          valbkquimica: ['', [Validators.required]],
          bkinmunologia: ['', [Validators.required]],
          valbkinmunologia: ['', [Validators.required]],
          bkhematologia: ['', [Validators.required]],
          valbkhematologia: ['', [Validators.required]],
          bkcoagulacion: ['', [Validators.required]],
          valbkcoagulacion: ['', [Validators.required]],
          bkgasometria: ['', [Validators.required]],
          valbkgasometria: ['', [Validators.required]],
          bkelectrolitros: ['', [Validators.required]],
          valbkelectrolitros: ['', [Validators.required]],
          bkuroanalisis: ['', [Validators.required]],
          valbkuroanalisis: ['', [Validators.required]],
          bkmicrobiologia: ['', [Validators.required]],
          valbkmicrobiologia: ['', [Validators.required]],
        }),
        observacion: ['', [Validators.required]],

        correo: [''],
        adjunto: this.fb.array([]),

        // licenciaEquiposHematologicos: this.fb.array([]),
        licenciaEquiposHematologicos: this.fb.array(
          this.licencia.map((control) => this.fb.control(false)),
        ),
      },
      { validators: this.validatePruebas },
    );
  }
  validatePruebas(formGroup: FormGroup) {
    const pruebasArray = formGroup.get('areas') as FormArray;
    if (pruebasArray.length === 0) {
      return { noPruebas: true };
    }
    return null;
  }

  crearCompras(id: string) {
    console.log(id);
    if (id === 'Nuevo') {
      this.RegistroForm.reset();
      this.RegistroForm.enable();
      this.btnVal = 'Guardar';
      return;
    }

    this.btnVal = 'Editar';
    this.RegistroForm.disable();

    this.registroServices.getByIdRegistro(id).subscribe((proceso) => {
      !proceso
        ? this.router.navigateByUrl('/dashboard/compras')
        : console.log(proceso);
      this.listaproceso = proceso;
      const {
        areas,
        equipoprincipal,
        ASIGNADO,
        equipobackup,
        licenciaEquiposHematologicos,
        institucion,
        codigo,
        linkproceso,
        tiempoconsumo,
        determinacion,
        presupuesto,
        entregacarpeta,
        terceraopcion,
        sistema,
        observacion,
        usuarioId,
        ESTADO,
      } = proceso;
      this.listaproceso = proceso;
      let licen = licenciaEquiposHematologicos.map((lice) => lice);
      this.licencia.forEach((lic, i) => {
        if (licen.indexOf(lic.value) != -1) {
          this.licenciaEquiposHematologicos.at(i).patchValue(true);
        }
      });

      let area = areas.map((item) => item);
      console.log(area);
      this.equipos.forEach((equi, i) => {
        console.log(equi.value);
        if (area.indexOf(equi.value) != -1) {
          this.areas.at(i).patchValue(true);
        }
      });
      this.RegistroForm.patchValue({
        equipoprincipal,
        equipobackup,
        institucion: `${institucion}`.trim(),
        codigo: `${codigo}`.trim(),
        linkproceso,
        tiempoconsumo,
        determinacion,
        presupuesto,
        entregacarpeta,
        terceraopcion,
        sistema,
        observacion,
        ASIGNADO,
        correo: '',
        adjunto: '',
      });
    });
  }
  getSelectedRoles() {
    return this.RegistroForm.value.areas
      .map((checked, i) => (checked ? this.equipos[i].value : null))
      .filter((value) => value !== 'null');
  }

  getLicencias() {
    return this.RegistroForm.value.licenciaEquiposHematologicos
      .map((checked, i) => (checked ? this.licencia[i].value : null))
      .filter((value) => value !== null);
  }

  getEquipos() {
    this.registroServices.getEquipos().subscribe((equipos) => {
      //console.log(equipos.filter((eq,i,self)=>eq.categoria.NOMBRE ==='UROANALISIS' && self.findIndex(e=>e.NOMBRE ===eq.NOMBRE)))
      this.listaequiposquimica = equipos.filter(
        (equipo) => equipo.CATEGORIA === 'QUIMICA',
      );
      this.listaequiposinmunologia = equipos.filter(
        (equipo) => equipo.CATEGORIA === 'INMUNOLOGIA',
      );
      this.listaequiposhematologia = equipos.filter(
        (equipo) => equipo.CATEGORIA === 'HEMATOLOGIA',
      );
      this.listaequiposcoagulacion = equipos.filter(
        (equipo) => equipo.CATEGORIA === 'COAGULACION',
      );
      this.listaequiposgasometria = equipos.filter(
        (equipo) => equipo.CATEGORIA === 'GASOMETRIA',
      );
      this.listaequiposinsumos = equipos.filter(
        (equipo) => equipo.CATEGORIA === 'INSUMOS',
      );
      this.listaequiposelectrolitros = equipos.filter(
        (equipo) => equipo.CATEGORIA === 'ELECTROLITOS',
      );
      this.listaequiposmicrobiologia = equipos.filter(
        (equipo) => equipo.CATEGORIA === 'MICROBIOLOGIA',
      );
        this.listaequiposuroanalisis = equipos.filter((equipo)=>equipo.CATEGORIA ==='UROANALISIS' ,
      ); 
      this.listaequiposrapidas = equipos.filter(
        (equipo) => equipo.CATEGORIA === 'PRUEBASRAPIDAS',
      );
    });
  }
  /*  disableInput() {
    (<FormArray>this.areas.get('areas')).controls.forEach((control) =>
      control.disable(),
    );
  } */
  /*  onAreasChange(e: any) {
    console.log(`datachekbox`, e);
    const area = this.RegistroForm.get('areas') as FormArray;

    const areas = e.target.value;
    console.log(`areas`, areas);
    const checkboxArea = e.target;
    console.log(`checkboxArea`, checkboxArea.checked);

    if (checkboxArea.checked) {
     
    } else {
      area.controls.findIndex((z) =>
        console.log(`control checkbox`, z.value.areas),
      );
      const indexArea = area.controls.findIndex((z) => z.value.areas === areas);
      console.log(`area eliminada`, indexArea);
      area.removeAt(indexArea);
    }
  }
  onCheckboxChange(e: any) {
    const pruebasArray = this.RegistroForm.get(
      'licenciaEquiposHematologicos',
    ) as FormArray;

    const valorinput = e.target.value;
    const checkbox = e.target;

  
  } */
  onreset() {
    this.RegistroForm.reset();
    this.areas.clear();
    this.licenciaEquiposHematologicos.clear();
    //this.rout
  }

  upload(event: any) {
    const [file] = event.target.files;
    const adjuntos = this.RegistroForm.get('adjunto') as FormArray;

    // Iterar sobre los archivos seleccionados y agregarlos al FormArray
    const fi = file;
    console.log(`fi`, fi);

    console.log(`fi2`, fi);
    adjuntos.push(
      this.fb.group({
        fi,
      }),
    );
  }
  /*  select(value: string): boolean {
    console.log(value);
    return this.RegistroForm.get('areas')?.value.includes(value);
  } */

  guardarRegistro() {
    const selectedRoles = this.getSelectedRoles();
    const updatedAreas = this.RegistroForm.value.areas.map((checked, i) =>
      checked ? this.equipos[i].value : checked,
    );
    console.log(updatedAreas);
    const selectLicencias = this.getLicencias();
    const updateLicencias =
      this.RegistroForm.value.licenciaEquiposHematologicos.map((checked, i) =>
        checked ? this.licencia[i].value : checked,
      );

    this.RegistroForm.patchValue({
      areas: updatedAreas,
      licenciaEquiposHematologicos: updateLicencias,
    });

    console.log(this.RegistroForm.value);
    if (this.RegistroForm.invalid) {
      this.RegistroForm.markAllAsTouched();
      return;
    }
    if (this.listaproceso) {
      const data = {
        ...this.RegistroForm.value,
        id: this.listaproceso.id,
      };
      console.log(data);
      this.registroServices.actualizarRegistro(data).subscribe((resp: any) => {
        const { msg } = resp;
        Swal.fire('Actualizado', `${msg}`, 'success');
        this.RegistroForm.disable();
        this.btnVal = 'Editar';
      });
    } else {
      this.registroServices
        .getRegistro(this.RegistroForm.value.trim())
        .subscribe((res: any) => {
          const { msg } = res;
          Swal.fire({
            icon: 'success',
            title: `${msg}`,
            showConfirmButton: false,
          });

          this.RegistroForm.reset();

          this.areas.get('areas').reset();

          this.router.navigateByUrl('dashboard/consulta-compras');
        });
    }
  }
  cambioEstado() {
    if (this.btnVal != 'Editar') {
      console.log(this.btnVal);
      this.guardarRegistro();
    }
    this.RegistroForm.enable();
    this.btnVal = 'Guardar';
  }
}
