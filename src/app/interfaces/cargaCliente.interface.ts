export interface Clientes {
    ok?:    boolean;
    clientes?: Cliente[];
}

export interface Cliente{
    id?:        number;
    NOMBRE?:    string;
    ESTADO?:    number;
    createdAt?: Date;
    updatedAt?: Date;
}
