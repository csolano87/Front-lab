export interface MenuByID {
     ok?:   boolean;
     menu?: Menu;
 }
 
 export interface Menu {
     id?:        string;
     nombre?:    string;
     ruta?:      string;
     padreid?:   null;
     orden?:     number;
     estado?:    boolean;
     createdAt?: string;
     updatedAt?: string;
 }
 