export interface Pacientes {
    ok:        boolean;
    pacientes: Paciente[];
}

export interface Paciente {
    id:           number;
    tipo:         string;
    numero:       string;
    apellidos:    string;
    nombres:      string;
    fechanac:     Date;
    edad:         number;
    email:        string;
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