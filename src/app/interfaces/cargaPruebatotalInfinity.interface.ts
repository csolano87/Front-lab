export interface ResultTotalPrueba {
  ok:      boolean;
  results: Results[];
}

export interface Results {
  genero: string;
  prueba: Prueba;
}

export interface Prueba {
  SampleID:          string;
  RegisterYear:      string;
  RegisterDate:      string;
  RegisterHour:      string;
  Doctor:            string;
  DoctorDesc:        string;
  Diagnosis:         string;
  DiagnosisDesc:     string;
  Motive?:           string;
  MotiveDesc?:       string;
  Origin:            string;
  OriginDesc:        string;
  Destination:       string;
  DestinationDesc:   string;
  Use:               string;
  OptionalDemogList: OptionalDemogList;
  LabTests:          LabTests;
  HasMicroTests:     string;
}

export interface LabTests {
  LISLabTest: LISLabTestElement[] ;
}

export interface LISLabTestElement {
  TestID:           string;
  TestAbbreviation: string;
  TestName:         string;
  PrimaryUnit?:     string;
  DecPrimaryUnit:   string;
  LabResults:       LabResults;
  RegisterDate:     string;
  RegisterHour:     string;
  TestStatus:       string;
  GroupName:        string;
  GroupID:          string;
  VersionComment:   PurpleVersionComment;
  PrintOrder:       string;
  Printable:        string;
  HasOptionals:     string;
  SecondaryUnit?:   string;
  ResultComments?:  ResultComments;
}

export interface LabResults {
  LISLabResult: LISLabResult;
}

export interface LISLabResult {
  Low?:             string;
  High?:            string;
  SequenceNumber:   string;
  ValueResult?:     string;
  ValueResultHour?: string;
  ValueResultDate?: string;
  TechValUser?:     string;
  TechValHour?:     string;
  TechValDate?:     string;
  TechValStatus?:   string;
  CliValUser?:      string;
  CliValHour?:      string;
  CliValDate?:      string;
  CliValStatus?:    string;
  InfStatus:        string;
  InfUser?:         string;
  InfHour?:         string;
  InfDate?:         string;
  PathologicMark:   string;
  PanicMark:        string;
  DeltaCheckMark:   string;
  PanicLow?:        string;
  PanicHigh?:       string;
}

export interface ResultComments {
  LISComments: ResultCommentsLISComments;
}

export interface ResultCommentsLISComments {
  DateComment: string;
  TextComment: string;
  AddEvent:    string;
}

export interface PurpleVersionComment {
  LISComments: PurpleLISComments;
}

export interface PurpleLISComments {
  AddEvent:     string;
  TextComment?: string;
}

export interface PurpleLISLabTest {
  TestID:           string;
  TestAbbreviation: string;
  TestName:         string;
  DecPrimaryUnit:   string;
  LabResults:       LabResults;
  RegisterDate:     string;
  RegisterHour:     string;
  TestStatus:       string;
  GroupName:        string;
  GroupID:          string;
  VersionComment:   FluffyVersionComment;
  PrintOrder:       string;
  Printable:        string;
  HasOptionals:     string;
  PrimaryUnit?:     string;
  ResultComments?:  ResultComments;
}

export interface FluffyVersionComment {
  LISComments: FluffyLISComments;
}

export interface FluffyLISComments {
  AddEvent: string;
}

export interface OptionalDemogList {
  LISElementValue: LISElementValueElement[] | LISElementValueElement;
}

export interface LISElementValueElement {
  Name:  string;
  Value: string;
}
