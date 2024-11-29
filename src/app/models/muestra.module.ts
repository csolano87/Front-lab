export class Muestra {
  constructor(
    public numeroorden: string,
    public fechaIngreso: string,
    public fechafin: string,
    public tipoTubo: string,

    public horaIngreso: string,
    public usuarioIngresa: string,
    public usuarioRechaza: string,
    public usuarioUpdate: string,
    public fechaRechaza: string,

    public comentario: string,
    public comentarioUpdate: string,
    public estado: string,
    public pacientes: Pacientes,
  ) {}
}
export class Pacientes {
  constructor(
    public HORATOMA: string,
    public FECHATOMA: string,
    public CODSALA: string,
  ) {}
}
