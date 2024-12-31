import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../interfaces/carga-productosImport.interfaces';

@Pipe({
  name: 'filtroProducto',
})
export class FiltroProductoPipe implements PipeTransform {
  transform(listaproductos: Producto[], search: string = ''): Producto[] {
    if (search.length == 0) {
      return listaproductos;
    }
    const listaproducto = listaproductos.filter((lista) =>
      lista.NOMBRE.includes(search.toUpperCase()),
    );
    return listaproducto;
  }
}
