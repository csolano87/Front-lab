export interface Tipofisiologicos {
    ok:              boolean;
    tipofisiologico: Tipofisiologico[];
}

export interface Tipofisiologico {
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