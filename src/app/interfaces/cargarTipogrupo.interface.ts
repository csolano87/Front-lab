export interface Tipogrupos {
    ok:        boolean;
    tipogrupo: Tipogrupo[];
}

export interface Tipogrupo {
    id:        number;
    codigo:number;
    nombre:    string;
    estado:    boolean;
    createdAt: Date;
    updatedAt: Date;
}