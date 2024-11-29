export interface Pruebastock {
    ok?:      boolean;
    pruebas?: Prueba[];
}

export interface Prueba {
    id?:            number;
    GRUPO?:         string;
    IDENTIFICADOR?: string;
    CODIGO?:        string;
    SERVICIO?:      string;
    USUARIOID?:     number | null;
    ESTADO?:        number;

}