import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Analizador } from 'src/app/interfaces/cargaAnalizador.interface';
import { Modelo } from 'src/app/interfaces/cargaModelo.interface';
import { AnalizadorID } from 'src/app/interfaces/cargarByIDAnalizador.interface';
import { EstadoclienteID } from 'src/app/interfaces/cargarByIdEstadoClilenteinterface';
import { EstadoproveedorID } from 'src/app/interfaces/cargarByIdEstadoProveedor.interface';
import { Estadocliente } from 'src/app/interfaces/cargarEstadoCliente.interface';
import { Estadoproveedor } from 'src/app/interfaces/cargarEstadoProveedores.interface';
import { Marca } from 'src/app/models/marca.module';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-estadofinancierocliente',

  templateUrl: './estadofinancierocliente.component.html',
  styleUrl: './estadofinancierocliente.component.css',
})
export class EstadofinancieroclienteComponent {
  cargando = false;
  public page!: number;
  listaestadocliente: Estadocliente[] = [];

  categoriaTemp: Analizador[] = [];
  estadoclienteTemp: Estadocliente[] = [];
  listamodelo: Modelo[] = [];
  estadoclienteForm!: FormGroup;

  listaseleccionadoestadocliente: EstadoclienteID;
  btnVal = 'Guardar';
  constructor(
    private llenarcomboServices: LlenarCombosService,
    private manteniemintoService: MantenimientosService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {
    this.crearFormulario();
  }

  get NOMBRE() {
    return (
      this.estadoclienteForm?.get('NOMBRE')!.invalid &&
      this.estadoclienteForm?.get('NOMBRE')!.touched
    );
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) =>
      this.crearEstadoclientes(id),
    );

    //this.getCategoria();
    this.getEstadoCliente();
  }

  crearFormulario() {
    this.estadoclienteForm = this.fb.group({
      NOMBRE: ['', [Validators.required]],
    });
  }
  crearEstadoclientes(id: string) {
    console.log(id);
    if (id === 'Nuevo') {
      this.estadoclienteForm.reset();
      this.estadoclienteForm.enable();
      this.btnVal = 'Guardar';
      return;
    }
    this.btnVal = 'Editar';
    this.estadoclienteForm.disable();

    this.manteniemintoService
      .getByIDEstadoCliente(id)
      .subscribe((estadoclienteId) => {
        !estadoclienteId
          ? this.router.navigateByUrl(
              '/dashboard/estadofinancierocliente/Nuevo',
            )
          : console.log(estadoclienteId);

        const { NOMBRE } = estadoclienteId;

        this.estadoclienteForm.patchValue({
          NOMBRE,
        });
        this.listaseleccionadoestadocliente = estadoclienteId;
      });
  }
  crearEstadocliente() {
    if (this.estadoclienteForm.invalid) {
      this.estadoclienteForm.markAllAsTouched();
      return;
    }
    console.log(this.listaseleccionadoestadocliente);
    if (this.listaseleccionadoestadocliente) {
      const data = {
        ...this.estadoclienteForm.value,
        id: this.listaseleccionadoestadocliente.id,
      };

      this.manteniemintoService
        .getUpdateEstadoCliente(data)
        .subscribe((resp: any) => {
          const { msg } = resp;
          Swal.fire('Actualizado', `${msg}`, 'success');
          $('#modal-info').modal('hide');
          this.getEstadoCliente();
          this.estadoclienteForm.disable();
          this.estadoclienteForm.reset();
          this.btnVal = 'Editar';
          this.listaseleccionadoestadocliente = undefined;
          this.router.navigateByUrl('/dashboard/estadofinancierocliente/Nuevo');
        });
    } else {
      Swal.fire({
        allowOutsideClick: false,

        icon: 'info',
        text: 'Espere por favor ...',
      });
      Swal.showLoading(null);
      this.manteniemintoService
        .getCrearEstadoCliente(this.estadoclienteForm.value)
        .subscribe(
          (resp: any) => {
            this.getEstadoCliente();
            const { msg } = resp;
            Swal.fire({
              icon: 'success',

              titleText: `${msg}`,
              timer: 1500,
            });

            this.estadoclienteForm.reset({
              NOMBRE: '',
            });
            $('#modal-info').modal('hide');
            this.router.navigateByUrl(
              '/dashboard/estadofinancierocliente/Nuevo',
            );
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

  getEstadoCliente() {
    this.manteniemintoService.getEstadoCliente().subscribe((estadocliente) => {
      console.log(estadocliente);

      this.listaestadocliente = estadocliente.sort((a,b)=>a.NOMBRE.localeCompare( b.NOMBRE));
    });
  }
  borrarcliente(cliente: Estadocliente) {
    console.log(cliente);

    Swal.fire({
      title: 'Eliminar analizador?',
      text: `Esta seguro que desea eliminar el estado de cliente  ${cliente.NOMBRE}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.manteniemintoService
          .getDeleteEstadoCliente(cliente.id)
          .subscribe((resp: any) => {
            const { msg } = resp;
            this.getEstadoCliente();
            Swal.fire({
              title: 'Estado cliente  eliminado!',
              text: `${msg}`,
              icon: 'success',
            });
          });
      }
    });
  }

  cambioEstado() {
    if (this.btnVal != 'Editar') {
      this.crearEstadocliente();
      this.estadoclienteForm.enable();
      // this.panelform.reset();
    }
    this.estadoclienteForm.enable();
    this.btnVal = 'Guardar';
  }

  reset() {
    this.router.navigateByUrl('/dashboard/estadofinancierocliente/Nuevo');
    this.listaseleccionadoestadocliente = undefined;
  }

  buscar(termino: string) {
    console.log(termino);
    if (termino.length === 0 || termino === '') {
      this.listaestadocliente = this.estadoclienteTemp;
    } else {
      this.manteniemintoService
        .buscarFiltroEstadoCliente(termino)
        .subscribe((estadocliente) => {
          this.listaestadocliente = estadocliente;
        });
    }
  }
}
