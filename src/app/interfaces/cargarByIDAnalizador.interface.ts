export interface AnalizadorByID {
    ok:           boolean;
    analizadorId: AnalizadorID;
}

export interface AnalizadorID {
    id:        number;
    NOMBRE:    string;
    CARACTERISTICA: string;
    ESTADO:    number;
    createdAt: Date;
    updatedAt: Date;
    modeloId:  number;
    marcaId:  number;
}
