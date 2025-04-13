export interface WorkListOrden {
  ok:      boolean;
  ordenes: Ordene[];
}

export interface Ordene {
  id:           number;
  cedula:       null;
  numeroorden:       null;
  nombres:      null | string;
  fechanac:     null;
  sexo:         null;
  historia:     null;
  origen:       null | string;
  procedencia:  null;
  doctor:       null | string;
  estado:       boolean;
  createdAt:    string;
  updatedAt:    string;
  pruebaImport: PruebaImport[];
}

export interface PruebaImport {
  id:            number;
  testID:        number | null;
  testNAME:      null | string;
  estado:        boolean;
  createdAt:     string;
  updatedAt:     string;
  ordenImportId: number;
}
