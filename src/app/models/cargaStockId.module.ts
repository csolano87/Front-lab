

export class StockId {

     constructor(


          public id?: number,
          public guia?: string,
          public fechaIngreso?: string,
          public usuario?: number,
          public USUARIO_ID?: null,
          public CREATEDBY?: null,
          public UPDATEDBY?: null,
          public DELETEDBY?: null,
          public ESTADO?: number,
          public createdAt?: string,
          public updatedAt?: string,
          public stockItem?: StockItem[],
     ) { }
}

export class StockItem {
     constructor(

          public id?: number,
          public referencia?: string,
          public descripcion?: null,
          public lote?: string,
          public caducidad?: string,
          public cantidad?: number,
          public cantidad_recibida?: number,
          public fabricante?: string,
          public sanitario?: string,
          public comentario?: string,
          public USUARIO_ID?: null,
          public CREATEDBY?: null,
          public UPDATEDBY?: null,
          public DELETEDBY?: null,
          public ESTADO?: number,
          public createdAt?: string,
          public updatedAt?: string,
          public bodegaId?: number,
          public stockId?: number,
          public inventarioId?: null,
          public productoId?: number,
          public productId?: number,
          public product?: Product,
     ) { }
}

export class Product {
     constructor(

          public id?: number,
          public REFERENCIA?: string,
          public NOMBRE?: string,
          public CATEGORIA?: string,
          public UNIDAD?: string,
          public GENERACION?: string,
          public VALOR?: number,
          public USUARIO_ID?: null,
          public CREATEDBY?: null,
          public UPDATEDBY?: null,
          public DELETEDBY?: null,

     ) { }
}
