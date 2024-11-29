import { Pipe, PipeTransform } from '@angular/core';
import { CargarUsuario } from '../interfaces/cargarUsuarios';

@Pipe({
  name: 'filtroUsuario',
})
export class FiltroUsuarioPipe implements PipeTransform {
  transform(ListaUsuario: CargarUsuario[], page: number = 0): CargarUsuario[] {
    return ListaUsuario.slice(page, page + 10);
  }
}
