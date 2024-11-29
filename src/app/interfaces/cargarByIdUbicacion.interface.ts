export interface UbicacionByID {
    ok:       boolean;
    ubicacionId: UbicacionID;
}

export interface UbicacionID {
    id:         number;
    NOMBRE:     string;
    USUARIO_ID: null;
    ESTADO:     number;
    createdAt:  Date;
    updatedAt:  Date;
}
