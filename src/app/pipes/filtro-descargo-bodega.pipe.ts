import { Pipe, PipeTransform } from '@angular/core';
import { Stockbodega } from '../interfaces/carga_StockDescarga.interface';

@Pipe({
  name: 'filtroDescargoBodega',
})
export class FiltroDescargoBodegaPipe implements PipeTransform {
  transform(
    listasotckbodega: Stockbodega[],
    search: string = '',
    searchInValue: string = '',
    searchOutValue: string = '',
  ): Stockbodega[] {
    if (!listasotckbodega) return [];
   

  
    
    return listasotckbodega.filter((item) => {
      let matchesSearch = true;
      let matchesDate = true;

      // Aplica el filtro de búsqueda si search es distinto de null
      if (search !== '') {
        matchesSearch = item.bodegaId === Number(search);  // Cambia esto con tu lógica de búsqueda
      }

      // Si tenemos un valor de searchIn (Fecha de inicio) y searchOut (Fecha de fin), aplicamos el rango
      if (searchInValue && searchOutValue) {
        const fechaIn = new Date(searchInValue);
        const fechaOut = new Date(searchOutValue);
        const stockDate = new Date(item.fecha); // Asegúrate de que "fecha" esté en el formato correcto

        // Verifica si la fecha de "stock" está entre fechaIn y fechaOut
        matchesDate = stockDate >= fechaIn && stockDate <= fechaOut;
      }

      return matchesSearch && matchesDate;
    });
  }
}
