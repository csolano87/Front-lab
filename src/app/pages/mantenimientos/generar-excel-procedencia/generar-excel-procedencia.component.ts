import { descargoExcel } from './../../../interfaces/cargar_exceOrdenes.interface';
import { Component, OnInit } from '@angular/core';

import { StockService } from 'src/app/services/stock.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { event } from 'jquery';

@Component({
  selector: 'app-generar-excel-procedencia',

  templateUrl: './generar-excel-procedencia.component.html',
  styleUrl: './generar-excel-procedencia.component.css',
})
export class GenerarExcelProcedenciaComponent implements OnInit {
  page;
  cargando: boolean = false;
  descargando: boolean = false;
  listaOrdenes: descargoExcel[] = [];
  constructor(private sotckService: StockService) {}

  ngOnInit(): void {
    //this.getDescargoOrdenes();
  }
  getDescargoOrdenes() {
    /*   this.sotckService.getDescargoExcelInfinity().subscribe((descargoExcel) => {
      this.listaOrdenes = descargoExcel;
    }); */
  }

  OnCargarArchivo(event: any) {
    this.cargando = true;
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    this.sotckService
      .getDescargoExcelInfinity(formData)
      .subscribe((resp: any) => {
        // console.log(`Datos de Infinity`, resp);
        const { descargoExcel } = resp;
        this.listaOrdenes = descargoExcel;
        this.cargando = false;
      });

    /*   const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const fileContent = e.target.result;
          const jsonData = JSON.parse(fileContent);
          this.sotckService
            .getDescargoExcelInfinity(jsonData)
            .subscribe((descargoExcel) => {
              console.log(descargoExcel);
            });
        } catch (err) {
          console.error('Error al parsear el JSON:', err);
        }
      };
    } */
  }
  exportTable() {
    this.descargando = true;
    const dataToExport = this.listaOrdenes.flatMap((orden) => {
      return orden.tests.map((test) => ({
        Fecha: orden.register,
        numeroorden: orden.numeroroden,
        cedula: orden.cedula,
        Paciente: orden.nombres.replace(/[.,]/g, '').trim(),
        Servicio: orden.sexo,
        /*    codigo: test.TestID || '', */
        examen: test.TestName || '',
        resultado: test.Resultado || '', // Ajusta si tu campo de resultado es diferente
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
    this.descargando = false;
  }
}
