import { Pipe, PipeTransform } from '@angular/core';
import { StockBodega } from '../interfaces/cargarStockBodegas.interface';

@Pipe({
  name: 'filtroBodega',
  
})
export class FiltroBodegaPipe implements PipeTransform {

  transform(listaSotck: StockBodega[], search: string=''): StockBodega[] {
console.log(search)
    if (search.length ==0) {
      return listaSotck;
    }

    const listastock = listaSotck.filter((item)=> 
    item.product.NOMBRE.toUpperCase().includes(search.toUpperCase()))
    return listastock;
  }

}
