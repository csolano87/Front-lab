import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { event } from 'jquery';
import { Equipo, Equipos } from 'src/app/interfaces/carga-equipos.interfaces';
import { Analizador } from 'src/app/interfaces/cargaAnalizador.interface';
import { Estado } from 'src/app/interfaces/cargaEstado.interface';
import { Marca } from 'src/app/interfaces/cargaMarca.interface';
import { Modelo } from 'src/app/interfaces/cargaModelo.interface';
import { Equipocomplementario } from 'src/app/interfaces/cargarEquipocomplementarios.interface';
import { Estadocliente } from 'src/app/interfaces/cargarEstadoCliente.interface';
import { Estadoproveedor } from 'src/app/interfaces/cargarEstadoProveedores.interface';
import { EquipoID } from 'src/app/interfaces/cargarIDEquipos.interface';
import { Ubicacion } from 'src/app/interfaces/cargaUbicacioninterface';
//import { Equipo } from 'src/app/models/equipo.module';

import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.css',
})
export class EquipoComponent implements OnInit {
  equipoForm!: FormGroup;
  cargando = false;
  public page!: number;
  listacategoria: Marca[] = [];
  listacategorias: Analizador[] = [];
  listamarcaeq: any[] = [];
  listaequipos: any[] = [];
  listaeq: Marca[] = [];
  listaequipocomplementario: Equipocomplementario[] = [];
  listamarca: Marca[] = [];
  listaequipomarca: Marca[] = [];
  listaubicacion: Ubicacion[] = [];
  listaestadocliente: Estadocliente[] = [];
  listaestadoproveedor: Estadoproveedor[] = [];
  listaestado: Estado[] = [];
  listamodelo: Modelo[] = [];
  selectedModelo: any;
  showAge;
  showDetails: boolean[] = [];
  showPruebasHeader: boolean = false;

  selectedmarca: any;
  listaseleccioandoequipo: EquipoID;
  btnVal = 'Guardar';
  constructor(
    private manteniemintoService: MantenimientosService,
    private fb: UntypedFormBuilder,
    private llenarcomboServices: LlenarCombosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.crearFormulario();
  }
  get analizadorId() {
    return (
      this.equipoForm?.get('analizadorId')!.invalid &&
      this.equipoForm?.get('analizadorId')!.touched
    );
  }

  get modeloId() {
    return (
      this.equipoForm?.get('modeloId')!.invalid &&
      this.equipoForm?.get('modeloId')!.touched
    );
  }

  get marcaId() {
    return (
      this.equipoForm?.get('marcaId')!.invalid &&
      this.equipoForm?.get('marcaId')!.touched
    );
  }
  isSerieDisabled(index: number): boolean {
    // Add your logic to enable or disable the SERIEACC field
    return this.ACC.at(index).get('SERIEACC').disabled;
  }
  toggleDetails(index: number): void {
    this.showDetails[index] = !this.showDetails[index];
    this.showPruebasHeader = this.showDetails.some((detail) => detail);
  }
  get ESTADO_ID() {
    return (
      this.equipoForm?.get('ESTADO_ID')!.invalid &&
      this.equipoForm?.get('ESTADO_ID')!.touched
    );
  }

  get UBICACION_ID() {
    return (
      this.equipoForm?.get('UBICACION_ID')!.invalid &&
      this.equipoForm?.get('UBICACION_ID')!.touched
    );
  }
  get SERIE() {
    return (
      this.equipoForm?.get('SERIE')!.invalid &&
      this.equipoForm?.get('SERIE')!.touched
    );
  }

  get ESTADOPROVEEDOR() {
    return (
      this.equipoForm?.get('ESTADOPROVEEDOR')!.invalid &&
      this.equipoForm?.get('ESTADOPROVEEDOR')!.touched
    );
  }
  get ESTADOCLIENTE() {
    return (
      this.equipoForm?.get('ESTADOCLIENTE')!.invalid &&
      this.equipoForm?.get('ESTADOCLIENTE')!.touched
    );
  }

  /*   get SERIEACC(){
    return (
      this.ACC?.contro('SERIEACC')!.invalid &&
      this.ACC?.get('SERIEACC')!.touched
    );
  } */

  get ACC(): FormArray {
    return this.equipoForm.get('ACC') as FormArray;
    // return ( this.importForm.get('PRODUCTOS') as FormArray).controls;
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.CrearEquipos(id));

    this.getEquipo();
    this.getMarca();
    this.getModelo();
    this.getEstado();
    this.getUbicacion();
    this.getEquipocomplementario();
    this.getAnalizador();
    this.getEstadoProveedor();
    this.getEstadoCliente();
  }
  getModelo() {
    this.llenarcomboServices.getModelo().subscribe((modelo) => {
      console.log(modelo);

      this.listamodelo = modelo.filter((item) => item.ESTADO === 1);
    });
  }
  CrearEquipos(id: string) {
    console.log(id);
    if (id === 'Nuevo') {
      this.equipoForm.reset();
      return;
    }
    this.btnVal = 'Editar';
    this.equipoForm.disable();

    this.manteniemintoService.getIdEquipo(id).subscribe((equipos) => {
      !equipos
        ? this.router.navigateByUrl('/dashboard/equipos')
        : console.log(equipos);
      const {
        instrumentoId,
        analizadorId,
        SERIE,
        fecha,
        marcaId,
        modeloId,
        historicoubicacion,
        historicoestado,
        estadoproveedorId,
        estadoclienteId,
        acc,
      } = equipos;

      console.log(marcaId, modeloId);
      this.updateCategoriaAndModelo(marcaId, modeloId);
      this.equipoForm.patchValue({
        analizadorId,
        modeloId,
        marcaId,
        fecha: `${fecha}`.slice(0, 10),
        SERIE,
        ESTADOPROVEEDOR: estadoproveedorId ? estadoproveedorId : '',
        ESTADOCLIENTE: estadoclienteId ? estadoclienteId : '',
        /*   ESTADO_ID: historicoestado[0].estadoId
            ? historicoestado[0].estadoId
            : '',
          UBICACION_ID: historicoubicacion[0].ubicacionId
            ? historicoubicacion[0].ubicacionId
            : '', */

        ESTADO_ID: historicoestado && historicoestado[0] && historicoestado[0].estadoId
          ? historicoestado[0].estadoId
          : '',
        UBICACION_ID: historicoubicacion && historicoubicacion[0] && historicoubicacion[0].ubicacionId
          ? historicoubicacion[0].ubicacionId
          : '',
        //acc && acc.length > 0 ? acc.map((ac) =>
        ACC:
          acc && acc.length > 0
            ? acc.map((ac) =>
              //: acc.map((ac) =>
              this.ACC.push(
                this.fb.group({
                  DESCRIPCION: ac.DESCRIPCION,
                  equipocomplementariosId:
                    ac.equipocomplementariosId.toString(),
                  MARCA: ac.MARCA,
                  SERIEACC: ac.SERIEACC,
                  fechacom: `${ac.fechacom}`.slice(0, 10),
                }),
              ),
            )
            : [],
      });

      this.listaseleccioandoequipo = equipos;

      console.log(this.listaseleccioandoequipo.id);
    });
  }
  CalculateAge() {
    if (this.equipoForm.value.fecha) {
      console.log(this.equipoForm.value.fecha);
      const convertAge = new Date(this.equipoForm.value.fecha);

      const timeDiff = Math.abs(Date.now() - convertAge.getTime());

      return (this.showAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365));
    } else {
      return null;
    }
  }

  updateCategoriaAndModelo(marcaId: number, categoriaId: number): void {
    console.log(categoriaId);
    const selectedMarca = this.listamarca.find((m) => m.id === marcaId);
    console.log(selectedMarca);
    if (selectedMarca) {
      this.listacategoria = selectedMarca.modelo;
      console.log(selectedMarca.modelo);

      console.log(this.listacategoria);

      const selectedCategoria = this.listacategoria.find(
        (c) => c.id === categoriaId,
      );

      console.log(selectedCategoria);

      if (selectedCategoria) {
        this.listaeq = selectedCategoria.instrumento;
        console.log(this.listaeq);
      }
    }
  }
  mostrarColumnaFecha(): boolean {
    return this.ACC.controls.some(
      (eqform) =>
        eqform.get('equipocomplementariosId')?.value == 42 ||
        eqform.get('equipocomplementariosId')?.value == 2,
    );
  }

  crearFormulario() {
    this.equipoForm = this.fb.group({
      //   NOMBRE: ['', [Validators.required]],
      analizadorId: ['', [Validators.required]],
      modeloId: ['', [Validators.required]],
      marcaId: ['', [Validators.required]],
      fecha: [''],
      edad: [''],
      ESTADO_ID: ['', [Validators.required]],
      UBICACION_ID: ['', [Validators.required]],
      SERIE: ['', [Validators.required]],
      ESTADOPROVEEDOR: ['', [Validators.required]],
      ESTADOCLIENTE: ['', [Validators.required]],
      ACC: this.fb.array([]),
    });
  }

  crearItemACC(): FormGroup {
    return this.fb.group({
      DESCRIPCION: ['', [Validators.required]],
      MARCA: ['', [Validators.required]],
      equipocomplementariosId: ['', [Validators.required]],
      SERIEACC: ['', [Validators.required]],
      fechacom: [''],
    });
  }

  addACC() {
    this.ACC.push(this.crearItemACC());
  }
  onSelectMarca(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    console.log(selectedId);

    const selectedmarca = this.listamarca.find(
      (m) => m.id === Number(selectedId),
    );
    console.log(selectedmarca);
    //  this.equipoForm.get('marcaId')?.setValue(this.selectedmarca.marca.id);

    this.listacategoria = selectedmarca
      ? selectedmarca.modelo.sort((a, b) => a.NOMBRE.localeCompare(b.NOMBRE))
      : [];

    console.log(this.listacategoria);
  }
  onSelectModelo(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    console.log(selectedId);

    const selectedCategoria = this.listacategoria.find(
      (m) => m.id === Number(selectedId),
    );

    console.log(selectedCategoria);
    this.listaeq = selectedCategoria
      ? selectedCategoria.instrumento.sort((a, b) =>
        a.NOMBRE.localeCompare(b.NOMBRE),
      )
      : [];

    console.log(this.listaeq);
  }

  actualizarInputs(i: number, $event: any) {
    const accId = Number($event.target.value);
    console.log(accId);
    const productoSeleccionado = this.listamarca.find(
      (producto) => producto.id === accId,
    );
    console.log(productoSeleccionado);
    console.log(productoSeleccionado.NOMBRE);
    const filaSeleccionada = (this.equipoForm.get('ACC') as FormArray).at(i);
    // console.log(filaSeleccionada);
    if (productoSeleccionado) {
      filaSeleccionada.patchValue({
        DESCRIPCION: null,
        equipocomplementariosId: productoSeleccionado.NOMBRE,
        MARCA: null,
        SERIEACC: null,
        // fechacom:
      });
    }
  }
  getMarca() {
    this.llenarcomboServices.getMarca().subscribe((marcas) => {
      this.listamarca = marcas
        .filter((item) => item.ESTADO === 1)
        .sort((a, b) => a.NOMBRE.localeCompare(b.NOMBRE));
    });
  }
  getEstado() {
    this.llenarcomboServices.getEstado().subscribe((estado) => {
      this.listaestado = estado
        .filter((item) => item.ESTADO === 1)
        .sort((a, b) => a.NOMBRE.localeCompare(b.NOMBRE));
    });
  }
  getUbicacion() {
    this.llenarcomboServices.getUbicacion().subscribe((ubicacion) => {
      this.listaubicacion = ubicacion
        .filter((item) => item.ESTADO === 1)
        .sort((a, b) => a.NOMBRE.localeCompare(b.NOMBRE));
    });
  }

  getEstadoProveedor() {
    this.manteniemintoService
      .getEstadoProveedor()
      .subscribe((estadoproveedor) => {
        this.listaestadoproveedor = estadoproveedor
          .filter((item) => item.ESTADO === 1)
          .sort((a, b) => a.NOMBRE.localeCompare(b.NOMBRE));
      });
  }

  getEstadoCliente() {
    this.manteniemintoService.getEstadoCliente().subscribe((estadocliente) => {
      this.listaestadocliente = estadocliente
        .filter((item) => item.ESTADO === 1)
        .sort((a, b) => a.NOMBRE.localeCompare(b.NOMBRE));
    });
  }

  getEquipo() {
    this.llenarcomboServices.getEquipo().subscribe((equipos) => {
      this.listaequipos = equipos;
    });
  }
  getAnalizador() {
    this.llenarcomboServices.getAnalizador().subscribe((analizador) => {
      this.listacategorias = analizador;
    });
  }
  getEquipocomplementario() {
    this.manteniemintoService
      .getEquipoComplementario()
      .subscribe((equipocomplementario) => {
        this.listaequipocomplementario = equipocomplementario
          .filter((item) => item.estado == true)
          .sort((a, b) => a.equipo.localeCompare(b.equipo));
      });
  }

  crearEquipo() {
    if (this.equipoForm.invalid) {
      this.equipoForm.markAllAsTouched();
      return;
    }

    console.log(this.listaseleccioandoequipo);

    if (this.listaseleccioandoequipo) {
      const data = {
        ...this.equipoForm.value,
        id: this.listaseleccioandoequipo.id,
      };
      console.log(`=======>`, data);
      this.manteniemintoService.getUpdateEquipo(data).subscribe((resp: any) => {
        const { msg } = resp;

        Swal.fire('Actualizado', `${msg}`, 'success');
        this.getEquipo();
        this.equipoForm.disable();
        this.btnVal = 'Editar';
        this.listaseleccioandoequipo = undefined;
      });

      this.router.navigateByUrl('/dashboard/equipos');
      this.getEquipo();
    } else {
      console.log(`=======>`, this.equipoForm.value);
      Swal.fire({
        allowOutsideClick: false,

        icon: 'info',
        text: 'Espere por favor ...',
      });

      Swal.showLoading(null);
      this.manteniemintoService.getCrearEquipo(this.equipoForm.value).subscribe(
        (resp: any) => {
          const { msg } = resp;
          Swal.fire({
            icon: 'success',

            titleText: `${msg}`,
            timer: 1500,
          });

          // this.router.navigateByUrl('/dashboard/equipos');
          this.equipoForm.reset(/* {
        NOMBRE: '',
        modeloId '',
      } */);
          this.getEquipo();
          this.router.navigateByUrl('/dashboard/equipos');
        },
        (err) => {
          console.log('error', err.error.msg);
          Swal.fire({
            icon: 'error',
            title: 'Error al autenticar',
            text: err.error.msg,
          });
        },
      );
    }
  }

  borrarequipo(equipo: Equipo) {
    console.log(equipo);
    Swal.fire({
      title: 'Eliminar equipo?',
      text: `Esta seguro que desea eliminar el equipo  ${equipo.NOMBRE}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.manteniemintoService
          .getDeleteEquipo(equipo)
          .subscribe((resp: any) => {
            const { msg } = resp;

            Swal.fire({
              title: 'Equipo eliminado!',
              text: `${msg}`,
              icon: 'success',
            });
          });
      }
    });
  }
  borrarAccesorio(i: number) {
    this.ACC.removeAt(i);
  }
  onreset() {
    this.equipoForm.reset();
    this.ACC.reset();
    this.equipoForm.enable();
    this.ACC.clear();
    this.router.navigateByUrl('/dashboard/equipo/Nuevo');
  }
  cambioEstado() {
    if (this.btnVal != 'Editar') {
      console.log(this.btnVal);
      this.crearEquipo();
    }
    this.equipoForm.enable();
    this.btnVal = 'Guardar';
  }
}
