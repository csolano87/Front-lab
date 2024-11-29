export interface Proceso {
  ok?: boolean;
  proceso?: Proceso[];
   totalProcesos: number;
    totalProcesosPorAprobarBI: TotalProcesosPorAprobarBI[];
   
}

export interface Proceso {
  areas?: string[];
  ASIGNADO?:string;
  equipoprincipal?: Equipoprincipal;
  equipobackup?: Equipobackup;
  licenciaEquiposHematologicos?: string[];
  id?: number;
  institucion?: string;
  codigo?: string;
  linkproceso?: string;
  tiempoconsumo?: string;
  determinacion?: string;
  presupuesto?: string;
  entregacarpeta?: string;
  terceraopcion?: string;
  sistema?: string;
  observacion?: string;
  ESTADO?: number;
  usuarioId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  aprobar?:  Aprobar  ;
  solicitud?:Solicitud ;
  pedidos?:Pedidos ;
  status?:Status ;
  tipocontrato? :Tipocontrato;
}
export interface Aprobar {
  ESTADOBI?:         Number 
 /*  id:               number;
  procesoID:        number;
  usuarioID:        null;
  ESTADOBI?:         boolean |null;
  createdAt:        Date;
  updatedAt:        Date;
  aprobarProcesoID: number;
  tramitesID:       number; */
}
export interface Status {
  ESATADO?:         number 
  tipocontrato?: Tipocontrato |null;
 /*  id:               number;
  procesoID:        number;
  usuarioID:        null;
  ESTADOBI?:         boolean |null;
  createdAt:        Date;
  updatedAt:        Date;
  aprobarProcesoID: number;
  tramitesID:       number; */
}

export interface Tipocontrato{
  id:number;
  NOMBRE:string;

}
/* export interface Area {
  areas?: string;
} */
  export interface Pedidos {
    id:          number;
    idProveedor: null;
    marca:       null;
    fechapedido: Date;
    estado:      number;
    createdAt:   Date;
    updatedAt:   Date;
    pedidosID:   number;
    tramitesID:  null;
    usuarioID:   number;
    userID:      number;
    clienteID:   null;
    clientesID:  null;
    marcaID:     null;
    marcasID:    null;
}

export interface Equipobackup {
  bkquimica?: string;
  valbkquimica?: string;
  bkinmunologia?: string;
  valbkinmunologia?: string;
  bkhematologia?: string;
  valbkhematologia?: string;
  bkcoagulacion?: string;
  valbkcoagulacion?: string;
  bkuipoquimica?: string;
  valbkorquimica?: string;
  bkgasometria?: string;
  valbkgasometria?: number;
  bkelectrolitros?: string;
  valbkelectrolitros?: number;
  bkuroanalisis?: string;
  valbkuroanalisis?: number;
  bkmicrobiologia?: string;
  valbkmicrobiologia?: number;
}

export interface Equipoprincipal {
  eqquimica?: string;
  valquimica?: number;
  eqinmunologia?: string;
  valinmunologia?: number;
  eqhematologia?: string;
  valhematologia?: number;
  eqcoagulacion?: string;
  valcoagulacion?: number;
  eqgasometria?: string;
  valgasometria?: number;
  eqelectrolitros?: string;
  valelectrolitros?: number;
  equroanalisis?: string;
  valuroanalisis?: number;
  eqmicrobiologia?: string;
  valmicrobiologia?: number;
  eqpoc?: string;
  valpoc?: number;
}
export interface TotalProcesosPorAprobarBI {
  estado_aprobar_bi: string;
    total:           number;
}
export interface Solicitud {
  id:            number;
  usuarioID:     null;
  procesoID:     number;
  modalidadID:   number;
  fechaentrega:  Date;
  observaciones: string;
  estado:        number;
  createdAt:     Date;
  updatedAt:     Date;
  solicitudID:   number;
  tramitesID:    number;
}
/* export interface LicenciaEquiposHematologico {
  valorinput?: string;
}
 */