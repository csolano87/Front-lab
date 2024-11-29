export interface StockBodegas {
    ok:    boolean;
    stock: StockBodega[];
}

export interface StockBodega {
    productId:   number;
    ID_PRODUCTO: number;
    bodegaId:    number;
    lote:        null;
    CANTIDAD:    string;
    product:     Product;
    bodega:      Bodega;
}

export interface Bodega {
    id:          number;
    NOMBRE:      string;
    DESCRIPCION: null;
    ESTADO:      number;
    createdAt:   Date;
    updatedAt:   Date;
}

export interface Product {
    id:         number;
    REFERENCIA: string;
    NOMBRE:     string;
    CATEGORIA:  string;
    UNIDAD:     string;
    GENERACION: string;
    VALOR:      number | null;
    USUARIO_ID: null;
    CREATEDBY:  null;
    UPDATEDBY:  null;
    DELETEDBY:  null;
    ESTADO:     number;
    createdAt:  Date;
    updatedAt:  Date;
}
