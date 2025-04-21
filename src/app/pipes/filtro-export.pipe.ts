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
  transform(listaordenes: Ordene[], search: string = ''): Ordene[] {
    if (search.length == 0) {
      return listaordenes;
    }

    const listaFiltrada = listaordenes.filter((item) =>
      item.numeroorden.startsWith(search) && item.estado !== true ,
    );
    console.log(listaFiltrada)
    return listaFiltrada;
  }
}
