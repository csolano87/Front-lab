import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bodega } from 'src/app/interfaces/cargaBodega.interface';
import { Marca } from 'src/app/interfaces/cargaMarca.interface';
import {
  BodegaById,
  BodegaID,
} from 'src/app/interfaces/cargarByIdBodegainterface';

import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-bodega',

  templateUrl: './bodega.component.html',
  styleUrl: './bodega.component.css',
})
export class BodegaComponent implements OnInit {
  public btnVal = 'Guardar';
  bodegaForm!: FormGroup;
  cargando: false;
  listadoselecioandobodega: BodegaID;
  listabodega: Bodega[] = [];
  bodegaTemp: Marca[] = [];
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
      this.bodegaForm?.get('NOMBRE')!.invalid &&
      this.bodegaForm?.get('NOMBRE')!.touched
    );
  }
 
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.crearbodegas(id));

    this.getBodega();
  }

  crearbodegas(id: string) {
    console.log(id);
    if (id === 'Nuevo') {
      this.bodegaForm.reset();
      this.bodegaForm.enable();
      this.btnVal = 'Guardar';
      return;
    }
    this.btnVal = 'Editar';
    this.bodegaForm.disable();
    this.manteniemintoService.getByIDBodega(id).subscribe((bodegaId) => {
      console.log(bodegaId);
      !bodegaId
        ? this.router.navigateByUrl('/dashboard/bodega/Nuevo')
        : console.log(bodegaId);
      const { NOMBRE } = bodegaId;

      this.bodegaForm.patchValue({
        NOMBRE,
      })
      this.listadoselecioandobodega = bodegaId; 
    });
  }

  getBodega() {
    this.manteniemintoService.getBodega().subscribe((bodega) => {
      console.log(bodega);

      this.listabodega = bodega;
    });
  }

  crearFormulario() {
    this.bodegaForm = this.fb.group({
      NOMBRE: ['', [Validators.required]],
      // color: ['', [Validators.required]],
    });
  }

  crearbodega() {
    if (this.bodegaForm.invalid) {
      this.bodegaForm.markAllAsTouched();
      return;
    }
    console.log(this.bodegaForm.value);

    if (this.listadoselecioandobodega) {
      const data = {
        ...this.bodegaForm.value,
        id: this.listadoselecioandobodega.id,
      };
      this.manteniemintoService.getUpdateBodega(data).subscribe((resp: any) => {
        const { msg } = resp;
        Swal.fire('Actualizado', `${msg}`, 'success');
        $('#modal-info').modal('hide');
        this.getBodega();
        this.bodegaForm.disable();
        this.bodegaForm.reset();
        this.btnVal = 'Editar';
        this.listadoselecioandobodega = undefined;
        this.router.navigateByUrl('/dashboard/bodega/Nuevo');
      });
    } else {
      Swal.fire({
        allowOutsideClick: false,

        icon: 'info',
        text: 'Espere por favor ...',
      });
      Swal.showLoading(null);
      this.manteniemintoService.getCrearBodega(this.bodegaForm.value).subscribe(
        (resp: any) => {
          const { msg } = resp;
          this.getBodega();
          Swal.fire({
            icon: 'success',

            titleText: `${msg}`,
            timer: 1500,
          });
          $('#modal-info').modal('hide');
          this.bodegaForm.reset({
            NOMBRE: '',
            CATEGORIA: '',
            color: '',
          });
          this.router.navigateByUrl('/dashboard/bodega/Nuevo');
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
  borrarbodega(bodega: Bodega) {
    console.log(bodega);
    Swal.fire({
      title: 'Eliminar bodega?',
      text: `Esta seguro que desea eliminar el bodega  ${bodega.NOMBRE}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.manteniemintoService
          .getDeleteBdodega(bodega.id)
          .subscribe((resp: any) => {
            const { msg } = resp;
            this.getBodega();
            Swal.fire({
              title: 'bodega eliminado!',
              text: `${msg}`,
              icon: 'success',
            });
          });
      }
    });
  }

  cambiobodega() {
    if (this.btnVal != 'Editar') {
      this.crearbodega();
      this.bodegaForm.enable();
      // this.panelform.reset();
    }
    this.bodegaForm.enable();
    this.btnVal = 'Guardar';
  }

  reset() {
    this.router.navigateByUrl('/dashboard/bodega/Nuevo');
    this.listadoselecioandobodega = undefined;
  }

  buscar(termino: string) {
    console.log(termino);
    /* if (termino.length === 0 || termino === '') {
      this.listabodega = this.bodegaTemp;
    } else {
      this.manteniemintoService
        .buscarFiltrobodega(termino)
        .subscribe((bodega) => {
          this.listabodega = bodega;
        });
    }*/
  }
}
