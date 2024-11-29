export interface Productos {
    ok?:        boolean;
    productos?: Producto[];
}

export interface Producto {
    id?:         number;
    REFERENCIA?: string;
    NOMBRE?:     string;
    CATEGORIA?:  string;
    UNIDAD?:     string;
    GENERACION?:   null;
    ESTADO?:     number;
    createdAt?:  Date;
    updatedAt?:  Date;
}