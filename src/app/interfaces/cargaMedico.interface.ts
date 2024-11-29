export interface Medicos {
    ok:      boolean;
    medicos: Medico[];
}

export interface Medico {
    id:           number;
    numero:       string;
    apellidos:    string;
    nombres:      string;
    email:        string;
    especialidad: null;
    sexo:         string;
    convencional: number;
    celular:      number;
    provincia:    null;
    canton:       null;
    parroquia:    null;
    barrio:       string;
    numeracion:   string;
    estado:       boolean;
    createdAt:    Date;
    updatedAt:    Date;
}