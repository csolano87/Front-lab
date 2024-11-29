import { Pipe, PipeTransform } from '@angular/core';
import { Listaprueba } from 'src/app/interfaces/cargaListapruebas.interface';
@Pipe({
  name: 'filtroexam',
})
export class FiltroexamPipe implements PipeTransform {
  transform(listapruebas: Listaprueba[], search: string = ''):Listaprueba[] {
    console.log(search);

    if (search.length === 0) {
      return listapruebas;
    }
    const listanueva = listapruebas.filter(lista=>lista.NOMBRE.includes(search.toUpperCase()))
    return listanueva
  }
}
