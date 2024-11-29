import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Lista } from 'src/app/models/doctor.module';
import { Rolee } from 'src/app/models/rol.module';
import { Usuario } from 'src/app/models/usuario.module';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements AfterViewInit {
  get doctorNoValido() {
    
    return (
      this.registerform?.get('doctor')!.invalid &&
          this.registerform?.get('doctor')!.touched
    );
  }

  get usuarioNoValido() {
    return (
      this.registerform?.get('usuario')!.invalid &&
      this.registerform?.get('usuario')!.touched
    );
  }
  get passwordNoValido() {
    return (
      this.registerform?.get('password')!.invalid &&
      this.registerform?.get('password')!.touched
    );
  }
  get password2NoValido() {
    const password = this.registerform?.get('password')!.value;
    const password2 = this.registerform?.get('password2')!.value;
    return password === password2 ? false : true;
  }

  get rolNoValido() {
    return (
      this.registerform?.get('rol')!.invalid &&
      this.registerform?.get('rol')!.touched
    );
  }

  registerform!: UntypedFormGroup;
  usuarios!: Usuario;
  listaroles: Rolee[] = [];
  listadoctor: Lista[] = [];
  constructor(
    private doctorservice: LlenarCombosService,
    private usuarioservices: UsuarioService,
    private listarol: RolService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.crearFormulario();

    this.cargarDataAlFormulario();
  }

  ngAfterViewInit(): void {
    /*  
      this.activatedRoute.params
      .subscribe(({id})=> this.cargarUsuario(id)); */

    this.listarol.getRol().subscribe((resp) => {
      console.log(resp);
      this.listaroles = resp;
    });

    this.doctorservice.getDoctor().subscribe((resp) => {
      this.listadoctor = resp;

      console.log('DOCTOR', this.listadoctor);
    });
  }

  cargarUsuario(id: string) {
    this.usuarioservices.GetUsuarioById(id).subscribe((user) => {
      const { doctor, usuario, codigo_doctor, password, rol, estado } = user;
      console.log(doctor, usuario, codigo_doctor, password, rol, estado);
      this.registerform.setValue({
        doctor,
        usuario,
        password,
        password2: password,
        rol,
      });
      this.usuarios = user;
    });
  }

  crearFormulario() {
    this.registerform = this.fb.group(
      {
        doctor: ['', [Validators.required]],
        usuario: ['', [Validators.required]],
        password: ['', [Validators.required]],
        password2: ['', [Validators.required]],
        rol: ['', [Validators.required]],
      },
      {
        //validators:this.validadores.passwordIguales('password','password2')
      },
    );
  }
  crearUsuario() {
    console.log(this.registerform.value);
    if (this.registerform.invalid) {
      this.registerform.markAllAsTouched();
      return;
    }
    Swal.fire({
      allowOutsideClick: false,

      icon: 'info',
      text: 'Espere por favor ...',
    });
    Swal.showLoading(null);
    this.usuarioservices.cargarUsuarios(this.registerform.value).subscribe(
      (resp) => {
        Swal.fire({
          icon: 'success',

          titleText: 'Se a completado con exito el registro de usuario',
        });
        this.registerform.reset({
          doctor: '',
          usuario: '',
          password: '',
          password2: '',
          rol: '',
        });
        this.router.navigateByUrl('/dashboard/usuarios');
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

  cargarDataAlFormulario() {}

  /*   actualizarpassword(usuario : Usuario){
console.log(usuario)

  } */
}
