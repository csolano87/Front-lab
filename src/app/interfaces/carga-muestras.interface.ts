export interface Muestras {
    ok?:      boolean;
    muestra?: Muestra[];
}

export interface Muestra {
    id?:        number;
    nombre?:    string;
    estado?:    boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
