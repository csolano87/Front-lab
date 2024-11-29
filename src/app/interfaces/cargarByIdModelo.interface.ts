export interface ModeloByID {
    ok:       boolean;
    modeloId: ModeloID;
}

export interface ModeloID {
    id:         number;
    NOMBRE:     string;
    marcaId: number;
    USUARIO_ID: null;
    ESTADO:     number;
    createdAt:  Date;
    updatedAt:  Date;
}