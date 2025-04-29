export interface ExcelOrdenes {
  ok: boolean;
  descargoExcel: descargoExcel[];
}
export interface descargoExcel {
  cedula: string;
  register: string;
  numeroroden: string;
  nombres: string;
  sexo: string;
  tests: Test[];
}

export interface Test {
  TestID: string;
  TestName: string;
  Resultado?: string;
}
/* export interface ExcelOrdenes {
    ok:            boolean;
    ordenInfinity: OrdenInfinity[];
}

export interface OrdenInfinity {
    cedula:      string;
    register:    string;
    numeroroden: string;
    nombres:     string;
    sexo:        string;
    tests:       Test[];
}

export interface Test {
    TestID:     string;
    TestName:   string;
    Resultado?: string;
} */
