export interface EstadoByIdproveedore {
    ok:                boolean;
    estadoproveedorId: EstadoproveedorID;
}

export interface EstadoproveedorID {
    id:        number;
    NOMBRE:    string;
    ESTADO:    number;
    createdAt: Date;
    updatedAt: Date;
}