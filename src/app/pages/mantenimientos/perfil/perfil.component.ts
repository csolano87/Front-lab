/* import { error } from '@angular/compiler/src/util'; */
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Rolee } from 'src/app/models/rol.module';
import { Usuario } from 'src/app/models/usuario.module';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
/* import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service'; */
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  listaroles: Rolee[] = [];
  usuarioseleccionado!: Usuario;

  perfilform!: UntypedFormGroup;

  get doctorNoValido() {
    return (
      this.perfilform?.get('doctor')!.invalid &&
      this.perfilform?.get('doctor')!.touched
    );
  }

  get usuarioNoValido() {
    return (
      this.perfilform?.get('usuario')!.invalid &&
      this.perfilform?.get('usuario')!.touched
    );
  }

  get rolNoValido() {
    return (
      this.perfilform?.get('rol')!.invalid &&
      this.perfilform?.get('rol')!.touched
    );
  }

  get passwordNoValido() {
    return (
      this.perfilform?.get('password')!.invalid &&
      this.perfilform?.get('password')!.touched
    );
  }
  get password2NoValido() {
    const password = this.perfilform.get('password').value;
    const password2 = this.perfilform.get('password2').value;

    return password === password2 ? false : true;
    //  return this.registerform?.get('password')!.invalid && this.registerform?.get('password')!.touched
  }

  constructor(
    private router: Router,
    private listarol: RolService,
    private fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private usuarioservices: UsuarioService,
  ) {
    this.cargarDataAlFormulario();
  }

  ngOnInit(): void {
    this.perfilform = this.fb.group({
      doctor: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      rol: ['', [Validators.required]],
    });

    this.listarol.getRol().subscribe((resp) => {
      // console.log(resp)
      this.listaroles = resp;
    });

    this.activatedRoute.params.subscribe(({ id }) => this.cargarUsuario(id));

    this.listarol.getRol().subscribe((resp) => {
      console.log(resp);
      this.listaroles = resp;
    });
  }

  cargarDataAlFormulario() {}

  cargarUsuario(id: string) {
    console.log('usario a editar', id);

    this.usuarioservices
      .GetUsuarioById(id)
      .pipe(delay(100))
      .subscribe({
        next: (user) => {
          const { id, doctor, usuario, rol } = user;

          this.usuarioseleccionado = user;
          console.log('selec', this.usuarioseleccionado);
          this.perfilform.setValue({ doctor, usuario, rol });
        },
        error: () => {
          return this.router.navigateByUrl(`/dashboard/usuarios`);
        },
      });
  }
  updateUsuario() {
    if (this.perfilform.invalid) {
      this.perfilform.markAllAsTouched();
      return;
    }

    const { usuario } = this.perfilform.value;
    const data = { ...this.perfilform.value, id: this.usuarioseleccionado.id };
    console.log(data);
    this.usuarioservices.actualizarPerfil(data).subscribe((resp: any) => {
      const { msg } = resp;
      Swal.fire('Actualizado', `${msg} `, 'success');
      this.router.navigateByUrl('/dashboard/usuarios');
      console.log(resp);
    });
  }
}
