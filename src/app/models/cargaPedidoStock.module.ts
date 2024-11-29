export class PedidoStock {
    constructor(
      public AREA: string,
    
    //  public MARCA: number,
      public itemstock: Item[],
      public id: number,
    ) {}
  }
  
  export interface Item {
    /* ID_PRODUCTO: number;
    product: Product; 
    CANTIDAD: number;
    ENTREGADO:Number; */
    ID_PRODUCTO: number;
    CANTIDAD:    number;
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
  export class Product {
    constructor(
      public REFERENCIA: string,
      public NOMBRE: string,
      public CATEGORIA: string,
      public UNIDAD: string,
      public GENERACION: string,
    ) {}
  }