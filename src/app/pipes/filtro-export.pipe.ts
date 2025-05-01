import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Ordene } from 'src/app/interfaces/cargarWorkListOrden.interface';
@Pipe({
  name: 'filtroExport',
})
@Injectable({
  providedIn: 'root',
})
export class FiltroExportPipe implements PipeTransform {
  //listaordenes: Ordene[] = [];
  transform(
    listaordenes: Ordene[],
    search: string = '',
    searchEstado: number=null ,
  ): Ordene[] {
    console.log(`Valor Obteniedo en el Filtro`, searchEstado);
    console.log(`Valor Obteniedo input en el Filtro`, search);
    if (search.length == 0 && searchEstado == null) {
      return listaordenes;
    }

    const listaFiltrada = listaordenes.filter((item) => {
      console.log(`Obteniendo el estado del areray `,item.estado)
      const coincideNumero = search ? item.numeroorden.startsWith(search) : true;
      let coincideEstado = true;
      if (searchEstado === 1) {
        coincideEstado = item.estado === true;
      } else if (searchEstado === 2) {
        coincideEstado = item.estado === false;
      }

    return coincideNumero && coincideEstado;
    });
    console.log(listaFiltrada);
    return listaFiltrada;
  }
   //return listaFiltrada;
}
