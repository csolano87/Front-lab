export interface EstadoByIdcliente {
    ok:                boolean;
    estadoclienteId: EstadoclienteID;
}

export interface EstadoclienteID {
    id:        number;
    nombre:    string;
    ESTADO:    number;
    createdAt: Date;
    updatedAt: Date;
}