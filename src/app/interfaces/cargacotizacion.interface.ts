export interface Cotizacions {
    ok:         boolean;
    cotizacion: Cotizacion[];
}

export interface Cotizacion {
    id:          number;
    RAZONSOCIAL: null | string;
    RUC:         string;
    CORREO:      string;
    ESTADISTICA: boolean;
    CARGA:       string;
    COMENTARIOS: string;
    ESTADO:      number;
    createdAt:   Date;
    updatedAt:   Date;
    modalidadId: number;
    modalidad:   Modalidad;
}

export interface Modalidad {
    id:         number;
    NOMBRE:     string;
    USUARIO_ID: null;
    ESTADO:     number;
    createdAt:  Date;
    updatedAt:  Date;
}