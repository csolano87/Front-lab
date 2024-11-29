import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Correo } from 'src/app/interfaces/cargaCorreo.interface';
import { Marca } from 'src/app/interfaces/cargaMarca.interface';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-correos',

  templateUrl: './correos.component.html',
  styleUrl: './correos.component.css',
})
export class CorreosComponent implements OnInit {
  correoForm!: FormGroup;
  cargando: false;
  listacorreo: Correo[] = [];
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
  get nombres() {
    return (
      this.correoForm?.get('nombres')!.invalid &&
      this.correoForm?.get('nombres')!.touched
    );
  }

  get apellidos() {
    return (
      this.correoForm?.get('apellidos')!.invalid &&
      this.correoForm?.get('apellidos')!.touched
    );
  }

  get correo() {
    return (
      this.correoForm?.get('correo')!.invalid &&
      this.correoForm?.get('correo')!.touched
    );
  }

  get empresa() {
    return (
      this.correoForm?.get('empresa')!.invalid &&
      this.correoForm?.get('empresa')!.touched
    );
  }
  ngOnInit(): void {
    this.getCorreo();
  }
  getCorreo() {
    this.llenarcomboService.getCorreo().subscribe((correo) => {
      console.log(correo);

      this.listacorreo = correo;
    });
  }

  crearFormulario() {
    this.correoForm = this.fb.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      empresa: ['', [Validators.required]],
    });
  }

  crearCorreo() {
    if (this.correoForm.invalid) {
      this.correoForm.markAllAsTouched();
      return;
    }
    console.log(this.correoForm.value);

    Swal.fire({
      allowOutsideClick: false,

      icon: 'info',
      text: 'Espere por favor ...',
    });
    Swal.showLoading(null);
    this.manteniemintoService.getCrearCorreo(this.correoForm.value).subscribe(
      (resp: any) => {
        this.getCorreo();
        const { msg } = resp;
        Swal.fire({
          icon: 'success',

          titleText: `${msg}`,
          timer: 1500,
        });
        $('#modal-info').modal('hide');
        this.correoForm.reset({
          nombres: '',
          apellidos: '',
          empresa: '',
          correo: '',
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
  borrarcorreo() {}
}
