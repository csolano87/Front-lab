export interface OrdenCalendar {
  ok?: boolean;
  ordenes?: Ordene[];
}

export interface Ordene {
  FECHAORDEN?: Date;
  count?: string;
}
