export interface Estadoproveedores {
    ok:              boolean;
    estadoproveedor: Estadoproveedor[];
}

export interface Estadoproveedor {
    id:        number;
    NOMBRE:    string;
    ESTADO:    number;
    createdAt: Date;
    updatedAt: Date;
}
