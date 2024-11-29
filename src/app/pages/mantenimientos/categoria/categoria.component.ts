import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Marca } from 'src/app/interfaces/cargaMarca.interface';
import { Modelo } from 'src/app/interfaces/cargaModelo.interface';
import {
  ModeloByID,
  ModeloID,
} from 'src/app/interfaces/cargarByIdModelo.interface';
import { cargaEstado } from 'src/app/models/cargarEstado.module';
//import { Marca } from 'src/app/models/marca.module';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css',
})
export class CategoriaComponent implements OnInit {
  cargando = false;
  public btnVal = 'Guardar';
  listadoselecioandomodelo: ModeloID;
  public page!: number;
  listacategoria: Modelo[] = [];
  modeloTemp: Modelo[] = [];
  listamarca: Marca[] = [];
  categoriaForm!: FormGroup;
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
      this.categoriaForm?.get('NOMBRE')!.invalid &&
      this.categoriaForm?.get('NOMBRE')!.touched
    );
  }

  get marcaId() {
    return (
      this.categoriaForm?.get('marcaId')!.invalid &&
      this.categoriaForm?.get('marcaId')!.touched
    );
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.crearModelo(id));

    this.getCategoria();
    this.getMarca();
  }
  getMarca() {
    this.llenarcomboServices.getMarca().subscribe((marcas) => {
      console.log(marcas);
      this.listamarca = marcas.filter((item) => item.ESTADO === 1).sort((a,b)=>a.NOMBRE.localeCompare( b.NOMBRE));

      //this.listamarca = marcas;
    });
  }
  crearModelo(id: string) {
    console.log(id);
    if (id === 'Nuevo') {
      this.categoriaForm.reset();
      this.categoriaForm.enable();
      this.btnVal = 'Guardar';
      return;
    }
    this.btnVal = 'Editar';
    this.categoriaForm.disable();
    this.manteniemintoService.getByIDModelo(id).subscribe((modeloId) => {
      console.log(modeloId);
      !modeloId
        ? this.router.navigateByUrl('/dashboard/categoria')
        : console.log(modeloId);
      const { NOMBRE, marcaId } = modeloId;

      this.categoriaForm.patchValue({
        NOMBRE,
        marcaId,
      });
      this.listadoselecioandomodelo = modeloId;
    });
  }
  crearFormulario() {
    this.categoriaForm = this.fb.group({
      NOMBRE: ['', [Validators.required]],
      marcaId: ['', [Validators.required]],
    });
  }

  crearCategoria() {
    if (this.categoriaForm.invalid) {
      this.categoriaForm.markAllAsTouched();
      return;
    }
    console.log(this.categoriaForm.value);

    if (this.listadoselecioandomodelo) {
      const data = {
        ...this.categoriaForm.value,
        id: this.listadoselecioandomodelo.id,
      };

      this.manteniemintoService.getUpdateModelo(data).subscribe((resp: any) => {
        const { msg } = resp;
        Swal.fire('Actualizado', `${msg}`, 'success');
        $('#modal-info').modal('hide');
        this.getCategoria();
        this.categoriaForm.disable();
        this.categoriaForm.reset();
        this.btnVal = 'Editar';
        this.listadoselecioandomodelo = undefined;
        this.router.navigateByUrl('/dashboard/categoria/Nuevo');
      });
    } else {
      Swal.fire({
        allowOutsideClick: false,

        icon: 'info',
        text: 'Espere por favor ...',
      });
      Swal.showLoading(null);
      this.manteniemintoService
        .getCrearcategoria(this.categoriaForm.value)
        .subscribe(
          (resp: any) => {
            this.getCategoria();
            const { msg } = resp;
            Swal.fire({
              icon: 'success',

              titleText: `${msg}`,
              timer: 1500,
            });
            $('#modal-info').modal('hide');
            this.categoriaForm.reset({
              NOMBRE: '',

              marcaId: '',
            });
            //this.router.navigateByUrl('/dashboard/usuarios');
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
  getCategoria() {
    this.llenarcomboServices.getModelo().subscribe((modelo) => {
      console.log(modelo);

      this.listacategoria = modelo.sort((a,b)=>a.NOMBRE.localeCompare( b.NOMBRE));
    });
  }
  borrarCategoria(categoria: Modelo) {
    console.log(categoria);

    Swal.fire({
      title: 'Eliminar categoria?',
      text: `Esta seguro que desea eliminar la categoria  ${categoria.NOMBRE}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.manteniemintoService
          .getDeletecategoria(categoria.id)
          .subscribe((resp: any) => {
            const { msg } = resp;
            this.getCategoria();
            Swal.fire({
              title: 'Categoria eliminada!',
              text: `${msg}`,
              icon: 'success',
            });
          });
      }
    });
  }

  editarCategoria(categoria: Modelo) {
    console.log(categoria);
  }

  cambioEstado() {
    if (this.btnVal != 'Editar') {
      this.crearCategoria();
      this.categoriaForm.enable();
      // this.panelform.reset();
    }
    this.categoriaForm.enable();
    this.btnVal = 'Guardar';
  }

  reset() {
    this.router.navigateByUrl('/dashboard/categoria/Nuevo');
    this.listadoselecioandomodelo = undefined;
  }

  buscar(termino: string) {
    console.log(termino);
    if (termino.length === 0 || termino === '') {
      this.listacategoria = this.modeloTemp;
    } else {
      this.manteniemintoService
        .buscarFiltroModelo(termino)
        .subscribe((modelo) => {
          this.listacategoria = modelo;
        });
    }
  }
}
/*   */
