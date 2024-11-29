export interface OrdenMicro {
  ok?: boolean;
  listaordenes?: micro[];
}

export interface micro {
  Fechaingreso?: string;
  SampleID?: string;
  Origen?: string;
  Servicio?: string;
  Paciente?: string;
  Sexo?: string;
  Age?:string;
  Historia?: string;
  Tipomuestra?: string;
  Microorganismo?: string;
  Tecnica?: string;
  Antibiotico?: string;
  Sensible?: string;
  Valor?: string;
  Fechavalidacion?: string;
  Comentario?: string;
  Orden?: string;
  Validador?:string;
}
