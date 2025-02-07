export interface UnidadById {
     ok?:       boolean;
     unidadId?: UnidadId;
 }
 
 export interface UnidadId {
     id?:          number;
     DESCRIPCION?: string;
     USUARIO_ID?:  null;
     CREATEDBY?:   null;
     UPDATEDBY?:   null;
     DELETEDBY?:   null;
     ESTADO?:      boolean;
     createdAt?:   string;
     updatedAt?:   string;
 }
 