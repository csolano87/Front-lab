/* export interface Ubicaciones {
    ok?:    boolean;
    ubicacion?: Ubicacion[];
}

export interface Ubicacion{
    id?:        number;
    NOMBRE?:    string;
    ESTADO?:    number;
    createdAt?: Date;
    updatedAt?: Date;
} */
    export interface Ubicaciones {
        ok:        boolean;
        ubicacion: Ubicacion[];
    }
    
    export interface Ubicacion {
        id:         number;
        NOMBRE:     string;
        USUARIO_ID: null;
        CREATEDBY:  number;
        UPDATEDBY:  null;
        DELETEDBY:  null;
        ESTADO:     number;
        createdAt:  Date;
        updatedAt:  Date;
        usuarioId:  number;
        usuario:    Usuario;
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
    