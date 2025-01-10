export class Usuario {
  constructor(
 /*    public id?: string,
    public doctor?: string,
    public codigo_doctor?: string,
    public usuario?: string,
    public password?: string,
    public password2?: string,
    public rol?: string,
    public estado?: string,
    public roleId?:number, */

  public  id?:            string,
  public  codigo_doctor?: null,
  public  doctor?:        string, 
  public  usuario?:       string,
  public  password?:      string,
  public  rol?:           string,
  public  USUARIO_ID?:    string,
  public  CREATEDBY?:     string,
  public  UPDATEDBY?:     string,
  public  DELETEDBY?:     string,
  public  estado?:        string,
  public  roleId?:        number,
  public  role?:          Role,
 
  ) {}


}
export class Role {
  constructor(
public id?:         number,
public rol?:        string,
public USUARIO_ID?: null,
public CREATEDBY?:  null,
public UPDATEDBY?:  null,
public DELETEDBY?:  null,
public usuarioId?:  null,
public menu?:       Menu[],
  ){}
}

export class Menu {
  constructor(
 public  id?:        number,
 public  nombre?:    string,
 public  ruta?:      string,
 public  padreid?:   number | null,
 public  orden?:     number,
 public  estado?:    boolean,
 public  createdAt?: string,
 public  updatedAt?: string,
 public  menuroles?: Menuroles,
){}
}

export class Menuroles {
  constructor(
public  createdAt?: string,
public  updatedAt?: string,
public  RoleId?:    number,
public  menuId?:    number,
){}
}
