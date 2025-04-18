export interface Stocksbodega {
  ok: boolean;
  stockbodega: Stockbodega[];
}

export interface Stockbodega {
  id: number;
  ID_PRODUCTO: number;
  CANTIDAD: number;
  ENTREGADO: number | null;
  fecha: Date;
  fechadescargo: Date ;
  lote: null | string;
  fechadespachar: Date ;
  ESTADO: number;
  createdAt: Date;
  updatedAt: Date;
  bodegaId: number;
  pedidostockId: number;
  productoId: null;
  productId: number;
  product: Product;
  bodega: Bodega;
  solicitud?: DES ;
  despachar?: DES ;
  descargar?: DES ;
  despachopedido: Despachopedido[];
}
export interface Despachopedido {
  id:                  number;
  lote:                string;
  cantidad_despachada: number;
  fechadespacho:       string;
  createdAt:           string;
  updatedAt:           string;
  itempedidostockId:   number;
}

export interface Bodega {
  id: number;
  NOMBRE: string;
  DESCRIPCION: string;
  ESTADO: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface DES {
  id: number;
  doctor: string;
  codigo_doctor: string;
  usuario?: string | null;
  password: string;
  rol: string;

  DELETEDBY: null;
  estado: boolean;
  roleId: number;
}
export interface Product {
  id: number;
  REFERENCIA: string;
  NOMBRE: string;
  CATEGORIA: string;
  UNIDAD: string;
  GENERACION: string;
  VALOR: number;
  USUARIO_ID: null;
  CREATEDBY: null;
  UPDATEDBY: null;
  DELETEDBY: null;
  ESTADO: number;
  createdAt: Date;
  updatedAt: Date;
}

