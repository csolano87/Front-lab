export interface Ingresoordenes {
    ok:      boolean;
    ordenes: Ordene[];
}

export interface Ordene {
    id:             number;
    pacienteId:     number;
    numeroorden:    string;
    embarazada:     null;
    fum:            null;
    observaciones:  string;
    fechaorden:     Date;
    horaorden:      string;
    estado:         number;
    createdAt:      Date;
    updatedAt:      Date;
    medicoId:       number;
    diagnosticoId:  number;
    tiposervicioId: number;
    tipoatencionId: number;
    diagnostico:    Diagnostico;
    tipoatencion:   Diagnostico;
    tiposervicio:   Diagnostico;
    prueba:         Prueba[];
    paciente:       Medico;
    medico:         Medico;
}

export interface Diagnostico {
    id:         number;
    nombre:     string;
    USUARIO_ID: null;
    CREATEDBY:  null;
    UPDATEDBY:  null;
    DELETEDBY:  null;
    estado:     boolean;
    createdAt:  Date;
    updatedAt:  Date;
}

export interface Medico {
    id:            number;
    numero:        string;
    apellidos:     string;
    nombres:       string;
    email:         string;
    especialidad?: null;
    sexo:          string;
    convencional:  number;
    celular:       number;
    provincia:     number | null;
    canton:        number | null;
    parroquia:     number | null;
    barrio:        string;
    numeracion:    string;
    USUARIO_ID:    null;
    CREATEDBY:     null;
    UPDATEDBY:     null;
    DELETEDBY:     null;
    estado:        number;
    createdAt:     Date;
    updatedAt:     Date;
    tipo?:         string;
    fechanac?:     Date;
    edad?:         number;
}

export interface Prueba {
    id:            number;
    resultado:     null;
    fechaorden:    Date;
    horaorden:     string;
    estado:        boolean;
    createdAt:     Date;
    updatedAt:     Date;
    ordenId:       number;
    panelpruebaId: number;
    panelprueba:   Panelprueba;
}

export interface Panelprueba {
    id:            number;
    CODIGO:        string;
    NOMBRE:        string;
    CATEGORIA:     Categoria;
    TIEMPO:        number;
    VALOR:         number;
    favorite:      null;
    ESTADO:        number;
    USUARIO_ID:    null;
    CREATEDBY:     null;
    UPDATEDBY:     null;
    DELETEDBY:     null;
    createdAt:     Date;
    updatedAt:     Date;
    itempruebasId: null;
    modeloId:      number;
}

export enum Categoria {
    GeneralLabYEmergencyLab = "General Lab y Emergency Lab",
}
