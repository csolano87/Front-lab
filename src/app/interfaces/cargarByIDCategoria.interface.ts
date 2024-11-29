export interface EquipoComplementarioByID {
    ok:                     boolean;
    equipocomplementarioId: EquipocomplementarioID;
}

export interface EquipocomplementarioID {
    id:        number;
    equipo:    string;
    estado:    boolean;
    createdAt: Date;
    updatedAt: Date;
}