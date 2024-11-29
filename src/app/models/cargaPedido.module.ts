

export class Pedidos {
  constructor(

    public ID_PROVEEDOR: number,
    public MARCA: number,
    public items: Item[],
    public id: number,
  ) {}
}

export interface Item {
  ID_PRODUCTO: number;
  product: Product; // Utilizamos el tipo 'Product' aquí
  CANTIDAD: number;
}

export class Product {
  constructor(
    public REFERENCIA: string,
    public NOMBRE: string,
    public CATEGORIA: string,
    public UNIDAD: string,
    public GENERACION: string,
    public COMENTARIO:String,
  ) {}
}
