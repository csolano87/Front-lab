export interface AnalizadorSelect {
    ok:         boolean;
    analizador: Analizador[];
}

export interface Analizador {
    id:             number;
    NOMBRE:         string;
    CARACTERISTICA: null | string;
    USUARIO_ID:     null;
    CREATEDBY:      number;
    UPDATEDBY:      null;
    DELETEDBY:      null;
    ESTADO:         number;
    createdAt:      Date;
    updatedAt:      Date;
    usuarioId:      number;
    modeloId:       number;
    marcaId:        number;
    modelo:         Marca;
    marca:          Marca;
}

export interface Marca {
    id:         number;
    NOMBRE:     string;
    ESTADO:     number;
    USUARIO_ID: null;
    CREATEDBY:  number;
    UPDATEDBY:  null;
    DELETEDBY:  null;
    createdAt:  Date;
    updatedAt:  Date;
    usuarioId:  number;
    marcaId?:   number;
}
