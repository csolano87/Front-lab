import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Stockbodega } from 'src/app/interfaces/carga_StockDescarga.interface';
import { Bodega } from 'src/app/interfaces/cargaBodega.interface';
import { StockL } from 'src/app/interfaces/cargalistadoStock.interface';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';
import { StockService } from 'src/app/services/stock.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { pedidoStock } from 'src/app/interfaces/pedidos-stocks.interface';
@Component({
  selector: 'app-reporte-bodega',

  templateUrl: './reporte-bodega.component.html',
  styleUrl: './reporte-bodega.component.css',
})
export class ReporteBodegaComponent implements OnInit {

  @ViewChild('searchIn') searchIn!: ElementRef;
  @ViewChild('searchOut') searchOut!: ElementRef;
  search: string = "";
  searchInValue: string = '';
  searchOutValue: string = '';
  cargando: boolean = false;
  listasotckbodega: Stockbodega[] = [];
//listasotckbodega: pedidoStock[] = [];

  listabodega: Bodega[] = [];
  page;
  constructor(
    private stockService: StockService,
    private activatedRoute: ActivatedRoute,
    private manteniemintoService: MantenimientosService,
  ) {}
  ngOnInit(): void {
    this.getBodega();
    this.getFiltroBusqueda();
  }
  getBodega() {
    this.manteniemintoService.getBodega().subscribe((bodega) => {
      console.log(bodega);

      this.listabodega = bodega.filter((item) => item.id !== 1);
    });
  }

  getFiltroBusqueda() {
    /* bodegaId: string, fechaIn: string, fechaOut: string */
    /*  let params: any = {};

    if (bodegaId) params.bodegaId = bodegaId;
    if (fechaIn && fechaOut) {
      params.fechaIn = fechaIn;
      params.fechaOut = fechaOut;
    } */

      this.cargando=true;
    this.stockService.getBodegaDescargo().subscribe((stockbodega) => {
      console.log(stockbodega);

      //  this.listasotckbodega = stockbodega.filter(item=>item.ESTADO ==2)});
      this.listasotckbodega = stockbodega.filter(item=>item.ESTADO ==2);
      this.cargando=false;
    });
  }

  getExportPdf() {
    /* const dataToExport = this.listasotckbodega.map((orden) => {
      return {
        Referencia: orden.product.REFERENCIA,

        Nombre: orden.product.NOMBRE,
        Lote: orden.lote,
        Cantidad: orden.ENTREGADO,
        Entregado: orden.fechadescargo,
        'Fecha descargo': orden.fechadescargo,
        'Usuario descargo': orden.descargar.usuario,
      };
    });
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte Bodega');
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, 'reporte.xlsx'); */
  }
  onSearchBodega(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.search = selectElement.value;
    console.log(this.search)

    if (!this.search) {
      this.search = ""; // Restablecer la búsqueda si no se selecciona nada
    }
  }

  capturarValorFecha() {
    // Obtener el valor de 'searchIn'
    this.searchInValue = this.searchIn.nativeElement.value;
    this.searchOutValue = this.searchOut.nativeElement.value;

    // Aplicar los filtros con el valor capturado
  //  this.aplicarFiltro();
  }
  limpiarFiltros() {
    this.searchInValue = '';
    this.searchOutValue = '';
    this.search = ""; // Resetear el filtro de búsqueda
    this.searchIn.nativeElement.value = ''; // Limpiar input de fecha inicio
    this.searchOut.nativeElement.value = ''; // Limpiar input de fecha fin


  }

}
