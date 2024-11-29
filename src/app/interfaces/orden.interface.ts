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
  Groups: string[];
  D_119: string;
  SecondSurname: string;
  SurNameAndName: string;
  DateOfBirth: Date;
  Age: string;
  Sex: string;
  D107: string;
  SampleID: string;
  RegisterDate: Date;
  Doctor: string;
  Service: string;
  Origin: string;
  D_112: string;
  PA_ID1: string;
  D_113: string;
  PA_BIRTHDATE: string;
  PA_SEX: string;
  PA_AGE: string;
  FirstName: string;
  LastName: string;
  PA_LASTNAME: string;
  PA_FIRSTNAME: string;
}
