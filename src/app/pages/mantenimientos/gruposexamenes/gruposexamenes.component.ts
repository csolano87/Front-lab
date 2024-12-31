import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlobOptions } from 'buffer';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import { Listaprueba } from 'src/app/interfaces/cargaListapruebas.interface';
import { Tipogrupo } from 'src/app/interfaces/cargarTipogrupo.interface';
import Swal from 'sweetalert2';
import { Listaperfile } from 'src/app/interfaces/cargarGrupoExam.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaperfilesID } from 'src/app/interfaces/cargar-listaperfilesId.interface';
@Component({
  selector: 'app-gruposexamenes',

  templateUrl: './gruposexamenes.component.html',
  styleUrl: './gruposexamenes.component.css',
})
export class GruposexamenesComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private manteniemintoService: MantenimientosService,
    private activateroute: ActivatedRoute,
    private router: Router,
  ) {
    this.crearFormulario();
  }
  grupoform!: FormGroup;
  cargando: boolean = false;
  listapruebas: Listaprueba[] = [];
  listatipogrupo: Tipogrupo[] = [];
  listagrupoexam: Listaperfile[] = [];
  selectedProductIndex: number | null = null;
  pagesGrupo: number = 1;
  pagesPruebas;
  listaperfilId: ListaperfilesID;

  listadoseleccionadoperfil: ListaperfilesID;
  search: string = '';
  btnVal = 'Guardar';
  get pruebas() {
    return this.grupoform.get('pruebas') as FormArray;
  }
  get codigo() {
    return (
      this.grupoform?.get('codigo')!.touched &&
      this.grupoform?.get('codigo')!.invalid
    );
  }
  get nombre() {
    return (
      this.grupoform?.get('nombre')!.touched &&
      this.grupoform?.get('nombre')!.invalid
    );
  }

  ngOnInit(): void {
    this.getPruebas();
    this.getGrupo();
    //this.getTipoGrupo();
    this.activateroute.params.subscribe(({ id }) => this.crearGrupoID(id));
  }

  getGrupo() {
    this.manteniemintoService.getGrupo().subscribe((tipogrupo) => {
      console.log(tipogrupo);
      this.listatipogrupo = tipogrupo;
    });
  }

  crearFormulario() {
    this.grupoform = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      tipogrupoId: ['', [Validators.required]],
      pruebas: this.fb.array([]),
    });
  }

  getPruebas() {
    this.manteniemintoService.getPanelPruebas().subscribe((listapruebas) => {
      console.log(listapruebas);
      this.listapruebas = listapruebas;
    });
  }
  crearGrupoID(id: string) {
    console.log(id);
    if (id === 'Nuevo') {
      this.grupoform.enable();
      this.btnVal = 'Guardar';
      return;
    }
    this.btnVal = 'Editar';
    this.grupoform.disable();
    this.manteniemintoService
      .getGrupoPerfilesId(id)
      .subscribe((listaperfilesId) => {
        !listaperfilesId
          ? this.router.navigateByUrl('/dashboard/ordenes')
          : console.log(listaperfilesId);

        const { codigo, nombre, tipogrupo, itempruebas } = listaperfilesId;

        this.grupoform.patchValue({
          codigo,
          nombre,
          tipogrupoId: tipogrupo,
          itempruebas: itempruebas.map((item) =>
            this.pruebas.push(
              this.fb.group({
                pruebaId: item.panelprueba.id,
                codigo: item.panelprueba.CODIGO,
                nombre: item.panelprueba.NOMBRE,
              }),
            ),
          ),
        });

        this.listadoseleccionadoperfil = listaperfilesId;
      });
  }
  crearGrupo() {
    if (this.grupoform.invalid) {
      return Object.values(this.grupoform.controls).forEach((control) => {
        control.markAsTouched();
        console.log(control);
      });
    }
    if (this.listadoseleccionadoperfil) {
           const data ={
            id:this.listadoseleccionadoperfil.id,
              ...this.grupoform.value
           }


      this.manteniemintoService
      .getUpdatePerfiles(data)
      .subscribe((resp: any) => {
        const { msg } = resp;
        Swal.fire(
           'Actualizado',
           `${msg}`, 'success'
        );
        this.grupoform.disable();
        this.btnVal='Editar'
      });

    } else {
      this.manteniemintoService
        .getPerfiles(this.grupoform.value)
        .subscribe((resp: any) => {
          const { msg } = resp;
          Swal.fire({
            icon: 'success',
            text: `${msg}`,
          });
          this.router.navigateByUrl('dashboard/panelperfiles');

        });
    }
  }

  borrarPruebas() {}
  borrarequipo(termino: any) {}

  pruebaseleccionado(prueba: any) {
    console.log(prueba);
    const pruebasArray = this.grupoform.get('pruebas') as FormArray;
    console.log(pruebasArray.value);
    const pruebasExist = pruebasArray.value.find(
      (control) => control.codigo === prueba.CODIGO,
    );
    console.log(pruebasExist);

    if (!pruebasExist) {
      this.pruebas.push(
        this.fb.group({
          pruebaId: [prueba.id, [Validators.required]],
          codigo: [prueba.CODIGO, Validators.required],
          nombre: [prueba.NOMBRE, Validators.required],
        }),
      );
    }
  }

  borrarPrueba(i) {
    this.pruebas.removeAt(i);
  }
  onSubmit() {}

  cambioestado() {
    if (this.btnVal != 'Editar') {
      this.crearGrupo();
    }
    this.grupoform.enable();
    this.btnVal = 'Guardar';
  }

  onSearchExam(textSearch: string) {
    console.log(textSearch);
    this.search =textSearch;
  }
}
