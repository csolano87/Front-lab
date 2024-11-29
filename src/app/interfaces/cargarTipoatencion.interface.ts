export interface Tipoatenciones {
    ok:           boolean;
    tipoatencion: Tipoatencion[];
}

export interface Tipoatencion {
    id:        number;
    nombre:    string;
    estado:    boolean;
    createdAt: Date;
    updatedAt: Date;
}