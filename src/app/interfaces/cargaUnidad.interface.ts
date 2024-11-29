export interface Unidades {
    ok:     boolean;
    unidad: Unidad[];
}

export interface Unidad {
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
