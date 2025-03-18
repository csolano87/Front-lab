export interface Notificarcion {
  ok:        boolean;
  notificar: Notificar[];
}

export interface Notificar {
  id:              number;
  mensaje:         string;
  estado:          string;
  fechaExpiracion: string;
  createdAt:       string;
  updatedAt:       string;
}
