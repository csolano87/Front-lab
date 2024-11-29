import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { addMinutes, format } from 'date-fns';
import * as XLSX from 'xlsx';
import { Listaordene } from 'src/app/interfaces/orden.interface';
import { LlenarCombosService } from 'src/app/services/llenar-combos.service';
/* import { HasElementRef } from '@angular/material/core/common-behaviors/color'; */
import { saveAs } from 'file-saver';




@Component({
  selector: 'app-resgistro-pacientes',
  templateUrl: './resgistro-pacientes.component.html',
  styleUrls: ['./resgistro-pacientes.component.css'],
})
export class ResgistroPacientesComponent implements AfterViewInit {
  public listaordene: Listaordene[] = [];
  itemsPerPage: number = 1; // Número de elementos por página
  currentPage: number = 1; // Página actual
  totalPages: number = 1; // Total de páginas
  name = 'ExcelSheet.xlsx';
  cargando = false;
  /* @ViewChild('table', { static: false }) table: HasElementRef;  */// Obtener referencia a la tabla HTML
  constructor(private ordenService: LlenarCombosService) {}

  ngAfterViewInit() {}

  registroPacientes(FECHADESDE: string, FECHAHASTA: string) {
    this.cargando = true;
    this.ordenService
      .getRegistropacientes(FECHADESDE, FECHAHASTA)
      .subscribe(({ listaordenes }) => {
        this.listaordene = listaordenes;

        console.log(this.listaordene);

        this.cargando = false;
      });
  }

  exportTable() {
   
    const dataToExport = this.listaordene.map((orden) => {
    
      return {
        ' Fecha registro': orden.RegisterDate,
        'Colocar 1': 1,
        Identificacion: orden.SurNameAndName,
        Edad: orden.Age,
        Télefono: orden.D_112,
        'Código unico': orden.SampleID,
        'H (hematologico)':
          orden.Groups && orden.Groups.includes('H(hematologia)') ? '1' : '',
        'IQS (Inmuno quimica serologia)':
          orden.Groups &&
          orden.Groups.includes('IQS (Inmuno Química Serología)')
            ? '1'
            : '',
        'G(gasometria)':
          orden.Groups && orden.Groups.includes('G (gasometría)') ? '1' : '',
        'C(Coagulacion)':
          orden.Groups && orden.Groups.includes('C (Cuagulación)') ? '1' : '',
        'O (Orina)':
          orden.Groups && orden.Groups.includes('O (Orina)') ? '1' : '',
        'H (heces)':
          orden.Groups && orden.Groups.includes('H (Heces)') ? '1' : '',
        'BAC(bacteriologia)':
          orden.Groups && orden.Groups.includes('BAC (Bacteriologia)')
            ? '1'
            : '',
        'Total muestras': this.getTotalMuestras(orden.Groups),
        'Hora ingreso': orden.RegisterHour,
        'Responsable de ingreso': orden.D_119,
        Procedencia: orden.Origin,
        'Personal responsable': orden.D_113,
        'Fecha recoleccion': orden.RegisterDate,
        'Hora recoleccion': this.sumarDiezMinutos(orden.RegisterHour),
        Comentarios: '-',
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
  sumarDiezMinutos(registerHour: string): string {
    const newDate = addMinutes(new Date(`2000-01-01T${registerHour}`), 5);
    return format(newDate, 'HH:mm:ss');
  }
}
