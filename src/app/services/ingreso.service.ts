import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Pacientes } from '../models/pacientes.module';
import { Medicos } from '../models/medico.module';
import { OrdenID } from '../interfaces/carga-IngresordenId.interface';
const baseUrl = environment.url;
@Injectable({
  providedIn: 'root',
})
export class IngresoService {
  constructor(private http: HttpClient) {}
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
  getValidacionOrden(data: OrdenID) {
    return this.http.put(
      `${baseUrl}/api/validacion/${data.id}`,
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
}
