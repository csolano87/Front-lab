export interface ListaInfinity {
  ok:            boolean;
  ordenInfinity: OrdenInfinity[];
}

export interface OrdenInfinity {
  numeroroden: string;
  nombres:     string;
  doctor?:     string;
  origenOrden: string;
  prueba:      Prueba[];
}

export interface Prueba {
  TestID:   string;
  TestName: string;
}
