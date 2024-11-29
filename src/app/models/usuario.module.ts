export class Usuario {
  constructor(
    public id?: string,
    public doctor?: string,
    public codigo_doctor?: string,
    public usuario?: string,
    public password?: string,
    public password2?: string,
    public rol?: string,
    public estado?: string,
  ) {}
}
