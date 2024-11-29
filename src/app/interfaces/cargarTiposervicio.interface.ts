export interface Tiposervicios {
  ok: boolean;
  tiposervicio: Tiposervicio[];
}

export interface Tiposervicio {
  id: number;
  nombre: string;
  estado: boolean;
  createdAt: Date;
  updatedAt: Date;
}
