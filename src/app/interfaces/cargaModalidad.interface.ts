/* export interface Modalidad {
    ok?:    boolean;
    modalidad?: Modalidad[];
}

export interface Modalidad{
    id:        number;
    NOMBRE:    string;
    usuarioID: number;
    ESTADO:    number;
    createdAt: Date;
    updatedAt: Date;
} */

    export interface Modalidades {
        ok:        boolean;
        modalidad: Modalidad[];
    }
    
    export interface Modalidad {
        id:         number;
        NOMBRE:     string;
        USUARIO_ID: null;
        CREATEDBY:  null;
        UPDATEDBY:  null;
        DELETEDBY:  null;
        ESTADO:     number;
        createdAt:  Date;
        updatedAt:  Date;
    }
    