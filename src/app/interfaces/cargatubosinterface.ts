export interface Tubos {
    ok:     boolean;
    envase: Envase[];
}

export interface Envase {
    id:            number;
    descripcion:   null | string;
    codigo:        string;
    abreviatura:   null | string;
    volumenneto:   number | null;
    volumenprueba: number | null;
    tipomuestraId: number | null;
    muestraId:     number | null;
    tuboId:        null;
    tubosId:       null;
    muestra:       Muestra | null;
    estado:boolean;
}

export interface Muestra {
    id:          number;
    codigo:      string;
    nombre:      string;
    abreviatura: string;
    estado:      boolean;
}