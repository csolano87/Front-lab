export interface ImPedido {
    ok?:     boolean;
    pedido?: Pedido;
}

export interface Pedido {
    ID_PROVEEDOR?: number;
    MARCA?:        number;
    items?:        Item[];
}

export interface Item {
    ID_PRODUCTO?: number;
    CANTIDAD?:    number;
    product?:     Product;
}

export interface Product {
    id?:         number;
    REFERENCIA?: string;
    NOMBRE?:     string;
    CATEGORIA?:  string;
    UNIDAD?:     string;
    GENERACION?: string;
}
