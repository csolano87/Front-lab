export interface ResultOrder {
  ok:      boolean;
  results: Result[];
}

export interface Result {
  SampleID:          string;
  genero:string;
  RegisterYear:      string;
  RegisterDate:      string;
  RegisterHour:      string;
  Doctor:            string;
  DoctorDesc:        string;
  Diagnosis:         string;
  DiagnosisDesc:     string;
  Motive:            string;
  MotiveDesc:        string;
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
  LISLabTest: LISLabTest[];
}

export interface LISLabTest {
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
  VersionComment:   VersionComment;
  PrintOrder:       string;
  Printable:        string;
  HasOptionals:     string;
  SecondaryUnit?:   string;
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
  PathologicMark:   string;
  PanicMark:        string;
  DeltaCheckMark:   string;
  PanicLow?:        string;
  PanicHigh?:       string;
}

export interface VersionComment {
  LISComments: LISComments;
}

export interface LISComments {
  AddEvent:     string;
  TextComment?: string;
}

export interface OptionalDemogList {
  LISElementValue: LISElementValue[];
}

export interface LISElementValue {
  Name:  string;
  Value: string;
}
