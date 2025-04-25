export interface OrdenMicro {
  ok?: boolean;
  listaordenes?: micro[];
}

export interface micro {
  FechaIngreso:    string;
  SampleID:        string;
  Origen:          string;
  cedula?:          string;
  Servicio?:       string;
  Historia:        string;
  Paciente:        string;
  Edad:            string;
  Sexo:            string;
  Tipomuestra?:     string;
  Comentario?:      string;
  Validador?:       string;
  FechaValidacion?: string;
  OrdenAS400?:      string;
  Microorganismo?: string;
  Tecnica?:        string;
  Valor?:          string;
  Antibiotico?:    string;
  Sensible?:       string;
}
