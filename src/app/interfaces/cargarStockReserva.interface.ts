export interface StockReserva {
    ok:                boolean;
    stockdisponible:   Stockdisponible;
    cantidadReservada: CantidadReservada;
}

export interface CantidadReservada {
    total:   number;
    detalle: Detalle[];
}

export interface Detalle {
    productId:string;
    referencia:        string;
    lote:              string;
    cantidadReservada: number;
    producto:number
}

export interface Stockdisponible {
    "KU-14A": { [key: string]: number };
}
