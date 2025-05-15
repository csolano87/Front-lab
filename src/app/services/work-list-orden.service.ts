import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {
  Ordene,
  WorkListOrden,
} from '../interfaces/cargarWorkListOrden.interface';
const baseUrl = environment.url;
@Injectable({
  providedIn: 'root',
})
export class WorkListOrdenService {
  constructor(private http: HttpClient) {}

  getImportOrden(data: any) {
    return this.http.post(`${baseUrl}/api/derivarordenes`, data);
  }
  getOrdenInfinity(fecha: string): Observable<Ordene[]> {
    return this.http
      .get<WorkListOrden>(`${baseUrl}/api/derivarordenes?fecha=${fecha}`)
      .pipe(delay(2000), map(({ ordenes }) => ordenes));
  }

  getTrasmitirresultados(data: any) {
    return this.http.post(`${baseUrl}/api/trasmitirordenes`, data);
  }
}
