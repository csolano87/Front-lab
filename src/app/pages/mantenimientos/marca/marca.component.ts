import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Marca } from 'src/app/interfaces/cargaMarca.interface';
import {
  MarcaByID,
  MarcaID,
} from 'src/app/interfaces/cargarByIdMarca.interface';
import { cargaEstado } from 'src/app/models/cargarEstado.module';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css'],
})
export class MarcaComponent implements OnInit {
  marcaForm!: FormGroup;
  cargando: false;
  listamarca: Marca[] = [];
  marcaTemp: Marca[] = [];
  listadoselecioandomarca: MarcaID;
  public btnVal = 'Guardar';
  public page!: number;
  constructor(
    private manteniemintoService: MantenimientosService,
    private fb: FormBuilder,
    private router: Router,
    private llenarcomboService: LlenarCombosService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.crearFormulario();
  }
  get NOMBRE() {
    return (
      this.marcaForm?.get('NOMBRE')!.invalid &&
      this.marcaForm?.get('NOMBRE')!.touched
    );
  }

  get CATEGORIA() {
    return (
      this.marcaForm?.get('CATEGORIA')!.invalid &&
      this.marcaForm?.get('CATEGORIA')!.touched
    );
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.crearMarcas(id));

    this.getMarca();
  }

  crearMarcas(id: string) {
    console.log(id);
    if (id === 'Nuevo') {
      this.marcaForm.reset();
      this.marcaForm.enable();
      this.btnVal = 'Guardar';
      return;
    }
    this.btnVal = 'Editar';
    this.marcaForm.disable();
    this.manteniemintoService.getByIDMarca(id).subscribe((marcaId) => {
      console.log(marcaId);
      !marcaId
        ? this.router.navigateByUrl('/dashboard/marca')
        : console.log(marcaId);
      const { NOMBRE } = marcaId;

      this.marcaForm.patchValue({
        NOMBRE,
      });
      this.listadoselecioandomarca = marcaId;
    });
  }
  getMarca() {
    this.llenarcomboService.getMarca().subscribe((marcas) => {
      console.log(marcas);

      this.listamarca = marcas.sort((a,b)=>a.NOMBRE.localeCompare( b.NOMBRE));
    });
  }

  crearFormulario() {
    this.marcaForm = this.fb.group({
      NOMBRE: ['', [Validators.required]],
    });
  }

  crearMarca() {
    if (this.marcaForm.invalid) {
      this.marcaForm.markAllAsTouched();
      return;
    }
    console.log(this.marcaForm.value);

    if (this.listadoselecioandomarca) {
      const data = {
        ...this.marcaForm.value,
        id: this.listadoselecioandomarca.id,
      };
      this.manteniemintoService
        .getUpdateMarca(data)
        .subscribe((resp: any) => {
          const { msg } = resp;
          Swal.fire('Actualizado', `${msg}`, 'success');
          $('#modal-info').modal('hide');
          this.getMarca();
          this.marcaForm.disable();
          this.marcaForm.reset();
          this.btnVal = 'Editar';
          this.listadoselecioandomarca=undefined;
          this.router.navigateByUrl('/dashboard/marca/Nuevo');


        });
    } else {
      Swal.fire({
        allowOutsideClick: false,

        icon: 'info',
        text: 'Espere por favor ...',
      });
      Swal.showLoading(null);
      //this.manteniemintoService.getCrearMarca(this.marcaForm.value)
      this.manteniemintoService.getCrearMarca(this.marcaForm.value).subscribe(
        (resp: any) => {
          this.getMarca();
          const { msg } = resp;
          Swal.fire({
            icon: 'success',

            titleText: `${msg}`,
            timer: 1500,
          });
          $('#modal-info').modal('hide');
          this.marcaForm.reset({
            equipo: '',
            //CATEGORIA: '',
          });
          this.router.navigateByUrl('/dashboard/marca/Nuevo');
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
  borrarMarca(marca: Marca) {
    console.log(marca);

    Swal.fire({
      title: 'Eliminar marca?',
      text: `Esta seguro que desea eliminar la marca  ${marca.NOMBRE}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.manteniemintoService
          .getdeleteMarca(marca.id)
          .subscribe((resp: any) => {
            const { msg } = resp;
            this.getMarca();
            Swal.fire({
              title: 'Marca eliminada!',
              text: `${msg}`,
              icon: 'success',
            });
          });
      }
    });
  }

  cambioEstado() {
    if (this.btnVal != 'Editar') {
      this.crearMarca();
      this.marcaForm.enable();
      // this.panelform.reset();
    }
    this.marcaForm.enable();
    this.btnVal = 'Guardar';
  }

  reset() {
    this.router.navigateByUrl('/dashboard/marca/Nuevo');
    this.listadoselecioandomarca=undefined;
  }

  buscar(termino: string) {
    console.log(termino);
    if (termino.length === 0 || termino === '') {
      this.listamarca = this.marcaTemp;
    } else {
      this.manteniemintoService
        .buscarFiltroMarca(termino)
        .subscribe((marcas) => {
          this.listamarca = marcas;
        });
    }
  }
}
