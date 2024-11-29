import { Muestra } from '../models/muestra.module';

export interface cargarMuestras {
  totalDia: number;
  TotalTubos: number;
  rechazo: number;
  muestras: Muestra[];
}
