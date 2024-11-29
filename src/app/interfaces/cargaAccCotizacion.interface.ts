export interface AccCoti {
    ok?:    boolean;
    accesorio?: Accesorio[];
}

export interface Accesorio{
    id?:        number;
    CODIGO?:     string;
    NOMBRE?:    string;
    ESTADO?:    number;
    createdAt?: Date;
    updatedAt?: Date;
}
