import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, finalize, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { cargaGetlistdoctor } from '../interfaces/carga-getllistdoctor.interface';
import { cargarPruebas } from '../interfaces/cargarPruebas.interface';
import { cargarOrigin } from '../interfaces/cargarOrigin.interface';
import { cargaEnvase } from '../interfaces/cargaEnvase.interface';
import { ListaOrdenes } from '../interfaces/ordenes.interface';
import { cargaProvincia } from '../interfaces/cargaProvincia.interface';
import { Pruebas } from '../interfaces/cargaReportPruebas.interfaces';
import { OrdenMicro } from '../interfaces/micro-form.interface';
import { cargarImpresora } from '../interfaces/impresora.interface';
import { PanelPruebas } from '../interfaces/cargarPanelPruebas.interface';
import { Marca, Marcas } from '../interfaces/cargaMarca.interface';
import { Cliente, Clientes } from '../interfaces/cargaCliente.interface';
import { Modalidad, Modalidades } from '../interfaces/cargaModalidad.interface';
import { Modelo, Modelos } from '../interfaces/cargaModelo.interface';
import { Ubicacion, Ubicaciones } from '../interfaces/cargaUbicacioninterface';
import { Estado, Estados } from '../interfaces/cargaEstado.interface';
import {
  Equipo,
  Equipos,
  Resultado,
} from '../interfaces/carga-equipos.interfaces';
import { Tipocontrato } from '../interfaces/cargarTipocontrato.interface';
import { TipoContrato } from '../interfaces/cargarcontrato.interface';
import { AccCoti, Accesorio } from '../interfaces/cargaAccCotizacion.interface';
import { Correo, Correos } from '../interfaces/cargaCorreo.interface';
import {
  Producto,
  Productos,
} from '../interfaces/carga-productosImport.interfaces';
import { producerUpdateValueVersion } from '@angular/core/primitives/signals';
import {
  Analizador,
  Analizadors,
} from '../interfaces/cargaAnalizador.interface';

const baseUrl = environment.url;
@Injectable({
  providedIn: 'root',
})
export class LlenarCombosService {
  userToken!: string;
  constructor(private http: HttpClient) {}
  public isLoading = false;
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token, responseType: 'blob' as 'json' },
    };
  }

  getDoctor() {
    return this.http
      .get<cargaGetlistdoctor>(`${baseUrl}/api/doctor`, this.headers)
      .pipe(
        map((resp) =>
          resp.lista.map((resp) => ({
            ID: resp.ID,
            ValueCode: resp.ValueCode,
            Description: resp.Description,
            // ValueCode: resp.ValueCode,
            Status: resp.Status,
          })),
        ),
      );
  }

  getPruebas(IDENTIFICADOR: string) {
    return this.http
      .get<cargarPruebas>(
        `${baseUrl}/api/pacientes/${IDENTIFICADOR}`,
        this.headers,
      )
      .pipe(
        map((resp) =>
          resp.prueba.map((resp) => ({
            TestID: resp.TestID,
            TestName: resp.TestName,
          })),
        ),
      );
  }

  getProvincia() {
    return this.http
      .get<cargaProvincia>(`${baseUrl}/api/provincia`, this.headers)
      .pipe(
        map((resp) =>
          resp.provincia.map((resp) => ({
            descripcion: resp.descripcion,
            id: resp.id,
          })),
        ),
      );
  }

  getEnvase() {
    return this.http
      .get<cargaEnvase>(`${baseUrl}/api/tipotubo`, this.headers)
      .pipe(
        map((resp) =>
          resp.envase.map((resp) => ({
            descripcion: resp.descripcion,
            id: resp.id,
            codigo: resp.codigo,
          })),
        ),
      );
  }
  searchTrack({ q }): Observable<any> {
    return this.http.get<cargarPruebas>(
      `${baseUrl}/api/pruebas/${q}`,
      this.headers,
    );
  }

  pruebasMicro({ q }): Observable<any> {
    return this.http.get<cargarPruebas>(
      `${baseUrl}/api/pruebaMicro/${q}`,
      this.headers,
    );
  }

  pruebasreactivos({ q }): Observable<any> {
    return this.http
      .get<Productos>(`${baseUrl}/api/productos/${q}`, this.headers)
      .pipe(
        map(({ productos }) => productos),
        finalize(() => (this.isLoading = false)),
      );
  }

  getStocks(termino:string) {
    return this.http.get<any>(`${baseUrl}/api/stock/buscar/${termino}`, this.headers)
    .pipe(
      map(({ resultados }) => resultados),
      finalize(() => (this.isLoading = false)),
    );
  }

  getOrigin() {
    return this.http
      .get<cargarOrigin>(`${baseUrl}/api/orden`, this.headers)
      .pipe(
        map((resp) =>
          resp.orden.map((resp) => ({
            Id: resp.Id,

            DemographicName: resp.DemographicName,
            ValueCode: resp.ValueCode,
            Description: resp.Description,
          })),
        ),
      );
  }

  getService() {
    return this.http
      .get<cargarOrigin>(`${baseUrl}/api/servicio`, this.headers)
      .pipe(
        map((resp) =>
          resp.orden.map((resp) => ({
            Id: resp.Id,

            ValueCode: resp.ValueCode,
            Description: resp.Description,
            DemographicName: resp.DemographicName,
          })),
        ),
      );
  }
  getOperador() {
    return this.http
      .get<cargarOrigin>(`${baseUrl}/api/operador`, this.headers)
      .pipe(
        map((resp) =>
          resp.orden.map((resp) => ({
            Id: resp.Id,

            ValueCode: resp.ValueCode,
            Description: resp.Description,
            DemographicName: resp.DemographicName,
          })),
        ),
      );
  }

  getFlebotomista() {
    return this.http
      .get<cargarOrigin>(`${baseUrl}/api/flebotomista`, this.headers)
      .pipe(
        map((resp) =>
          resp.orden.map((resp) => ({
            Id: resp.Id,

            ValueCode: resp.ValueCode,
            Description: resp.Description,
            DemographicName: resp.DemographicName,
          })),
        ),
      );
  }

  getCentrosalud() {
    return this.http
      .get<cargarOrigin>(`${baseUrl}/api/centrosalud`, this.headers)
      .pipe(
        map((resp) =>
          resp.orden.map((resp) => ({
            Id: resp.Id,

            ValueCode: resp.ValueCode,
            Description: resp.Description,
            DemographicName: resp.DemographicName,
          })),
        ),
      );
  }

  getSala() {
    return this.http
      .get<cargarOrigin>(`${baseUrl}/api/sala`, this.headers)
      .pipe(
        map((resp) =>
          resp.orden.map((resp) => ({
            Id: resp.Id,

            ValueCode: resp.ValueCode,
            Description: resp.Description,
            DemographicName: resp.DemographicName,
          })),
        ),
      );
  }
  getImpresora() {
    return this.http
      .get<cargarImpresora>(`${baseUrl}/api/impresora`, this.headers)
      .pipe(
        map((resp) =>
          resp.impresora.map((resp) => ({ NOMBRE: resp.NOMBRE, id: resp.id })),
        ),
      );
  }

  getPanelPruebas() {
    return this.http
      .get<PanelPruebas>(`${baseUrl}/api/panelPruebas`, this.headers)
      .pipe(
        map((resp) =>
          resp.pruebas.map((resp) => ({
            CODIGO: resp.CODIGO,
            NOMBRE: resp.NOMBRE,
            id: resp.id,
            CATEGORIA: resp.CATEGORIA,
            ESTADO: resp.ESTADO,
          })),
        ),
      );
  }
  getpacientes(NOMBRE: string, cedula: string) {
    return this.http
      .get<ListaOrdenes>(
        `${baseUrl}/api/pacientes/?IDENTIFICADOR=${NOMBRE}&CEDULA=${cedula}`,
        this.headers,
      )

      .pipe(delay(1500));
  }

  getRegistropacientes(FECHADESDE: string, FECHAHASTA: string) {
    return this.http.get<ListaOrdenes>(
      `${baseUrl}/api/report?FECHADESDE=${FECHADESDE}&FECHAHASTA=${FECHAHASTA}`,
      this.headers,
    );
  }
  getMicro(FECHADESDE: string, FECHAHASTA: string) {
    return this.http.get<OrdenMicro>(
      `${baseUrl}/api/reportMicro?FECHADESDE=${FECHADESDE}&FECHAHASTA=${FECHAHASTA}`,
      this.headers,
    );
  }
  getQC(formData: FormData): Observable<Blob> {
    const headers = new HttpHeaders({ 'x-token': this.token });
    return this.http.post(`${baseUrl}/qc/upload`, formData, {
      headers: headers,
      responseType: 'blob',
    });
  }

  getReportProd(FECHADESDE: string, FECHAHASTA: string) {
    return this.http.get<Pruebas>(
      `${baseUrl}/api/reportTotal?FECHADESDE=${FECHADESDE}&FECHAHASTA=${FECHAHASTA}`,
      this.headers,
    );
  }

  getMarca(): Observable<Marca[]> {
    return this.http
      .get<Marcas>(`${baseUrl}/api/marca`, this.headers)
      .pipe(map(({ marcas }) => marcas));
  }

  getCorreo(): Observable<Correo[]> {
    return this.http
      .get<Correos>(`${baseUrl}/api/correos`, this.headers)
      .pipe(map(({ correo }) => correo));
  }
  /*  getCliente(): Observable<Cliente[]> {
    return this.http
      .get<Clientes>(`${baseUrl}/api/cliente`, this.headers)
      .pipe(map(({ clientes }) => clientes));
  } */
  getEstado(): Observable<Estado[]> {
    return this.http
      .get<Estados>(`${baseUrl}/api/estado`, this.headers)
      .pipe(map(({ estado }) => estado));
  }

  getUbicacion(): Observable<Ubicacion[]> {
    return this.http
      .get<Ubicaciones>(`${baseUrl}/api/ubicacion`, this.headers)
      .pipe(map(({ ubicacion }) => ubicacion));
  }
  getEquipo(): Observable<Equipo[]> {
    return this.http
      .get<Equipos>(`${baseUrl}/api/equipos`, this.headers)
      .pipe(map(({ equipos }) => equipos));
  }
  /*   getTotalEquipo():Observable<Resultado[]> {
    return this.http
      .get<Equipos>(`${baseUrl}/api/equipos`, this.headers)
      .pipe(map(({  resultados }) =>resultados ));
  } */
  getModelo(): Observable<Modelo[]> {
    return this.http
      .get<Modelos>(`${baseUrl}/api/modelo`, this.headers)
      .pipe(map(({ modelo }) => modelo));
  }

  getAnalizador(): Observable<Analizador[]> {
    return this.http
      .get<Analizadors>(`${baseUrl}/api/analizador`, this.headers)
      .pipe(map(({ analizador }) => analizador));
  }

  getCliente(): Observable<Cliente[]> {
    return this.http
      .get<Clientes>(`${baseUrl}/api/cliente`, this.headers)
      .pipe(map(({ clientes }) => clientes));
  }

  getModalidad(): Observable<Modalidad[]> {
    return this.http
      .get<Modalidades>(`${baseUrl}/api/modalidad`, this.headers)
      .pipe(map(({ modalidad }) => modalidad));
  }
  getContrato(): Observable<TipoContrato[]> {
    return this.http
      .get<TipoContrato>(`${baseUrl}/api/tipocontrato`, this.headers)
      .pipe(map(({ tipocontrato }) => tipocontrato));
  }
  getParticipacion(): Observable<Tipocontrato[]> {
    return this.http
      .get<Tipocontrato>(`${baseUrl}/api/tipocontrato`, this.headers)
      .pipe(map(({ tipocontrato }) => tipocontrato));
  }

  getAccCotizacion(): Observable<Accesorio[]> {
    return this.http
      .get<AccCoti>(`${baseUrl}/api/accesoriocotizacion`, this.headers)
      .pipe(map(({ accesorio }) => accesorio));
  }
}
