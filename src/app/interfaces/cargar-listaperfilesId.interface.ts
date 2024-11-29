export interface PerfilId {
    ok?:              boolean;
    listaperfilesId?: ListaperfilesID;
}

export interface ListaperfilesID {
    id?:          number;
    codigo?:      number;
    nombre?:      string;
    tipogrupo?:   number;
    USUARIO_ID?:  null;
    CREATEDBY?:   null;
    UPDATEDBY?:   null;
    DELETEDBY?:   null;
    estado?:      boolean;
    createdAt?:   Date;
    updatedAt?:   Date;
    tipogrupoId?: null;
    perfilesId?:  null;
    itempruebas?: Itemprueba[];
}

export interface Itemprueba {
    id?:           number;
    pruebaId?:     null;
    fecha?:        Date;
    USUARIO_ID?:   null;
    CREATEDBY?:    null;
    UPDATEDBY?:    null;
    DELETEDBY?:    null;
    estado?:       boolean;
    createdAt?:    Date;
    updatedAt?:    Date;
    perfilId?:     number;
    perfilesId?:   number;
    itempruebaId?: number;
    panelprueba?:  Panelprueba;
}

export interface Panelprueba {
    id?:            number;
    CODIGO?:        string;
    ABREV?:         string;
    ORDEN?:         number;
    NOMBRE?:        string;
    TIEMPO?:        number;
    VALOR?:         number;
    CODEXTERNO?:    null;
    favorite?:      boolean;
    ESTADO?:        number;
    USUARIO_ID?:    null;
    CREATEDBY?:     null;
    UPDATEDBY?:     null;
    DELETEDBY?:     null;
    createdAt?:     Date;
    updatedAt?:     Date;
    itempruebasId?: null;
    modeloId?:      number;
    tecnicaId?:     number;
    muestraId?:     number;
}
