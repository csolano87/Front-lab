import { Pipe, PipeTransform } from '@angular/core';
import { Ordene } from '../interfaces/cargaIngresoordenes.interface';

@Pipe({
  name: 'filtrordenes',

})
export class FiltrordenesPipe implements PipeTransform {

  transform(listaordenesingresdas: Ordene[], search: number = 0): Ordene[] {
    console.log(search)
    if (search == 0) {
      return listaordenesingresdas;
    }
    const listaordenesingresda = listaordenesingresdas.filter((item) =>
    item.paciente.numero ==search ) 


    return listaordenesingresda;
    
  }

}
