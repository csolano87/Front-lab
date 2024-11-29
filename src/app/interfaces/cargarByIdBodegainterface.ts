export interface BodegaById {
    ok:       boolean;
    bodegaId: BodegaID;
}

export interface BodegaID {
    id:          number;
    NOMBRE:      string;
    DESCRIPCION: null;
    ESTADO:      number;
    createdAt:   Date;
    updatedAt:   Date;
}
