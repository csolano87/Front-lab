import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { cargarOrdenes } from '../interfaces/carga-ordenes.interface';
import { environment } from 'src/environments/environment.prod';
import { map, tap } from 'rxjs';
import { Orden } from '../models/orden.module';
import { OrdenFrom } from '../interfaces/orden-form.interface';
import { OrdenCalendar } from '../interfaces/ordenCalendar.interface';
import { Sais } from '../models/sais.module';
const baseUrl = environment.url;
@Injectable({
  providedIn: 'root',
})
export class OrdenesService {
  userToken!: string;
  public orden: Orden;
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
  get id(): string {
    return this.orden.id || '';
  }

  GuardarOrden(formData: OrdenFrom) {
    return this.http.post(`${baseUrl}/api/ordenes`, formData, this.headers);
  }

  GuardarManualOrden(formData: OrdenFrom) {
    return this.http.post(
      `${baseUrl}/api/orden-manual`,
      formData,
      this.headers,
    );
  }

  EnviarOrden(data: Orden) {
    return this.http.put(
      `${baseUrl}/api/archivo/${data.id}`,
      data,
      this.headers,
    );
  }

  obtenerOrdenById(id: string) {
    return this.http
      .get(`${baseUrl}/api/ordenes/ordenes/${id}`, this.headers)
      .pipe(map((resp: { ok: boolean; orden: Orden }) => resp.orden));
  }
  cargarOrdenes() {
    return this.http.get<cargarOrdenes>(`${baseUrl}/api/ordenes`, this.headers);
  }

  actualizarOrden(orden: Orden) {
    return this.http.put(
      `${baseUrl}/api/ordenes/${orden.id}`,
      orden,
      this.headers,
    );
  }

  buscarFiltroOrdenes(
    IDENTIFICADOR: string,
    ESTADO: string,
    HIS,
    SALA: string,
    PRIORIDAD: string,
    APELLIDO: string,
  ) {
    return this.http
      .get<cargarOrdenes>(
        `${baseUrl}/api/ordenes/buscarordenes/?IDENTIFICADOR=${IDENTIFICADOR}&ESTADO=${ESTADO}&HIS=${HIS}&SALA=${SALA}&PRIORIDAD=${PRIORIDAD}&APELLIDO=${APELLIDO}`,
        this.headers,
      )
      .pipe(
        map((resp: any) => {
          return resp.resultados;
        }),
      );
  }

  eliminarOrden(orden: Orden) {
    return this.http.delete(`${baseUrl}/api/ordenes/${orden.id}`, this.headers);
  }
  getPdf(orden: Orden) {
    return this.http.get(`${baseUrl}/api/pdf/${orden.id}`, {
      responseType: 'blob',
    });
  }

  buscarOrdenHis(cedula: string) {
    return this.http
      .get(`${baseUrl}/api/ordenes/paciente/${cedula}`, this.headers)
      .pipe(map((resp: { ok: boolean; orden: Orden }) => resp.orden));
  }

  buscarOrderSais(CEDULA: string) {
    return this.http
      .get(`${baseUrl}/api/ordensais/${CEDULA}`, this.headers)
      .pipe(map((resp: { ok: boolean; orden: Orden }) => resp.orden));
  }
}
