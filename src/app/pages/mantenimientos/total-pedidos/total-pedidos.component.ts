import { Component, OnInit } from '@angular/core';
import { Filtro } from 'src/app/interfaces/cargaFiltroItem.interface';
import { ImportacionService } from 'src/app/services/importacion.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-total-pedidos',
  templateUrl: './total-pedidos.component.html',
  styleUrls: ['./total-pedidos.component.css'],
})
export class TotalPedidosComponent implements OnInit {
  itemsPerPage: number = 1; // Número de elementos por página
  currentPage: number = 1; // Página actual
  totalPages: number = 1; // Total de páginas
  public page!: number;
  cargando = false;
  listafiltros: Filtro[] = [];
  constructor(private importService: ImportacionService) {}

  ngOnInit(): void {}

  registroProduccion(FECHADESDE, FECHAHASTA) {
    this.cargando=true
    this.importService
      .getFiltroImport(FECHADESDE, FECHAHASTA)
      .subscribe((filtro) => {
        this.listafiltros = filtro;
        this.cargando=false;
      },(err)=>{
        console.log('error',err.error.msg)
        Swal.fire({
          icon: 'info',
          title: '',
          text: err.error.msg,
        })
        this.cargando=false;
      });
  }
  exportDataToCSV() {
    const dataToExport = this.listafiltros.map((filtro) => {
      return {
        CATEGORIA: filtro.product.CATEGORIA,

        NOMBRE: filtro.product.NOMBRE,
        UNIDAD: filtro.product.UNIDAD,
        REFERENCIA: filtro.product.REFERENCIA,
        TOTAL: filtro.Total,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pedido');
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, 'pedido.xlsx');
  }
}
