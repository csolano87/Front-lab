import { Component, OnInit } from '@angular/core';
import { pedidoStock } from 'src/app/interfaces/pedidos-stocks.interface';
import { PedidoStock } from 'src/app/models/cargaPedidoStock.module';
import { StockService } from 'src/app/services/stock.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reactivo',

  templateUrl: './reactivo.component.html',
  styleUrl: './reactivo.component.css'
})
export class ReactivoComponent {
  cargando = false;
  public page!: number;
  listaPedidoStock: pedidoStock[] = [];
  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.getAllStocks();
  }

  getAllStocks() {
    this.cargando = true;
    this.stockService.getAllPedidoStock().subscribe((pedidoStock) => {
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
            // this.cargarOrdenes();
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
  ImprimirPDf(pedido: any) {}
}
