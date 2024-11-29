import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { Envase } from 'src/app/models/envase.module';
import { Muestra } from 'src/app/models/muestra.module';
import { Pacientes } from 'src/app/models/pacientes.module';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import * as XLSX from 'xlsx';

import html2canvas from 'html2canvas';
import { MuestrasService } from 'src/app/services/muestras.service';
import { cargarMuestras } from 'src/app/interfaces/cargarMuestra.interface';

@Component({
  selector: 'app-muestra',
  templateUrl: './muestra.component.html',
  styleUrls: ['./muestra.component.css'],
})
export class MuestraComponent implements OnInit {
  name = 'ExcelSheet.xlsx';
  constructor(
    private muestraService: MuestrasService,
    private doctorservice: LlenarCombosService,
    private router: Router,
  ) {}
  listaenvase: Envase[] = [];
  muestrasTemp: Muestra[] = [];
  totalTemp: number = 0;

  ngOnInit(): void {
    this.doctorservice.getEnvase().subscribe((resp) => {
      this.listaenvase = resp;
      console.log(this.listaenvase);
    });
  }

  buscar(
    fechaToma: string,
    fechafin: string,
    tipoTubo: string,
    estado: string,
  ) {
    console.log(fechaToma, fechafin, tipoTubo, estado);
    this.muestraService
      .buscarfiltrosMuestras(fechaToma, fechafin, tipoTubo, estado)

      .subscribe(({ muestras, TotalTubos }) => {
        // console.log('LISTA DE TUBOS', muestras)
        this.muestrasTemp = muestras;
        this.totalTemp = TotalTubos;
      });
  }

  exportToExcel() {
    let element = document.getElementById('frmMuestras');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

  imprimirLista() {
    const DATA = document.getElementById('frmMuestras');

    console.log(DATA);
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3,
    };
    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');

        // Add image Canvas to PDF
        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST',
        );
        return doc;
      })
      .then((docResult) => {
        docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
      });
  }
}
