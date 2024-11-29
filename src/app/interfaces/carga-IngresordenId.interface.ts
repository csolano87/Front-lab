export interface IngresoordenesID {
    ok?:      boolean;
    ordenId?: OrdenID;
}

export interface OrdenID {
    id?:             number;
    pacienteId?:     number;
    numeroorden?:    number;
    embarazada?:     null;
    fum?:            null;
    observaciones?:  string;
    fechaorden?:     Date;
    horaorden?:      string;
    estado?:         boolean;
    createdAt?:      Date;
    updatedAt?:      Date;
    medicoId?:       number;
    diagnosticoId?:  number;
    tiposervicioId?: number;
    tipoatencionId?: number;
    diagnostico?:    Diagnostico;
    tipoatencion?:   Tipoatencion;
    tiposervicio?:   Tipoatencion;
    prueba?:         Prueba[];
    paciente?:       Paciente;
    medico?:         Medico;
}

export interface Tipoatencion{
    nombre?:     string;
}

export interface Diagnostico {
    id?:         number;
  NOMBRE?:string;
    DESCRIPCION?: string;
    nombre?: string;
    USUARIO_ID?: null;
    CREATEDBY?:  null;
    UPDATEDBY?:  null;
    DELETEDBY?:  null;
    estado?:     boolean;
    createdAt?:  Date;
    updatedAt?:  Date;
}

export interface Paciente {
    id?:           number;
    numero?:       string;
    apellidos?:    string;
    nombres?:      string;
    email?:        string;
    especialidad?: null;
    sexo?:         string;
    convencional?: number;
    celular?:      number;
    provincia?:    number | null;
    canton?:       string;
    parroquia?:    string;
    barrio?:       string;
    numeracion?:   string;
    USUARIO_ID?:   null;
    CREATEDBY?:    null;
    UPDATEDBY?:    null;
    DELETEDBY?:    null;
    estado?:       boolean;
    createdAt?:    Date;
    updatedAt?:    Date;
    tipo?:         string;
    fechanac?:     Date;
    edad?:         number;
}
export interface Medico {
    id?:           number;
    numero?:       string;
    apellidos?:    string;
    nombres?:      string;
    email?:        string;
    especialidad?: null;
    sexo?:         string;
    convencional?: number;
    celular?:      number;
    provincia?:    number | null;
    canton?:       number | null;
    parroquia?:    number | null;
    barrio?:       string;
    numeracion?:   string;
    USUARIO_ID?:   null;
    CREATEDBY?:    null;
    UPDATEDBY?:    null;
    DELETEDBY?:    null;
    estado?:       boolean;
    createdAt?:    Date;
    updatedAt?:    Date;
    tipo?:         string;
    fechanac?:     Date;
    edad?:         number;
}

export interface Prueba {
    id?:            number;
    resultado?:     string;
    fechaorden?:    Date;
    horaorden?:     string;
    estado?:        boolean;
    createdAt?:     Date;
    updatedAt?:     Date;
    ordenId?:       number;
    panelpruebaId?: number;
    panelprueba?:   Panelprueba;
}

export interface Panelprueba {
    id?:            number;
    CODIGO?:        string;
    ABREV?:string;
    NOMBRE?:        string;
    ORDEN?:        string;
    CATEGORIA?:     string;
    TIEMPO?:        number;
    VALOR?:         number;
    favorite?:      null;
    ESTADO?:        number;
    USUARIO_ID?:    null;
    CREATEDBY?:     null;
    UPDATEDBY?:     null;
    DELETEDBY?:     null;
    createdAt?:     Date;
    updatedAt?:     Date;
    itempruebasId?: null;
    modeloId?:      number;
    rango?:         Rango[];
    modelo?:        Diagnostico;
    muestra?:       Muestra;
    tecnica?:       Muestra;
}
export interface Muestra {
    id?:        number;
    nombre?:    string;
    estado?:    boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface Rango {
    id?:                number;
    rangos?:            string;
    edadinicial?:       number;
    edadfinal?:         number;
    comentario?:        string;
    usuarioId?:         string;
    USUARIO_ID?:        null;
    CREATEDBY?:         null;
    UPDATEDBY?:         null;
    DELETEDBY?:         null;
    ESTADO?:            boolean;
    createdAt?:         Date;
    updatedAt?:         Date;
    panelpruebaId?:     number;
    panelpruebasId?:    number;
    tipofisiologicoId?: number;
    unidadId?:          number;
    unidadedadId?:      number;
    unidadedad?:        Diagnostico;
    unidad?:            Diagnostico;
}
