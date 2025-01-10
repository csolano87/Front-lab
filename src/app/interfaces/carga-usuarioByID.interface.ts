export interface UsuarioID {
     ok:   boolean;
     user: User;
 }
 
 export interface User {
     id:            string;
     doctor:        string;
     codigo_doctor: null;
     usuario:       string;
     password:      string;
     rol:           string;
     USUARIO_ID:    null;
     CREATEDBY:     null;
     UPDATEDBY:     null;
     DELETEDBY:     null;
     estado:        string;
     roleId:        number;
     role:          Role;
 }
 
 export interface Role {
     id:         number;
     rol:        string;
     USUARIO_ID: null;
     CREATEDBY:  null;
     UPDATEDBY:  null;
     DELETEDBY:  null;
     usuarioId:  null;
     menu:       Menu[];
 }
 
 export interface Menu {
     id:        number;
     nombre:    string;
     ruta:      string;
     padreid:   number | null;
     orden:     number;
     estado:    boolean;
     createdAt: string;
     updatedAt: string;
     menuroles: Menuroles;
 }
 
 export interface Menuroles {
     createdAt: string;
     updatedAt: string;
     RoleId:    number;
     menuId:    number;
 }
 