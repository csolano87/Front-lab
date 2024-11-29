export interface ImportProductos {
  ok?: boolean;
  pedido?: Pedido[];
}

export interface Pedido {
  id?: number;
  ID_PROVEEDOR?: number;
  MARCA?: number;
  FECHAPEDIDO?: Date;
  ESTADO?: number;
  createdAt?: Date;
  updatedAt?: Date;
  usuarioId?: number;
  userId?: number;
  marcasId?: string;
  items?: Item[];
  user?: User;
  showDetail?: boolean;
  /* clientes?: Clientes;
  marcas?: Marcas; */
}

export interface Item {
  ID_PRODUCTO?: number;
  CANTIDAD?: number;
}

export interface User {
  doctor?: string;
}
/* export interface Clientes {
  NOMBRE?: string;
}

export interface Marcas {
  NOMBRE?: string;
}
 */