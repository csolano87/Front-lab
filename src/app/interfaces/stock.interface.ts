export interface Inventario {
  ok: boolean;
  stock: Stock[];
}
export interface Stock {
  referencia: string;
  nombre: string;
  detalles: Detalle[];
  total_referencia: number;
}

export interface Detalle {
  lote: string;
  TOTAL: string;
  caducidad: Date;
}
/* export interface Stock {
    referencia:       string;
    detalles:         Detalle[];
    total_referencia: string;
}

export interface Detalle {
    lote:      string;
    TOTAL:     number;
    caducidad: Date;
} */
/* export interface Stock {
    cantidad:   string;
    referencia: string;
    lote:       string;
    caducidad:  string;
} */
