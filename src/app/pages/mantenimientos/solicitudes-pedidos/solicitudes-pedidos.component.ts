import { Component, OnInit } from '@angular/core';
import { pedidoStock } from 'src/app/interfaces/pedidos-stocks.interface';
import { PedidoStock } from 'src/app/models/cargaPedidoStock.module';
import { StockService } from 'src/app/services/stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitudes-pedidos',
  templateUrl: './solicitudes-pedidos.component.html',
  styleUrl: './solicitudes-pedidos.component.css',
})
export class SolicitudesPedidosComponent implements OnInit {
  cargando = false;
  public page!: number;
  listaPedidoStock: pedidoStock[] = [];
  showPruebasHeader: boolean = false;
  showDetails: boolean[] = [];

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.getAllStocks();
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
    this.stockService.getPdfPedidoStock(pedido).subscribe(
      (blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      console.log(url);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'archivo.pdf';
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
