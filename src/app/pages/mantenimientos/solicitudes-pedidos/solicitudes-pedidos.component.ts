import { Component, OnInit } from '@angular/core';
import { pedidoStock } from 'src/app/interfaces/pedidos-stocks.interface';
import { PedidoStock } from 'src/app/models/cargaPedidoStock.module';
import { Usuario } from 'src/app/models/usuario.module';
import { StockService } from 'src/app/services/stock.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { NotificarDespachosService } from '../../../services/notificar-despachos.service';

@Component({
  selector: 'app-solicitudes-pedidos',
  templateUrl: './solicitudes-pedidos.component.html',
  styleUrl: './solicitudes-pedidos.component.css',
})
export class SolicitudesPedidosComponent implements OnInit {
  cargando = false;
  historicoresultados: any = [];
  public page!: number;
  listaPedidoStock: pedidoStock[] = [];
  showPruebasHeader: boolean = false;
  notificarDespacho: any[] = [];
  showDetails: boolean[] = [];
  public usuario: Usuario;

  constructor(
    private stockService: StockService,
    private usuarioService: UsuarioService,
    private notificarDespachosservice: NotificarDespachosService,
  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.getAllStocks();
   // this.escucharSocket();
  }
  toggleDetails(index: number): void {
    this.showDetails[index] = !this.showDetails[index];
    this.showPruebasHeader = this.showDetails.some((detail) => detail);
  }
  getAllStocks() {
    this.cargando = true;
    this.stockService.getAllPedidoStock().subscribe((pedidoStock) => {
      console.log(pedidoStock);
      this.listaPedidoStock = pedidoStock;
      console.log(this.listaPedidoStock);
      this.cargando = false;
    });
  }

  borrarPedido(pedido: pedidoStock) {
    if (pedido.ESTADO != 1) {
      return; // No hacer nada si el estado es '1'
    }

    Swal.fire({
      title: 'Eliminar Pedido?',
      text: `Esta seguro que desea eliminar el pedido ${pedido.id}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Si eliminar?',
    }).then((result) => {
      if (result.value) {
        this.stockService.getDeletePedidoStock(pedido).subscribe(
          (resp: any) => {
            const { msg } = resp;
            this.getAllStocks();
            Swal.fire('Pedido Eliminado', `${msg} `, 'success');
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.error.msg,
            });
            console.log('MSG ERROR', err.error.msg);
          },
        );
      }
    });
  }
  ImprimirPDf(pedido: pedidoStock) {
    console.log(pedido);
    this.stockService.getPdfPedidoStock(pedido).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      console.log(url);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'archivo.pdf';
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }


  historicoResultados(stock: any) {
    console.log(stock.despachopedido);
    this.historicoresultados = stock.itemstock;
  }
}
