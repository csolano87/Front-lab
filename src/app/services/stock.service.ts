import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Inventario, Stock } from '../interfaces/stock.interface';
import {
  pedidoStock,
  stocksPedido,
} from '../interfaces/pedidos-stocks.interface';
import { StockPedidoDespacho } from '../models/stockForm.module';
import { StockForm } from '../interfaces/stockMasivoExcel.interface';
import {
  StockBodega,
  StockBodegas,
} from '../interfaces/cargarStockBodegas.interface';
import { StockL, StocksL } from '../interfaces/cargalistadoStock.interface';
import { StockById } from '../interfaces/carga-stockId.interfaces';
import { StockId } from '../models/cargaStockId.module';
const baseUrl = environment.url;
@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private http: HttpClient) {}
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      // headers: { 'x-token': this.token },
      headers: { 'x-token': this.token, responseType: 'blob' },
    };
  }

  getStock(): Observable<Stock[]> {
    return this.http
      .get<Inventario>(`${baseUrl}/api/stock`, this.headers)

      .pipe(map(({ stock }) => stock));
  }

  getAllPedidoStock(): Observable<pedidoStock[]> {
    return this.http
      .get<stocksPedido>(`${baseUrl}/api/pedidos-stock`, this.headers)
      .pipe(map(({ pedidoStock }) => pedidoStock));
  }

  getDeletePedidoStock(pedido: pedidoStock) {
    return this.http.delete(
      `${baseUrl}/api/pedidos-stock/${pedido.id}`,
      this.headers,
    );
  }

  getPdfPedidoStock(pedido: pedidoStock) {
    return this.http.get(
      `${baseUrl}/api/pedidos-stock/reporte-pdf/${pedido.id}`,
      { responseType: 'blob' },
    );
  }
  getByfiltroStock(termino: string) {
    return this.http
      .get(`${baseUrl}/api/stock/buscar/${termino}`, this.headers)
      .pipe(
        map((resp: any) => {
          return resp.resultados;
        }),
      );
  }
  getDespacharStock(data: StockPedidoDespacho) {
    return this.http.put(
      `${baseUrl}/api/pedidos-stock/${data.id}`,
      data,
      this.headers,
    );
  }

  getCreateStock(formData: StockForm) {
    return this.http.post(`${baseUrl}/api/stock`, formData, this.headers);
  }
  getUpdateStock(data: StockId) {
    return this.http.post(`${baseUrl}/api/stock/${data.id}`, data, this.headers);

  }
  getCargarinternaCreateStock(formData: StockForm) {
    return this.http.post(
      `${baseUrl}/api/stock/cargaInterna`,
      formData,
      this.headers,
    );
  }

  getDeleteStock(id:number) {
    return this.http.delete(
      `${baseUrl}/api/stock/${id}`,
      
      this.headers,
    );
  }
  getCargarinternaStock(): Observable<StockL[]> {
    return this.http
      .get<StocksL>(
        `${baseUrl}/api/stock/cargaInterna`,

        this.headers,
      )
      .pipe(map(({ stock }) => stock));
  }
  getFiltroBodegas(bodegaId: string): Observable<StockBodega[]> {
    return this.http
      .get<StockBodegas>(
        `${baseUrl}/api/pedidos-stock/bodega/bodega?bodegaId=${bodegaId}`,
        this.headers,
      )
      .pipe(map(({ stock }) => stock));
  }

  getdescargoStock(data) {
    return this.http.put(`${baseUrl}/api/pedidos-stock`, data, this.headers);
  }
  getreportePdfStock() {
    return this.http.get(`${baseUrl}/api/stock/reporte/pdf`, {
      responseType: 'blob',
    });
  }


  getByIdBusqueda(id: string) {
    return this.http
      .get<StockById>(`${baseUrl}/api/stock/busqueda/${id}`, this.headers)
      .pipe(
        map(({StockId}) => StockId),
      );
  }
}
