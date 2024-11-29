export interface Correos {
  ok?: boolean;
  correo?: Correo[];
}

export interface Correo {
  id?: number;
  empresa?: string;
  nombres?: string;
  apellidos?: string;
  correo?: string;

  estado?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
