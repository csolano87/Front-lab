export interface Menus {
     ok:   boolean;
     menu: Menu[];
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
 }
 