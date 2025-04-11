export interface PruebasEspeciales {
  ok:             boolean;
  pruebaEspecial: PruebaEspecial[];
}

export interface PruebaEspecial {
  numeroroden:   string;
  nombres:       string;
  origenOrden:   string;
  origenResult:  string;
  numeroResults: string;
  prueba:        Prueba[];
  validator:     string;
  estadoMail?:    EstadoMail ;
}

export interface EstadoMail {
    id:         number;
    numero:     string;
    fechaorden: string;
    estado:     boolean;
    createdAt:  string;
    updatedAt:  string;
}
export interface Prueba {
  TestID:   string;
  TestName: string;
}
