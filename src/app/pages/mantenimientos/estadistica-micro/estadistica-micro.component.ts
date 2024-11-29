import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
/* import { HasElementRef } from '@angular/material/core/common-behaviors/color'; */
import { OrdenMicro, micro } from 'src/app/interfaces/micro-form.interface';
import * as XLSX from 'xlsx';

import { saveAs } from 'file-saver';
import { Listaordene } from 'src/app/interfaces/orden.interface';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
import { writeFile, utils } from 'xlsx';
@Component({
  selector: 'app-estadistica-micro',
  templateUrl: './estadistica-micro.component.html',
  styleUrls: ['./estadistica-micro.component.css'],
})
export class EstadisticaMicroComponent implements AfterViewInit {
  public listaordene: micro[] = [];
  itemsPerPage: number = 1; // Número de elementos por página
  currentPage: number = 1; // Página actual
  totalPages: number = 1; // Total de páginas
  name = 'ExcelSheet.xlsx';
  cargando = false;
 /*  @ViewChild('table', { static: false }) table: HasElementRef; */
  
  // Obtener referencia a la tabla HTML
  constructor(private ordenService: LlenarCombosService) {}

  ngAfterViewInit() {}

  registroMicro(FECHADESDE: string, FECHAHASTA: string) {
    this.cargando = true;
    this.ordenService
      .getMicro(FECHADESDE, FECHAHASTA)
      .subscribe(({ listaordenes }) => {
        this.listaordene = listaordenes;

        console.log(this.listaordene);

        this.cargando = false;
      });
  }

  splitAntibiotics(antibioticos: string) {
    /*  if (antibioticos.split('+')) {
       console.log(`anti`,antibioticos)
     } */
    return antibioticos.split(','); // Dividir la cadena en una lista usando la coma y el espacio como separadores
  }

  splitSensible(sensible: string) {
    return sensible.split(','); // Dividir la cadena en una lista usando la coma y el espacio como separadores
  }

  splitValor(valor: string) {
    return valor.split(','); // Dividir la cadena en una lista usando la coma y el espacio como separadores
  }
  exportTable() {
    /*  const dataToExport = this.listaordene.map(orden => {
      return {
        'Numero orden': orden.SampleID,
        'Servicio': orden.Servicio,
        'Tipo paciente': 'Humano',
        'Sexo': orden.Sexo,
        'Historia Clinica': orden.Historia,
        'Tipo muestra': orden.Tipomuestra,
        'Microorganismo': orden.Microorganismo,
        'Tecnica': orden.Tecnica,
        'Valor': this.splitValor(orden.Valor).join(','),
        'Antibiotico': this.splitAntibiotics(orden.Antibiotico).join(','),
        'Sensible': this.splitSensible(orden.Sensible).map((sensible) => (sensible.includes('Sensible') ? 'SI' : '-')).join(','),
        'Resistente': this.splitSensible(orden.Sensible).map((sensible) => (sensible.includes('Resistente') ? 'SI' : '-')).join(','),
      }
    });
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);   
    const workbook = XLSX.utils.book_new(); 
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ordenes');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });  
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });  
    saveAs(blob, 'ordenes.xlsx');  */
    const dataToExport = this.listaordene.map((orden) => {
      return {
        'Fecha ingreso': orden.Fechaingreso,
        'Numero orden': orden.SampleID,
        Origen: orden.Origen,
        Servicio: orden.Servicio,
'Historia Clinica': orden.Historia,
Paciente: orden.Paciente,
        'Tipo paciente': orden.Age,        
        Sexo: orden.Sexo,        
        'Tipo muestra': orden.Tipomuestra,
        Microorganismo: orden.Microorganismo,
        Tecnica: orden.Tecnica,
        Valor: this.splitValor(orden.Valor).join('\r\n'), // Utilizar \n en lugar de ,
        Antibiotico: this.splitAntibiotics(orden.Antibiotico).join('\r\n'), // Utilizar \n en lugar de ,
        Sensible: this.splitSensible(orden.Sensible)
          .map((sensible) => (sensible.includes('Sensible') ? 'SI' : '-'))
          .join('\n'),
        Resistente: this.splitSensible(orden.Sensible)
          .map((sensible) => (sensible.includes('Resistente') ? 'SI' : '-'))
          .join('\n'),
          Comentario: orden.Comentario,
          UsuarioValidador:orden.Validador,
        'Fecha de validación': orden.Fechavalidacion,
        OrdenAS400:orden.Orden
       
      };
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
    saveAs(blob, 'ordenes.xlsx');
  }

  imprimirLista() {}

  getTotalMuestras(Groups) {
    let count = 0;
    if (Groups?.includes('H(hematologia)')) count++;
    if (Groups?.includes('IQS (Inmuno Química Serología)')) count++;
    if (Groups?.includes('G (gasometría)')) count++;
    if (Groups?.includes('C (Cuagulación)')) count++;
    if (Groups?.includes('O (Orina)')) count++;
    if (Groups?.includes('H (Heces)')) count++;
    if (Groups?.includes('BAC (Bacteriologia)')) count++;

    // Agrega las demás condiciones para incrementar el contador en caso de que existan otros grupos
    console.log(count);
    return count;
    console.log(count);
  }
}
