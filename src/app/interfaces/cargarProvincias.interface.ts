export interface Provincias {
    ok:         boolean;
    provincias: Provincia[];
}

export interface Provincia {
    id:        number;
    provincia: string;
    estado:    boolean;
    createdAt: Date;
    updatedAt: Date;
    cantones:  Cantone[];
}

export interface Cantone {
    id:           number;
    canton:       string;
    estado:       boolean;
    createdAt:    Date;
    updatedAt:    Date;
    provinciaId:  number;
    provinciasId: null;
    parroquias:   Parroquia[];
}

export interface Parroquia {
    id:         number;
    parroquia:  string;
    estado:     boolean;
    createdAt:  Date;
    updatedAt:  Date;
    cantonId:   number;
    cantonesId: null;
}
