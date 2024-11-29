import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

import { Import } from '../models/import.module';
import { Observable, map } from 'rxjs';
import {
  Producto,
  Productos,
} from '../interfaces/carga-productosImport.interfaces';
import { ImportProductos, Pedido } from '../interfaces/cargarImport.interface';
import { Filtro, filtrosImport } from '../interfaces/cargaFiltroItem.interface';
import { Pedidos } from '../models/cargaPedido.module';
import { cargaProductos } from '../models/cargaProducto.module';
import { StockPedido } from '../models/pedidoStock.module';
import { PedidoStock } from '../models/cargaPedidoStock.module';
import { pedidoStock } from '../interfaces/pedidos-stocks.interface';
import { StockReserva } from '../interfaces/cargarStockReserva.interface';
const baseUrl = environment.url;
@Injectable({
  providedIn: 'root',
})
export class ImportacionService {
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return { headers: { 'x-token': this.token } };
  }

  constructor(private http: HttpClient) {}

  getImportacion(formData: Import) {
    return this.http.post(`${baseUrl}/api/pedido-importacion`, formData);
  }

  getAllImportacion(): Observable<Pedido[]> {
    return this.http
      .get<ImportProductos>(`${baseUrl}/api/pedido-importacion`, this.headers)//pedidos-stock //pedido-importacion
      .pipe(map(({ pedido }) => pedido));
  }

  getAllImportacionS(): Observable<Pedido[]> {
    return this.http
      .get<ImportProductos>(`${baseUrl}/api/pedidos-stock`, this.headers)//pedidos-stock //pedido-importacion
      .pipe(map(({ pedido }) => pedido));
  }

  getProductos(): Observable<Producto[]> {
    return this.http
      .get<Productos>(`${baseUrl}/api/productos`, this.headers)
      .pipe(map(({ productos }) => productos));
  }

  getCargaExcelproductos(formData: FormData) {
    return this.http.post(`${baseUrl}/api/productos`, formData, this.headers);
  }

  getCargaExcelOrdenes(formData: FormData) {
    return this.http.post(`${baseUrl}/api/carga-upload`, formData, this.headers);
  }
  getDeleteProducto(producto: Producto) {
    return this.http.delete(
      `${baseUrl}/api/productos/${producto.id}`,
      this.headers,
    );
  }
  getRegistroImport(formData: Import) {
    return this.http.post(
      `${baseUrl}/api/pedido-importacion`,
      formData,
      this.headers,
    );
  }
  getPedidoStock(formData: StockPedido) {
    return this.http.post(
      `${baseUrl}/api/pedidos-stock`,
      formData,
      this.headers,
    );
  }
  obtenerProductoById(id: string) {
    return this.http
      .get(`${baseUrl}/api/productos/producto/${id}`, this.headers)
      .pipe(
        map(
          (resp: { ok: boolean; productos: cargaProductos }) => resp.productos,
        ),
      );
  }

  UpdateProducto(data: cargaProductos) {
    return this.http
      .put(`${baseUrl}/api/productos/${data.id}`,data, this.headers)
      
      
  }

  PostProducto(data: FormData) {
    return this.http
      .post(`${baseUrl}/api/productos/producto`,data, this.headers)
      
      
  }



  getUpdateImport(data: Import) {
    return this.http.put(
      `${baseUrl}/api/pedido-importacion/${data.id}`,
      data,
      this.headers,
    );
  }
  getUpdateStock(data: StockPedido) {
    console.log(data.id)
    return this.http.put(
      `${baseUrl}/api/pedidos-stock/${data.id}`,
      data,
      this.headers,
    );
  }
  /*  getByImport(termino: string): Observable<Pedido[]> {
    return this.http
      .get<Importados>(
        `${baseUrl}/api/pedido-importacion/${termino}`,
        this.headers,
      )
      .pipe(map(({ pedido }) => pedido));
  } */


  obtenerReservaTotal(encodedItemstock:string){
    return this.http
    .get<StockReserva>(`${baseUrl}/api/pedidos-stock/filtros/${encodedItemstock}`, this.headers)
    //.pipe(map((pedido: { ok: boolean; pedido: Pedidos }) => pedido.pedido));
  }
  obtenerImportById(id: string) {
    return this.http
      .get(`${baseUrl}/api/pedido-importacion/${id}`, this.headers)
      .pipe(map((pedido: { ok: boolean; pedido: Pedidos }) => pedido.pedido));
  }



  obtenerStockById(id: string) {
    return this.http
      .get(`${baseUrl}/api/pedidos-stock/${id}`, this.headers)
      .pipe(map((pedidoStock: { ok: boolean; pedidoStock: PedidoStock }) => pedidoStock.pedidoStock));
  }
  getDeleteImport(pedido: Pedido) {
    return this.http.delete(
      `${baseUrl}/api/pedido-importacion/${pedido.id}`,
      this.headers,
    );
  }

  getFiltroImport(
    FECHADESDE: string,
    FECHAHASTA: string,
  ): Observable<Filtro[]> {
    return this.http
      .get<filtrosImport>(
        `${baseUrl}/api/pedido-importacion/filtros?FECHADESDE=${FECHADESDE}&FECHAHASTA=${FECHAHASTA}`,
        this.headers,
      )
      .pipe(map(({ filtro }) => filtro));
  }
}
