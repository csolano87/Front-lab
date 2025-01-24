import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
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
import { OrdenID } from 'src/app/interfaces/carga-IngresordenId.interface';
declare var $: any;
@Component({
  selector: 'app-rangoreferencia',

  templateUrl: './rangoreferencia.component.html',
  styleUrl: './rangoreferencia.component.css',
})
export class RangoreferenciaComponent implements OnInit {
  rangosform!: FormGroup;
  listaseleecionadapruebas: Listapruebas;
  itemSeleccionadoUdpate: RangosID[] = [];
  listatipofisiologico: Tipofisiologico[] = [];
  listaunidad: Unidad[] = [];
  listaunidadedades: Unidadedad[] = [];
  listarangos: RangosID[] = [];
  cargando: boolean = false;
  btnVal = 'Guardar';
  rangoSeleccionadoId: number | null = null;
  pruebaSeleccionadoId: string | null = null;
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
    private router: Router,
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
    this.pruebaSeleccionadoId = id;
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

        !rangosId ? this.router.navigateByUrl('/dashboard/rangos')
          : console.log(rangosId)

        /*  const {rango}=rangosId  */


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

console.log(this.rangoSeleccionadoId)
  
    if (this.rangoSeleccionadoId !=null) {
      console.log(this.rangoSeleccionadoId)
      /*  const dataupdate = {
         id: this.rangoSeleccionadoId,
         ...this.rangosform
       } */

      this.mantenimientoService.getUpdateRangos(this.rangoSeleccionadoId, this.rangosform.value).subscribe((resp: any) => {
        const { msg } = resp;
        this.crearRangos(this.pruebaSeleccionadoId);
        this.rangoSeleccionadoId = null;
        this.rangosform.reset()
        Swal.fire({
          icon: 'success',

          title: `${msg}`,
          // showConfirmButton: false,
        });
        $('#modal-info').modal('hide');
      })
    } else {
      const data = {
        ...this.rangosform.value,
        panelpruebasId: this.listaseleecionadapruebas.id,
      };
      this.mantenimientoService.getCargarangosreferencia(data).subscribe(
        (resp: any) => {
          const { msg } = resp;
          this.rangoSeleccionadoId = null;
          this.rangosform.reset()
          this.crearRangos(this.pruebaSeleccionadoId);

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


  }

  cargarRangoSeleccionado(item: RangosID) {
    this.rangosform.disable()
    console.log(item);
    this.rangoSeleccionadoId = item.id;
    this.btnVal = 'Editar';

    const { rangos,

      edadinicial,

      edadfinal,

      comentario,
      tipofisiologicoId,
      unidadId,
      unidadedadId } = item;
    this.rangosform.setValue({
      rangos,
      edadinicial,

      edadfinal,

      comentario,
      tipofisiologicoId,
      unidadId,
      unidadedadId
    })


  }
  cambioestado() {
    if (this.btnVal != 'Editar') {
      this.crearRango();
    }
    this.rangosform.enable();
    this.btnVal = 'Guardar';
  }
  resetFormulario() {
    this.rangosform.reset();
    this.rangosform.enable()
  }
  borrarRango(item: RangosID) {
    const id = item.id;

    console.log(id);
    Swal.fire({
      title: 'Desactivar el rango ?',
      html: `Esta seguro de desactivar <strong> ${item.rangos}</strong>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Si desactivar ?',
    }).then((result) => {
      if (result.value) {
        this.mantenimientoService.getDeleteRangos(id).subscribe((resp: any) => {
          const { msg } = resp;

          Swal.fire(
            'Rango Desactivado',
            `${msg} `,
            'success',
          );
        });
      }
    });

  }
}
