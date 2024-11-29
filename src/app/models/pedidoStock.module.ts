export class StockPedido {
    constructor(
      public id?: string,
      public AREA?: number,
      public MARCA?: number,
      public FECHAPEDIDO?: string,
      public ESTADO?: string,
      public usuarioId?: string,
      public userId?: string,
      public marcasId?:     string,
      public items?: string[],
    ) {}
  }
  
  export class items {
    constructor(
      public ID_PRODUCTO: string,
      public CANTIDAD: string,
      public  ENTREGADO: string,
      public LOTE: string,
    ) {}
  }