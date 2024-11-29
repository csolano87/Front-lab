import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterFrom } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment.prod';
import { Proceso } from '../interfaces/cargaProceso.interface';
import { catchError, map, mapTo, Observable, of, tap } from 'rxjs';
import { Equipo, Equipos } from '../interfaces/carga-equipos.interfaces';
import { ProcesoS } from '../models/proceao.module';

const baseUrl = environment.url;
@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { 'x-token': this.token } };
  }
  get header() {
    return { headers: { 'x-token': this.token }, responseType: 'blob' };
  }
  constructor(private http: HttpClient) {}

  getRegistro(formData: RegisterFrom) {
    return this.http.post(`${baseUrl}/api/procesos`, formData, this.headers);
  }

  actualizarRegistro(data: any) {
    return this.http.put(
      `${baseUrl}/api/procesos/${data.id}`,
      data,
      this.headers,
    );
  }

  getByIdRegistro(id: string) {
    return this.http
      .get(`${baseUrl}/api/procesos/procesoById/${id}`, this.headers)
      .pipe(map((resp: { ok: boolean; proceso: Proceso }) => resp.proceso));
  }

  getRequerimientoEquipo(data:FormData) {
    return this.http
      .post(`${baseUrl}/api/requerimientoequipo`, data,this.headers)
     
  }



  getReportePdf(proceso: Proceso) {
    return this.http.get(`${baseUrl}/api/procesos-pdf/${proceso.id}`, {
      headers: this.headers.headers,
      responseType: 'blob',
    });
  }

  getEnvioCorreo(formData: FormData) {
    return this.http.post(`${baseUrl}/api/mail/upload`, formData, this.headers);
  }
  getConsultaRegistro() {
    return this.http.get<Proceso>(`${baseUrl}/api/procesos`, this.headers);
  }

  buscarFiltroProceso(termino: string) {
    return this.http
      .get<any[]>(`${baseUrl}/api/procesos/${termino}`, this.headers)
      .pipe(
        map((resp: any) => {
          return resp.resultados;
        }),
      );
  }
  getAprobarProceso(data: any) {
    return this.http.post(
      `${baseUrl}/api/aprobacionproceso/`,
      data,
      this.headers,
    );
  }

  getEstadoProceso(data: any) {
    return this.http.post(
      `${baseUrl}/api/estadoproceso`,
      data,
      this.headers,
    );
  }

  getUpdateEstadoProceso(data: ProcesoS) {
    return this.http.put(
      `${baseUrl}/api/estadoproceso/${data.PROCESO_ID}`,
      data,
      this.headers,
    );
  }
  getUpdateProceso(data: any) {
    return this.http.put(
      `${baseUrl}/api/aprobacionproceso/${data.id}`,
      data,
      this.headers,
    );
  }


  getEquipos(): Observable<Equipo[]> {
    return this.http
      .get<Equipos>(`${baseUrl}/api/equipos`, this.headers)
      .pipe(map(({ equipos }) => equipos));
  }
}
