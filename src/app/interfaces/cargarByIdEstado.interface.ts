export interface EstadoByID {
    ok:       boolean;
    estadoId: EstadoID;
}

export interface EstadoID {
    id:         number;
    NOMBRE:     string;
    color: string;
    USUARIO_ID: null;
    ESTADO:     number;
    createdAt:  Date;
    updatedAt:  Date;
}