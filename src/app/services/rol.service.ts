import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { cargarRol } from '../interfaces/cargarRol.interface';
import { Impresora } from '../models/impresora.module';
import { cargarImpresora } from '../interfaces/impresora.interface';
const baseUrl = environment.url;
@Injectable({
  providedIn: 'root',
})
export class RolService {
  userToken!: string;
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { 'x-token': this.token } };
  }
  getRol() {
    return this.http
      .get<cargarRol>(`${baseUrl}/api/roles`, this.headers)
      .pipe(
        map((resp) => resp.rol.map((resp) => ({ rol: resp.rol, id: resp.id }))),
      );
  }
}
