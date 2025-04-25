import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
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
export class EstadisticaMicroComponent implements OnInit {
  public listaordene: micro[] = [];
  listaMicroResultados:[]=[];
  itemsPerPage: number = 1; // Número de elementos por página
  currentPage: number = 1; // Página actual
  totalPages: number = 1; // Total de páginas
  name = 'ExcelSheet.xlsx';
  cargando:boolean = false;

  /*  @ViewChild('table', { static: false }) table: HasElementRef; */

  // Obtener referencia a la tabla HTML
  constructor(private ordenService: LlenarCombosService) {}

  ngOnInit() {

  }

  registroMicro(FECHADESDE: string, FECHAHASTA: string) {
    this.cargando = true;
    this.ordenService
      .getMicro(FECHADESDE, FECHAHASTA)
      .subscribe(({ listaordenes }) => {
        this.cargando = false;
        this.listaordene = listaordenes;

        console.log(this.listaordene);


      });
  }

  splitAntibiotics(antibioticos: string) {
    if (antibioticos) {
      return antibioticos.split(',');
     }
    return null; // Dividir la cadena en una lista usando la coma y el espacio como separadores
  }

  splitSensible(sensible: string) {
   if (sensible) {
    return sensible.split(',');
   }
   return null; // Dividir la cadena en una lista usando la coma y el espacio como separadores
  }

  splitValor(valor: string) {

    if (valor) {
      return valor.split(','); // Dividir la cadena en una lista usando la coma y el espacio como separadores
    }
    return null
    }

  exportTable() {
    const dataToExport = this.listaordene.map((orden) => {
      return {
        'Fecha ingreso': orden.FechaIngreso,
        'Numero orden': orden.SampleID,
        Origen: orden.Origen,
        Servicio: orden.Servicio,
        'Historia Clinica': orden.Historia,
        cedula: orden.cedula,
        Paciente: orden.Paciente.replace(/[.,]/g, '').trim(),
        Codigo: this.generarCodigo(orden),
        Edad: orden.Edad,
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
        UsuarioValidador: orden.Validador,
        'Fecha de validación': orden.FechaValidacion,
        OrdenAS400: orden.OrdenAS400,
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

  generarCodigo(orden: any):string {
    const nombres = orden.Paciente.replace(/[.,]/g, '').trim().split(' ');
const cedula=orden.cedula?.slice(-4);
    const primerApellido = nombres[0].slice(0, 2);
    const segundoApellido = nombres[1]?.slice(0, 2) || '00';
    const primerNombre = nombres[2]?.slice(0, 2) || '00';
    const segundoNombre =  nombres[3]?.slice(0, 2) || '00';


    return  primerApellido +

      segundoApellido +

      primerNombre +

      segundoNombre +
      cedula;
  }

  /* getMicroResultados(orden:any){

    this.listaMicroResultados= orden
  } */

    buildTableRows(orden: any): { antibiotico: string; valor: string; sensible: string }[] {
      const antibioticos = orden.Antibiotico?.split(',') || [];
      const valores = orden.Valor?.split(',') || [];
      const sensibles = orden.Sensible?.split(',') || [];

      const maxLength = Math.max(antibioticos.length, valores.length, sensibles.length);
      const rows = [];

      for (let i = 0; i < maxLength; i++) {
        rows.push({
          antibiotico: antibioticos[i] || '',
          valor: valores[i] || '',
          sensible: sensibles[i] || ''
        });
      }

      return rows;
    }
}
