export class Perfiles {
    constructor(
      public id?: string,
      public nombre?: string,
      public tipogrupoId?: string,
     
      public pruebas?: string[],
    ) {}
  }
  
  export class pruebas {
    constructor(
      public pruebaId: string,
      public codigo: string,
      public nombre: string,
      // public comentario: string,
    ) {}
  }