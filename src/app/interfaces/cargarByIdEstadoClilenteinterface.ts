export interface EstadoByIdcliente {
    ok:                boolean;
    estadoclienteId: EstadoclienteID;
}

export interface EstadoclienteID {
    id:        number;
    NOMBRE:    string;
    ESTADO:    number;
    createdAt: Date;
    updatedAt: Date;
}