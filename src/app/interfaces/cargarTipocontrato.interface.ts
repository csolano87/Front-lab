//Tipocontrato
export interface Tipocontrato {
    ok?:    boolean;
    tipocontrato?: Tipocontrato[];
}

export interface Tipocontrato{
    id?:        string;
    NOMBRE?:    string;
    ESTADO?:    number;
    createdAt?: Date;
    updatedAt?: Date;
}
