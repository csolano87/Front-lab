/* export interface Modelos {
    ok?:    boolean;
    modelo?: Modelo[];
}

export interface Modelo{
    id?:        string;
    NOMBRE?:    string;
    ESTADO?:    number;
    instrumento?: Instrumento[];
    createdAt?: Date;
    updatedAt?: Date;
}
export interface Instrumento {
    id:        number;
    NOMBRE:    string;
    ESTADO:    number;
    createdAt: Date;
    updatedAt: Date;
    modeloId:  number;
} */

    export interface Modelos {
        ok:     boolean;
        modelo: Modelo[];
    }
    

    
    export interface Modelo {
        id:           number;
        NOMBRE:       string;
        USUARIO_ID:   null;
        CREATEDBY:    number | null;
        UPDATEDBY:    null;
        DELETEDBY:    null;
        ESTADO:       number;
        createdAt:    Date;
        updatedAt:    Date;
        usuarioId:    number | null;
        instrumento: Instrumento[];
        usuario?:     Usuario | null;
        marca: Marca;
    }

    export interface Marca {
        id:            number;
        NOMBRE:        string;
       
        USUARIO_ID:    null;
        CREATEDBY:     null;
        UPDATEDBY:     null;
        DELETEDBY:     null;
        estado:        boolean;
    }
    export interface Instrumento {
        id:             number;
        NOMBRE:         string;
        CARACTERISTICA: null | string;
        USUARIO_ID:     null;
        CREATEDBY:      number | null;
        UPDATEDBY:      null;
        DELETEDBY:      null;
        ESTADO:         number;
        createdAt:      Date;
        updatedAt:      Date;
        usuarioId:      number | null;
        modeloId:       number;
        marcaId:        number;
        marca:          Modelo;
    }
    
    export interface Usuario {
        id:            number;
        doctor:        string;
        codigo_doctor: string;
        usuario:       string;
        password:      string;
        rol:           string;
        USUARIO_ID:    null;
        CREATEDBY:     null;
        UPDATEDBY:     null;
        DELETEDBY:     null;
        estado:        boolean;
    }
    