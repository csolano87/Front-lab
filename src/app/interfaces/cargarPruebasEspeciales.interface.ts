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
}

export interface Prueba {
  TestID:   string;
  TestName: string;
}
