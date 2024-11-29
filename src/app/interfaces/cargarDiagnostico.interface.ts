export interface Diagnosticos {
    ok:          boolean;
    diagnostico: Diagnostico[];
}

export interface Diagnostico {
    id:        number;
    nombre:    string;
    estado:    boolean;
    createdAt: Date;
    updatedAt: Date;
}
