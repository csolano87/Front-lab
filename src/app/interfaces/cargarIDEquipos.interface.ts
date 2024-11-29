export interface EquipoByID {
  ok: boolean;
  equipoId: EquipoID;
}
/* 
export interface EquipoID {
  id: number;
  NOMBRE: string;
  CATEGORIA: null;
  USUARIO_ID: null;
  MARCA_ID: null;
  MODELO_ID: null;
  SERIE: string;
  ESTADO: number;
  createdAt: Date;
  updatedAt: Date;
  marcaId: number;
  modeloId: number;
  instrumentoId:string;
  estadoId: number;
  ubicacionId: number;
  estadoproveedorId:number;
  estadoclienteId:number;
  historicoubicacion: Historico[];
  historicoestado:    Historico[];
  modelo: Estado;
  marca: Estado;
  ubicacion: Estado;
  estado: Estado;
  acc: Acc[];
}
export interface Historico {
  id:           number;
  fecha:        null;
  hora:         null;
  createdAt:    Date;
  updatedAt:    Date;
  equipoId:     number;
  equiposId:    number;
  estadoId?:    number;
  estado: Estado;
  ubicacion: Estado;
 
  ubicacionId?: number;
}

export interface Acc {
  id: number;
  SERIEACC: string;
  USUARIO_ID: null;
  DESCRIPCION: string;
  MARCA: string;
  ESTADO: number;
  createdAt: Date;
  updatedAt: Date;
  equipocomplementarioId: number;
  equipocomplementariosId: number;
  equipoId: number;
  equipocomplementarios: Equipocomplementarios;
}

export interface Equipocomplementarios {
  id: number;
  equipo: string;
  estado: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Estado {
  id: number;
  NOMBRE: string;
  USUARIO_ID?: null;
  ESTADO: number;
  createdAt: Date;
  updatedAt: Date;
}
 */


export interface EquipoID {
  id:                 number;
  SERIE:              string;
  fecha:              Date;
  USUARIO_ID:         null;
  CREATEDBY:          number;
  UPDATEDBY:          null;
  DELETEDBY:          null;
  ESTADO:             number;
  createdAt:          Date;
  updatedAt:          Date;
  usuarioId:          number;
  marcaId:            number;
  modeloId:           number;
  analizadorId:       number;
  instrumentoId:      number;
  estadoproveedorId:  number;
  estadoclienteId:    number;
  instrumento:        Estadocliente;
  modelo:             Estadocliente;
  marca:              Estadocliente;
  estadocliente:      Estadocliente;
  estadoproveedor:    Estadocliente;
  acc:                Acc[];
  usuario:            Usuario;
  historicoubicacion: Historico[];
  historicoestado:    Historico[];
}

export interface Acc {
  id:                      number;
  DESCRIPCION:             string;
  fechacom:Date;
  MARCA:                   string;
  SERIEACC:                string;
  USUARIO_ID:              null;
  CREATEDBY:               null;
  UPDATEDBY:               null;
  DELETEDBY:               null;
  ESTADO:                  number;
  createdAt:               Date;
  updatedAt:               Date;
  equipocomplementarioId:  null;
  equipocomplementariosId: number;
  equipoId:                number;
  equipocomplementarios:   Equipocomplementarios;
}
export interface Equipocomplementarios {
  id: number;
  equipo: string;
  estado: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface Estadocliente {
  id:              number;
  equipo?:         string;
  USUARIO_ID:      null;
  CREATEDBY:       number;
  UPDATEDBY:       null;
  DELETEDBY:       null;
  estado?:         boolean;
  createdAt:       Date;
  updatedAt:       Date;
  usuarioId:       number;
  NOMBRE?:         string;
  ESTADO?:         number;
  color?:          string;
  CARACTERISTICA?: string;
  modeloId?:       number;
  marcaId?:        number;
}

export interface Historico {
  id:           number;
  fecha:        Date | null;
  hora:         null | string;
  createdAt:    Date;
  updatedAt:    Date;
  equipoId:     number;
  equiposId:    number;
  estadoId?:    number;
  estado?:      Estadocliente;
  ubicacionId?: number;
  ubicacion?:   Estadocliente;
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