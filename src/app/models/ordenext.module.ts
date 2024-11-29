export class OrdenExt {
    constructor(
      public id: string,
      public DLCBEN: string,
      public DLCACT: string,
      public DLCDEP: string,
      public DLCOTR: string,
      public DLCEDU: string,
      public DLCPRO: string,
      public DLCSER: string,
      public DLCMED: string,
      public DLCDIS: string,
      public DLNUOR: string,
      public DLAPEL: string,
      public DLNOMB: string,
      public DLSEXO: string,
      public DLFECN: string,
      public DLHIST: string,
      public DLTIDO: string,
      public FECHA: string,
      public CODIMPRESORA: string,
      public NUMEROORDEN: string,
      public FECHAORDEN: String,     
      public HORAORDEN: string,
      public HORATOMA: string,
      public FECHATOMA: string,
      public USUARIO_ID: string,
      public pruebas: [],
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
  