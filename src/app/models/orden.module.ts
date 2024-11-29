export class Orden {
  constructor(
    public id: string,
    public admi_id: string,
    public CODDOCTOR: string,
    public CODTIPOORDEN: string,
    public CODSALA: string,
    public CODCENTROSALUD: string,
    public OPERADOR: string,
    public CODFLEBOTOMISTA: string,
    public FECHAORDEN: string,
    public HORAORDEN: string,
    public CORRELATIVO: string,
    public CODIMPRESORA: string,
    public CODESPECIALIDADES: string,
    public CODPROVINCIA: string,
    public FECHACITA: string,
    public HORACITA: string,
    public DIRECCION: string,
    public TELEFONO: string,
    public EMAIL: string,
    public HIS: string,
    public NOMBRETIPOORDEN: String,
    public NUMEROORDEN: string,
    public TIPOIDENTIFICADOR: string,
    public IDENTIFICADOR: string,
    public NOMBRES: string,
    public APELLIDO: string,
    public SEGUNDOAPELLIDO: string,
    public FECHANACIMIENTO: string,
    public FECHACREACIONSAIS: string,
    public PRIORIDAD: string,
    public APELLIDODOCTOR: string,
    public NOMBREDOCTOR: string,
    public EDAD: string,
    public SEXO: string,
    public ESTADO: string,
    public CODPROCEDENCIA: string,
    public CODEMBARAZADA: string,
    public as400: [],
  ) {}
}

export class Detalle {
  constructor(
    public TestID: string,
    public TestName: string,
    public ExamID: string,
    public ESTADO: string,

  ) {}
}
