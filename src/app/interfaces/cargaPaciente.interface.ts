import { Paciente } from '../models/paciente.module';
import { ListaOrdenes } from './ordenes.interface';

export interface cargaPaciente {
  ok: boolean;
  listaordenes: ListaOrdenes[];
}
