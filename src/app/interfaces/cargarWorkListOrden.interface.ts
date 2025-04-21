export interface WorkListOrden {
  ok: boolean;
  ordenes: Ordene[];
}

export interface Ordene {
  id: number;
  cedula: null;
  numeroorden: string;
  nombres: null | string;
  fechanac: null;
  sexo: null;
  historia: null;
  origen: null | string;
  procedencia: null;
  doctor: null | string;
  estado: boolean;
  createdAt: string;
  updatedAt: string;
  pruebaImport: PruebaImport[];
  /* numeroroden: string;
    nombres:     string;
    sexo:        string;
    fechanac:    string;
    edad:        string;
    histClinic:  string;
    doctor?:     string;
    origenOrden: string;
  estado:       boolean;
  createdAt:    string;
  updatedAt:    string;
  pruebaImport: PruebaImport[]; */
}

export interface PruebaImport {
  id: number;
  testID: number | null;
  testNAME: null | string;
  resultado: Float32List;
  TestName: string;
  estado: boolean;
  createdAt: string;
  updatedAt: string;
  ordenImportId: number;
}

/* export interface WorkListOrden {
    numeroroden: string;
    nombres:     string;
    sexo:        string;
    fechanac:    string;
    edad:        string;
    histClinic:  string;
    doctor?:     string;
    origenOrden: string;
    prueba:      Prueba[];
}

export interface Prueba {
    TestID:    string;
    TestABREV: string;
    TestName:  string;
}
 */
