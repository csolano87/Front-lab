export interface Rangoreferencia {
    ok:     boolean;
    rangos: Rango[];
}

export interface Rango {
    id:                number;
    rangos:            string;
    edadinicial:       number;
    edadfinal:         number;
    comentario:        string;
    usuarioId:         string;
    USUARIO_ID:        null;
    CREATEDBY:         null;
    UPDATEDBY:         null;
    DELETEDBY:         null;
    ESTADO:            boolean;
    createdAt:         Date;
    updatedAt:         Date;
    panelpruebaId:     number;
    panelpruebasId:    number;
    tipofisiologicoId: number;
    unidadId:          number;
    unidadedadId:      number;
    panelpruebas:      Panelpruebas;
    unidad:            Tipofisiologico;
    tipofisiologico:   Tipofisiologico;
    unidadedad:        Tipofisiologico;
}

export interface Panelpruebas {
    id:            number;
    CODIGO:        string;
    NOMBRE:        string;
    CATEGORIA:     string;
    TIEMPO:        number;
    VALOR:         number;
    favorite:      null;
    ESTADO:        number;
    USUARIO_ID:    null;
    CREATEDBY:     null;
    UPDATEDBY:     null;
    DELETEDBY:     null;
    createdAt:     Date;
    updatedAt:     Date;
    itempruebasId: null;
    modeloId:      number;
}

export interface Tipofisiologico {
    id:          number;
    DESCRIPCION: string;
    USUARIO_ID:  null;
    CREATEDBY:   null;
    UPDATEDBY:   null;
    DELETEDBY:   null;
    ESTADO:      boolean;
    createdAt:   Date;
    updatedAt:   Date;
}
