import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Paciente, Pacientes } from '../interfaces/cargarPaciente.interface';
import { Medico, Medicos } from '../interfaces/cargaMedico.interface';
const baseUrl = environment.url;
@Injectable({
  providedIn: 'root',
})
export class IngresordenesService {
  userToken!: string;
  constructor(private http: HttpClient) {}
  public isLoading = false;
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token },
    };
  }

  getPaciente():Observable<Paciente[]> {
    return this.http.get<Pacientes>(`${baseUrl}/api/paciente`, this.headers)
    .pipe(map(({pacientes})=>pacientes))
  }
  postPaciente() {
    return this.http.post(`${baseUrl}/api/paciente`, this.headers);
  }
  updatePaciente() {
    return this.http.put(`${baseUrl}/api/paciente`, this.headers);
  }

  getMedico():Observable<Medico[]> {
    return this.http.get<Medicos>(`${baseUrl}/api/medico`, this.headers)
    .pipe(map(({medicos})=>medicos))
  }

  postMedico() {
    return this.http.get(`${baseUrl}/api/medico`, this.headers);
  }

  updateMedico() {
    return this.http.get(`${baseUrl}/api/medico`, this.headers);
  }
}
