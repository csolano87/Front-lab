import { Usuario } from '../models/usuario.module';

export interface CargarUsuario {
  total: number;
  usuarios: Usuario[];
}
