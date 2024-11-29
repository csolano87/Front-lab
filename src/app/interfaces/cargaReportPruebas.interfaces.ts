export interface Pruebas {
  ok: boolean;
  listapruebas?: RegisterDateCount[];
}

export interface RegisterDateCount {
  TestName: string;
  RegisterDateCounts: RegisterDateCount[];
}

export interface RegisterDateCount {
  RegisterDate: string;
  Count: number;
}
