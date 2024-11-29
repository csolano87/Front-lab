export interface TipoContrato {
    ok?:    boolean;
    tipocontrato?: TipoContrato[];
}

export interface TipoContrato {
    id:        number;
    NOMBRE:    string;
    usuarioID: number;
    ESTADO:    number;
    createdAt: Date;
    updatedAt: Date;
}