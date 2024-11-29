export interface RegisterFrom {
  institucion: string;
  codigo: string;
  linkproceso: string;
  tiempoconsumo: string;
  determinacion: string;
  presupuesto: string;
  entregacarpeta: string;
  areas: Area[];
  terceraopcion: string;
  sistema: string;
  equipoprincipal: Equipoprincipal;
  equipobackup: Equipobackup;
  observacion: string;
  correo: string;
  licenciaEquiposHematologicos: LicenciaEquiposHematologico[];
}

export interface Area {
  areas: string;
}

export interface Equipobackup {
  bkquimica: string;
  valbkquimica: string;
  bkinmunologia: string;
  valbkinmunologia: string;
  bkhematologia: string;
  valbkhematologia: string;
  bkcoagulacion: string;
  valbkcoagulacion: string;
  bkuipoquimica: string;
  valbkorquimica: string;
  bkgasometria: string;
  valbkgasometria: number;
  bkelectrolitros: string;
  valbkelectrolitros: number;
  bkuroanalisis: string;
  valbkuroanalisis: number;
  bkmicrobiologia: string;
  valbkmicrobiologia: number;
}

export interface Equipoprincipal {
  eqquimica: string;
  valquimica: number;
  eqinmunologia: string;
  valinmunologia: number;
  eqhematologia: string;
  valhematologia: number;
  eqcoagulacion: string;
  valcoagulacion: number;
  equipoquimica: string;
  valorquimica: string;
  eqgasometria: string;
  valgasometria: number;
  eqelectrolitros: string;
  valelectrolitros: number;
  equroanalisis: string;
  valuroanalisis: number;
  eqmicrobiologia: string;
  valmicrobiologia: number;
  eqpoc: string;
  valpoc: number;
}

export interface LicenciaEquiposHematologico {
  valorinput: string;
}
