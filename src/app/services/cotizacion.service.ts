import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Cotizacion, Cotizacions } from '../interfaces/cargacotizacion.interface';
import { Observable, map } from 'rxjs';

const baseUrl=environment.url;
@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }


  get token():string{
    return localStorage.getItem('token') || '';
  }

  get headers(){

    return {headers:{'x-token':this.token}}
  }

  postCotizacion(formData:FormData){
    return this.http.post(`${baseUrl}/api/cotizacion`,formData,this.headers)
  }

  getCotizacion():Observable<Cotizacion[]>{
    return this.http.get<Cotizacions>(`${baseUrl}/api/cotizacion`,this.headers)
    .pipe(map(({cotizacion})=>cotizacion))
  }
}
