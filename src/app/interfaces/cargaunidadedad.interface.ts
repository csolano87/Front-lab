export interface Unidadedades {
    ok:         boolean;
    unidadedad: Unidadedad[];
}

export interface Unidadedad {
    id:          number;
    DESCRIPCION: string;
    USUARIO_ID:  null;
    CREATEDBY:   null;
    UPDATEDBY:   null;
    DELETEDBY:   null;
    ESTADO:      boolean;
    createdAt:   Date;
    updatedAt:   Date;
}