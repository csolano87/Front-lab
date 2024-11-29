export interface Equipos {
  ok: boolean;
  totalequipos: number;
  equipos: Equipo[];
  resultados: Resultado[];
}

export interface Equipo {
  id: number;
  NOMBRE: string;
  CARACTERISTICA: string;

  CREATEDBY: 2;

  UPDATEDBY: null;

  DELETEDBY: null;

  CATEGORIA: null;
  USUARIO_ID: null;
  MARCA_ID: null;
  fecha: Date;
  MODELO_ID: null;
  SERIE: string;
  ESTADO: number;
  createdAt: Date;
  updatedAt: Date;
  marcaId: number;
  modeloId: number;
  usuarioId: number;
  analizadorId: number;
  instrumentoId: number;
  estadoId: number;
  ubicacionId: number;
  instrumento: Estado;
  modelo: Estado;
  marca: Estado;
  ubicacion: Estado;
  historicoubicacion: Historico[];
  historicoestado: Historico[];
  estado: Estado;
  estadocliente: Estado;
  estadoproveedor: Estado;
  acc: Acc[];
  usuario:           Usuario;

  /*   

   

    CARACTERISTICA: null,

    USUARIO_ID: null,

    CREATEDBY: 2,

    UPDATEDBY: null,

    DELETEDBY: null,

    ESTADO: 1,

    

  


     */
}
export interface Historico {
  id: number;
  fecha: null;
  hora: null;
  createdAt: Date;
  updatedAt: Date;
  equipoId: number;
  equiposId: number;
  estadoId?: number;
  estado: Estado;
  ubicacion: Estado;
  //estado?:      Estadocliente;
  ubicacionId?: number;
}
export interface Acc {
  id: number;
  DESCRIPCION: string;
  MARCA: string;
  SERIEACC: string;
  fechacom: Date;
  USUARIO_ID: null;
  ESTADO: number;
  createdAt: Date;
  updatedAt: Date;
  equipocomplementarioId: null;
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
  color: string;
  USUARIO_ID?: null;
  ESTADO: number;
  createdAt: Date;
  updatedAt: Date;
  modeloId?: number;
}

/* export interface Equipos {
  ok:           boolean;
  totalequipos: number;
  equipos:      Equipo[];
  resultados:   Resultado[];
}

export interface Equipo {
  id:                number;
  SERIE:             string;
  USUARIO_ID:        null;
  CREATEDBY:         number;
  UPDATEDBY:         null;
  DELETEDBY:         null;
  ESTADO:            number;
  createdAt:         Date;
  updatedAt:         Date;
  usuarioId:         number;
  marcaId:           number;
  modeloId:          number;
  analizadorId:      number;
  instrumentoId:     number;
  estadoId:          number;
  estadoproveedorId: number;
  estadoclienteId:   number;
  ubicacionId:       number;
  instrumento:       Estado;
  modelo:            Estado;
  marca:             Estado;
  ubicacion:         Estado;
  estado:            Estado;
  estadocliente:     Estado;
  estadoproveedor:   Estado;
  acc:               Acc[];
  usuario:           Usuario;
}

export interface Acc {
  id:                      number;
  DESCRIPCION:             string;
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
  id:         number;
  equipo:     string;
  USUARIO_ID: null;
  CREATEDBY:  number;
  UPDATEDBY:  null;
  DELETEDBY:  null;
  estado:     boolean;
  createdAt:  Date;
  updatedAt:  Date;
  usuarioId:  number;
}

export interface Estado {
  id:              number;
  NOMBRE:          string;
  color?:          string;
  USUARIO_ID:      null;
  CREATEDBY:       number;
  UPDATEDBY:       null;
  DELETEDBY:       null;
  ESTADO:          number;
  createdAt:       Date;
  updatedAt:       Date;
  usuarioId:       number;
  CARACTERISTICA?: null | string;
  modeloId?:       number;
  marcaId?:        number;
} */

export interface Usuario {
  id: number;
  doctor: string;
  codigo_doctor: string;
  usuario: string;
  password: string;
  rol: string;
  USUARIO_ID: null;
  CREATEDBY: null;
  UPDATEDBY: null;
  DELETEDBY: null;
  estado: boolean;
}

export interface Resultado {
  estadoNombre: string;
  total: number;
}
