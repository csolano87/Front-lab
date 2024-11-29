import { Orden } from '../models/orden.module';

export interface cargarOrdenes {
  TotalAcepta: number;
  TotalIngresada: number;
  totalIngresada: number;
  TotalEmergencia: number;
  ordenes: Orden[];
}
