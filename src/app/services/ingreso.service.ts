import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Pacientes } from '../models/pacientes.module';
import { Medicos } from '../models/medico.module';
import { IngresoordenesID, OrdenID } from '../interfaces/carga-IngresordenId.interface';
import { map, Observable } from 'rxjs';
import { Ingresoordenes, Ordene } from '../interfaces/cargaIngresoordenes.interface';
const baseUrl = environment.url;
@Injectable({
  providedIn: 'root',
})
export class IngresoService {
  constructor(private http: HttpClient) { }
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token, responseType: 'blob' as 'json' },
    };
  }

  getPostPaciente(formData: Pacientes) {
    return this.http.post(`${baseUrl}/api/paciente`, formData, this.headers);
  }

  getPostMedico(formData: Medicos) {
    return this.http.post(`${baseUrl}/api/medico`, formData, this.headers);
  }
  getValidacionOrden(id:number,data: OrdenID) {
    return this.http.put(
      `${baseUrl}/api/validacion/${id}`,
      data,
      this.headers,
    );
  }
  getValidarIngresoOrden(data: any) {
    return this.http.put(
      `${baseUrl}/api/ingresorden/validar/${data.id}`,
      data,
      this.headers,
    );
  }


  getFiltrosResultadosIngresoOrden(orden: string, identificacion: string, modeloId:string,fechaIn:string,fechaOut:string):Observable<Ordene[]> {
    return this.http.get<Ingresoordenes>(`${baseUrl}/api/ingresorden/filtros/ordenes?orden=${orden}&identificacion=${identificacion}&modeloId=${modeloId}&fechaIn=${fechaIn}&fechaOut=${fechaOut}`,

      this.headers,
    )
      .pipe(map(({ ordenes }) => ordenes))
  }

 /*  getFiltrosResultadosIngresoOrden(id):Observable<Ordene[]> {
    return this.http.get<Ingresoordenes>(`${baseUrl}/api/ingresorden/filtros/ordenes/${id}`,

      this.headers,
    )
      .pipe(map(({ ordenes }) => ordenes))
  } */
}
