import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
//import { format } from 'url';
import { cargarMuestras } from '../interfaces/cargarMuestra.interface';
import { Forma } from '../interfaces/forma-tubo.interface';
const baseUrl = environment.url;
@Injectable({
  providedIn: 'root',
})
export class MuestrasService {
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

  guardarMuestras(forma: Forma) {
    return this.http.post(`${baseUrl}/api/tubos?/`, forma, this.headers);
  }

  guardarMuestrasRechazo(forma: Forma) {
    return this.http.put(`${baseUrl}/api/tubos?/`, forma, this.headers);
  }

  guardarMuestrasUpdate(forma: Forma) {
    return this.http.put(`${baseUrl}/api/tubos?/`, forma, this.headers);
  }

  getMuestras() {
    return this.http.get<cargarMuestras>(`${baseUrl}/tubos/todo`, this.headers);
    /* 
  .pipe(
    map((resp:any)=>{
    
      return resp.data
    
    })
  ) */
  }

  buscarfiltrosMuestras(
    fechaToma: string,
    fechafin: string,
    tipoTubo: string,
    estado: string,
  ) {
    return this.http.get<cargarMuestras>(
      `${baseUrl}/api/tubos/?fechaToma=${fechaToma}&fechafin=${fechafin}&tipoTubo=${tipoTubo}&estado=${estado}`,
      this.headers,
    );
    /* 
  .pipe(
    map((resp:any)=>{
    
      return muestras
    
    })
  ) */
  }
}
