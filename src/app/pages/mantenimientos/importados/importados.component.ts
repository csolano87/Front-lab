import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/interfaces/import-form.interface';
//import { Pedido } from 'src/app/interfaces/cargar-pedido.interface';

import { ImportacionService } from 'src/app/services/importacion.service';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-importados',
  templateUrl: './importados.component.html',
  styleUrls: ['./importados.component.css'],
})
export class ImportadosComponent implements OnInit {
  @ViewChild('inputRef') inputRef: ElementRef;
  selectedProductIndex: number | null = null;
  public isLoading = false;
  public src: string;
  public data$: any;
  itemsPerPage: number = 1; // Número de elementos por página
  currentPage: number = 1; // Página actual
  totalPages: number = 1; // Total de páginas
  cargando = true;
  listaImport: Pedido[] = [];
  importado: Pedido[] = [];
  importadoTemp: Pedido[] = [];
  expandedRows: { [key: string]: boolean } = {};
  public page!: number;

  constructor(
    private importService: ImportacionService,
    private llenarcomboService: LlenarCombosService,

    private router: Router,
  ) {}

  ngOnInit(): void {
    this.allImport();
  }

  allImport() {
    this.cargando = true;
    this.importService.getAllImportacion().subscribe((pedido) => {
      this.listaImport = pedido;
      console.log(pedido);
      this.cargando = false;
    });
  }

  /*  buscar(termino: string) {
    console.log(termino);
    return termino.length === 0
      ? (this.importado = this.importadoTemp)
      : this.importService.getByImport(termino).subscribe((pedidos) => {
          console.log(pedidos);

          this.importado = pedidos;
        });
  }  */

  borrarPedido(pedido: Pedido) {
    Swal.fire({
      title: 'Eliminar pedido?',
      text: `Esta seguro que desea eliminar el pedido # ${pedido.id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si eleiminar ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.importService.getDeleteImport(pedido).subscribe((resp: any) => {
          const { msg } = resp;

          Swal.fire({
            title: 'Pedido eliminado!',
            text: `${msg}`,
            icon: 'success',
          });
        });
      }
    });
    //  console.log(id);
  }

  toggleRow(importId: number): void {
    this.expandedRows[importId] = !this.expandedRows[importId];
  }
}
