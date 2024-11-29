export interface Estados {
    ok:     boolean;
    estado: Estado[];
}

export interface Estado {
    id:         number;
    NOMBRE:     string;
    color:      null;
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
