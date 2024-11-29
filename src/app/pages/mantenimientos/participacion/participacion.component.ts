import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Marca } from 'src/app/interfaces/cargaMarca.interface';
import { TipoContrato } from 'src/app/interfaces/cargarcontrato.interface';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-participacion',
 
  templateUrl: './participacion.component.html',
  styleUrl: './participacion.component.css'
})
export class ParticipacionComponent {
  contratoForm!: FormGroup;
  cargando: false;
  listacontrato: TipoContrato[] = [];
  public page!: number;
  constructor(
    private manteniemintoService: MantenimientosService,
    private fb: FormBuilder,
    private router: Router,
    private llenarcomboService: LlenarCombosService,
    private activatedRoute: ActivatedRoute,) { this.crearFormulario(); }
  get NOMBRE() {
    return (
      this.contratoForm?.get('NOMBRE')!.invalid &&
      this.contratoForm?.get('NOMBRE')!.touched
    );
  }

  get CATEGORIA() {
    return (
      this.contratoForm?.get('CATEGORIA')!.invalid &&
      this.contratoForm?.get('CATEGORIA')!.touched
    );
  }
  ngOnInit(): void {

    this.getContrato();
  }
  getContrato() {
    this.llenarcomboService.getContrato().subscribe((tipocontrato) => {
      console.log(tipocontrato);

      this.listacontrato = tipocontrato;
    });
  }

  crearFormulario() {
    this.contratoForm = this.fb.group(
      {

        NOMBRE: ['', [Validators.required]],

      },

    );
  }


  crearContrato() {

    if (this.contratoForm.invalid) {
      this.contratoForm.markAllAsTouched();
      return;
    }
    console.log(this.contratoForm.value);

    Swal.fire({
      allowOutsideClick: false,

      icon: 'info',
      text: 'Espere por favor ...',
    });
    Swal.showLoading(null);
    this.manteniemintoService.getCrearContrato(this.contratoForm.value).subscribe(
      (resp: any) => {

        this.getContrato();
        const { msg } = resp
        Swal.fire({
          icon: 'success',

          titleText: `${msg}`,
          timer: 1500
        });
        $('#modal-info').modal('hide');
        this.contratoForm.reset({

          NOMBRE: '',
          //  CATEGORIA: '',

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
  borrarMarca() {

  }
}
