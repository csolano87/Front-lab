export interface GrupoExam {
    ok:            boolean;
    listaperfiles: Listaperfile[];
}
/* 
export interface Listaperfile {
    id:          number;
    codigo:      number;
    nombre:      string;
    tipogrupo:   number;
    estado:      boolean;
    createdAt:   Date;
    updatedAt:   Date;
    itempruebas: Itemprueba[];
}

export interface Itemprueba {
    id:            number;
    pruebaId:      number;
    fecha:         Date;
    estado:        boolean;
    createdAt:     Date;
    updatedAt:     Date;
    perfilId:      number;
    perfilesId:    null;
    panelpruebaId: number;
    panelprueba:   Panelprueba;
}

export interface Panelprueba {
    id:            number;
    CODIGO:        string;
    NOMBRE:        string;
    CATEGORIA:     string;
    TIEMPO:        number;
    VALOR:         number;
    favorite:      null;
    ESTADO:        number;
    createdAt:     Date;
    updatedAt:     Date;
    itempruebasId: null;
}
 */


export interface Listaperfile {
    id:          number;
    codigo:      number | null;
    nombre:      null | string;
    tipogrupo:   number | null;
    USUARIO_ID:  null;
    CREATEDBY:   null;
    UPDATEDBY:   null;
    DELETEDBY:   null;
    estado:      boolean;
    createdAt:   Date;
    updatedAt:   Date;
    tipogrupoId: null;
    perfilesId:  null;
    itempruebas: Itemprueba[];
}

export interface Itemprueba {
    id:           number;
    pruebaId:     null;
    fecha:        string;
    USUARIO_ID:   null;
    CREATEDBY:    null;
    UPDATEDBY:    null;
    DELETEDBY:    null;
    estado:       boolean;
    createdAt:    Date;
    updatedAt:    Date;
    perfilId:     number;
    perfilesId:   number | null;
    itempruebaId: number;
    panelprueba:  Panelprueba;
}

export interface Panelprueba {
    id:            number;
    CODIGO:        string;
    ABREV:         null | string;
    ORDEN:         number | null;
    NOMBRE:        string;
    TIEMPO:        number;
    VALOR:         number;
    CODEXTERNO:    null;
    favorite:      boolean | null;
    ESTADO:        number;
    USUARIO_ID:    null;
    CREATEDBY:     null;
    UPDATEDBY:     null;
    DELETEDBY:     null;
    createdAt:     Date;
    updatedAt:     Date;
    itempruebasId: null;
    modeloId:      number;
    tecnicaId:     number | null;
    muestraId:     number | null;
    modelo:        Modelo;
    muestra:       Muestra | null;
    tecnica:       Muestra | null;
}

export interface Modelo {
    id:         number;
    NOMBRE:     string;
    USUARIO_ID: null;
    CREATEDBY:  number;
    UPDATEDBY:  null;
    DELETEDBY:  null;
    ESTADO:     number;
    createdAt:  Date;
    updatedAt:  Date;
    usuarioId:  number;
    marcaId:    number;
}

export interface Muestra {
    id:        number;
    nombre:    string;
    estado:    boolean;
    createdAt: Date;
    updatedAt: Date;
}
