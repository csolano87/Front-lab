export interface Equiposcomplementarios {
    ok:                   boolean;
    equipocomplementario: Equipocomplementario[];
}

export interface Equipocomplementario {
    id:        number;
    equipo:    string;
    estado:    boolean;
    createdAt: Date;
    updatedAt: Date;
}