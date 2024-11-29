/* export interface Marcas {
    ok?:    boolean;
    marcas?: Marca[];
}

export interface Marca{
    id?:        number;
    NOMBRE?:    string;
    ESTADO?:    number;
    createdAt?: Date;
    updatedAt?: Date;
} */
    export interface Marcas {
        ok:     boolean;
        marcas: Marca[];
    }
    
    export interface Marca {
        id:              number;
        NOMBRE:          string;
        ESTADO:          number;
        USUARIO_ID:      null;
        CREATEDBY:       number;
        UPDATEDBY:       null;
        DELETEDBY:       null;
        createdAt:       Date;
        updatedAt:       Date;
        usuarioId:       number;
        usuario?:        Usuario;
        modelo?:         Marca[];
        marcaId?:        number;
        instrumento?:    Marca[];
        CARACTERISTICA?: null | string;
        modeloId?:       number;
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
    