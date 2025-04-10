import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
//import { environment } from 'src/environments/environment';

import { CargarUsuario } from '../interfaces/cargarUsuarios';
import { LoginFrom } from '../interfaces/login-form.interfaces';
import { RegisterFrom } from '../interfaces/register-form.interface';
import { List } from '../models/listagetlist.module';
import { Usuario } from '../models/usuario.module';
import { User, UsuarioID } from '../interfaces/carga-usuarioByID.interface';

const baseUrl = environment.url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  userToken!: string;
  public usuario: Usuario;
  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { 'x-token': this.token } };
  }
  get role(): number {

    console.log(this.usuario.roleId)
    return this.usuario.roleId;
  }
  get id(): string {
    return this.usuario.id || '';
  }
  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http
      .get(`${baseUrl}/api/auth/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        tap((resp: any) => {
          const {
            id,
            codigo_doctor,
            doctor,
            usuario,
            password,

            rol,
            USUARIO_ID,
            CREATEDBY,
            UPDATEDBY,
            DELETEDBY,
            estado,
            roleId,

            role

          } = resp.user;
          console.log(resp.user)
          this.usuario = new Usuario(
            id,
            codigo_doctor,
            doctor,
            usuario,
            password,

            rol,
            USUARIO_ID,
            CREATEDBY,
            UPDATEDBY,
            DELETEDBY,
            estado,
            roleId,
            role
          );
          localStorage.setItem('token', resp.token);
          return true;
        }),
        map((resp) => true),
        catchError((error) => of(false)),
      );
  }

  login(List: List) {
    return this.http.post(`${baseUrl}/api/auth/login`, List).pipe(
      tap((resp: any) => {

        localStorage.setItem('token', resp.token);
      }),
    );
  }

  cargarUsuarios(formData: RegisterFrom) {
    return this.http.post(`${baseUrl}/api/usuarios`, formData);
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('IMPRESORA');
this.usuario = null
    if ('caches' in window) {
      caches.keys().then(function (cacheNames) {
        cacheNames.forEach(function (cacheName) {
          caches.delete(cacheName);
        });
      });
    }
    this.router.navigateByUrl('/login');
  }

  GetUsuarios() {
    return this.http.get<CargarUsuario>(
      `${baseUrl}/api/usuarios`,
    
    );
  }
  GetUsuarioById(id: string) {
    return this.http
      .get<UsuarioID>(`${baseUrl}/api/usuarios/${id}`, this.headers)
      .pipe(map(({user}) => user));
     // .pipe(map((resp: { ok: boolean; user: Usuario }) => resp.user));
  }

  buscarFiltroUsuario(termino: string) {
    return this.http
      .get<
        any[]
      >(`${baseUrl}/api/usuarios/busquedausuario/${termino}`, this.headers)
      .pipe(
        map((resp: any) => {
          return resp.resultados;
        }),
      );
  }
  actualizarPerfil(usuario: Usuario) {
    return this.http.put(
      `${baseUrl}/api/usuarios/${usuario.id}`,
      usuario,
      this.headers,
    );
  }

  actualizarPassword(id: string, formData: RegisterFrom) {
    return this.http.put(
      `${baseUrl}/api/resetpassword/${id}`,
      formData,
      this.headers,
    );
  }

  eliminarUsuario(usuario: Usuario) {
    return this.http.delete(
      `${baseUrl}/api/usuarios/${usuario.id}`,
      this.headers,
    );
  }

  cambiarRole(usuario: Usuario) {
    return this.http.put(
      `${baseUrl}/api/usuarios/${usuario.id}`,
      usuario,
      this.headers,
    );
  }
}
