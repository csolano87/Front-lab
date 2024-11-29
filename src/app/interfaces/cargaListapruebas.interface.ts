/* export interface Pruebas {
  ok: boolean;
  listapruebas: Listaprueba[];
}

export interface Listaprueba {
  id: number;
  CODIGO: string;
  NOMBRE: string;
  CATEGORIA: string;
  TIEMPO: number;
  VALOR: number;
  favorite: boolean;  
  ESTADO: number;
  createdAt: Date;
  updatedAt: Date;
  modelo: Modelo;
}
export interface Modelo {
  id: number;
  NOMBRE: string;
  USUARIO_ID: null;
  ESTADO: number;
  createdAt: Date;
  updatedAt: Date;
} */
  export interface Pruebas {
    ok: boolean;
    listapruebas: Listaprueba[];
  }

export interface Listaprueba {
    id:            number;
    CODIGO:        string;
    CATEGORIA: string;
    ABREV?:         null | string;
    ORDEN?:         number | null;
    NOMBRE:        string;
    TIEMPO?:        number;
    VALOR?:         number;
    CODEXTERNO?:    number | null;
    favorite?:      boolean | null;
    ESTADO:        number;
    USUARIO_ID?:    null;
    CREATEDBY?:     null;
    UPDATEDBY?:     null;
    DELETEDBY?:     null;
    createdAt?:     Date;
    updatedAt?:     Date;
    itempruebasId?: null;
    modeloId?:      number;
    tecnicaId?:     number | null;
    muestraId?:     number | null;
    modelo?:        Modelo;
    muestra?:       Muestra | null;
    tecnica?:       Muestra | null;
}

export interface Modelo {
    id?:         number;
    NOMBRE?:     Nombre;
    USUARIO_ID?: null;
    CREATEDBY?:  number;
    UPDATEDBY?:  null;
    DELETEDBY?:  null;
    ESTADO?:     number;
    createdAt?:  Date;
    updatedAt?:  Date;
    usuarioId?:  number;
    marcaId?:    number;
}

export enum Nombre {
    Bioquimica = "BIOQUIMICA",
    Coprologia = "COPROLOGIA",
    Otros = "OTROS",
    Quimica = "QUIMICA",
    Uroanalisis = "UROANALISIS",
}

export interface Muestra {
    id?:        number;
    nombre?:    string;
    estado?:    boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
