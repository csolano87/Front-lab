export class Pacientes {
  constructor(
    public tipo?: string,
    public numero?: string,
    public nombres?: string,
    public apellidos?: string,
    public sexo?: string,
    public fechanac?: Date |null,
    public edad?: number,
    //public id: number,

    public email?: string,
    public convencional?: number,
    public celular?: number,
    public provincia?: number,
    public canton?: number,
    public parroquia?: number,
    public barrio?: string,
    public numeracion?: string,
  ) {}
}
