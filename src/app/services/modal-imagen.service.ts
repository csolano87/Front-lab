import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalImagenService {
  private _ocultarModal: boolean = true;

  public id!: string;

  get ocultarModal() {
    return this._ocultarModal;
  }

  /*   abrilModal(id: string){
      this.id= id;
      this._ocultarModal=false;
    } */
  abrirModal() {
    this._ocultarModal = false;
  }
  cerrarModal() {
    this._ocultarModal = true;
  }
  constructor() {}
}
