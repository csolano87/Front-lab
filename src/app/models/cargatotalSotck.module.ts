export class cargaStock {
  constructor(
    public stock: Stock[
      
    ]) {}
}

export interface Stock {
  cantidad: number;
  descripcion: string;
  referencia: string;
  id: number;
  caducidad: string;
  ESTADO: number;
}
