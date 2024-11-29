import { Pacientes } from '../models/pacientes.module';

export interface cargaPacientes {
  ok: boolean;
  pacientes: Pacientes[];
}
