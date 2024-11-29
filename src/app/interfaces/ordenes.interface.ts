import { Time } from '@angular/common';

export interface ListaOrdenes {
  ok: boolean;
  listaordenes: Listaordene[];
}

export interface Listaordene {
  diffgrID: string;
  msdataRowOrder: string;
  RegisterHour: string;
  RegisterYear: string;
  OrderStatus: string;
  Use: string;
  SpecimenList: string;
  IsOrderValidated: string;
  PatientID1: string;
  PatientID2: string;
  FirstName: string;
  LastName: string;
  SecondSurname: string;
  SurNameAndName: string;
  DateOfBirth: Date;
  D_119: string;
  D_113: string;
  Age: string;
  Sex: string;
  D107: string;
  SampleID: string;
  RegisterDate: Date;
  Groups: string[];
  Doctor: string;
  Service: string;
  Origin: string;
  D_112: string;

  PA_AGE: string;

  PA_BIRTHDATE: string;
  PA_FIRSTNAME: string;
  PA_ID1: string;
  PA_ID2: string;
  PA_LASTNAME: string;
  PA_SESURNAME: string;

  PA_SEX: string;
}
