export interface Estadoclientes {
    ok:              boolean;
    estadocliente: Estadocliente[];
}

export interface Estadocliente {
    id:        number;
    NOMBRE:    string;
    ESTADO:    number;
    createdAt: Date;
    updatedAt: Date;
}
