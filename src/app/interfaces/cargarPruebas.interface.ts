import { Prueba } from '../models/pruebas.module';

export interface cargarPruebas {
  ok: boolean;
  prueba: Prueba[];
}
