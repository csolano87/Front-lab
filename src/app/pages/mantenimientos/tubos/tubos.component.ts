import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Listaprueba } from 'src/app/interfaces/cargaListapruebas.interface';
import { Tipomuestra } from 'src/app/interfaces/cargarTipomuestras.interface';
import { Envase } from 'src/app/interfaces/cargatubosinterface';

import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-tubos',

  templateUrl: './tubos.component.html',
  styleUrl: './tubos.component.css'
})
export class TubosComponent implements OnInit{
  tuboform!: UntypedFormGroup;
  cargando: boolean = false;
  listatipomuestra: Tipomuestra[] = [];
  listatubo:Envase[]=[];
  page;
  constructor(
    private manteniemintoService: MantenimientosService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.crearFormulario();
  }
  get codigo() {
    return (
      this.tuboform?.get('codigo')!.invalid &&
      this.tuboform?.get('codigo')!.touched
    );
  }
  get nombre() {
    return (
      this.tuboform?.get('nombre')!.invalid &&
      this.tuboform?.get('nombre')!.touched
    );
  }
  get abreviatura() {
    return (
      this.tuboform?.get('abreviatura')!.invalid &&
      this.tuboform?.get('abreviatura')!.touched
    );
  }
get tipomuestraId(){
  return (
    this.tuboform?.get('tipomuestraId')!.invalid &&
    this.tuboform?.get('tipomuestraId')!.touched
  );
}
 get volumenneto() {
    return (
      this.tuboform?.get('volumenneto')!.invalid &&
      this.tuboform?.get('volumenneto')!.touched
    );
  }

  get volumenprueba() {
    return (
      this.tuboform?.get('volumenprueba')!.invalid &&
      this.tuboform?.get('volumenprueba')!.touched
    );
  } 
  ngOnInit(): void {
    this.getTipomuestra();
    this.getTubo();
  }

  crearFormulario() {
    this.tuboform = this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      tipomuestraId: ['', [Validators.required]],
      abreviatura:  ['', [Validators.required]],
      volumenneto: ['', [Validators.required]],
      volumenprueba: ['', [Validators.required]], 
    });
  }

  getTipomuestra() {
    this.manteniemintoService.getTipomiuestra().subscribe((tipomuestra) => {
      console.log(tipomuestra);
      this.listatipomuestra = tipomuestra;
    });
  }


  getTubo() {
    this.manteniemintoService.getTubo().subscribe((envase) => {
      console.log(envase);
      this.listatubo = envase;
    });
  }
  crearPanel() {
    if (this.tuboform.invalid) {
      this.tuboform.markAllAsTouched();
      return;
    }
    console.log(this.tuboform.value);

    Swal.fire({
      allowOutsideClick: false,

      icon: 'info',
      text: 'Espere por favor ...',
    });
    Swal.showLoading(null);
    this.manteniemintoService
      .postTubo(this.tuboform.value)
      .subscribe(
        (resp: any) => {
          this.getTipomuestra();
          const { msg } = resp;
          Swal.fire({
            icon: 'success',

            titleText: `${msg}`,
            timer: 1500,
          });
          $('#modal-info').modal('hide');
          this.tuboform.reset({
            codigo: '',
            nombre: '',
            abreviatura: '',
            volumenneto: '',
            volumenprueba:'',
            tipomuestraId:'',
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

  borrartubo(tubo: Envase) {

    console.log(tubo);

    Swal.fire({
      title: 'Eliminar tubo?',
      text: `Esta seguro que desea eliminar tubo  ${tubo.descripcion}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eliminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.manteniemintoService
          .deleteTubo(tubo)
          .subscribe((resp: any) => {
            this.getTubo();
            const { msg } = resp;

            Swal.fire({
              title: 'Tubo eliminado!',
              text: `${msg}`,
              icon: 'success',
            });
          });
      }
    });
  }
}
