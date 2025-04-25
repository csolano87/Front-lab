import { descargoExcel } from './../../../interfaces/cargar_exceOrdenes.interface';
import { Component, OnInit } from '@angular/core';

import { StockService } from 'src/app/services/stock.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-generar-excel-procedencia',

  templateUrl: './generar-excel-procedencia.component.html',
  styleUrl: './generar-excel-procedencia.component.css'
})
export class GenerarExcelProcedenciaComponent implements OnInit {
page;
cargando:boolean=false;
listaOrdenes:descargoExcel[]=[];
constructor( private sotckService: StockService){}

ngOnInit(): void {
this.getDescargoOrdenes();
}
getDescargoOrdenes(){

  this.sotckService.getDescargoExcelInfinity().subscribe((descargoExcel)=>{

this.listaOrdenes=descargoExcel;
  })
}
exportTable(){

  const dataToExport = this.listaOrdenes.flatMap((orden) => {
    return orden.tests.map((test) => ({
      'Fecha': orden.register,
      'numeroorden': orden.numeroroden,
      cedula: orden.cedula,
      Paciente: orden.nombres.replace(/[.,]/g, '').trim(),
      Servicio: orden.sexo,
      codigo: test.TestID || '',
      examen: test.TestName || '',
      resultado: test.Resultado || '' // Ajusta si tu campo de resultado es diferente
    }));
  });

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Ordenes');

      const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'ResultadosExcelUees.xlsx');
}
}
