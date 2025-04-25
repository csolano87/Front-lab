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
    searchEstado: boolean = null,
  ): Ordene[] {
    console.log(`Obtener el valor del campo selectedd`, searchEstado);
    if (search.length == 0 && searchEstado == null) {
      return listaordenes;
    }

    const listaFiltrada = listaordenes.filter((item) =>
      item.numeroorden.startsWith(search)
    &&
    (searchEstado  ? item.estado == searchEstado : null)

    );
    console.log(listaFiltrada);
    return listaFiltrada;
  }
}
