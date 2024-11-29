import { Component, OnInit } from '@angular/core';
import { RegisterDateCount } from 'src/app/interfaces/cargaReportPruebas.interfaces';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { saveAs } from 'file-saver';
import * as Papa from 'papaparse';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-produccion',
  templateUrl: './report-produccion.component.html',
  styleUrls: ['./report-produccion.component.css'],
})
export class ReportProduccionComponent implements OnInit {
  page = 1;
  cargando = false;
  listaprueba: RegisterDateCount[] = [];
  dia: number;
  mes: string;

  constructor(private llenarComboservices: LlenarCombosService) {}

  ngOnInit(): void {}
  registroProduccion(FECHADESDE: string, FECHAHASTA: string) {
    this.cargando = true;
    this.llenarComboservices
      .getReportProd(FECHADESDE, FECHAHASTA)
      .subscribe(({ listapruebas }) => {
        listapruebas.forEach((prueba) => {
          prueba.RegisterDateCounts.sort(
            (a, b) =>
              new Date(a.RegisterDate).getTime() -
              new Date(b.RegisterDate).getTime(),
          );
        });

        this.listaprueba = listapruebas;
        // this.listaprueba.unshift('TestName'Testname)
        this.cargando = false;
        //console.log(`*******PRUEBA*****`,this.listaprueba)
      });
  }
  get uniqueDatesSorted(): string[] {
    return this.uniqueDates.sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    );
  }
  get uniqueDates(): string[] {
    return [
      ...new Set(
        this.listaprueba.flatMap((prueba) =>
          prueba.RegisterDateCounts.map((item) => item.RegisterDate),
        ),
      ),
    ];
  }

  getCountForDate(prueba: any, date: string): number {
    const dateCount = prueba.RegisterDateCounts.find(
      (item) => item.RegisterDate === date,
    );
    return dateCount ? dateCount.Count : 0;
  }

  exportDataToCSV() {
    const csvData = [];
    const headerRow = ['TestName', ...this.uniqueDatesSorted];
    csvData.push(headerRow);

    this.listaprueba.forEach((prueba) => {
      const dataRow = [prueba.TestName];
      this.uniqueDatesSorted.forEach((date) => {
        const count = this.getCountForDate(prueba, date);
        dataRow.push(count.toString());
      });
      csvData.push(dataRow);
    });

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'data.csv');
  }
}
