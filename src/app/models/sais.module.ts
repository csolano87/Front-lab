export class Sais {
  constructor(
    public admi_id: string,
    public exam_id: string,
    public tipo_exam_id: string,
    public tipo_exam_nombre: string,
    public grup_exam_id: string,
    public grup_exam_nombre: string,
    public labo_nombre: string,
    public exam_fecha_creacion: string,
    public pers_ci: string,
    public nombres: string,
    public apelidos: string,
    public pers_fech_naci: string,
    public pers_sexo: string,
    public area_id: string,
    public area_nombre: string,
    public prio_id: string,
    public medi_apellidos: string,
    public medi_nombres: string,
    public medi_ci: string,
    public atencion: string,
    public pers_telefono: string,
    public pers_email: string,
    public pers_convencional: string,
    public medi_nombre: string,
    public HORATOMA: string,
    public exams: string[],
  ) {}
}
export class examns {
  constructor(
    public tipo_exam_id: string,
    public tipo_exam_nombre: string,
  ) {}
}
