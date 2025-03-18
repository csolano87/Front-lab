export interface StockBodegas {
    ok:    boolean;
    stock: StockBodega[];
}

export interface StockBodega {
  /*   productId:   number;
    ID_PRODUCTO: number;
    bodegaId:    number;
    lote:        null;
    CANTIDAD:    string;
    product:     Product;
    bodega:      Bodega; */

    id:             number;
    ID_PRODUCTO:    number;
    CANTIDAD:       number;
    ENTREGADO:      number | null;
    fecha:          string;
    fechadespachar: null | string;
    fechadescargo:  null | string;
    lote:           null | string;
    ESTADO:         number;
    createdAt:      string;
    updatedAt:      string;
    despacharId:    number | null;
    descargaId:     number | null;
    solicitudId:    number | null;
    bodegaId:       number;
    pedidostockId:  number;
    productoId:     null;
    productId:      number;
    product:        Product;
    bodega:         Bodega;
    solicitud:      Solicitud | null;
    despachar:      Solicitud | null;
}
export interface Solicitud {
  usuario: string;
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
