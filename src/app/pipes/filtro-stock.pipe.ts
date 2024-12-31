import { Pipe, PipeTransform } from '@angular/core';
import { Stock } from '../interfaces/stock.interface';

@Pipe({
  name: 'filtroStock',
})
export class FiltroStockPipe implements PipeTransform {
  transform(listaSotck: Stock[], search: string = ''): Stock[] {
    if (search.length == 0) {
      return listaSotck;
    }
    const listastock = listaSotck.filter((li) =>
      li.nombre.includes(search.toUpperCase()),
    )
    return listastock;
  }
}
