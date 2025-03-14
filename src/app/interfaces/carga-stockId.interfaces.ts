export interface StockById {
     ok?:      boolean;
     StockId?: StockId;
 }
 
 export interface StockId {
     id?:           number;
     guia?:         string;
     fechaIngreso?: string;
     usuario?:      number;
     USUARIO_ID?:   null;
     CREATEDBY?:    null;
     UPDATEDBY?:    null;
     DELETEDBY?:    null;
     ESTADO?:       number;
     createdAt?:    string;
     updatedAt?:    string;
     stockItem?:    StockItem[];
     stockItemtemp?:    StockItem[];

 }
 
 export interface StockItem {
     id?:                number;
     referencia?:        string;
     descripcion?:       null;
     lote?:              string;
     caducidad?:         string;
     cantidad?:          number;
     cantidad_recibida?: number;
     fabricante?:        string;
     sanitario?:         string;
     comentario?:        string;
     USUARIO_ID?:        null;
     CREATEDBY?:         null;
     UPDATEDBY?:         null;
     DELETEDBY?:         null;
     ESTADO?:            number;
     createdAt?:         string;
     updatedAt?:         string;
     bodegaId?:          number;
     stockId?:           number;
     inventarioId?:      null;
     productoId?:        number;
     productId?:         number;
     product?:           Product;
 }
 
 export interface Product {
     id?:         number;
     REFERENCIA?: string;
     NOMBRE?:     string;
     CATEGORIA?:  string;
     UNIDAD?:     string;
     GENERACION?: string;
     VALOR?:      number;
     USUARIO_ID?: null;
     CREATEDBY?:  null;
     UPDATEDBY?:  null;
     DELETEDBY?:  null;
 }
 