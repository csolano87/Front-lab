import { Pipe, PipeTransform } from '@angular/core';
import { Ordene } from '../interfaces/cargaIngresoordenes.interface';

@Pipe({
  name: 'filtrordenes',

})
export class FiltrordenesPipe implements PipeTransform {

  transform(listaordenesingresdas: Ordene[], search: number =null, searchNombre: string = ''): Ordene[] {
console.log(search)
    if (!listaordenesingresdas) return [];
    const searchNum = search ?? '';
    const searchNom = searchNombre.trim().toLowerCase();

    return listaordenesingresdas.filter((item) => {
        const numeroCoincide = searchNum == '' || item.paciente.numero === searchNum;
        const nombreCoincide = searchNom === '' || item.paciente.apellidos.toLowerCase().includes(searchNom);

        return numeroCoincide && nombreCoincide;
    });
  }

}
