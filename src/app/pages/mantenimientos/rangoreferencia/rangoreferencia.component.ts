import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
// { Listaprueba } from 'src/app/interfaces/cargaListapruebas.interface';
import { Listapruebas } from 'src/app/models/cargaIdPruebas.module';
import { Tipofisiologico } from 'src/app/interfaces/cargatipofisiologico.interface';
import {
  Unidadedad,
  Unidadedades,
} from 'src/app/interfaces/cargaunidadedad.interface';
import { Unidad } from 'src/app/interfaces/cargaUnidad.interface';
import { Rango } from 'src/app/interfaces/cargar-Rangosreferencia.interface';
import { RangosID } from 'src/app/interfaces/cargaReferenciaIdRangos.interface';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-rangoreferencia',

  templateUrl: './rangoreferencia.component.html',
  styleUrl: './rangoreferencia.component.css',
})
export class RangoreferenciaComponent implements OnInit {
  rangosform!: FormGroup;
  listaseleecionadapruebas: Listapruebas;
  listatipofisiologico: Tipofisiologico[] = [];
  listaunidad: Unidad[] = [];
  listaunidadedades: Unidadedad[] = [];
  listarangos: RangosID[] = [];

  get tipofisiologicoId() {
    return (
      this.rangosform?.get('tipofisiologicoId')!.invalid &&
      this.rangosform?.get('tipofisiologicoId')!.touched
    );
  }
  get rangos() {
    return (
      this.rangosform?.get('rangos')!.invalid &&
      this.rangosform?.get('rangos')!.touched
    );
  }

  get unidadId() {
    return (
      this.rangosform?.get('unidadId')!.invalid &&
      this.rangosform?.get('unidadId')!.touched
    );
  }
  get edadinicial() {
    return (
      this.rangosform?.get('edadinicial')!.invalid &&
      this.rangosform?.get('edadinicial')!.touched
    );
  }

  get edadfinal() {
    return (
      this.rangosform?.get('edadfinal')!.invalid &&
      this.rangosform?.get('edadfinal')!.touched
    );
  }
  get unidadedadId() {
    return (
      this.rangosform?.get('unidadedadId')!.invalid &&
      this.rangosform?.get('unidadedadId')!.touched
    );
  }

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private mantenimientoService: MantenimientosService,
  ) {
    this.crearFormulario();
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.crearRangos(id));
    this.getTipofisiologico();
    this.getUnidad();
    this.getUnidadedad();
    //   this.getRangoReferencia();
  }

  getTipofisiologico() {
    this.mantenimientoService
      .getTipofisiologico()
      .subscribe((tipofisiologico) => {
        console.log(tipofisiologico);
        this.listatipofisiologico = tipofisiologico;
      });
  }

  getUnidad() {
    this.mantenimientoService.getUnidad().subscribe((unidad) => {
      console.log(unidad);
      this.listaunidad = unidad;
    });
  }
  getUnidadedad() {
    this.mantenimientoService.getUnidadedad().subscribe((unidaedad) => {
      console.log(unidaedad);
      this.listaunidadedades = unidaedad;
    });
  }

  /*   getRangoReferencia() {
    this.mantenimientoService.getRangosreferencia().subscribe((rangos) => {
      console.log(rangos);
      this.listarangos = rangos;
    });
  } */
  crearFormulario() {
    this.rangosform = this.fb.group({
      //  panelpruebasId:['', [Validators.required]],
      tipofisiologicoId: ['', [Validators.required]],
      rangos: ['', [Validators.required]],
      unidadId: ['', [Validators.required]],
      edadinicial: ['', [Validators.required]],
      edadfinal: ['', [Validators.required]],
      unidadedadId: ['', [Validators.required]],
      comentario: [''],
    });
  }
  crearRangos(id: string) {
    if (id === 'Nuevo') {
      return;
    }

    this.mantenimientoService
      .getIdPanelPruebas(id)
      .subscribe((listapruebas) => {
        console.log(listapruebas);

        this.listaseleecionadapruebas = listapruebas;
      });
    this.mantenimientoService
      .getRangosIDreferencia(id)
      .subscribe((rangosId) => {
        console.log(rangosId);
        this.listarangos = rangosId;

       
      });
  }
  crearRango() {
    console.log(this.rangosform.value);
    if (this.rangosform.invalid) {
      return Object.values(this.rangosform.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
    const data = {
      ...this.rangosform.value,
      panelpruebasId: this.listaseleecionadapruebas.id,
    };

    this.mantenimientoService.getCargarangosreferencia(data).subscribe(
      (resp: any) => {
        const { msg } = resp;
        Swal.fire({
          icon: 'success',

          title: `${msg}`,
          // showConfirmButton: false,
        });
        $('#modal-info').modal('hide');

        // this.router.navigateByUrl('/dashboard/rangos');
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error ',
          text: err.error.msg,
        });
      },
    );
  }
  cambioEstado() {}

  borrarRango(rango: any) {}
}
