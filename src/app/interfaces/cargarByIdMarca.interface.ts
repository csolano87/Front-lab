export interface MarcaByID {
    ok:       boolean;
    marcaId: MarcaID;
}

export interface MarcaID {
    id:         number;
    NOMBRE:     string;
    marcaId:number;
    USUARIO_ID: null;
    ESTADO:     number;
    createdAt:  Date;
    updatedAt:  Date;
}