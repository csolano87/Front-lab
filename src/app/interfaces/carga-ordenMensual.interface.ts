export interface OrdenMensual {
  ok:      boolean;
  ordenes: OrdeneMensual[];
}

export interface OrdeneMensual {

  RegisterHour:      string;
  RegisterYear:      string;
  OrderStatus:       string;
  Use:               string;
  SpecimenList?:     string;
  High?:             string;
  IsOrderValidated:  string;
  PatientID1:        string;
  FirstName:         string;
  LastName:          string;
  SecondSurname?:    string;
  SurNameAndName:    string;
  DateOfBirth:       string;
  Age:               string;
  Sex?:              string;
  D_103?:            string;
  D_104?:            string;
  D_110?:            string;
  SampleID:          string;
  RegisterDate:      string;
  Doctor?:           string;
  Diagnosis?:        string;
  Origin?:           string;
  Destination?:      string;
  Motive?:           string;
  D_107?:            string;
  D_109?:            string;
  Low?:              string;
  DeltaCheck?:       string;
  PanicHigh?:        string;
  PanicLow?:         string;
}
