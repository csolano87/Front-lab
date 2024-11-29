export interface Tipomuestras {
    ok:          boolean;
    tipomuestra: Tipomuestra[];
}

export interface Tipomuestra {
    id:          number;
    codigo:      string;
    nombre:      string;
    abreviatura: string;
    estado:      boolean;
}