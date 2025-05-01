import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { WorkListOrden } from 'src/app/interfaces/cargarWorkListOrden.interface';
import { Ordene } from 'src/app/interfaces/cargarWorkListOrden.interface';
import { FiltroExportPipe } from 'src/app/pipes/filtro-export.pipe';
import { WorkListOrdenService } from 'src/app/services/work-list-orden.service';

@Component({
  selector: 'app-listaordenesexportar',

  templateUrl: './listaordenesexportar.component.html',
  styleUrl: './listaordenesexportar.component.css',
})
export class ListaordenesexportarComponent implements OnInit {
  searchorden: string = '';
  searchEstado:number=null;
  fechaActual = new Date();
  listaordenes: Ordene[] = [];
  cargando = false;
  page: number = 1;
  count: number = 10;

  constructor(
    private worklistOrdenService: WorkListOrdenService,
    private filtroOrdenPipe: FiltroExportPipe,
  ) {}
  ngOnInit(): void {
    this.getOrdenes(this.fechaActual[0]);
  }
  getOrdenes(fecha: string) {
    this.worklistOrdenService.getOrdenInfinity(fecha).subscribe((ordenes) => {
      this.listaordenes = ordenes;
    });
  }
  borrarItem(i: number) {}
  cancelar() {}
  exportarData() {
    const dataFiltrada = this.filtroOrdenPipe.transform(
      this.listaordenes,
      this.searchorden,
    );
    const jsonStr = JSON.stringify(dataFiltrada, null, 2);
    console.log(`jsonStr`, jsonStr);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const fileName =
      'ExportarResultados' +
      '_' +
      format(this.fechaActual, 'yyyy-MM-dd HH:mm:ss');
    link.download = `${fileName}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  onSearchOrden(search: string) {
    console.log(`.search`, search);
    this.searchorden = search;
  }
  onsearchEstado(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value?.toLowerCase();
    this.searchEstado=Number( value)
  /*   if (value === 'true') {
      this.searchEstado = true;
    } else if (value === 'false') {
      this.searchEstado = false;
    } else {
      this.searchEstado = null;
    }
    console.log(`Obteniendo valor del select 1 `, selectElement.value);
    console.log(`Obteniendo valor variable  global 2`, this.searchEstado);
 */
    if (!this.searchEstado) {
      this.searchEstado = null; // Restablecer la búsqueda si no se selecciona nada
    }
  }
}
