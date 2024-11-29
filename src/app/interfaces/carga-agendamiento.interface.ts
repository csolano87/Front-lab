import { ordenexterna } from '../models/ordenexterna.module';

export interface cargarExternaCalendar {
  ok: boolean;
  ordenes: ordenexterna[];
}
