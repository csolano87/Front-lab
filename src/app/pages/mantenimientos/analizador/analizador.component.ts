import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Analizador } from 'src/app/interfaces/cargaAnalizador.interface';
import { Modelo } from 'src/app/interfaces/cargaModelo.interface';
import { AnalizadorID } from 'src/app/interfaces/cargarByIDAnalizador.interface';
import { Marca, Marcas } from 'src/app/interfaces/cargaMarca.interface';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
import { Categoria } from 'src/app/interfaces/cargaIngresoordenes.interface';
import * as XLSX from 'xlsx';

import { saveAs } from 'file-saver';
declare var $: any;
@Component({
  selector: 'app-analizador',

  templateUrl: './analizador.component.html',
  styleUrl: './analizador.component.css',
})
export class AnalizadorComponent {
  cargando = false;
  public page!: number;
  listacategorias: Marca[] = [];
  listacategoria: Analizador[] = [];
  categoriaTemp: Analizador[] = [];
  listamodelo: Modelo[] = [];
  listamarca: Marca[] = [];
  analizadorForm!: FormGroup;
  listaseleccionadoanalizador: AnalizadorID;

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

  get modeloId() {
    return (
      this.analizadorForm?.get('modeloId')!.invalid &&
      this.analizadorForm?.get('modeloId')!.touched
    );
  }

  get marcaId() {
    return (
      this.analizadorForm?.get('marcaId')!.invalid &&
      this.analizadorForm?.get('marcaId')!.touched
    );
  }
  get NOMBRE() {
    return (
      this.analizadorForm?.get('NOMBRE')!.invalid &&
      this.analizadorForm?.get('NOMBRE')!.touched
    );
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) =>
      this.CrearAnalizadores(id),
    );

    this.getCategoria();
    this.getAnalizador();
    this.getMarca();
  }

  crearFormulario() {
    this.analizadorForm = this.fb.group({
      modeloId: ['', [Validators.required]],
      NOMBRE: ['', [Validators.required]],
      marcaId:['', [Validators.required]],
      CARACTERISTICA:['']
    });
  }
  CrearAnalizadores(id: string) {
    console.log(id);
    if (id === 'Nuevo') {
      this.analizadorForm.reset();
      this.analizadorForm.enable();
      this.btnVal = 'Guardar';
      return;
    }
    this.btnVal = 'Editar';
    this.analizadorForm.disable();

    this.manteniemintoService.getIdAnalizador(id).subscribe((analizadorId) => {
      !analizadorId
        ? this.router.navigateByUrl('/dashboard/analizador/Nuevo')
        : console.log(analizadorId);

      const {
        NOMBRE,
        CARACTERISTICA,
        modeloId,
        marcaId,
      } = analizadorId;

      this.analizadorForm.patchValue({
        NOMBRE,
        CARACTERISTICA,
        marcaId,
        modeloId,
      });
      this.listaseleccionadoanalizador = analizadorId;
    });
  }

  onselectMarca(event: Event) {
    
    const selectedId = (event.target as HTMLSelectElement).value;
    console.log(selectedId);

    const selectedmarca = this.listamarca.find(
      (m) => m.id === Number(selectedId),
   

    );
    console.log(selectedmarca);
  //  this.equipoForm.get('marcaId')?.setValue(this.selectedmarca.marca.id);
    
  this.listacategorias = selectedmarca
  ? selectedmarca.modelo.sort((a,b)=>a.NOMBRE.localeCompare( b.NOMBRE))
  : [];

    console.log(this.listacategoria);
  } 
  crearAnalizador() {
    if (this.analizadorForm.invalid) {
      this.analizadorForm.markAllAsTouched();
      return;
    }
    console.log(this.listaseleccionadoanalizador);
    if (this.listaseleccionadoanalizador) {
      const data = {
        ...this.analizadorForm.value,
        id: this.listaseleccionadoanalizador.id,
      };

      this.manteniemintoService
        .UpdateAnalizador(data)
        .subscribe((resp: any) => {
          const { msg } = resp;
          Swal.fire('Actualizado', `${msg}`, 'success');
          $('#modal-info').modal('hide');
          this.getAnalizador();
          this.analizadorForm.disable();
          this.analizadorForm.reset();
          this.btnVal = 'Editar';
          this.listaseleccionadoanalizador = undefined;
          this.router.navigateByUrl('/dashboard/analizador/Nuevo');
        });
    } else {
      Swal.fire({
        allowOutsideClick: false,

        icon: 'info',
        text: 'Espere por favor ...',
      });
      Swal.showLoading(null);
      this.manteniemintoService
        .getCrearAnalizador(this.analizadorForm.value)
        .subscribe(
          (resp: any) => {
            this.getCategoria();
            this.getAnalizador();
            const { msg } = resp;
            Swal.fire({
              icon: 'success',

              titleText: `${msg}`,
              timer: 1500,
            });

            this.analizadorForm.reset({
              modeloId: '',
              CARACTERISTICA:'',
              marcaId:'',
              NOMBRE: '',
            });
            $('#modal-info').modal('hide');
            this.router.navigateByUrl('/dashboard/analizador/Nuevo');
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
  descargaExcel(){
    const dataToExport = this.listacategoria.map((orden) => {
      return {
        'categoria': orden.NOMBRE,
        'marca': '',
        'Modelo': orden.modelo.NOMBRE,
       

      };
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ordenes');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, 'ordenes.xlsx');
  }
  getCategoria() {
    this.llenarcomboServices.getModelo().subscribe((modelo) => {
      console.log(modelo);

      this.listamodelo = modelo.sort((a,b)=>a.NOMBRE.localeCompare( b.NOMBRE));
    });
  }

  getMarca() {
    this.llenarcomboServices.getMarca().subscribe((marcas) => {
      console.log(marcas);

      this.listamarca = marcas.filter(item=>item.ESTADO ===1).sort((a,b)=>a.NOMBRE.localeCompare( b.NOMBRE));
    });
  }


  getAnalizador() {
    this.llenarcomboServices.getAnalizador().subscribe((analizador) => {
      console.log(analizador);

      this.listacategoria = analizador.sort((a,b)=>a.NOMBRE.localeCompare( b.NOMBRE));
    });
  }
  borrarCategoria(categoria: Analizador) {
    console.log(categoria);

    Swal.fire({
      title: 'Eliminar analizador?',
      text: `Esta seguro que desea eliminar la analizador  ${categoria.NOMBRE}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.manteniemintoService
          .getDeleteAnalizador(categoria.id)
          .subscribe((resp: any) => {
            const { msg } = resp;
            this.getAnalizador();
            Swal.fire({
              title: 'Analizador eliminado!',
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
      this.crearAnalizador();
      this.analizadorForm.enable();
      // this.panelform.reset();
    }
    this.analizadorForm.enable();
    this.btnVal = 'Guardar';
  }

  reset() {
    this.router.navigateByUrl('/dashboard/analizador/Nuevo');
    this.listaseleccionadoanalizador = undefined;
  }

  buscar(termino: string) {
    console.log(termino);
    if (termino.length === 0 || termino === '') {
      this.listacategoria = this.categoriaTemp;
    } else {
      this.manteniemintoService
        .getfiltroAnalizador(termino)
        .subscribe((analizador) => {
          this.listacategoria = analizador;
        });
    }
  }
}
