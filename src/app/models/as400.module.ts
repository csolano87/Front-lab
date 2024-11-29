export class OrdenCalendar {
  constructor(
    public id?: string,
    public DLCBEN?: string,
    public DLCACT?: string,
    public DLCDEP?: string,
    public DLCOTR?: string,
    public DLCEDU?: string,
    public DLCPRO?: string,
    public DLCSER?: string,
    public DLCMED?: string,
    public DLCDIS?: string,
    public DLNUOR?: string,
    public DLAPEL?: string,
    public DLNOMB?: string,
    public DLSEXO?: string,
    public DLFECN?: string,
    public DLHIST?: string,
    public DLTIDO?: string,
    public FECHA?: string,
    public ESTADO?: string,
    public HORATOMA?: string,
    public NUMEROORDEN?: string,
    public CODIMPRESORA?: string,
    public DLCEXAS?: string[],
  ) {}
}

export class DLCEXAS {
  constructor(
    public TestID: string,
    public TestName: string,
    public ESTADO: string,
    // public comentario: string,
  ) {}
}
