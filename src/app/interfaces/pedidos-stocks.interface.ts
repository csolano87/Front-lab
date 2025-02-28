export interface stocksPedido {
    ok?: boolean;
    pedidoStock?: pedidoStock[];
  }
  
  export interface pedidoStock {
    id?: number;
    AREA?: number;
    MARCA?: number;
    FECHAPEDIDOSTOCK?: Date;
    ESTADO?: number;
    createdAt?: Date;
    updatedAt?: Date;
    usuarioId?: number;
    userId?: number;
    itemstock?: Item[];
    usuario?: Usuario;
    user?: Usuario;
    clientes?: Clientes;
    marcas?: Marcas;
  }

  export interface Item {
  
    ID_PRODUCTO?: number;
    CANTIDAD?:    number;
    ENTREGADO?:    string;
    LOTE?: string;
    product?:     Product;
    bodega?:      Bodega;
    referencia?:  string;
    total_stock?: number;
  }
  export interface Bodega {
    id:          number;
    NOMBRE:      string;
    DESCRIPCION: null;
    ESTADO:      number;
    createdAt:   Date;
    updatedAt:   Date;
}
  export interface Usuario {
    doctor: string;
}
  
  export interface Product {
    id?:         number;
    REFERENCIA?:string;
    NOMBRE?: string;
    CATEGORIA?:  string;
    UNIDAD?:     string;
    GENERACION?: string;
    VALOR?:      number;
    USUARIO_ID?: null;
    CREATEDBY?:  null;
    UPDATEDBY?:  null;
    DELETEDBY?:  null;
    ESTADO?:     number;
    createdAt?:  string;
    updatedAt?:  string;
  }
  export interface Clientes {
    NOMBRE?: string;
  }
  
  export interface Marcas {
    NOMBRE?: string;
  }
  