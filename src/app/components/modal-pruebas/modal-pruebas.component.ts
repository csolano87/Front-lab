import { Component, OnInit } from '@angular/core';
import { MantenimientosService } from 'src/app/services/mantenimientos.service';

import { Listaprueba } from 'src/app/interfaces/cargaListapruebas.interface';
@Component({
  selector: 'app-modal-pruebas',

  templateUrl: './modal-pruebas.component.html',
  styleUrl: './modal-pruebas.component.css'
})
export class ModalPruebasComponent implements OnInit {
  listapruebas: Listaprueba[] = [];
  search: string = '';
  pagesGrupo: number = 1;
  pagesPruebas: number = 1;
constructor(private manteniemintoService:MantenimientosService){}

ngOnInit(): void {}

  getPruebas() {
    this.manteniemintoService.getPanelPruebas().subscribe((listapruebas) => {
      console.log(listapruebas.length);
      this.listapruebas = listapruebas;
    });
  }

  borrarPruebas(){

  }
  onSearchExam(textSearch: string) {
    console.log(textSearch);
    this.search =textSearch;
  }
  pruebaseleccionado(prueba: any) {
  
  }
}
