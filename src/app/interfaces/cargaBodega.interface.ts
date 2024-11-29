export interface Bodegas {
    ok:     boolean;
    bodega: Bodega[];
}

export interface Bodega {
    id:          number;
    NOMBRE:      string;
    DESCRIPCION: null;
    ESTADO:      number;
    createdAt:   Date;
    updatedAt:   Date;
}
