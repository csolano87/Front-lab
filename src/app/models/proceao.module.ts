

export class ProcesoS{
    constructor(
        public id:string,
        public PROCESO_ID :string,
       public  areas: [],
       public  equipoprincipal:string,
       public  equipobackup:string,
       public  licenciaEquiposHematologicos:[],
       public  institucion:string,
       public  codigo:string,
       public  linkproceso:string,
       public  tiempoconsumo:string,
       public  determinacion:string,
       public  presupuesto:string,
       public  entregacarpeta:string,
       public  terceraopcion:string,
       public  sistema:string,
       public  observacion:string,
       public  usuarioId:string,
       public  ESTADO:string,
    ){}
    
}