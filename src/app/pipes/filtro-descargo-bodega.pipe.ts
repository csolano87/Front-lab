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


      if (search !== '') {
        matchesSearch = item.bodegaId === Number(search);
      }

      if (searchInValue && searchOutValue) {
        const fechaIn = new Date(searchInValue);
        const fechaOut = new Date(searchOutValue);
        const stockDate = new Date(item.fecha);


        matchesDate = stockDate >= fechaIn && stockDate <= fechaOut;
      }

      return matchesSearch && matchesDate;
    }); 
  }
}
