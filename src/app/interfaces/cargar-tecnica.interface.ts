export interface Tecnicas {
    ok?:      boolean;
    tecnica?: Tecnica[];
}

export interface Tecnica {
    id?:        number;
    nombre?:    string;
    estado?:    boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
