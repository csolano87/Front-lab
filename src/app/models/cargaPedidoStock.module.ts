export class PedidoStock {
  constructor(
    public AREA: number,

    //  public MARCA: number,
    public itemstock: Item[],
    public id: number,
    public notificar: Notificar | null,
  ) {}
}

/*   export interface Item {

    ID_PRODUCTO: number;
    CANTIDAD:    number;
    product:     Product;
    bodega:      Bodega;
  } */

export interface Item {
  ID_PRODUCTO?: number;
  CANTIDAD?: number;
  product?: Product;
  bodega?: Bodega;
  referencia?: string;
  total_stock?: number;
}
export interface Bodega {
  id: number;
  NOMBRE: string;
  DESCRIPCION: null;
  ESTADO: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface Notificar {
  id: number;
  mensaje: string;
  estado: string;
  fechaExpiracion: string;
  createdAt: string;
  updatedAt: string;
  usuarioId: number;
  pedidostockId: number;
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
