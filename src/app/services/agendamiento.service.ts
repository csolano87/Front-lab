import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { cargaAs400 } from '../interfaces/carga_as400.interface';
import { OrdenCalendar } from '../models/as400.module';
import { map, tap } from 'rxjs';
import { AgendarForm } from '../interfaces/agendar-form.interface';

import { cargarExternaCalendar } from '../interfaces/carga-agendamiento.interface';
import { Socket } from 'ngx-socket-io';
import { cargarOrdenesExterna } from '../interfaces/carga-ordenesSais.interface';
import { OrdenExt } from '../models/ordenext.module';
const baseUrl = environment.url;
@Injectable({
  providedIn: 'root',
})
export class AgendamientoService {
  userToken!: string;
  socketsStatus = false;
  constructor(
    private http: HttpClient,
    private socket: Socket,
  ) {
    this.checkStatus();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { 'x-token': this.token } };
  }

  ordenAs400(orden: string) {
    return this.http
      .get(`${baseUrl}/api/agendamiento/${orden}`, this.headers)
      .pipe(map((resp: { ok: boolean; data: OrdenCalendar }) => resp.data));
  }
  GuardarOrden(formData: AgendarForm) {
    return this.http.post(
      `${baseUrl}/api/ordenexterna`,
      formData,
      this.headers,
    );
  }
  updateExterna(data: AgendarForm) {
    return this.http.put(
      `${baseUrl}/api/ordenexterna/${data.id}`,
      data,
      this.headers,
    );
  }

  cargarOrdenexterna() {
    return this.http.get<cargarExternaCalendar>(
      `${baseUrl}/api/ordenexterna`,
      this.headers,
    );
  }
  cargarOrdenesExterna() {
    return this.http.get<cargaAs400>(
      `${baseUrl}/api/ordenexterna/todos`,
      this.headers,
    );
  }

  actualizarOrden(data: OrdenCalendar) {
    return this.http.put(`${baseUrl}/api/ordenexterna/${data.id}`, data);
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketsStatus = true;
    });
    this.socket.on('disconnect', () => {
      console.log('Disconectado del servidor');
      this.socketsStatus = false;
    });
  }

  emit(evento: string, payload: any, callback?: Function) {
    console.log(`*****EMITIENDO****`, evento);
    console.log(`*****EMITIENDO****`, payload);
    console.log(`*****EMITIENDO****`, callback);
    this.socket.emit(evento, payload, callback);
  }
  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  buscarFiltroOrdenes(
    IDENTIFICADOR: string,
   
    SALA: string,
    FECHA: string,
  ) {
    return this.http
      .get<cargaAs400>(
        `${baseUrl}/api/ordenexterna/filtros/externa/?IDENTIFICADOR=${IDENTIFICADOR}&SALA=${SALA}&FECHA=${FECHA}`,
        this.headers,
      )
      .pipe(
        map((resp: any) => {
          return resp.resultados;
        }),
      );
  }
  getOrdenByID(id: string) {
    return this.http
      .get(`${baseUrl}/api/ordenexterna/${id}`, this.headers)
      .pipe(map((resp: { ok: boolean; ordenes: OrdenExt }) => resp.ordenes));
  }
  eliminarOrden(orden: OrdenCalendar) {
    return this.http.delete(
      `${baseUrl}/api/ordenexterna/${orden.id}`,
      this.headers,
    );
  }
}
