import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockL } from 'src/app/interfaces/cargalistadoStock.interface';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { StockService } from 'src/app/services/stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-stock',

  templateUrl: './listado-stock.component.html',
  styleUrl: './listado-stock.component.css',
})
export class ListadoStockComponent implements OnInit {
  cargando: boolean = false;
  search: string = '';
  listastock: StockL[] = [];
  page;
  constructor(
    private stockService: StockService,
    private activatedRoute: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.getListaStock();
   
  }

  getListaStock() {
    this.stockService.getCargarinternaStock().subscribe((stock) => {
      console.log(stock);
      this.listastock = stock;
    });
  }

  onSearch(input: string) {}
  onDeleteStock(stock: StockL) {
    console.log(stock);

    Swal.fire({
      title: 'Eliminar guia?',
      html: `Esta seguro que desea eliminar la guia <strong>${stock.guia}</strong>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Si eliminar?',
    }).then((result) => {
      console.log('NUMERO OBTENIDO', result.value);
      if (result.value) {
        this.stockService.getDeleteStock(stock.id).subscribe(
          (resp: any) => {
            const { msg } = resp;
            console.log(msg);
            this.getListaStock();
            Swal.fire('Orden Eliminada', `${msg}`, 'success');
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
}
