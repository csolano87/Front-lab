import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Analizador } from 'src/app/interfaces/cargaAnalizador.interface';
import { Modelo } from 'src/app/interfaces/cargaModelo.interface';
import { AnalizadorID } from 'src/app/interfaces/cargarByIDAnalizador.interface';
import { EstadoproveedorID } from 'src/app/interfaces/cargarByIdEstadoProveedor.interface';
import { Estadoproveedor } from 'src/app/interfaces/cargarEstadoProveedores.interface';
import { Marca } from 'src/app/models/marca.module';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-estadofinancieroproveedor',

  templateUrl: './estadofinancieroproveedor.component.html',
  styleUrl: './estadofinancieroproveedor.component.css',
})
export class EstadofinancieroproveedorComponent {
  cargando = false;
  public page!: number;
  listaestadoproveedor: Estadoproveedor[] = [];

  categoriaTemp: Analizador[] = [];
  estadoproveedorTemp:Estadoproveedor[] = [];
  listamodelo: Modelo[] = [];
  estadoproveedorForm!: FormGroup;
  listaseleccionadoanalizador: AnalizadorID;
  listaseleccionadoestadoproveedor: EstadoproveedorID;
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
      this.estadoproveedorForm?.get('NOMBRE')!.invalid &&
      this.estadoproveedorForm?.get('NOMBRE')!.touched
    );
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) =>
      this.crearEstadoproveedores(id),
    );

    //this.getCategoria();
    this.getEstadoProveedor();
  }

  crearFormulario() {
    this.estadoproveedorForm = this.fb.group({
      NOMBRE: ['', [Validators.required]],
    });
  }
  crearEstadoproveedores(id: string) {
    console.log(id);
    if (id === 'Nuevo') {
      this.estadoproveedorForm.reset();
      this.estadoproveedorForm.enable();
      this.btnVal = 'Guardar';
      return;
    }
    this.btnVal = 'Editar';
    this.estadoproveedorForm.disable();

    this.manteniemintoService.getByIDEstadoProveedor(id).subscribe((estadoproveedorId) => {
      !estadoproveedorId
        ? this.router.navigateByUrl(
            '/dashboard/estadofinancieroproveedor/Nuevo',
          )
        : console.log(estadoproveedorId);

      const { NOMBRE } = estadoproveedorId;

      this.estadoproveedorForm.patchValue({
        NOMBRE,
      });
      this.listaseleccionadoestadoproveedor = estadoproveedorId;
    });
  }
  crearEstadoproveedor() {
    if (this.estadoproveedorForm.invalid) {
      this.estadoproveedorForm.markAllAsTouched();
      return;
    }
    console.log(this.listaseleccionadoestadoproveedor);
    if (this.listaseleccionadoestadoproveedor) {
      const data = {
        ...this.estadoproveedorForm.value,
        id: this.listaseleccionadoestadoproveedor.id,
      };

      this.manteniemintoService
        .getUpdateEstadoProveedor(data)
        .subscribe((resp: any) => {
          const { msg } = resp;
          Swal.fire('Actualizado', `${msg}`, 'success');
          $('#modal-info').modal('hide');
          this.getEstadoProveedor();
          this.estadoproveedorForm.disable();
          this.estadoproveedorForm.reset();
          this.btnVal = 'Editar';
          this.listaseleccionadoestadoproveedor = undefined;
          this.router.navigateByUrl('/dashboard/estadofinancieroproveedor/Nuevo');
        });
    } else {
      Swal.fire({
        allowOutsideClick: false,

        icon: 'info',
        text: 'Espere por favor ...',
      });
      Swal.showLoading(null);
      this.manteniemintoService
        .getCrearEstadoProveedor(this.estadoproveedorForm.value)
        .subscribe(
          (resp: any) => {
            this.getEstadoProveedor();
            const { msg } = resp;
            Swal.fire({
              icon: 'success',

              titleText: `${msg}`,
              timer: 1500,
            });

            this.estadoproveedorForm.reset({
              NOMBRE: '',
            });
            $('#modal-info').modal('hide');
            this.router.navigateByUrl(
              '/dashboard/estadofinancieroproveedor/Nuevo',
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


  getEstadoProveedor() {
    this.manteniemintoService
      .getEstadoProveedor()
      .subscribe((estadoproveedor) => {
        console.log(estadoproveedor);

        this.listaestadoproveedor = estadoproveedor.sort((a,b)=>a.NOMBRE.localeCompare( b.NOMBRE));
      });
  }
  borrarproveedor(proveedor: Estadoproveedor) {
    console.log(proveedor);

    Swal.fire({
      title: 'Eliminar analizador?',
      text: `Esta seguro que desea eliminar el estado de proveedor  ${proveedor.NOMBRE}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.manteniemintoService
          .getDeleteEstadoProveedor(proveedor.id)
          .subscribe((resp: any) => {
            const { msg } = resp;
            this.getEstadoProveedor();
            Swal.fire({
              title: 'Estado proveedor  eliminado!',
              text: `${msg}`,
              icon: 'success',
            });
          });
      }
    });
  }

  cambioEstado() {
    if (this.btnVal != 'Editar') {
      this.crearEstadoproveedor();
      this.estadoproveedorForm.enable();
      // this.panelform.reset();
    }
    this.estadoproveedorForm.enable();
    this.btnVal = 'Guardar';
  }

  reset() {
    this.router.navigateByUrl('/dashboard/estadofinancieroproveedor/Nuevo');
    this.listaseleccionadoestadoproveedor = undefined;
  }

  buscar(termino: string) {
    console.log(termino);
    if (termino.length === 0 || termino === '') {
      this.listaestadoproveedor = this.estadoproveedorTemp;
    } else {
      this.manteniemintoService
        .buscarFiltroEstadoProveedor(termino)
        .subscribe((estadoproveedor) => {
          this.listaestadoproveedor = estadoproveedor;
        });
    }
  }
}
