import { Injectable } from '@angular/core';
import { List } from '../models/listagetlist.module';
import { ListaOrdenes } from '../interfaces/orden.interface';
import { delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
const baseUrl = environment.url;
@Injectable({
  providedIn: 'root',
})
export class GetListService {
  userToken!: string;
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { 'x-token': this.token } };
  }

  buscarPacientes(SampleID: string, PatientID1: string, apellido: string) {
    return this.http.get<ListaOrdenes>(
      `${baseUrl}/api/buscarordenes?PatientID1=${PatientID1}&SampleID=${SampleID}&apellido=${apellido}`,
      this.headers,
    );
  }
  buscarTodos(lista: List) {
    return this.http
      .get<ListaOrdenes>(`${baseUrl}/api/buscarordenes/${lista}`, this.headers)
      .pipe(delay(1500));
  }

  pdf2(lista: List) {
    console.log('estoy en el servicio.', lista);
    return this.http.get<ListaOrdenes>(
      `${baseUrl}/api/buscar/${lista.SampleID}`,
      this.headers,
    );
    // return this.http.get<pdfPacientes>(`${environment.url}/buscar/${lista.SampleID}`)
    /* .pipe(
     delay(0)
   ); */
  }
}
